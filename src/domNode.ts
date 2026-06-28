// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module domNode */
'use strict'
/* !
    region header
    [Project page](https://torben.website/clientnode)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {
    GivenInterruptableScrollToOptions,
    InterruptableScrollToOptions,
    KnownEventName,
    Mapping
} from './type'

import {globalContext, NOOP} from './context'
import {timeout} from './utility'

export const createDomNodes = <Type extends Node = Node>(
    html: string
): Type => {
    const domNodeWrapper = document.createElement('div')
    domNodeWrapper.innerHTML = html

    if (domNodeWrapper.childNodes.length === 1)
        /*
            NOTE: We need to clone the nested child to decouple it from its
            parent node.
        */
        return domNodeWrapper.childNodes[0].cloneNode(true) as Type

    return domNodeWrapper as unknown as Type
}

export const fade = (
    domNode: HTMLElement, intervalInMilliseconds = 200, out = true
) => {
    const transitionBackup = domNode.style.transition
    const visibleBackup = domNode.style.visibility
    const opacityBackup = domNode.style.opacity
    const hadStyleAttribute = domNode.hasAttribute('style')

    if (out) {
        domNode.style.visibility = 'hidden'
        domNode.style.opacity = '0'
        domNode.style.transition =
            `visibility 0s ${String(intervalInMilliseconds)}ms, ` +
            `opacity ${String(intervalInMilliseconds)}ms linear`
    } else {
        domNode.style.visibility = 'visible'
        domNode.style.opacity = '1'
        domNode.style.transition =
            `opacity ${String(intervalInMilliseconds)}ms linear`
    }

    let clearTimeoutAndResetDomNode = NOOP
    let resolved = false
    const promise = new Promise((resolve) => {
        clearTimeoutAndResetDomNode = () => {
            domNode.style.transition = transitionBackup

            resolved = true
            resolve()
        }
        void timeout(intervalInMilliseconds).then(clearTimeoutAndResetDomNode)
    }) as
        Promise<void> &
        {
            clear: () => void
            resetStyles: () => void
        }

    promise.clear = () => {
        if (!resolved) {
            domNode.style.transition = 'none'
            clearTimeoutAndResetDomNode()
        }
    }
    promise.resetStyles = () => {
        if (hadStyleAttribute) {
            domNode.style.transition = transitionBackup
            domNode.style.visibility = visibleBackup
            domNode.style.opacity = opacityBackup
        } else
            domNode.removeAttribute('style')
    }

    return promise
}
export const fadeIn = (domNode: HTMLElement, intervalInMilliseconds = 200) =>
    fade(domNode, intervalInMilliseconds, false)
export const fadeOut = (domNode: HTMLElement, intervalInMilliseconds = 200) =>
    fade(domNode, intervalInMilliseconds)

export const STOP_AUTO_SCROLLING = {value: NOOP}
export const MANUAL_SCROLL_EVENT_NAMES: Array<KnownEventName> = [
    'DOMMouseScroll',

    'keydown',

    'mousedown',
    'mousewheel',
    'wheel',

    'touchstart',
    'touchmove'
]
export const SCROLL_EVENT_NAMES: Array<KnownEventName> =
    (['scroll'] as Array<KnownEventName>).concat(MANUAL_SCROLL_EVENT_NAMES)
/**
 * Smoothly scrolls both horizontally and vertically to a target DOM node.
 * Cancels instantly if the user interacts with the mouse, touch, or keys.
 * @param givenOptions - Configuration options.
 * @param givenOptions.targetDomNode - The DOM node you want to scroll to.
 * @param givenOptions.containerDomNode - The scrollable parent.
 * @param givenOptions.durationInMilliseconds - Animation duration in
 * milliseconds.
 * @param givenOptions.interruptOnManualScroll - Whether to stop the animation
 * if the user starts to scroll manually.
 * @param givenOptions.offset - Pixel offsets.
 * @param givenOptions.offset.top - Vertical offset in pixels.
 * @param givenOptions.offset.left - Horizontal offset in pixels.
 */
