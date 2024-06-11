// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Tools */
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
import {makeArray} from './array'
import {CONSOLE_METHODS, NOOP} from './constants'
import {isFunction, isNumeric} from './indicators'
import {determineType, extend} from './object'
import {
    camelCaseToDelimited,
    capitalize,
    compressStyleValue,
    delimitedToCamelCase,
    format,
    normalizeDomNodeSelector
} from './string'
import {
    $DomNodes,
    $T,
    AnyFunction,
    Mapping,
    Options,
    ParametersExceptFirst,
    Position,
    RecursivePartial,
    RelativePosition,
    UnknownFunction
} from './type'

// Indicates whether javaScript dependent content where hide or shown.
export let JAVASCRIPT_DEPENDENT_CONTENT_HANDLED = false
/// region static tools
/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for dependent gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse  option objects dom trees or handle events is also
 * provided.
 * @property _defaultOptions - Static fallback options if not overwritten by
 * the options given to the constructor method.
 * @property _defaultOptions.logging {boolean} - Static indicator whether
 * logging should be active.
 * @property _defaultOptions.domNodeSelectorInfix {string} - Static selector
 * infix for all needed dom nodes.
 * @property _defaultOptions.domNodeSelectorPrefix {string} - Static selector
 * prefix for all needed dom nodes.
 * @property _defaultOptions.domNodes {Object.<string, string>} - Static
 * mapping of names to needed dom nodes referenced by their selector.
 * @property _defaultOptions.domNodes.hideJavaScriptEnabled {string} - Static
 * selector to dom nodes which should be hidden if javaScript is available.
 * @property _defaultOptions.domNodes.showJavaScriptEnabled {string} - Static
 * selector to dom nodes which should be visible if javaScript is available.
 *
 * @property $domNode - $-extended dom node if one was given to the constructor
 * method.
 * @property options - Options given to the constructor.
 */
