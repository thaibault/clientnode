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

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {globalContext, NOOP} from './context'
import {Mapping} from './type'
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

    let clearTimeout = NOOP
    let resolved = false
    const promise = new Promise((resolve) => {
        clearTimeout = () => {
            resolved = true
            resolve()
        }
        void timeout(intervalInMilliseconds).then(clearTimeout)
    }) as
        Promise<void> &
        {clear: () => void}

    promise.clear = () => {
        if (!resolved) {
            domNode.style.transition = 'none'
            clearTimeout()
        }
    }

    return promise
}
export const fadeIn = (domNode: HTMLElement, intervalInMilliseconds = 200) =>
    fade(domNode, intervalInMilliseconds, false)
export const fadeOut = (domNode: HTMLElement, intervalInMilliseconds = 200) =>
    fade(domNode, intervalInMilliseconds)

export const getAll = (root: Node) => {
    const nodes: Array<Node> = []
    // SHOW_ALL includes elements, text, and comments
    const walker =
        document.createTreeWalker(root, NodeFilter.SHOW_ALL, null)

    let currentNode: Node | null = walker.currentNode
    while (currentNode) {
        nodes.push(currentNode)
        currentNode = walker.nextNode()
    }

    return nodes
}
export const getParents = (node: Node | null) => {
    const result: Array<Node> = []
    while (node?.parentNode) {
        result.unshift(node.parentNode)
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
 * @param second - Second html, selector to dom node  or text to compare.
 * @param forceHTMLString - Indicates whether given contents are
 * interpreted as html string (otherwise an automatic detection will be
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
        NOTE: Assume that strings that start "<" and end with ">" are markup
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
 * Replaces given dom node with given nodes.
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
 * Moves content of given dom node one level up and removes given node.
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