export const interruptableScrollTo = (
    givenOptions: GivenInterruptableScrollToOptions = {}
) => {
    if (!(globalContext.document && globalContext.window))
        return

    const document: HTMLDocument = globalContext.document
    const body: HTMLElement = document.body
    const window: Window = globalContext.window

    if (
        givenOptions.containerDomNode &&
        !('getBoundingClientRect' in givenOptions.containerDomNode) &&
        'parentElement' in givenOptions.containerDomNode
    )
        givenOptions.containerDomNode =
            givenOptions.containerDomNode.parentElement
    if (
        givenOptions.targetDomNode &&
        !('getBoundingClientRect' in givenOptions.targetDomNode) &&
        'parentElement' in givenOptions.targetDomNode
    )
        givenOptions.targetDomNode = givenOptions.targetDomNode.parentElement

    const options: InterruptableScrollToOptions = {
        targetDomNode: body,
        containerDomNode: window,
        durationInMilliseconds: 500,
        offset: {
            top: 0,
            left: 0,
            ...givenOptions.offset || {}
        },
        interruptOnManualScroll: true,
        ...givenOptions as Partial<InterruptableScrollToOptions>
    }

    const isWindow = options.containerDomNode === window

    // 1. Get current starting scroll positions
    const startY = isWindow ?
        (window.scrollY || document.documentElement.scrollTop) :
        (options.containerDomNode as HTMLElement).scrollTop
    const startX = isWindow ?
        (window.scrollX || document.documentElement.scrollLeft) :
        (options.containerDomNode as HTMLElement).scrollLeft

    // 2. Calculate targetDomNode positions for both axes
    let targetY
    let targetX

    if (isWindow) {
        const rect = options.targetDomNode.getBoundingClientRect()
        targetY =
            rect.top +
            (window.scrollY || document.documentElement.scrollTop) -
            options.offset.top
        targetX =
            rect.left +
            (window.scrollX || document.documentElement.scrollLeft) -
            options.offset.left
    } else {
        // Relative to the scrollable parent container
        targetY =
            (
                options.targetDomNode.offsetTop -
                (options.containerDomNode as HTMLElement).offsetTop
            ) -
            options.offset.top
        targetX =
            (
                options.targetDomNode.offsetLeft -
                (options.containerDomNode as HTMLElement).offsetLeft
            ) -
            options.offset.left
    }

    const distanceY = targetY - startY
    const distanceX = targetX - startX

    // If no movement is needed, exit immediately
    if (distanceY === 0 && distanceX === 0)
        return

    let startTime: null | number = null
    let animationFrameId: null | number = null

    // Easing function
    const easeInOutQuad = (time: number) =>
        time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time

    if (options.interruptOnManualScroll) {
        // 3. Define the interrupt / teardown system
        STOP_AUTO_SCROLLING.value = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
            for (const node of [
                body, document.querySelector('html'), window
            ])
                for (const name of MANUAL_SCROLL_EVENT_NAMES)
                    node?.removeEventListener(name, STOP_AUTO_SCROLLING.value)

            STOP_AUTO_SCROLLING.value = NOOP
        }

        for (const node of [
            body, document.querySelector('html'), window
        ])
            for (const name of MANUAL_SCROLL_EVENT_NAMES)
                node?.addEventListener(
                    name, STOP_AUTO_SCROLLING.value, {passive: true}
                )
    }

    // 4. Multi-axis animation loop
    const step = (currentTime: number) => {
        if (!startTime)
            startTime = currentTime

        const progress = currentTime - startTime
        const timeRatio =
            Math.min(progress / options.durationInMilliseconds, 1)

        const easedRatio = easeInOutQuad(timeRatio)

        // Linearly interpolate the positions based on eased progress.
        const nextY = startY + (distanceY * easedRatio)
        const nextX = startX + (distanceX * easedRatio)

        // Apply scroll to window or container.
        if (isWindow)
            window.scrollTo(nextX, nextY)
        else {
            ;(options.containerDomNode as HTMLElement).scrollTop = nextY
            ;(options.containerDomNode as HTMLElement).scrollLeft = nextX
        }

        if (timeRatio < 1)
            animationFrameId = requestAnimationFrame(step)
        else
            STOP_AUTO_SCROLLING.value()
    }

    animationFrameId = requestAnimationFrame(step)
}
/**
 * Scrolls to the given DomNode's location or tio of the page.
 * @param targetDomNode - DomNode to scroll to. If not given, scrolls to the
 * top of the page.
 * @param behavior - Scroll behavior to use.
 */
