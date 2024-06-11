// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module array */
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
import {isArrayLike, isPlainObject} from './indicators'
import {Mapping, Page, PageType, PaginateOptions, ValueOf} from './type'

/**
 * Summarizes given property of given item list.
 * @param data - Array of objects with given property name.
 * @param propertyName - Property name to summarize.
 * @param defaultValue - Value to return if property values doesn't match.
 * @returns Aggregated value.
 */
export const aggregatePropertyIfEqual = <T = unknown>(
    data:Array<Mapping<unknown>>,
    propertyName:string,
    defaultValue:T = '' as unknown as T
):T => {
    let result:T = defaultValue

    if (
        Array.isArray(data) &&
        data.length &&
        Object.prototype.hasOwnProperty.call(data[0], propertyName)
    ) {
        result = data[0][propertyName] as T

        for (const item of makeArray<Mapping<unknown>>(data))
            if (item[propertyName] !== result)
                return defaultValue
    }

    return result
}
/**
 * Deletes every item witch has only empty attributes for given property names.
 * If given property names are empty each attribute will be considered. The
 * empty string, "null" and "undefined" will be interpreted as empty.
 * @param data - Data to filter.
 * @param propertyNames - Properties to consider.
 * @returns Given data without empty items.
 */
export const deleteEmptyItems = <
    T extends Mapping<unknown> = Mapping<unknown>
>(data:Array<T>, propertyNames:Array<string|symbol> = []):Array<T> => {
    const result:Array<T> = []

    for (const item of makeArray<T>(data)) {
        let empty = true

        for (const [propertyName, value] of Object.entries(item))
            if (
                !['', null, undefined].includes(value as null) &&
                (
                    !propertyNames.length ||
                    makeArray(propertyNames).includes(propertyName)
                )
            ) {
                empty = false
                break
            }

        if (!empty)
            result.push(item)
    }

    return result
}
/**
 * Extracts all properties from all items which occur in given property names.
 * @param data - Data where each item should be sliced.
 * @param propertyNames - Property names to extract.
 * @returns Data with sliced items.
 */
export const extract = <T = Mapping<unknown>>(
    data:unknown, propertyNames:Array<string>
):Array<T> => {
    const result:Array<T> = []

    for (const item of makeArray<Mapping<unknown>>(data)) {
        const newItem:T = {} as T
        for (const propertyName of makeArray<string>(
            propertyNames
        ))
            if (Object.prototype.hasOwnProperty.call(item, propertyName))
                newItem[propertyName as keyof T] =
                    item[propertyName] as ValueOf<T>

        result.push(newItem)
    }

    return result
}
/**
 * Extracts all values which matches given regular expression.
 * @param data - Data to filter.
 * @param regularExpression - Pattern to match for.
 * @returns Filtered data.
 */
export const extractIfMatches = (
    data:unknown, regularExpression:string|RegExp
):Array<string> => {
    if (!regularExpression)
        return makeArray<string>(data)

    const result:Array<string> = []
    for (const value of makeArray<string>(data))
        if (
            ((typeof regularExpression === 'string') ?
                new RegExp(regularExpression) :
                regularExpression
            ).test(value)
        )
            result.push(value)

    return result
}
/**
 * Filters given data if given property is set or not.
 * @param data - Data to filter.
 * @param propertyName - Property name to check for existence.
 * @returns Given data without the items which doesn't have specified property.
 */
export const extractIfPropertyExists = <
    T extends Mapping<unknown> = Mapping<unknown>
>(data:unknown, propertyName:string):Array<T> => {
    if (data && propertyName) {
        const result:Array<T> = []

        for (const item of makeArray<T>(data)) {
            let exists = false
            for (const [key, value] of Object.entries(item))
                if (
                    key === propertyName &&
                    ![null, undefined].includes(value as null)
                ) {
                    exists = true
                    break
                }

            if (exists)
                result.push(item)
        }

        return result
    }

    return data as Array<T>
}
/**
 * Extract given data where specified property value matches given patterns.
 * @param data - Data to filter.
 * @param propertyPattern - Mapping of property names to pattern.
 * @returns Filtered data.
 */
