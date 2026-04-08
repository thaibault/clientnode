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
export const fadeOut = (domNode: HTMLElement, intervalInMilliseconds = 200)=>
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
export const getText = (root: Node, recursive = false): Array<string> => {
    const result: Array<string> = []
    for (const domNode of root.childNodes) {
        if (domNode.nodeType === Node.TEXT_NODE) {
            const content = domNode.nodeValue?.trim()
            if (content)
                result.push(content)
        }

        if (recursive)
            result.push(...getText(domNode))
    }

    return result
}

export const createDomNodes = (html: string) => {
    const domNode = document.createElement('div')
    domNode.innerHTML = html

    if (domNode.childNodes.length === 1)
        return domNode.childNodes[0]

    return domNode
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
export const isEquivalentDOM = (
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

    console.log('A', (domNodes.first as Element).outerHTML)
    console.log('B', (domNodes.second as Element).outerHTML)

    domNodes.first.normalize()
    domNodes.second.normalize()

    return domNodes.first.isEqualNode((domNodes.second))
}