export const scrollTo = (
    targetDomNode: Node | null = null,
    behavior: ScrollToOptions['behavior'] = 'smooth'
) => {
    if (targetDomNode && !('getBoundingClientRect' in targetDomNode))
        targetDomNode = targetDomNode.parentElement

    const {left, top} = targetDomNode ?
        (targetDomNode as Element).getBoundingClientRect() :
        {left: 0, top: 0}

    globalContext.window?.scrollTo({left, top, behavior})
}

export const getAll = (root: Node) => {
    if (!globalContext.document)
        return []

    const nodes: Array<Node> = []
    // SHOW_ALL includes elements, text, and comments
    const walker =
        globalContext.document.createTreeWalker(root, NodeFilter.SHOW_ALL, null)

    let currentNode: Node | null = walker.currentNode
    while (currentNode) {
        nodes.push(currentNode)
        currentNode = walker.nextNode()
    }

    return nodes
}
export const closest = (
    node: Node, selector: string, startWithParent = false
): Element | null =>
    'closest' in node && !startWithParent ?
        (node as Element).closest(selector) :
        node.parentElement?.closest(selector) || null
export const getParents = (node: Node): Array<Node> => {
    const result: Array<Node> = []
    while (node.parentNode) {
        result.push(node.parentNode)
        node = node.parentNode
    }

    return result
}
export const getText = (root: Node, recursive = false): Array<string> => {
    if (root.nodeType === Node.TEXT_NODE) {
        const content = root.nodeValue?.trim()
        if (content)
            return [content]
    }

    const result: Array<string> = []
    for (const domNode of root.childNodes)
        if (recursive || domNode.nodeType === Node.TEXT_NODE)
            result.push(...getText(domNode))

    return result
}
/**
 * Checks whether given html or text strings are equal.
 * @param first - First html, selector to dom node or text to compare.
 * @param second - Second html, selector to dom node or text to compare.
 * @param forceHTMLString - Indicates whether given contents are
 * interpreted as html string (otherwise automatic detection will be
 * triggered).
 * @returns Returns true if both dom representations are equivalent.
 */
export const isEquivalent = (
    first: Node | string, second: Node | string, forceHTMLString = false
): boolean => {
    if (first === second)
        return true

    if (!(first && second))
        return false

    if (!globalContext.document)
        throw new Error('Missing document in global context.')

    const createElement =
        globalContext.document.createElement.bind(globalContext.document)

    const determineHTMLPattern = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
    const inputs: Mapping<Node | string> = {first, second}
    const domNodes: Mapping<Node> = {
        first: createElement('dummy'),
        second: createElement('dummy')
    }

    /*
        NOTE: Assume that strings that start "<" and end with ">" are mark up
        and skip the more expensive regular expression check.
    */
    for (const [type, html] of Object.entries(inputs))
        if (typeof html === 'string')
            if (
                forceHTMLString ||
                (
                    html.startsWith('<') &&
                    html.endsWith('>') &&
                    html.length >= 3 ||
                    determineHTMLPattern.test(html)
                )
            )
                domNodes[type] = createDomNodes(html)
            else {
                const domNode = document.querySelector(html)
                if (domNode)
                    /*
                        NOTE: We copy the node tree to not manipulate the
                        original dom node by normalizing it afterward.
                    */
                    domNodes[type] = domNode.cloneNode(true)
                else
                    return false
            }
        else if ('cloneNode' in html)
            domNodes[type] = html.cloneNode(true)
        else
            return false

    domNodes.first.normalize()
    domNodes.second.normalize()

    return domNodes.first.isEqualNode((domNodes.second))
}
/**
 * Checks whether the given dom node is visible or takes space in the document
 * flow.
 * Elements with visibility: hidden or opacity: 0 are considered to be visible,
 * since they still consume space in the layout. During animations that hide an
 * element, the element is considered to be visible until the end of the
 * animation.
 * @param domNode - To inspect.
 * @returns A boolean indicating the visibility.
 */