export const extractIfPropertyMatches = <T = unknown>(
    data:unknown, propertyPattern:Mapping<RegExp|string>
):Array<T> => {
    if (data && propertyPattern) {
        const result:Array<T> = []

        for (const item of makeArray<T>(data)) {
            let matches = true
            for (const propertyName in propertyPattern)
                if (!(
                    propertyPattern[propertyName] &&
                    (
                        (typeof propertyPattern[propertyName] ===
                            'string'
                        ) ?
                            new RegExp(propertyPattern[propertyName]) :
                            propertyPattern[propertyName] as RegExp
                    ).test((item as unknown as Mapping)[propertyName])
                )) {
                    matches = false
                    break
                }

            if (matches)
                result.push(item)
        }

        return result
    }

    return data as Array<T>
}
/**
 * Determines all objects which exists in "first" and in "second".
 * Object key which will be compared are given by "keys". If an empty array is
 * given each key will be compared. If an object is given corresponding initial
 * data key will be mapped to referenced new data key.
 * @param first - Referenced data to check for.
 * @param second - Data to check for existence.
 * @param keys - Keys to define equality.
 * @param strict - The strict parameter indicates whether "null" and
 * "undefined" should be interpreted as equal (takes only effect if given keys
 * aren't empty).
 * @returns Data which does exit in given initial data.
 */
export const intersect = <T = unknown>(
    first:unknown,
    second:unknown,
    keys:Array<string>|Mapping<number|string> = [],
    strict = true
):Array<T> => {
    const containingData:Array<T> = []

    second = makeArray(second)

    const intersectItem = (
        firstItem:Mapping<unknown>,
        secondItem:Mapping<unknown>,
        firstKey:string|number,
        secondKey:string|number,
        keysAreAnArray:boolean,
        iterateGivenKeys:boolean
    ):false|void => {
        if (iterateGivenKeys) {
            if (keysAreAnArray)
                firstKey = secondKey
        } else
            secondKey = firstKey

        if (
            secondItem[secondKey] !== firstItem[firstKey] &&
            (
                strict ||
                !(
                    [null, undefined].includes(
                        secondItem[secondKey] as null
                    ) &&
                    [null, undefined].includes(firstItem[firstKey] as null)
                )
            )
        )
            return false
    }

    for (const firstItem of makeArray<T>(first))
        if (isPlainObject(firstItem))
            for (const secondItem of (second as Array<T>)) {
                let exists = true
                let iterateGivenKeys:boolean
                const keysAreAnArray:boolean = Array.isArray(keys)

                if (isPlainObject(keys) || keysAreAnArray && keys.length)
                    iterateGivenKeys = true
                else {
                    iterateGivenKeys = false
                    keys = firstItem as Mapping<number|string>
                }

                if (Array.isArray(keys)) {
                    let index = 0
                    for (const key of keys) {
                        if (intersectItem(
                            firstItem,
                            secondItem as unknown as Mapping<unknown>,
                            index,
                            key,
                            keysAreAnArray,
                            iterateGivenKeys
                        ) === false) {
                            exists = false
                            break
                        }

                        index += 1
                    }
                } else
                    for (const [key, value] of Object.entries(keys))
                        if (intersectItem(
                            firstItem,
                            secondItem as unknown as Mapping<unknown>,
                            key,
                            value,
                            keysAreAnArray,
                            iterateGivenKeys
                        ) === false) {
                            exists = false
                            break
                        }

                if (exists) {
                    containingData.push(firstItem)
                    break
                }
            }
        else if ((second as Array<T>).includes(firstItem))
            containingData.push(firstItem)

    return containingData
}
/**
 * Converts given object into an array.
 * @param object - Target to convert.
 * @returns Generated array.
 */
