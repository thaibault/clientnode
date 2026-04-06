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
import {NOOP} from './context'
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