export const isHidden = (domNode: HTMLElement): boolean =>
    !globalContext.document?.contains(domNode) ||

    domNode.style.display === 'none' ||

    domNode.nodeName === 'INPUT' &&
    domNode.getAttribute('type') === 'hidden' ||

    ['contents', 'inline'].includes(domNode.style.display) &&
    (!('innerHTML' in domNode) || domNode.innerHTML.trim() === '') ||

    domNode.style.height === '0px' &&
    domNode.style.width === '0px' ||

    Boolean(domNode.parentElement) &&
    isHidden(domNode.parentElement as HTMLElement)

export const onDocumentReady = (callback?: () => void): Promise<void> =>
    new Promise((resolve) =>
        void (async () => {
            // See if document object model is already available.
            if (['complete', 'interactive'].includes(document.readyState)) {
                // Call on next available tick.
                await timeout()
                resolve()
                callback?.()
            } else
                document.addEventListener('DOMContentLoaded', () => {
                    resolve()
                    callback?.()
                })
        })()
    )

/**
 * Replaces a given dom node with given nodes.
 * @param domNodeToReplace - Node to replace its children.
 * @param replacementDomNodes - Node or array of nodes to use as replacement.
 * @param skipEmptyTextNodes - Configures whether to trim text.
 */
export const replace = (
    domNodeToReplace: HTMLElement,
    replacementDomNodes: Array<Node> | Node,
    skipEmptyTextNodes = false
) => {
    for (
        const replacement of
        ([] as Array<Node>).concat(replacementDomNodes).reverse()
    )
        if (!(
            skipEmptyTextNodes &&
            (
                replacement.nodeType === Node.TEXT_NODE &&
                replacement.nodeValue?.trim() === ''
            )
        ))
            domNodeToReplace.after(replacement)

    domNodeToReplace.remove()
}

export const wrap = (
    domNodes: Node | NodeListOf<Node>, wrapper: HTMLElement
) => {
    const domNodeList = (domNodes as NodeListOf<Node>).length ?
        Array.from(domNodes as NodeListOf<Node>) :
        [domNodes as Node]

    // Use the first element's position as the anchor point
    const first = domNodeList[0]

    if (first.parentNode)
        first.parentNode.insertBefore(wrapper, first)

    for (const domNode of domNodeList)
        wrapper.appendChild(domNode)
}
/**
 * Moves the content of a given dom node one level up and removes the given
 * node.
 * @param domNode - Node to unwrap.
 * @returns List of unwrapped nodes.
 */
export const unwrap = (domNode: HTMLElement): Array<ChildNode> => {
    const parent = domNode.parentNode

    const result: Array<ChildNode> = []
    // NOTE: We need to use "Array.from" to copy the list.
    for (const childNode of Array.from(domNode.childNodes)) {
        result.push(childNode)

        if (parent)
            parent.insertBefore(childNode, domNode)
    }

    if (parent)
        parent.removeChild(domNode)

    return result
}