export const makeArray = <T = unknown>(object:unknown):Array<T> => {
    const result:Array<unknown> = []
    if (![null, undefined].includes(object as null))
        if (isArrayLike(Object(object)))
            merge(
                result,
                typeof object === 'string' ? [object] : object as Array<T>
            )
        else
            result.push(object)

    return result as Array<T>
}
/**
 * Creates a list of items within given range.
 * @param range - Array of lower and upper bounds. If only one value is given
 * lower bound will be assumed to be zero. Both integers have to be positive
 * and will be contained in the resulting array. If more than two numbers are
 * provided given range will be returned.
 * @param step - Space between two consecutive values.
 * @param ignoreLastStep - Removes last step.
 * @returns Produced array of integers.
 */
export const makeRange = (
    range:number|[number]|[number, number]|Array<number>,
    step = 1,
    ignoreLastStep = false
):Array<number> => {
    range = ([] as Array<number>).concat(range)

    let index:number
    let higherBound:number
    if (range.length === 1) {
        index = 0
        higherBound = parseInt(`${range[0]}`, 10)
    } else if (range.length === 2) {
        index = parseInt(`${range[0]}`, 10)
        higherBound = parseInt(`${range[1]}`, 10)
    } else
        return range

    if (higherBound < index)
        return []

    const result = [index]
    while (index <= higherBound - step) {
        index += step
        if (!ignoreLastStep || index <= higherBound - step)
            result.push(index)
    }

    return result
}
/**
 * Merge the contents of two arrays together into the first array.
 * @param target - Target array.
 * @param source - Source array.
 * @returns Target array with merged given source one.
 */
export const merge = <T = unknown>(
    target:Array<T>, source:Array<T>
):Array<T> => {
    if (!Array.isArray(source))
        source = Array.prototype.slice.call(source) as Array<T>

    for (const value of source)
        target.push(value)

    return target
}
/**
 * Generates a list if pagination symbols to render a pagination from.
 * @param options - Configure bounds and current page of pagination to
 * determine.
 * @param options.boundaryCount - Indicates where to start pagination within
 * given total range.
 * @param options.disabled - Indicates whether to disable all items.
 * @param options.hideNextButton - Indicates whether to show a jump to next
 * item.
 * @param options.hidePrevButton - Indicates whether to show a jump to previous
 * item.
 * @param options.page - Indicates current visible page.
 * @param options.pageSize - Number of items per page.
 * @param options.showFirstButton - Indicates whether to show a jump to first
 * item.
 * @param options.showLastButton - Indicates whether to show a jump to last
 * item.
 * @param options.siblingCount - Number of sibling page symbols next to current
 * page symbol.
 * @param options.total - Number of all items to paginate.
 * @returns A list of pagination symbols.
 */
