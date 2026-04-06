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
        if (domNode.nodeType === Node.TEXT_NODE && domNode.nodeValue)
            result.push(domNode.nodeValue.trim())

        if (recursive)
            result.push(...getText(domNode))
    }

    return result
}