export class Tools<TElement = HTMLElement> {
    // region static properties
    /*
        NOTE: Define entity as partial to be able to extend this class without
        repeating all this content.
    */
    static _defaultOptions:Partial<Options> = {
        domNodes: {
            hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
            showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
        },
        domNodeSelectorInfix: '',
        domNodeSelectorPrefix: 'body',
        logging: false,
        name: 'Tools'
    }
    // endregion
    // region dynamic properties
    $domNode:null|$T<TElement> = null
    options:Options
    // endregion
    // region public methods
    /// region special
    /**
     * Triggered if current object is created via the "new" keyword. The dom
     * node selector prefix enforces to not globally select any dom nodes which
     * aren't in the expected scope of this plugin. "{1}" will be automatically
     * replaced with this plugin name suffix ("tools"). You don't have to use
     * "{1}" but it can help you to write code which is more reconcilable with
     * the dry concept.
     * @param $domNode - $-extended dom node to use as reference in various
     * methods.
     */
    constructor($domNode?:$T<TElement>) {
        if ($domNode)
            this.$domNode = $domNode

        this.options = Tools._defaultOptions as Options

        // Avoid errors in browsers that lack a console.
        if (!$.global.console)
            ($.global as unknown as {console:Mapping<AnyFunction>}).console =
                {}

        for (const methodName of CONSOLE_METHODS)
            if (!(methodName in $.global.console))
                $.global.console[methodName as 'log'] = NOOP as Console['log']
    }
    /**
     * This method could be overwritten normally. It acts like a destructor.
     * @returns Returns the current instance.
     */
    destructor():this {
        if (($.fn as {off?:AnyFunction})?.off)
            this.off('*')

        return this
    }
    /**
     * This method should be overwritten normally. It is triggered if current
     * object was created via the "new" keyword and is called now.
     * @param options - An options object.
     * @returns Returns the current instance.
     */
    initialize<R = this>(options:RecursivePartial<Options> = {}):R {
        /*
            NOTE: We have to create a new options object instance to avoid
            changing a static options object.
        */
        this.options =
            extend<Options>(true, {} as Options, Tools._defaultOptions, options)
        /*
            The selector prefix should be parsed after extending options
            because the selector would be overwritten otherwise.
        */
        this.options.domNodeSelectorPrefix = format(
            this.options.domNodeSelectorPrefix,
            camelCaseToDelimited(
                this.options.domNodeSelectorInfix === null ?
                    '' :
                    this.options.domNodeSelectorInfix || this.options.name
            )
        )

        this.renderJavaScriptDependentVisibility()

        return this as unknown as R
    }
    /// endregion
    /// region object orientation
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Defines a generic controller for dom node aware plugins.
     * @param object - The object or class to control. If "object" is a class
     * an instance will be generated.
     * @param parameters - The initially given arguments object.
     * @param $domNode - Optionally a $-extended dom node to use as reference.
     * @returns Returns whatever the initializer method returns.
     */
    static controller<TElement = HTMLElement>(
        this:void,
        object:unknown,
        parameters:unknown,
        $domNode:null|$T<TElement> = null
    ):unknown {
        /* eslint-enable jsdoc/require-description-complete-sentence */
        if (typeof object === 'function') {
            object = new (
                object as {new (_$domNode:null|$T<TElement>):unknown}
            )($domNode)

            if (!(object instanceof Tools))
                object =
                    extend<Tools>(true, new Tools<HTMLElement>(), object as Tools)
        }

        const normalizedParameters:Array<unknown> = makeArray(parameters)

        if (
            normalizedParameters.length &&
            typeof normalizedParameters[0] === 'string' &&
            normalizedParameters[0] in (object as Mapping<unknown>)
        ) {
            if (isFunction(
                (object as Mapping<unknown>)[normalizedParameters[0]]
            ))
                return (object as
                        Mapping<(..._parameters:Array<unknown>) => unknown>
                )[normalizedParameters[0]](...normalizedParameters.slice(1))

            return (object as Mapping<unknown>)[normalizedParameters[0]]
        } else if (
            normalizedParameters.length === 0 ||
            typeof normalizedParameters[0] === 'object'
        ) {
            /*
                If an options object or no method name is given the initializer
                will be called.
            */
            const result:unknown = (object as Tools).initialize(
                ...normalizedParameters as Parameters<Tools['initialize']>
            )

            const name:string =
                (object as Tools).options.name ||
                (object as Tools).constructor.name

            if ($domNode?.data && !$domNode.data(name))
                // Attach extended object to the associated dom node.
                $domNode.data(
                    name,
                    object as
                        boolean|null|number|Mapping<unknown>|string|symbol
                )

            return result
        }

        if (
            normalizedParameters.length &&
            typeof normalizedParameters[0] === 'string'
        )
            throw new Error(
                `Method "${normalizedParameters[0]}" does not exist on ` +
                `$-extended dom node "${object as string}".`
            )
    }
    /// endregion
    /// region logging
    /**
     * Shows the given object's representation in the browsers console if
     * possible or in a standalone alert-window as fallback.
     * @param object - Any object to print.
     * @param force - If set to "true" given input will be shown independently
     * of current logging configuration or interpreter's console
     * implementation.
     * @param avoidAnnotation - If set to "true" given input has no module or
     * log level specific annotations.
     * @param level - Description of log messages importance.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    log(
        object:unknown,
        force = false,
        avoidAnnotation = false,
        level:keyof Console = 'info',
        ...additionalArguments:Array<unknown>
    ):void {
        if (
            this.options.logging ||
            force ||
            ['error', 'critical'].includes(level)
        ) {
            let message:unknown

            if (avoidAnnotation)
                message = object
            else if (typeof object === 'string')
                message =
                    `${this.options.name} (${level}): ` +
                    format(object, ...additionalArguments)
            else if (isNumeric(object) || typeof object === 'boolean')
                message =
                    `${this.options.name} (${level}): ${object.toString()}`
            else {
                this.log(',--------------------------------------------,')
                this.log(object, force, true)
                this.log(`'--------------------------------------------'`)
            }

            if (message)
                if (
                    !($.global.console && level in $.global.console) ||
                    ($.global.console[level] === NOOP)
                ) {
                    if ($.global.window?.alert)
                        $.global.window.alert(message)
                } else
                    ($.global.console[level] as Console['log'])(message)
        }
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    info(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, false, false, 'info', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    debug(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, false, false, 'debug', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    error(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, true, false, 'error', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    critical(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, true, false, 'warn', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    warn(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, false, false, 'warn', ...additionalArguments)
    }
    /**
     * Dumps a given object in a human readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     * @returns Returns the serialized version of given object.
     */
    static show(
        this:void, object:unknown, level = 3, currentLevel = 0
    ):string {
        let output = ''

        if (determineType(object) === 'object') {
            for (const [key, value] of Object.entries(
                object as Mapping<unknown>
            )) {
                output += `${key.toString()}: `

                if (currentLevel <= level)
                    output += Tools.show(value, level, currentLevel + 1)
                else
                    output += `${value as string}`

                output += '\n'
            }

            return output.trim()
        }

        output = `${object as string}`.trim()

        return `${output} (Type: "${determineType(object)}")`
    }
    /// endregion
    /// region dom node
    /**
     * Normalizes class name order of current dom node.
     * @returns Current instance.
     */
    get normalizedClassNames():this {
        if (this.$domNode) {
            const className = 'class'

            this.$domNode
                .find('*')
                .addBack()
                .each((index:number, domNode:HTMLElement):void => {
                    const $domNode:$T = $(domNode)
                    const classValue:string|undefined = $domNode.attr(
                        className)
                    if (classValue)
                        $domNode.attr(
                            className,
                            (classValue.split(' ').sort() || []).join(' ')
                        )
                    else if ($domNode.is(`[${className}]`))
                        $domNode.removeAttr(className)
                })
        }

        return this
    }
    /**
     * Normalizes style attributes order of current dom node.
     * @returns Returns current instance.
     */
    get normalizedStyles():this {
        if (this.$domNode) {
            const styleName = 'style'

            this.$domNode
                .find('*')
                .addBack()
                .each((index:number, domNode:HTMLElement):void => {
                    const $domNode:$T = $(domNode)
                    const serializedStyles:string|undefined =
                        $domNode.attr(styleName)

                    if (serializedStyles)
                        $domNode.attr(
                            styleName,
                            compressStyleValue(
                                (
                                    compressStyleValue(serializedStyles)
                                        .split(';')
                                        .sort() ||
                                    []
                                )
                                    .map((style:string):string => style.trim())
                                    .join(';')
                            )
                        )
                    else if ($domNode.is(`[${styleName}]`))
                        $domNode.removeAttr(styleName)
                })
        }

        return this
    }
    /**
     * Retrieves a mapping of computed style attributes to their corresponding
     * values.
     * @returns The computed style mapping.
     */
    get style():Mapping<number|string> {
        const result:Mapping<number|string> = {}
        const $domNode:null|$T<TElement> = this.$domNode

        if ($domNode?.length) {
            let styleProperties:CSSStyleDeclaration

            if ($.global.window?.getComputedStyle) {
                styleProperties = $.global.window.getComputedStyle(
                    $domNode[0] as unknown as Element, null
                )

                if (styleProperties) {
                    if ('length' in styleProperties)
                        for (
                            let index = 0;
                            index < styleProperties.length;
                            index += 1
                        )
                            result[delimitedToCamelCase(
                                styleProperties[index]
                            )] =
                                styleProperties.getPropertyValue(
                                    styleProperties[index]
                                )
                    else
                        for (const [propertyName, value] of Object.entries(
                            styleProperties
                        ))
                            result[delimitedToCamelCase(propertyName)] =
                                value as number|string ||
                                (styleProperties as CSSStyleDeclaration)
                                    .getPropertyValue(propertyName)

                    return result
                }
            }

            styleProperties = ($domNode[0] as unknown as HTMLElement).style

            if (styleProperties)
                for (const propertyName in styleProperties)
                    if (typeof styleProperties[propertyName] !== 'function')
                        result[propertyName] = styleProperties[propertyName]
        }

        return result
    }
    /**
     * Get text content of current element without it children's text contents.
     * @returns The text string.
     */
    get text():string {
        if (this.$domNode)
            return this.$domNode.clone().children().remove().end().text()

        return ''
    }
    /**
     * Checks whether given html or text strings are equal.
     * @param first - First html, selector to dom node or text to compare.
     * @param second - Second html, selector to dom node  or text to compare.
     * @param forceHTMLString - Indicates whether given contents are
     * interpreted as html string (otherwise an automatic detection will be
     * triggered).
     *
     * @returns Returns true if both dom representations are equivalent.
     */
    static isEquivalentDOM(
        this:void,
        first:Node|string|$T<HTMLElement>|$T<Node>,
        second:Node|string|$T<HTMLElement>|$T<Node>,
        forceHTMLString = false
    ):boolean {
        if (first === second)
            return true

        if (first && second) {
            const detemermineHTMLPattern =
                /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
            const inputs:Mapping<Node|string|$T<HTMLElement>|$T<Node>> =
                {first, second}
            const $domNodes:Mapping<$T> = {
                first: $('<dummy>'), second: $('<dummy>')
            }

            /*
                NOTE: Assume that strings that start "<" and end with ">" are
                markup and skip the more expensive regular expression check.
            */
            for (const [type, tag] of Object.entries(inputs))
                if (
                    typeof tag === 'string' &&
                    (
                        forceHTMLString ||
                        (
                            tag.startsWith('<') &&
                            tag.endsWith('>') &&
                            tag.length >= 3 ||
                            detemermineHTMLPattern.test(tag)
                        )
                    )
                )
                    $domNodes[type] = $(`<div>${tag}</div>`)
                else
                    try {
                        const $copiedDomNode:$T<JQuery.Node> =
                            $<JQuery.Node>(tag as JQuery.Node).clone()

                        if ($copiedDomNode.length)
                            $domNodes[type] = $('<div>').append($copiedDomNode)
                        else
                            return false
                    } catch (error) {
                        return false
                    }

            if (
                ($domNodes.first as unknown as Array<Node>).length &&
                ($domNodes.first as unknown as Array<Node>).length ===
                ($domNodes.second as unknown as Array<Node>).length
            ) {
                $domNodes.first = $domNodes
                    .first
                    .Tools('normalizedClassNames')
                    .$domNode
                    .Tools('normalizedStyles')
                    .$domNode
                $domNodes.second = $domNodes
                    .second
                    .Tools('normalizedClassNames')
                    .$domNode
                    .Tools('normalizedStyles')
                    .$domNode

                let index = 0
                for (const domNode of (
                    $domNodes.first as unknown as Array<Node>
                )) {
                    if (!domNode.isEqualNode((
                        $domNodes.second as unknown as Array<Node>
                    )[index]))
                        return false

                    index += 1
                }

                return true
            }
        }

        return false
    }
    /**
     * Determines where current dom node is relative to current view port
     * position.
     * @param givenDelta - Allows deltas for "top", "left", "bottom" and
     * "right" for determining positions.
     * @param givenDelta.bottom - Bottom delta.
     * @param givenDelta.left - Left delta.
     * @param givenDelta.right - Right delta.
     * @param givenDelta.top - Top delta.
     * @returns Returns one of "above", "left", "below", "right" or "in".
     */
    getPositionRelativeToViewport(
        givenDelta:{bottom?:number;left?:number;right?:number;top?:number} = {}
    ):RelativePosition {
        const delta:Position =
            extend<Position>({bottom: 0, left: 0, right: 0, top: 0}, givenDelta)

        const $domNode:null|$T<TElement> = this.$domNode

        if (
            $.global.window &&
            $domNode?.length &&
            $domNode[0] &&
            'getBoundingClientRect' in ($domNode[0] as unknown as HTMLElement)
        ) {
            const $window:$T<Window & typeof globalThis> = $($.global.window)

            const rectangle:Position = ($domNode[0] as unknown as Element)
                .getBoundingClientRect()
            if (rectangle) {
                if (rectangle.top && (rectangle.top + delta.top) < 0)
                    return 'above'

                if ((rectangle.left + delta.left) < 0)
                    return 'left'

                const windowHeight:number|undefined = $window.height()
                if (
                    typeof windowHeight === 'number' &&
                    windowHeight < (rectangle.bottom + delta.bottom)
                )
                    return 'below'

                const windowWidth:number|undefined = $window.width()
                if (
                    typeof windowWidth === 'number' &&
                    windowWidth < (rectangle.right + delta.right)
                )
                    return 'right'
            }
        }

        return 'in'
    }
    /**
     * Generates a directive name corresponding selector string.
     * @param directiveName - The directive name.
     * @returns Returns generated selector.
     */
    static generateDirectiveSelector(this:void, directiveName:string):string {
        const delimitedName:string = camelCaseToDelimited(directiveName)

        return `${delimitedName}, .${delimitedName}, [${delimitedName}], ` +
            `[data-${delimitedName}], [x-${delimitedName}]` + (
                (delimitedName.includes('-') ? (
                    `, [${delimitedName.replace(/-/g, '\\:')}], ` +
                    `[${delimitedName.replace(/-/g, '_')}]`) : ''))
    }
    /**
     * Removes a directive name corresponding class or attribute.
     * @param directiveName - The directive name.
     * @returns Returns current dom node.
     */
    removeDirective(directiveName:string):null|$T<TElement> {
        if (this.$domNode === null)
            return null

        const delimitedName:string = camelCaseToDelimited(directiveName)

        return this.$domNode
            .removeClass(delimitedName)
            .removeAttr(delimitedName)
            .removeAttr(`data-${delimitedName}`)
            .removeAttr(`x-${delimitedName}`)
            .removeAttr(delimitedName.replace('-', ':'))
            .removeAttr(delimitedName.replace('-', '_'))
    }
    /**
     * Hide or show all marked nodes which should be displayed depending on
     * javascript availability.
     */
    renderJavaScriptDependentVisibility():void {
        if (
            !JAVASCRIPT_DEPENDENT_CONTENT_HANDLED &&
            $.document &&
            'filter' in $ &&
            'hide' in $ &&
            'show' in $
        ) {
            $(
                `${this.options.domNodeSelectorPrefix} ` +
                this.options.domNodes.hideJavaScriptEnabled
            )
                .filter(
                    (index:number, domNode:HTMLElement):boolean =>
                        !$(domNode).data('javaScriptDependentContentHide')
                )
                .data('javaScriptDependentContentHide', true)
                .hide()

            $(
                `${this.options.domNodeSelectorPrefix} ` +
                this.options.domNodes.showJavaScriptEnabled
            )
                .filter(
                    (index:number, domNode:HTMLElement):boolean =>
                        !$(domNode).data('javaScriptDependentContentShow')
                )
                .data('javaScriptDependentContentShow', true)
                .show()

            JAVASCRIPT_DEPENDENT_CONTENT_HANDLED = true
        }
    }
    /**
     * Determines a normalized camel case directive name representation.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding name.
     */
    static getNormalizedDirectiveName(this:void, directiveName:string):string {
        for (const delimiter of ['-', ':', '_'] as const) {
            let prefixFound = false

            for (
                const prefix of [`data${delimiter}`, `x${delimiter}`] as const
                )
                if (directiveName.startsWith(prefix)) {
                    directiveName = directiveName.substring(prefix.length)
                    prefixFound = true

                    break
                }

            if (prefixFound)
                break
        }

        for (const delimiter of ['-', ':', '_'] as const)
            directiveName = delimitedToCamelCase(directiveName, delimiter)

        return directiveName
    }
    /**
     * Determines a directive attribute value.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding attribute value or "null" if no
     * attribute value exists.
     */
    getDirectiveValue(directiveName:string):null|string {
        if (this.$domNode === null)
            return null

        const delimitedName:string = camelCaseToDelimited(directiveName)

        for (const attributeName of [
            delimitedName,
            `data-${delimitedName}`,
            `x-${delimitedName}`,
            delimitedName.replace('-', '\\:')
        ]) {
            const value:string|undefined = this.$domNode.attr(attributeName)

            if (typeof value === 'string')
                return value
        }

        return null
    }
    /**
     * Removes a selector prefix from a given selector. This methods searches
     * in the options object for a given "domNodeSelectorPrefix".
     * @param domNodeSelector - The dom node selector to slice.
     * @returns Returns the sliced selector.
     */
    sliceDomNodeSelectorPrefix(domNodeSelector:string):string {
        if (
            this.options.domNodeSelectorPrefix &&
            domNodeSelector.startsWith(this.options.domNodeSelectorPrefix)
        )
            return domNodeSelector
                .substring(this.options.domNodeSelectorPrefix.length)
                .trim()

        return domNodeSelector
    }
    /**
     * Determines the dom node name of a given dom node string.
     * @param domNodeSelector - A given to dom node selector to determine its
     * name.
     * @returns Returns The dom node name.
     * @example
     * // returns 'div'
     * $.Tools.getDomNodeName('&lt;div&gt;')
     * @example
     * // returns 'div'
     * $.Tools.getDomNodeName('&lt;div&gt;&lt;/div&gt;')
     * @example
     * // returns 'br'
     * $.Tools.getDomNodeName('&lt;br/&gt;')
     */
    static getDomNodeName(this:void, domNodeSelector:string):null|string {
        const match:Array<string>|null = /^<?([a-zA-Z]+).*>?.*/.exec(
            domNodeSelector)

        if (match)
            return match[1]

        return null
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Converts an object of dom selectors to an array of $ wrapped dom nodes.
     * Note if selector description as one of "class" or "id" as suffix element
     * will be ignored.
     * @param domNodeSelectors - An object with dom node selectors.
     * @param wrapperDomNode - A dom node to be the parent or wrapper of all
     * retrieved dom nodes.
     * @returns Returns All $ wrapped dom nodes corresponding to given
     * selectors.
     */
    grabDomNodes(
        domNodeSelectors:Mapping, wrapperDomNode?:Node|null|string|$T<Node>
    ):$DomNodes {
        /* eslint-enable jsdoc/require-description-complete-sentence */
        const domNodes:$DomNodes = {} as $DomNodes

        if (domNodeSelectors)
            if (wrapperDomNode) {
                const $wrapperDomNode:$T<Node> =
                    $(wrapperDomNode as Node) as $T<Node>
                for (const [name, selector] of Object.entries(
                    domNodeSelectors
                ))
                    domNodes[name] = $wrapperDomNode.find(selector)
            } else
                for (const [name, selector] of Object.entries(
                    domNodeSelectors
                )) {
                    const match:Array<string>|null = /, */.exec(selector)
                    if (match)
                        domNodeSelectors[name] += selector
                            .split(match[0])
                            .map((selectorPart:string):string =>
                                ', ' +
                                normalizeDomNodeSelector(
                                    selectorPart,
                                    this.options.domNodeSelectorPrefix
                                )
                            )
                            .join('')

                    domNodes[name] = $(normalizeDomNodeSelector(
                        domNodeSelectors[name],
                        this.options.domNodeSelectorPrefix
                    ))
                }

        if (this.options.domNodeSelectorPrefix)
            domNodes.parent = $(this.options.domNodeSelectorPrefix)
        if ($.global.window) {
            domNodes.window = $($.global.window as unknown as HTMLElement)

            if ($.document)
                domNodes.document = $($.document as unknown as HTMLElement)
        }

        return domNodes
    }
    /// endregion
    /// region event
    /**
     * Searches for internal event handler methods and runs them by default. In
     * addition, this method searches for a given event method by the options
     * object. Additional arguments are forwarded to respective event
     * functions.
     * @param eventName - An event name.
     * @param callOnlyOptionsMethod - Prevents from trying to call an internal
     * event handler.
     * @param scope - The scope from where the given event handler should be
     * called.
     * @param additionalArguments - Additional arguments to forward to
     * corresponding event handlers.
     * @returns - Returns result of an options event handler (when called) and
     * "true" otherwise.
     */
    fireEvent(
        eventName:string,
        callOnlyOptionsMethod = false,
        scope:unknown = this,
        ...additionalArguments:Array<unknown>
    ):unknown {
        const eventHandlerName = `on${capitalize(eventName)}`

        interface Scope {
            callable:AnyFunction
            options:Mapping<AnyFunction>
        }
        const castedScope:Scope = scope as Scope

        if (!callOnlyOptionsMethod)
            if (eventHandlerName in castedScope)
                castedScope[eventHandlerName as 'callable'](
                    ...additionalArguments
                )
            else if (`_${eventHandlerName}` in castedScope)
                castedScope[`_${eventHandlerName}` as unknown as 'callable'](
                    ...additionalArguments
                )

        if (
            castedScope.options &&
            eventHandlerName in castedScope.options &&
            castedScope.options[eventHandlerName] !== NOOP
        )
            return castedScope.options[eventHandlerName].call(
                this, ...additionalArguments
            )

        return true
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method for "$.on()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.on()".
     * @param parameters - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */
    on<TElement = HTMLElement>(...parameters:Array<unknown>):$T<TElement> {
        /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper<TElement>(parameters, false)
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method fo "$.off()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.off()".
     * @param parameters - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */
    off<TElement = HTMLElement>(...parameters:Array<unknown>):$T<TElement> {
        /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper<TElement>(parameters, true)
    }
    /// endregion
    // endregion
    // region protected methods
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Helper method for attach/remove event handler methods.
     * @param parameters - Arguments object given to methods like "on()" or
     * "off()".
     * @param removeEvent - Indicates if handler should be attached or removed.
     * @param eventFunctionName - Name of function to wrap.
     * @returns Returns $'s wrapped dom node.
     */
    _bindEventHelper = <TElement = HTMLElement>(
        parameters:Array<unknown>,
        removeEvent = false,
        eventFunctionName?:string
    ):$T<TElement> => {
        /* eslint-enable jsdoc/require-description-complete-sentence */
        if (!eventFunctionName)
            eventFunctionName = removeEvent ? 'off' : 'on'

        const $domNode:$T<TElement> =
            $(parameters[0] as HTMLElement) as unknown as $T<TElement>
        if (determineType(parameters[1]) === 'object' && !removeEvent) {
            for (const [eventType, parameter] of Object.entries(
                parameters[1] as Mapping<unknown>
            ))
                this[eventFunctionName as 'on']($domNode, eventType, parameter)

            return $domNode
        }

        parameters = makeArray(parameters).slice(1)
        if (parameters.length === 0)
            parameters.push('')
        if (!(parameters[0] as Array<string>).includes('.'))
            (parameters[0] as string) += `.${this.options.name}`

        return ($domNode[eventFunctionName as keyof $T] as UnknownFunction)
            .apply($domNode, parameters) as $T<TElement>
    }
    // endregion
}
/// endregion
/// region bound tools
/**
 * Dom bound version of Tools class.
 */
export class BoundTools<TElement = HTMLElement> extends Tools<TElement> {
    $domNode:$T<TElement>
    readonly self:typeof BoundTools = BoundTools
    /**
     * This method should be overwritten normally. It is triggered if current
     * object is created via the "new" keyword. The dom node selector prefix
     * enforces to not globally select any dom nodes which aren't in the
     * expected scope of this plugin. "{1}" will be automatically replaced with
     * this plugin name suffix ("tools"). You don't have to use "{1}" but it
     * can help you to write code which is more reconcilable with the dry
     * concept.
     * @param $domNode - $-extended dom node to use as reference in various
     * methods.
     * @param additionalParameters - Additional parameters to call super method
     * with.
     */
    constructor(
        $domNode:$T<TElement>,
        ...additionalParameters:ParametersExceptFirst<Tools['constructor']>
    ) {
        super($domNode, ...additionalParameters)

        this.$domNode = $domNode
    }
}
/// endregion
export default Tools