export const paginate = (
    options:Partial<PaginateOptions> = {}
):Array<Page> => {
    const {
        boundaryCount = 1,
        disabled = false,
        hideNextButton = false,
        hidePrevButton = false,
        page = 1,
        pageSize = 5,
        showFirstButton = false,
        showLastButton = false,
        siblingCount = 4,
        total = 100
    } = options

    const numberOfPages:number =
    typeof pageSize === 'number' && !isNaN(pageSize) ?
        Math.ceil(total / pageSize) :
        total

    const startPages:Array<number> =
        makeRange([1, Math.min(boundaryCount, numberOfPages)])
    const endPages:Array<number> = makeRange([
        Math.max(numberOfPages - boundaryCount + 1, boundaryCount + 1),
        numberOfPages
    ])

    const siblingsStart:number = Math.max(
        Math.min(
            // Left boundary for lower pages.
            page - siblingCount,
            // Lower boundary for higher pages.
            numberOfPages - boundaryCount - siblingCount * 2 - 1
        ),
        // If number is greater than number of "startPages".
        boundaryCount + 2
    )

    const siblingsEnd:number = Math.min(
        Math.max(
            // Right bound for higher pages.
            page + siblingCount,
            // Upper boundary for lower pages.
            boundaryCount + siblingCount * 2 + 2
        ),
        // If number is less than number of "endPages".
        endPages.length > 0 ? endPages[0] - 2 : numberOfPages - 1
    )

    /*
        Symbol list of items to render represent as pagination.

        Example result:

        [
            'first', 'previous',
            1,
            'start-ellipsis',
            4, 5, 6,
            'end-ellipsis',
            10,
            'next', 'last'
        ]
    */
    return ([
        ...(showFirstButton ? ['first'] : []),
        ...(hidePrevButton ? [] : ['previous']),
        ...startPages,

        // Start ellipsis
        ...(
            siblingsStart > boundaryCount + 2 ?
                ['start-ellipsis'] :
                boundaryCount + 1 < numberOfPages - boundaryCount ?
                    [boundaryCount + 1] :
                    []
        ),

        // Sibling pages
        ...makeRange([siblingsStart, siblingsEnd]),

        // End ellipsis
        ...(
            siblingsEnd < numberOfPages - boundaryCount - 1 ?
                ['end-ellipsis'] :
                numberOfPages - boundaryCount > boundaryCount ?
                    [numberOfPages - boundaryCount] :
                    []
        ),

        ...endPages,
        ...(hideNextButton ? [] : ['next']),
        ...(showLastButton ? ['last'] : [])
    ] as Array<number|PageType>).map((item:number|PageType):Page =>
        typeof item === 'number' ?
            {
                disabled,
                page: item,
                selected: item === page,
                type: 'page'
            } :
            {
                disabled:
                    disabled ||
                    (
                        item.indexOf('ellipsis') === -1 &&
                        (
                            item === 'next' || item === 'last' ?
                                page >= numberOfPages :
                                page <= 1
                        )
                    ),
                selected: false,
                type: item,
                ...(item.endsWith('-ellipsis') ?
                        {} :
                        {page:
                                {
                                    first: 1,
                                    last: numberOfPages
                                }[item as 'first'|'last'] ??
                                item === 'next' ?
                                    Math.min(page + 1, numberOfPages) :
                                    // NOTE: Is "previous" type.
                                    Math.max(page - 1, 1)
                        }
                )
            }
    )
}
/**
 * Generates all permutations of given iterable.
 * @param data - Array like object.
 * @returns Array of permuted arrays.
 */
export const permutate = <T = unknown>(data:Array<T>):Array<Array<T>> => {
    const result:Array<Array<T>> = []

    const permute = (currentData:Array<T>, dataToMixin:Array<T> = []) => {
        if (currentData.length === 0)
            result.push(dataToMixin)
        else
            for (let index = 0; index < currentData.length; index++) {
                const copy = currentData.slice()
                permute(copy, dataToMixin.concat(copy.splice(index, 1)))
            }
    }

    permute(data)

    return result
}
/**
 * Generates all lengths permutations of given iterable.
 * @param data - Array like object.
 * @param minimalSubsetLength - Defines how long the minimal subset length
 * should be.
 * @returns Array of permuted arrays.
 */
export const permutateLength = <T = unknown>(
    data:Array<T>, minimalSubsetLength = 1
):Array<Array<T>> => {
    const result:Array<Array<T>> = []
    if (data.length === 0)
        return result

    const generate = (
        index:number, source:Array<T>, rest:Array<T>
    ):void => {
        if (index === 0) {
            if (rest.length > 0)
                result[result.length] = rest

            return
        }

        for (
            let sourceIndex = 0; sourceIndex < source.length; sourceIndex++
        )
            generate(
                index - 1,
                source.slice(sourceIndex + 1),
                rest.concat([source[sourceIndex]])
            )
    }

    for (
        let index:number = minimalSubsetLength;
        index < data.length;
        index++
    )
        generate(index, data, [])

    result.push(data)

    return result
}
/**
 * Sums up given property of given item list.
 * @param data - The objects with specified property to sum up.
 * @param propertyName - Property name to sum up its value.
 * @returns The aggregated value.
 */
export const sumUpProperty = (data:unknown, propertyName:string):number => {
    let result = 0

    if (Array.isArray(data) && data.length)
        for (const item of data)
            if (Object.prototype.hasOwnProperty.call(item, propertyName))
                result += parseFloat(
                    ((item as Mapping)[propertyName] || 0) as
                        unknown as
                        string
                )

    return result
}
/**
 * Removes given target on given list.
 * @param list - Array to splice.
 * @param target - Target to remove from given list.
 * @param strict - Indicates whether to fire an exception if given target
 * doesn't exist given list.
 * @returns Item with the appended target.
 */
export const removeArrayItem = <T = unknown>(
    list:Array<T>, target:T, strict = false
):Array<T> => {
    const index:number = list.indexOf(target)
    if (index === -1) {
        if (strict)
            throw new Error(`Given target doesn't exists in given list.`)
    } else
        list.splice(index, 1)

    return list
}
/**
 * Sorts given object of dependencies in a topological order.
 * @param items - Items to sort.
 * @returns Sorted array of given items respecting their dependencies.
 */
export const sortTopological = (
    items:Mapping<Array<string>|string>
):Array<string> => {
    const edges:Array<Array<string>> = []

    for (const [name, value] of Object.entries(items)) {
        items[name] = ([] as Array<string>).concat(value)
        if (value.length > 0)
            for (const dependencyName of makeArray<string>(value))
                edges.push([name, dependencyName])
        else
            edges.push([name])
    }

    const nodes:Array<null|string> = []
    // Accumulate unique nodes into a large list.
    for (const edge of edges)
        for (const node of edge)
            if (!nodes.includes(node))
                nodes.push(node)

    const sorted:Array<string> = []
    // Define a visitor function that recursively traverses dependencies.
    const visit = (node:string, predecessors:Array<string>):void => {
        // Check if a node is dependent of itself.
        if (predecessors.length !== 0 && predecessors.includes(node))
            throw new Error(
                `Cyclic dependency found. "${node}" is dependent of ` +
                'itself.\n' +
                `Dependency chain: "${predecessors.join('" -> "')}" => "` +
                `${node}".`
            )

        const index = nodes.indexOf(node)
        // If the node still exists, traverse its dependencies.
        if (index !== -1) {
            let copy:Array<string>|undefined
            // Mark the node to exclude it from future iterations.
            nodes[index] = null
            /*
                Loop through all edges and follow dependencies of the current
                node
            */
            for (const edge of edges)
                if (edge[0] === node) {
                    /*
                        Lazily create a copy of predecessors with the current
                        node concatenated onto it.
                    */
                    copy = copy || predecessors.concat([node])
                    // Recursively traverse to node dependencies.
                    visit(edge[1], copy)
                }

            sorted.push(node)
        }
    }

    for (let index = 0; index < nodes.length; index++) {
        const node:null|string = nodes[index]
        // Ignore nodes that have been excluded.
        if (node) {
            // Mark the node to exclude it from future iterations.
            nodes[index] = null
            /*
                Loop through all edges and follow dependencies of the current
                node.
            */
            for (const edge of edges)
                if (edge[0] === node)
                    // Recursively traverse to node dependencies.
                    visit(edge[1], [node])

            sorted.push(node)
        }
    }

    return sorted
}
/**
 * Makes all values in given iterable unique by removing duplicates (The first
 * occurrences will be left).
 * @param data - Array like object.
 * @returns Sliced version of given object.
 */
export const unique = <T = unknown>(data:Array<T>):Array<T> => {
    const result:Array<T> = []

    for (const value of makeArray(data))
        if (!result.includes(value as T))
            result.push(value as T)

    return result
}