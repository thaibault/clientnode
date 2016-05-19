// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    [Project page](http://torben.website/jQuery-tools)

    This module provides common reusable logic for every non trivial jQuery
    plugin.

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import * as $ from 'jquery'
// endregion
const context = ($.type(window) === 'undefined') ? (($.type(
    global
) === 'undefined') ? (($.type(module) === 'undefined') ? {} : module) : global
) : window
if (context.hasOwnProperty('document') && $.hasOwnProperty('context'))
    context.document = $.context
// region plugins/classes
/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for depending gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse option objects dom trees or handle events is also
 * provided.
 */
class Tools {
    // region properties
    /**
     * @member Saves a mapping from key codes to their corresponding name.
     */
    static keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }
    /**
     * @member Lists all known abbreviation for proper camel case to delimited
     * and back conversion.
     */
    static abbreviations = ['html', 'id', 'url', 'us', 'de', 'api', 'href'];
    /**
     * @member Saves a string with all css3 browser specific transition end
     * event names.
     */
    static transitionEndEventNames = 'transitionend webkitTransitionEnd ' +
        'oTransitionEnd MSTransitionEnd'
    /**
     * @member Saves a string with all css3 browser specific animation end
     * event names.
     */
    static animationEndEventNames = 'animationend webkitAnimationEnd ' +
        'oAnimationEnd MSAnimationEnd'
    /**
     * @member Saves currently minimal supported internet explorer version.
     * Saves zero if no internet explorer present.
     */
    static maximalSupportedInternetExplorerVersion = (() => {
        if (context.hasOwnProperty('document'))
            return 0
        const div = context.document.createElement('div')
        for (const version = 0; version < 10; version++) {
            /*
                NOTE: We split html comment sequences to avoid wrong
                interpretation if this code is embedded in markup.
                NOTE: Internet Explorer 9 and lower sometimes doesn't
                understand conditional comments wich doesn't starts with a
                whitespace. If the conditional markup isn't in a commend.
                Otherwise there shouldn't be any whitespace!
            */
            div.innerHTML = (
                '<!' + "--[if gt IE #{version}]><i></i><![e" + 'ndif]-' +
                '->')
            if (div.getElementsByTagName('i').length === 0)
                break
        }
        // Try special detection for internet explorer 10 and 11.
        if (version === 0 && context.hasOwnProperty('navigator'))
            if (context.navigator.appVersion.includes('MSIE 10'))
                return 10
            else if (context.navigator.userAgent.includes(
                'Trident'
            ) && context.navigator.userAgent.includes('rv:11'))
                return 11
        return version
    })()
    /*
     * @member This variable contains a collection of methods usually binded to
     * the console object.
     */
    static _consoleMethodNames = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'trace',
        'warn'
    ]
    /*
     * @member Indicates weather javaScript dependent content where hide or
     * shown.
     */
    static _javaScriptDependentContentHandled = false
    /*
     * @member Holds the class name to provide inspection features.
     */
    static __name__ = 'Tools';
    // endregion
    // region public methods
    // / region special
    /**
     * This method should be overwritten normally. It is triggered if current
     * object is created via the "new" keyword. The dom node selector prefix
     * enforces to not globally select any dom nodes which aren't in the
     * expected scope of this plugin. "{1}" will be automatically replaced with
     * this plugin name suffix ("incrementer"). You don't have to use "{1}" but
     * it can help you to write code which is more reconcilable with the dry
     * concept.
     * @returns Returns a new instance.
     */
    constructor(
        $domNode = null, _options = {}, _defaultOptions = {
            logging: false, domNodeSelectorPrefix: 'body', domNode: {
                hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
                showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
            }
        }, _locks = {}
    ) {
        this.$domNode = domNode
        this._options = _options
        this._defaultOptions = _defaultOptions
        this._locks = _locks
        // Avoid errors in browsers that lack a console.
        if (!context.hasOwnProperty('console'))
            context.console = {}
        for (const methodName of Tools._consoleMethodNames)
            if (!context.console.hasOwnProperty(methodName))
                context.console[methodName] = ($.hasOwnProperty(
                    'noop'
                )) ? $.noop() : () => {}
        if (
            !Tools._javaScriptDependentContentHandled &&
            context.hasOwnProperty('document')
        ) {
            Tools._javaScriptDependentContentHandled = true
            $(
                `${this._defaultOptions.domNodeSelectorPrefix} ` +
                this._defaultOptions.domNode.hideJavaScriptEnabled
            ).filter(function() {
                return !$(this).data('javaScriptDependentContentHide')
            }).data('javaScriptDependentContentHide', true).hide()
            $(
                `${this._defaultOptions.domNodeSelectorPrefix} ` +
                this._defaultOptions.domNode.showJavaScriptEnabled
            ).filter(function() {
                return !$(this).data('javaScriptDependentContentShow')
            }).data('javaScriptDependentContentShow', true).show()
        }
    }
    /**
     * This method could be overwritten normally. It acts like a destructor.
     * @returns Returns the current instance.
     */
    destructor() {
        this.off('*')
        return this
    }
    /**
     * This method should be overwritten normally. It is triggered if current
     * object was created via the "new" keyword and is called now.
     * @param options - An options object.
     * @returns Returns the current instance.
     */
    initialize(options = {}) {
        /*
            NOTE: We have to create a new options object instance to avoid
            changing a static options object.
        */
        this._options = $.extend(
            true, {}, this._defaultOptions, this._options, options)
        /*
            The selector prefix should be parsed after extending options
            because the selector would be overwritten otherwise.
        */
        this._options.domNodeSelectorPrefix = this.stringFormat(
            this._options.domNodeSelectorPrefix,
            this.stringCamelCaseToDelimited(this.__name__))
        return this
    }
    // / endregion
    // / region object orientation
    /**
     * Defines a generic controller for jQuery plugins.
     * @param object - The object or class to control. If "object" is a class
     * an instance will be generated.
     * @param parameter - The initially given arguments object.
     * @returns Returns whatever the initializer method returns.
     */
    controller(object, parameter, $domNode = null) {
        parameter = Tools.argumentsObjectToArray(parameter)
        if (object.hasOwnProperty('__name__')) {
            object = new object($domNode)
            if (!object.hasOwnProperty('__tools__'))
                object = $.extend(true, new Tools(), object)
        }
        if ($domNode !== null && !$domNode.data(object.__name__))
            // Attach extended object to the associated dom node.
            $domNode.data(object.__name__, object)
        if (object.hasOwnProperty(parameter[0]))
            return object[parameter[0]].apply(object, parameter.slice(1))
        else if (parameter.length === 0 || $.type(parameter[0]) === 'object')
            /*
                If an options object or no method name is given the initializer
                will be called.
            */
            return object.initialize.apply(object, parameter)
        $.error(
            "Method \"#{parameter[0]}\" does not exist on $-extension " +
            "#{object.__name__}\".")
    }
    // / endregion
    // / region mutual exclusion
    /**
     * Calling this method introduces a starting point for a critical area with
     * potential race conditions. The area will be binded to given description
     * string. So don't use same names for different areas.
     * @param description - A short string describing the critical areas
     * properties.
     * @param callbackFunction - A procedure which should only be executed if
     * the interpreter isn't in the given critical area. The lock description
     * string will be given to the callback function.
     * @param autoRelease - Release the lock after execution of given callback.
     * @returns Returns the current instance.
     */
    acquireLock(description, callbackFunction, autoRelease = false) {
        const wrappedCallbackFunction = (description) => {
            callbackFunction(description)
            if (autoRelease)
                this.releaseLock(description)
        }
        if (this._locks.hasOwnProperty(description))
            this._locks[description].push(wrappedCallbackFunction)
        else {
            this._locks[description] = []
            wrappedCallbackFunction(description)
        }
        return this
    }
    /**
     * Calling this method  causes the given critical area to be finished and
     * all functions given to "this.acquireLock()" will be executed in right
     * order.
     * @param description - A short string describing the critical areas
     * properties.
     * @returns Returns the current instance.
     */
    releaseLock(description) {
        if(this._locks.hasOwnProperty(description))
            if(this._locks[description].length)
                this._locks[description].shift()(description)
            else
                delete this._locks[description]
        return this
    }
    // / endregion
    // / region language fixes
    /**
     * This method fixes an ugly javaScript bug. If you add a mouseout event
     * listener to a dom node the given handler will be called each time any
     * dom node inside the observed dom node triggers a mouseout event. This
     * methods guarantees that the given event handler is only called if the
     * observed dom node was leaved.
     * @param eventHandler - The mouse out event handler.
     * @returns Returns the given function wrapped by the workaround logic.
     */
    static mouseOutEventHandlerFix(eventHandler) {
        const self = this
        return function(event) {
            let relatedTarget = event.toElement
            if (event.hasOwnProperty('relatedTarget'))
                relatedTarget = event.relatedTarget
            while (relatedTarget && relatedTarget.tagName !== 'BODY') {
                if (relatedTarget === this)
                    return
                relatedTarget = relatedTarget.parentNode
            }
            return eventHandler.apply(self, arguments)
        }
    }
    // / endregion
    // / region logging
    /**
     * Shows the given object's representation in the browsers console if
     * possible or in a standalone alert-window as fallback.
     * @param object - Any object to print.
     * @param force - If set to "true" given input will be shown independently
     * from current logging configuration or interpreter's console
     * implementation.
     * @param avoidAnnotation - If set to "true" given input has no module or
     * log level specific annotations.
     * @param level - Description of log messages importance.
     * @param additionalArguments This additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    log(
        object, force = false, avoidAnnotation = false, level = 'info',
        ...additionalArguments
    ) {
        if (this._options.logging || force || ['error', 'critical'].includes(
            'level'
        )) {
            let message
            if (avoidAnnotation)
                message = object
            else if ($.type(object) === 'string') {
                additionalArguments.unshift(object)
                message = `${Tools.__name__} (${level}): ` +
                    Tools.stringFormat.apply(this, additionalArguments)
            } else if ($.isNumeric(object) || $.type(object) === 'boolean')
                message = `${Tools.__name__} (${level}): ${object.toString()}`
            else {
                this.log(',--------------------------------------------,')
                this.log(object, force, true)
                this.log("'--------------------------------------------'")
            }
            if (message)
                if (!(context.hasOwnProperty(
                    'console'
                ) && context.console.hasOwnProperty(level)) || (
                    $.hasOwnProperty('noop') &&
                    context.console[level] === $.noop()
                )) {
                    if (context.hasOwnProperty('alert'))
                        context.alert(message)
                } else
                    context.console[level](message)
        }
        return this
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    info(object, ...additionalArguments) {
        return this.log.apply(this, [object, false, false, 'info'].concat(
            additionalArguments))
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    debug(object, ...additionalArguments) {
        return this.log.apply(this, [object, false, false, 'debug'].concat(
            additionalArguments))
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    error(object, ...additionalArguments) {
        return this.log.apply(this, [object, true, false, 'error'].concat(
            additionalArguments))
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    critical(object, ...additionalArguments) {
        return this.log.apply(this, [object, true, false, 'warn'].concat(
            additionalArguments))
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    warn(object, ...additionalArguments) {
        return this.log.apply(this, [object, false, false, 'warn'].concat(
            additionalArguments))
    }
    /**
     * Dumps a given object in a human readable format.
     * @param object - Any object to show.
     * @returns Returns the serialized version of given object.
     */
    static show(object) {
        let output = ''
        if ($.type(object) === 'string')
            output = object
        else
            $.each(object, (key, value) => {
                if (value === undefined)
                    value = 'undefined'
                else if (value === null)
                    value = 'null'
                output += "#{key.toString()}: #{value.toString()}\n"
            })
        if (!output)
            output = output.toString()
        return `${$.trim(output)}\n(Type: "${$.type(object)}")`
    }
    // / endregion
    // / region dom node
    /**
     * Normalizes class name order of current dom node.
     * @returns Returns current instance.
     */
    normalizeClassNames() {
        this.$domNode.find('*').addBack().each(() => {
            const $this = $(this)
            if ($this.attr('class')) {
                const sortedClassNames = $this.attr('class').split(' ').sort(
                ) || []
                $this.attr('class', '')
                for (const className of sortedClassNames)
                    $this.addClass(className)
            } else if ($this.is('[class]'))
                $this.removeAttr('class')
        })
        return this
    }
    /**
     * Checks weather given html or text strings are equal.
     * @param first - First html or text to compare.
     * @param second - Second html or text to compare.
     * @returns Returns true if both dom representations are equivalent.
     */
    static isEquivalentDom(first, second) {
        if (first === second)
            return true
        if (first) {
            if (second) {
                // NOTE: We have to distinguish between selector and markup.
                if (!(
                    ($.type(first) !== 'string' || first.charAt(0) === '<') &&
                    ($.type(second) !== 'string' || second.charAt(0) === '<')
                ))
                    return first === second
                let $firstDomNode = $(first)
                if ($firstDomNode.length) {
                    let $secondDomNode = $(second)
                    if ($secondDomNode.length) {
                        $firstDomNode = $firstDomNode.Tools(
                            'normalizeClassNames'
                        ).$domNode
                        $secondDomNode = $secondDomNode.Tools(
                            'normalizeClassNames'
                        ).$domNode
                        return $firstDomNode[0].isEqualNode(
                            $secondDomNode[0])
                    }
                    return false
                }
                return first === second
            }
            return false
        }
        return Boolean(second)
    }
    /**
     * Determines where current dom node is relative to current view port
     * position.
     * @param delta - Allows deltas for "top", "left", "bottom" and "right" for
     * determining positions.
     * @returns Returns one of "above", "left", "below", "right" or "in".
     */
    getPositionRelativeToViewport(delta = {}) {
        const delta = $.extend({top: 0, left: 0, bottom: 0, right: 0}, delta)
        if (context.hasOwnProperty('window')) {
            const $window = $(window)
            const rectangle = this.$domNode[0].getBoundingClientRect()
            if ((rectangle.top + delta.top) < 0)
                return 'above'
            if ((rectangle.left + delta.left) < 0)
                return 'left'
            if ($window.height() < (rectangle.bottom + delta.bottom))
                return 'below'
            if ($window.width() < (rectangle.right + delta.right))
                return 'right'
        }
        return 'in'
    }
    /**
     * Generates a directive name corresponding selector string.
     * @param directiveName The directive name.
     * @returns Returns generated selector.
     */
    generateDirectiveSelector(directiveName) {
        const delimitedName = Tools.stringCamelCaseToDelimited(directiveName)
        return `${delimitedName}, .${delimitedName}, [${delimitedName}], ` +
            `[data-${delimitedName}], [x-${delimitedName}]` + (
                (!delimitedName.includes('-') ? '' : (
                    `, [${delimitedName.replace(/-/g, '\\:')}], ` +
                    `[${delimitedName.replace(/-/g, '_')}]`)))
    }
    /**
     * Removes a directive name corresponding class or attribute.
     * @param directiveName The directive name.
     * @returns Returns current dom node.
     */
    removeDirective(directiveName) {
        const delimitedName = Tools.stringCamelCaseToDelimited(directiveName)
        return this.$domNode.removeClass(delimitedName).removeAttr(
            delimitedName
        ).removeAttr(`data-${delimitedName}`).removeAttr(
            `x-${delimitedName}`
        ).removeAttr(delimitedName.replace('-', ':')).removeAttr(
            delimitedName.replace('-', '_'))
    }
    /**
     * Determines a normalized camel case directive name representation.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding name
     */
    static getNormalizedDirectiveName(directiveName) {
        for (const delimiter of ['-', ':', '_']) {
            let prefixFound = false
            for (const prefix of [`data${delimiter}`, `x${delimiter}`])
                if (directiveName.startsWith(prefix)) {
                    directiveName = directiveName.substring(prefix.length)
                    prefixFound = true
                    break
                }
            if (prefixFound)
                break
        }
        for (const delimiter of ['-', ':', '_'])
            directiveName = Tools.stringDelimitedToCamelCase(
                directiveName, delimiter)
        return directiveName
    }
    /**
     * Determines a directive attribute value.
     * @param directiveName The directive name
     * @returns Returns the corresponding attribute value or "null" if no
     * attribute value exists.
     */
    getDirectiveValue(directiveName) {
        const delimitedName = Tools.stringCamelCaseToDelimited(directiveName)
        for (const attributeName of [
            delimitedName, `data-${delimitedName}`, `x-${delimitedName}`,
            delimitedName.replace('-', '\\:')
        ]) {
            const value = this.$domNode.attr(attributeName)
            if (value !== undefined)
                return value
        }
    }
    /**
     * Removes a selector prefix from a given selector. This methods searches
     * in the options object for a given "domNodeSelectorPrefix".
     * @param domNodeSelector The dom node selector to slice.
     * @returns Returns the sliced selector.
     */
    sliceDomNodeSelectorPrefix(domNodeSelector) {
        if (this._options.hasOwnProperty(
            'domNodeSelectorPrefix'
        ) && domNodeSelector.startsWith(this._options.domNodeSelectorPrefix))
            return $.trim(domNodeSelector.substring(
                this._options.domNodeSelectorPrefix.length))
        return domNodeSelector
    }
    /**
     * Determines the dom node name of a given dom node string.
     * @param domNodeSelector - A given to dom node selector to determine its
     * name.
     * @returns Returns the dom node name.
     *
     * **examples**
     * >>> $.Tools.getDomNodeName('&lt;div&gt;');
     * 'div'
     *
     * >>> $.Tools.getDomNodeName('&lt;div&gt;&lt;/div&gt;');
     * 'div'
     *
     * >>> $.Tools.getDomNodeName('&lt;br/&gt;');
     * 'br'
     */
    static getDomNodeName(domNodeSelector) {
        return domNodeSelector.match(new RegExp('^<?([a-zA-Z]+).*>?.*'))[1]
    }
    /**
     * Converts an object of dom selectors to an array of $ wrapped dom nodes.
     * Note if selector description as one of "class" or "id" as suffix element
     * will be ignored.
     * @param domNodeSelectors - An object with dom node selectors.
     * @param wrapperDomNode - A dom node to be the parent or wrapper of all
     * retrieved dom nodes.
     * @returns Returns all $ wrapped dom nodes corresponding to given
     * selectors.
     */
    grabDomNode(domNodeSelectors, wrapperDomNode) {
        const domNodes = {}
        if (domNodeSelectors)
            if (wrapperDomNode) {
                const $wrapperDomNode = $(wrapperDomNode)
                $.each(domNodeSelectors, (key, value) => {
                    domNodes[key] = wrapperDomNode.find(value)
                })
            } else
                $.each(domNodeSelectors, (key, value) => {
                    const match = value.match(', *')
                    if (match)
                        $.each(value.split(match[0]), (key, valuePart) => {
                            if (key)
                                value += ', ' + this._grabDomNodeHelper(
                                    key, valuePart, domNodeSelectors)
                            else
                                value = valuePart
                        })
                    domNodes[key] = $(this._grabDomNodeHelper(
                        key, value, domNodeSelectors))
                })
        if (this._options.domNodeSelectorPrefix)
            domNodes.parent = $(this._options.domNodeSelectorPrefix)
        if (context.hasOwnProperty('window'))
            domNodes.window = $(window)
        if (context.hasOwnProperty('document'))
            domNodes.document = $(context.document)
        return domNodes
    }
    // / endregion
    // / region scope
    /**
     * Overwrites all inherited variables from parent scope with "undefined".
     * @param scope - A scope where inherited names will be removed.
     * @param prefixesToIgnore - Name prefixes to ignore during deleting names
     * in given scope.
     * @returns The isolated scope.
     */
    static isolateScope(scope, prefixesToIgnore=['$', '_']) {
        for (const name in scope)
            if (!prefixesToIgnore.includes(name.charAt(0)) && ![
                'this', 'constructor'
            ].includes(name) && !scope.hasOwnProperty(name))
                /*
                    NOTE: Delete ("delete $scope[name]") doesn't destroy the
                    automatic lookup to parent scope.
                */
                scope[name] = undefined
        return scope
    }
    /**
     * Generates a unique function name needed for jsonp requests.
     * @param scope - A scope where the name should be unique.
     * @returns The function name.
     */
    static determineUniqueScopeName(prefix = 'callback', scope = context) {
        while (true) {
            const uniqueName = prefix + parseInt(Math.random() * Math.pow(
                10, 10))
            if (!scope.hasOwnProperty(uniqueName))
                break
        }
        return uniqueName
    }
    // / endregion
    // / region function
    /**
     * Methods given by this method has the plugin scope referenced with
     * "this". Otherwise "this" usually points to the object the given method
     * was attached to. If "method" doesn't match string arguments are passed
     * through "$.proxy()" with "context" setted as "scope" or "this" if
     * nothing is provided.
     * @param method - A method name of given scope.
     * @param scope - A given scope.
     * @returns Returns the given methods return value.
     */
    getMethod(method, scope = this, ...additionalArguments) {
        /*
            This following outcomment line would be responsible for a bug in
            yuicompressor. Because of declaration of arguments the parser
            things that arguments is a local variable and could be renamed. It
            doesn't care about that the magic arguments object is necessary to
            generate the arguments array in this context.

            var arguments = Tools.argumentsObjectToArray(arguments);

            use something like this instead:

            var parameter = Tools.argumentsObjectToArray(arguments);
        */
        const parameter = Tools.argumentsObjectToArray(arguments)
        if ($.type(method) === 'string' && $.type(scope) === 'object')
            return function() {
                if (!scope[method])
                    $.error(`Method "${method}" doesn't exists in "${scope}".`)
                thisFunction = arguments.callee
                parameter = $.Tools().argumentsObjectToArray(arguments)
                parameter.push(thisFunction)
                scope[method].apply(scope, parameter.concat(
                    additionalArguments))
            }
        parameter.unshift(scope)
        parameter.unshift(method)
        return $.proxy.apply($, parameter)
    }
    /**
     * Implements the identity function.
     * @param value - A value to return.
     * @returns Returns the given value.
     */
    static identity(value) {
        return value
    }
    /**
     * Inverted filter helper to inverse each given filter.
     * @param filter - A function that filters an array.
     * @returns The inverted filter.
     */
    static invertArrayFilter(filter) {
        return function(data) {
            if (data) {
                const filteredData = filter.apply(this, arguments)
                const result = []
                if (filteredData.length)
                    for (date in data)
                        if (!filteredData.includes(date))
                            result.push(date)
                else
                    result = data
                return result
            }
            return data
        }
    }
    // / endregion
    // / region event
    /**
     * Prevents event functions from triggering to often by defining a minimal
     * span between each function call. Additional arguments given to this
     * function will be forwarded to given event function call. The function
     * wrapper returns null if current function will be omitted due to
     * debounceing.
     * @param eventFunction - The function to call debounced.
     * @param thresholdInMilliseconds - The minimum time span between each
     * function call.
     * @returns Returns the wrapped method.
     */
    debounce(
        eventFunction, thresholdInMilliseconds = 600, ...additionalArguments
    ) {
        let lock = false
        let waitingCallArguments = null
        const self = this
        let timeoutID = null
        return function() {
            const parameter = self.argumentsObjectToArray(arguments)
            if (lock)
                waitingCallArguments = parameter.concat(
                    additionalArguments || [])
            else {
                lock = true
                timeoutID = setTimeout(() => {
                    lock = false
                    if (waitingCallArguments) {
                        eventFunction.apply(this, waitingCallArguments)
                        waitingCallArguments = null
                    }
                }, thresholdInMilliseconds)
                eventFunction.apply(this, parameter.concat(
                    additionalArguments || []))
            }
            return timeoutID
        }
    }
    /*
     * Searches for internal event handler methods and runs them by default. In
     * addition this method searches for a given event method by the options
     * object. Additional arguments are forwarded to respective event
     * functions.
     * @param eventName - An event name.
     * @param callOnlyOptionsMethod - Prevents from trying to call an internal
     * event handler.
     * @param scope - The scope from where the given event handler should be
     * called.
     * @returns - Returns "true" if an event handler was called and "false"
     * otherwise.
     */
    fireEvent(
        eventName, callOnlyOptionsMethod = false, scope = this,
        ...additionalArguments
    ) {
        if (!scope)
            scope = this
        eventHandlerName = `on${Tools.stringCapitalize(eventName)}`
        if (!callOnlyOptionsMethod)
            if (scope.hasOwnProperty(eventHandlerName))
                scope[eventHandlerName].apply(scope, additionalArguments)
            else if (scope.hasOwnProperty(`_${eventHandlerName}`))
                scope[`_${eventHandlerName}`].apply(
                    scope, additionalArguments)
        if (
            scope._options && scope._options.hasOwnProperty(eventHandlerName)
        ) {
            scope._options[eventHandlerName].apply(scope, additionalArguments)
            return true
        }
        return false
    }
    /**
     * A wrapper method for "$.on()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.on()".
     * @returns Returns $'s grabbed dom node.
     */
    on() {
        return this._bindHelper(arguments, false)
    }
    /**
     * A wrapper method fo "$.off()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.off()".
     * @returns Returns $'s grabbed dom node.
     */
    off() {
        return this._bindHelper(arguments, true, 'off')
    }
    // / endregion
    // / region object
    /**
     * Converts given plain object and all nested found objects to
     * corresponding map.
     * @param object - Object to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     * @returns Given object as map.
     */
    // TODO test
    static convertPlainObjectToMap<Value>(
        object:Value, deep:boolean = true
    ):Value|Mapping {
        if ($.type(object) === 'object' && Helper.isObject(object)) {
            const newObject:Mapping = new Map()
            for (const key:string in object)
                if (object.hasOwnProperty(key)) {
                    if (deep)
                        object[key] = Helper.convertPlainObjectToMap(
                            object[key], deep)
                    newObject.set(key, object[key])
                }
            return newObject
        }
        if (deep)
            if (Array.isArray(object)) {
                let index:number = 0
                for (const value:Object of object) {
                    object[index] = Helper.convertPlainObjectToMap(value, deep)
                    index += 1
                }
            } else if (object instanceof Map) {
                for (const [key:mixed, value:mixed] of object)
                    object.set(key, Helper.convertPlainObjectToMap(
                        value, deep))
            }
        return object
    }
    /**
     * Converts given map and all nested found maps objects to corresponding
     * object.
     * @param object - Map to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     * @returns Given map as object.
     */
    // TODO test
    static convertMapToPlainObject<Value>(
        object:Value, deep:boolean = true
    ):Value|Mapping {
        if (object instanceof Map) {
            const newObject:Mapping = {}
            for (let [key:any, value:mixed] of object) {
                if (deep)
                    value = Helper.convertMapToPlainObject(value, deep)
                newObject[`${key}`] = value
            }
            return newObject
        }
        if (deep)
            if ($.type(object) === 'object' && Helper.isObject(object)) {
                for (const key:string in object)
                    if (object.hasOwnProperty(key))
                        object[key] = Helper.convertMapToPlainObject(
                            object[key], deep)
            } else if (Array.isArray(object)) {
                let index:number = 0
                for (const value:mixed of object) {
                    object[index] = Helper.convertMapToPlainObject(value, deep)
                    index += 1
                }
            }
        return object
    }
    /**
     * Iterates given objects own properties in sorted fashion. For
     * each key value pair given iterator function will be called with
     * value and key as arguments.
     * @param object - Object to iterate.
     * @param iterator - Function to execute for each key value pair. Value
     * will be the first and key will be the second argument.
     * @param context - The "this" binding for given iterator function.
     * @returns List of given sorted keys.
     */
    static forEachSorted(object, iterator, context) {
        const keys = Tools.sort(object)
        for (key in keys)
            iterator.call(context, object[key], key)
        return keys
    }
    /**
     * Sort given objects keys.
     * @param object - Object which keys should be sorted.
     * @returns Sorted list of given keys.
     */
    static sort(object) {
        const isArray = $.isArray(object)
        const keys = []
        for (key in object)
            if (object.hasOwnProperty(key)) {
                if (isArray)
                    key = parseInt(key)
                if (object.hasOwnProperty(key))
                    keys.push(key)
            }
        return keys.sort()
    }
    /**
     * Returns true if given items are equal for given property list. If
     * property list isn't set all properties will be checked. All keys which
     * starts with one of the exception prefixes will be omitted.
     * @param firstValue - First object to compare.
     * @param econdValue - Second object to compare.
     * @param properties - Property names to check. Check all if "null" is
     * selected (default).
     * @param deep - Recursion depth negative values means infinitely deep
     * (default).
     * @param exceptionPrefixes - Property prefixes which indicates properties
     * to ignore.
     * @param ignoreFunctions - Indicates weather functions have to be
     * identical to interpret is as equal. If set to "true" two functions will
     * be assumed to be equal (default).
     * @returns "true" if both objects are equal and "false" otherwise.
     */
    static equals(
        firstValue, secondValue, properties = null, deep = -1,
        exceptionPrefixes = ['$', '_'], ignoreFunctions = true
    ) {
        if(
            ignoreFunctions && $.isFunction(firstValue) && $.isFunction(
                secondValue
            ) || firstValue === secondValue || Tools.numberIsNotANumber(
                firstValue
            ) && Tools.numberIsNotANumber(secondValue) ||
            firstValue instanceof RegExp &&
            secondValue instanceof RegExp &&
            firstValue.toString() === secondValue.toString() ||
            firstValue instanceof Date &&
            secondValue instanceof Date && (
                isNaN(firstValue.getTime()) &&
                isNaN(secondValue.getTime()) ||
                !isNaN(firstValue.getTime()) &&
                !isNaN(secondValue.getTime()) &&
                firstValue.getTime() === secondValue.getTime()
            )
        )
            return true
        if ($.isPlainObject(firstValue) && $.isPlainObject(
            secondValue
        ) && !(
            firstValue instanceof RegExp || secondValue instanceof RegExp
        ) || $.isArray(firstValue) && $.isArray(
            secondValue
        ) && firstValue.length === secondValue.length) {
            let equal = true
            let first
            let second
            for ([first, second] of [[firstValue, secondValue], [
                secondValue, firstValue
            ]]) {
                const firstIsArray = $.isArray(first)
                if (firstIsArray && (!$.isArray(
                    second
                )) || first.length !== second.length)
                    return false
                $.each(first, (key, value) => {
                    if (!firstIsArray) {
                        if (!equal || properties && !properties.includes(key))
                            return
                        for (const exceptionPrefix of exceptionPrefixes)
                            if (key.toString().startsWith(exceptionPrefix))
                                return
                    }
                    if (deep !== 0 && !Tools.equals(
                        value, second[key], properties, deep - 1,
                        exceptionPrefixes
                    ))
                        equal = false
                })
            }
            return equal
        }
        return false
    }
    // / endregion
    // / region array
    /**
     * Converts the interpreter given magic arguments object to a standard
     * array object.
     * @param argumentsObject - An argument object.
     * @returns Returns the array containing all elements in given arguments
     * object.
     */
    static argumentsObjectToArray(argumentsObject) {
        return Array.prototype.slice.call(argumentsObject)
    }
    /**
     * Makes all values in given iterable unique by removing duplicates (The
     * first occurrences will be left).
     * @param data - Array like object.
     * @returns Sliced version of given object.
     */
    static arrayUnique(data) {
        const result = []
        for (const value of data)
            if (!result.includes(value))
                result.push(value)
        return result
    }
    /**
     * Summarizes given property of given item list.
     * @param data - Array of objects with given property name.
     * @param propertyName - Property name to summarize.
     * @param defaultValue - Value to return if property values doesn't match.
     * @returns Summarized array.
     */
    static arrayAggregatePropertyIfEqual(
        data, propertyName, defaultValue = ''
    ) {
        let result = defaultValue
        if (data && data.length && data[0].hasOwnProperty(propertyName)) {
            result = data[0][propertyName]
            for (const item of data)
                if (item[propertyName] !== result)
                    return defaultValue
        }
        return result
    }
    /**
     * Deletes every item witch has only empty attributes for given property
     * names. If given property names are empty each attribute will be
     * considered. The empty string, "null" and "undefined" will be interpreted
     * as empty.
     * @param data - Data to filter.
     * @param propertyNames - Properties to consider.
     * @returns Given data without empty items.
     */
    static arrayDeleteEmptyItems(data, propertyNames = []) {
        if (!data)
            return data
        const result = []
        for (const item of data) {
            let empty = true
            for (const propertyName in item)
                if (item.hasOwnProperty(propertyName))
                    if (!['', null, undefined].includes(item[
                        propertyName
                    ]) && (!propertyNames.length || propertyNames.includes(
                        propertyName
                    ))) {
                        empty = false
                        break
                    }
            if (!empty)
                result.push(item)
        }
        return result
    }
    /**
     * Extracts all properties from all items wich occur in given property
     * names.
     * @param data - Data where each item should be sliced.
     * @param propertyNames - Property names to extract.
     * @returns Data with sliced items.
     */
    static arrayExtract(data, propertyNames) {
        for (const item of data)
            for (const attributeName in item)
                if (!propertyNames.includes(attributeName))
                    delete item[attributeName]
        return data
    }
    /**
     * Extracts all values which matches given regular expression.
     * @param data - Data to filter.
     * @param regularExpression - Pattern to match for.
     * @returns Filtered data.
     */
    static arrayExtractIfMatches(data, regularExpression) {
        const result = []
        $.each(data, (index, value) => {
            if ((new RegExp(regularExpression)).test(value))
                result.push(value)
        })
        return result
    }
    /**
     * Filters given data if given property is set or not.
     * @param data - Data to filter.
     * @param propertyName - Property name to check for existence.
     * @returns Given data without the items which doesn't have specified
     * property.
     */
    static arrayExtractIfPropertyExists(data, propertyName) {
        if (data && propertyName) {
            const result = []
            for (const item of data) {
                let exists = false
                for (const key in item)
                    if (key === propertyName && item.hasOwnProperty(key) && ![
                        undefined, null
                    ].includes(item[key])) {
                        exists = true
                        break
                    }
                if (exists)
                    result.push(item)
            }
            return result
        }
        return data
    }
    /**
     * Extract given data where specified property value matches given
     * patterns.
     * @param data - Data to filter.
     * @param propertyPattern - Mapping of property names to pattern.
     * @returns Filtered data.
     */
    static arrayExtractIfPropertyMatches(data, propertyPattern) {
        if (data && propertyPattern) {
            const result = []
            for (const item of data) {
                let matches = true
                for (const key in propertyPattern)
                    if (!(new RegExp(pattern)).test(item[key])) {
                        matches = false
                        break
                    }
                if (matches)
                    result.push(item)
            }
            return result
        }
        return data
    }
    /**
     * Determines all objects which exists in "firstSet" and in "secondSet".
     * Object key which will be compared are given by "keys". If an empty array
     * is given each key will be compared. If an object is given corresponding
     * initial data key will be mapped to referenced new data key.
     * @param firstSet - Referenced data to check for.
     * @param secondSet - Data to check for existence.
     * @param keys - Keys to define equality.
     * @param strict - The strict parameter indicates weather "null" and
     * "undefined" should be interpreted as equal (takes only effect if given
     * keys aren't empty).
     * @returns Data which does exit in given initial data.
     */
    static arrayIntersect(firstSet, secondSet, keys = [], strict = true) {
        const containingData = []
        for (const initialItem of firstSet) {
            if ($.isPlainObject(initialItem)) {
                let exists = false
                for (const newItem of secondSet) {
                    exists = true
                    const iterateGivenKeys = $.isPlainObject(
                        keys
                    ) || keys.length
                    if (!iterateGivenKeys)
                        keys = initialItem
                    $.each(keys, (firstSetKey, secondSetKey) => {
                        if ($.isArray(keys))
                            firstSetKey = secondSetKey
                        else if (!iterateGivenKeys)
                            secondSetKey = firstSetKey
                        if(
                            newItem[secondSetKey] !==
                            initialItem[firstSetKey] && (strict || !(
                                [null, undefined].includes(
                                    newItem[secondSetKey]
                                ) && [null, undefined].includes(
                                    initialItem[firstSetKey]
                                )))
                        ) {
                            exists = false
                            return false
                        }
                    })
                    if (exists)
                        break
                }
            } else
                exists = secondSet.includes(initialItem)
            if (exists)
                containingData.push(initialItem)
        }
        return containingData
    }
    /**
     * Creates a list of items within given range.
     * @param range - Array of lower and upper bounds. If only one value is
     * given lower bound will be assumed to be zero. Both integers have to be
     * positive and will be contained in the resulting array.
     * @param step - Space between two consecutive values.
     * @param returns Produced array of integers.
     */
    static arrayMakeRange(range, step=1) {
        let index
        if (range.length === 1) {
            index = 0
            higherBound = parseInt(range[0])
        } else if (range.length === 2) {
            index = parseInt(range[0])
            higherBound = parseInt(range[1])
        } else
            return range
        const result = [index]
        while (index <= higherBound - step) {
            index += step
            result.push(index)
        }
        return result
    }
    /**
     * Sums up given property of given item list.
     * @param data - The objects to with the given property to sum up.
     * @propertyNames - Property name to sum up its value.
     * @returns The aggregated value.
     */
    static arraySumUpProperty(data, propertyName) {
        let result = 0
        if ($.isArray(data) && data.length)
            for (const item of data)
                result += parseFloat(item[propertyName] || 0)
        return result
    }
    /**
     * Adds an item to another item as array connection (many to one).
     * @param item - Item where the item should be appended to.
     * @param target - Target to add to given item.
     * @param name - Name of the target connection.
     * @param checkIfExists - Indicates if duplicates are allowed in resulting
     * list (will result in linear runtime instead of constant one).
     * @returns Item with the appended target.
     */
    static arrayAppendAdd(item, target, name, checkIfExists = true) {
        if (item.hasOwnProperty(name))
            if (!(checkIfExists && item[name].includes(target)))
                item[name].push(target)
        else
            item[name] = [target]
        return item
    }
    /**
     * Removes given target on given list.
     * @param list - Array to splice.
     * @param target - Target to remove from given list.
     * @param strict - Indicates weather to fire an exception if given target
     * doesn't exists given list.
     * @returns Item with the appended target.
     */
    static arrayRemove(list, target, strict = false) {
        if ($.isArray(list) || strict) {
            index = list.indexOf(target)
            if (index === -1) {
                if (strict)
                    throw Error("Given target doesn't exists in given list.")
            } else
                list.splice(index, 1)
        }
        return list
    }
    // / endregion
    // / region string
    // // region url handling
    /**
     * This method is intended for encoding *key* or *value* parts of query
     * component. We need a custom method because "encodeURIComponent()" is too
     * aggressive and encodes stuff that doesn't have to be encoded per
     * "http://tools.ietf.org/html/rfc3986:"
     * @param url - URL to encode.
     * @param encodeSpaces - Indicates weather given url should encode
     * whitespaces as "+" or "%20".
     * @returns Encoded given url.
     */
    static stringEncodeURIComponent(url, encodeSpaces) {
        return encodeURIComponent(url).replace(/%40/gi, '@').replace(
            /%3A/gi, ':'
        ).replace(/%24/g, '$').replace(/%2C/gi, ',').replace(
            /%20/g, (encodeSpaces) ? '%20' : '+')
    }
    /**
     * Appends a path selector to the given path if there isn't one yet.
     * @param path - The path for appending a selector.
     * @param pathSeparator - The selector for appending to path.
     * @param returns - The appended path.
     */
    static stringAddSeparatorToPath(path, pathSeparator = '/') {
        const path = $.trim(path)
        if (path.substr(-1) !== pathSeparator && path.length)
            return path + pathSeparator
        return path
    }
    /**
     * Checks if given path has given path prefix.
     * @param prefix - Path prefix to search for.
     * @param path - Path to search in.
     * @param separator - Delimiter to use in path (default is the posix
     * conform slash).
     * @returns "true" if given prefix occur and "false" otherwise.
     */
    static stringHasPathPrefix(prefix = '/admin', path = context.hasOwnProperty(
        'location'
    ) && location.pathname || '', separator = '/') {
        if ([undefined, null].includes(prefix))
            return false
        if (!prefix.endsWith(separator))
            prefix += separator
        return path === prefix.substring(
            0, prefix.length - separator.length
        ) || path.startsWith(prefix)
    }
    /**
     * Extracts domain name from given url. If no explicit domain name given
     * current domain name will be assumed. If no parameter given current
     * domain name will be determined.
     * @param url - The url to extract domain from.
     * @param fallback - The fallback host name if no one exits in given url
     * (default is current hostname).
     * @returns Extracted domain.
     */
    static stringGetDomainName(
        url = context.hasOwnProperty('location') && location.href || '',
        fallback = context.hasOwnProperty(
            'location'
        ) && location.hostname || ''
    ) {
        result = /^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url)
        if (result && result.length > 2)
            return result[2]
        return fallback
    }
    /**
     * Extracts port number from given url. If no explicit port number given
     * and no fallback is defined current port number will be assumed for local
     * links. For external links 80 will be assumed for http protocol or 443
     * for https.
     * @param url - The url to extract port from.
     * @param fallback - Fallback port number if no explicit one was found.
     * Default is derived from current protocol name.
     * @param parameter - Additional parameter for checking if given url is an
     * internal url. Given url and this parameter will be forwarded to the
     * "stringIsInternalURL()" method.
     * @returns Extracted port number.
     */
    static stringGetPortNumber(
        url = context.hasOwnProperty('location') && location.href || '',
        fallback = null, parameter = []
    ) {
        const result = /^(?:[a-z]*:?\/\/[^/]+?)?(?:[^/]+?):([0-9]+)/i.exec(url)
        if (result && result.length > 1)
            return parseInt(result[1])
        if (fallback !== null)
            return fallback
        if (Tools.stringIsInternalURL.apply(
            this, [url].concat(parameter)
            ) && context.hasOwnProperty(
                'location'
            ) && location.port && parseInt(location.port)
        )
            return parseInt(location.port)
        return (Tools.stringGetProtocolName(url) === 'https') ? 443 : 80
    }
    /**
     * Extracts protocol name from given url. If no explicit url is given,
     * current protocol will be assumed. If no parameter given current protocol
     * number will be determined.
     * @param url - The url to extract protocol from.
     * @param fallback - Fallback port to use if no protocol exists in given
     * url (default is current protocol).
     * returns Extracted protocol.
     */
    static stringGetProtocolName(
        url = context.hasOwnProperty('location') && location.href || '',
        fallback = context.hasOwnProperty('location') &&
            location.protocol.substring(0, location.protocol.length - 1) || ''
    ) {
        const result = /^([a-z]+):\/\//i.exec(url)
        if (result.length > 1)
            return result[1]
        return fallback
    }
    /**
     * Read a page's GET URL variables and return them as an associative array
     * and preserves ordering.
     * @param keyToGet - If key given the corresponding value is returned and
     * full object otherwise.
     * @param input - An alternative input to the url search parameter. If "#"
     * is given the complete current hash tag will be interpreted as url and
     * search parameter will be extracted from there. If "&" is given classical
     * search parameter and hash parameter will be taken in account. If a
     * search string is given this will be analyzed. The default is to take
     * given search part into account.
     * @param subDelimiter - Defines which sequence indicates the start of
     * parameter in a hash part of the url.
     * @param hashedPathIndicator - If defined and given hash starts with this
     * indicator given hash will be interpreted as path containing search and
     * hash parts.
     * @param search - Search part to take into account defaults to current url
     * search part.
     * @param hash - Hash part to take into account defaults to current url
     * hash part.
     * @returns Returns the current get array or requested value. If requested
     * key doesn't exist "undefined" is returned.
     */
    static stringGetURLVariable(
        keyToGet, input, subDelimiter = '$', hashedPathIndicator = '!', search,
        hash = context.hasOwnProperty('location') && location.hash || ''
    ) {
        // region set search and hash
        if (!search) {
            if (!hash)
                hash = '#'
            hash = hash.substring('#'.length)
            if (hashedPathIndicator && hash.startsWith(hashedPathIndicator)) {
                const subHashStartIndex = hash.indexOf('#')
                let pathAndSearch
                if (subHashStartIndex === -1) {
                    pathAndSearch = hash.substring(hashedPathIndicator.length)
                    hash = ''
                } else {
                    pathAndSearch = hash.substring(
                        hashedPathIndicator.length, subHashStartIndex)
                    hash = hash.substring(subHashStartIndex)
                }
                subSearchStartIndex = pathAndSearch.indexOf('?')
                if (subSearchStartIndex === -1)
                    search = ''
                else
                    search = pathAndSearch.substring(subSearchStartIndex)
            } else if (context.hasOwnProperty('location'))
                search = location.search || ''
        }
        if (!input)
            input = search
        // endregion
        // region determine data from search and hash if specified
        const both = input === '&'
        if (both || input === '#') {
            const decodedHash = decodeURIComponent(hash)
            subDelimiterIndex = decodedHash.indexOf(subDelimiter)
            if (subDelimiterIndex === -1)
                input = ''
            else {
                input = decodedHash.substring(subDelimiterIndex)
                if (input.startsWith(subDelimiter))
                    input = input.substring(subDelimiter.length)
            }
        } else if (input.startsWith('?'))
            input = input.substring('?'.length)
        let data = (input) ? input.split('&') : []
        search = search.substring('?'.length)
        if (both && search)
            data = data.concat(search.split('&'))
        // endregion
        // region construct data structure
        const variables = []
        $.each(data, (key, value) => {
            const keyValuePair = value.split('=')
            key = decodeURIComponent(keyValuePair[0])
            value = decodeURIComponent(keyValuePair[1])
            variables.push(key)
            variables[key] = value
        })
        // endregion
        if (keyToGet)
            return variables[keyToGet]
        return variables
    }
    /**
     * Checks if given url points to another domain than second given url. If
     * no second given url provided current url will be assumed.
     * @param firstURL - URL to check against second url.
     * @param secondURL - URL to check against first url.
     * @returns Returns "true" if given first url has same domain as given
     * second (or current).
     */
    static stringIsInternalURL(firstURL, secondURL = context.hasOwnProperty(
        'location'
    ) && location.href || '') {
        const explicitDomainName = Tools.stringGetDomainName(firstURL, false)
        const explicitProtocolName = Tools.stringGetProtocolName(
            firstURL, false)
        const explicitPortNumber = Tools.stringGetPortNumber(firstURL, false)
        return (
            !explicitDomainName ||
            explicitDomainName === Tools.stringGetDomainName(secondURL)
        ) && (
            !explicitProtocolName ||
            explicitProtocolName === Tools.stringGetProtocolName(secondURL)
        ) &&d (
            !explicitPortNumber ||
            explicitPortNumber === Tools.stringGetPortNumber(secondURL))
    }
    /**
     * Normalized given website url.
     * @param url - Uniform resource locator to normalize.
     * @returns Normalized result.
     */
    static stringNormalizeURL(url) {
        if (url) {
            url = $.trim(url.replace(/^:?\/+/, '').replace(/\/+$/, ''))
            if (url.startsWith('http'))
                return url
            return `http://${url}`
        }
        return ''
    }
    /**
     * Represents given website url.
     * @param url - Uniform resource locator to represent.
     * @returns Represented result.
     */
    static stringRepresentURL(url) {
        if (url)
            return $.trim(url.replace(/^(https?)?:?\/+/, '').replace(
                /\/+$/, ''))
        return ''
    }
    // // endregion
    /**
     * Converts a camel cased string to its delimited string version.
     * @param string - The string to format.
     * @param delimiter - Delimiter string
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     * @returns The formatted string.
     */
    static stringCamelCaseToDelimited(
        string, delimiter = '-', abbreviations = null
    ) {
        if ([null, undefined].includes(abbreviations))
            abbreviations = Tools.abbreviations
        const escapedDelimiter = Tools.stringGetRegularExpressionValidated(
            delimiter)
        if (abbreviations.length) {
            let abbreviationPattern = ''
            for (const abbreviation of abbreviations) {
                if (abbreviationPattern)
                    abbreviationPattern += '|'
                abbreviationPattern += abbreviation.toUpperCase()
            }
            string = string.replace(new RegExp(
                `(${abbreviationPattern})(${abbreviationPattern})`, 'g'
            ), `$1${delimiter}$2`)
        }
        string = string.replace(new RegExp(
            `([^${escapedDelimiter}])([A-Z][a-z]+)`, 'g'
        ), `$1${delimiter}$2`)
        return string.replace(
            new RegExp('([a-z0-9])([A-Z])', 'g'), `$1${delimiter}$2`
        ).toLowerCase()
    }
    /**
     * Converts a string to its capitalize representation.
     * @param string - The string to format.
     * @returns The formatted string.
     */
    static stringCapitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1)
    }
    /**
     * Converts a delimited string to its camel case representation.
     * @param string - The string to format.
     * @param delimiter - Delimiter string
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     * @param preserveWrongFormattedAbbreviations - If set to "True" wrong
     * formatted camel case abbreviations will be ignored.
     * @returns The formatted string.
     */
    static stringDelimitedToCamelCase(
        string, delimiter = '-', abbreviations = null,
        preserveWrongFormattedAbbreviations = false
    ) {
        const escapedDelimiter = Tools.stringGetRegularExpressionValidated(
            delimiter)
        if ([null, undefined].includes(abbreviations))
            abbreviations = Tools.abbreviations
        let abbreviationPattern
        if (preserveWrongFormattedAbbreviations)
            abbreviationPattern = abbreviations.join('|')
        else {
            abbreviationPattern = ''
            for (const abbreviation of abbreviations) {
                if (abbreviationPattern)
                    abbreviationPattern += '|'
                abbreviationPattern +=
                    `${Tools.stringCapitalize(abbreviation)}|${abbreviation}`
            }
        }
        let stringStartsWithDelimiter = false
        if (string.startsWith(delimiter)) {
            string = string.substring(delimiter.length)
            stringStartsWithDelimiter = true
        }
        string = string.replace(new RegExp(
            `(${escapedDelimiter})(${abbreviationPattern})` +
            `(${escapedDelimiter}|$)`, 'g'
        ), (fullMatch, before, abbreviation, after) => {
            if (fullMatch)
                return before + abbreviation.toUpperCase() + after
            return fullMatch
        })
        string = string.replace(new RegExp(
            `${escapedDelimiter}([a-zA-Z0-9])`, 'g'
        ), (fullMatch, firstLetter) => {
            if (fullMatch)
                return firstLetter.toUpperCase()
            return fullMatch
        })
        if (stringStartsWithDelimiter)
            string = delimiter + string
        return string
    }
    /**
     * Performs a string formation. Replaces every placeholder "{i}" with the
     * i'th argument.
     * @param string - The string to format.
     * @param additionalArguments - Additional arguments are interpreted as
     * replacements for string formating.
     * @returns The formatted string.
     */
    static stringFormat(string, ...additionalArguments) {
        additionalArguments.unshift(string)
        $.each(additionalArguments, (key, value) => {
            string = string.replace(new RegExp(`\\{${key}\\}`, 'gm'), value)
        })
        return string
    }
    /**
     * Validates the current string for using in a regular expression pattern.
     * Special regular expression chars will be escaped.
     * @param string - The string to format.
     * @returns The formatted string.
     */
    static stringGetRegularExpressionValidated(string) {
        return string.replace(/([\\|.*$^+[\]()?\-{}])/g, '\\$1')
    }
    /**
     * Converts a string to its lower case representation.
     * @param string - The string to format.
     * @returns The formatted string.
     */
    static stringLowerCase(string) {
        return string.charAt(0).toLowerCase() + string.substring(1)
    }
    /**
     * Wraps given mark strings in given target with given marker.
     * @param target - String to search for marker.
     * @param mark - String to search in target for.
     * @param marker - HTML template string to mark.
     * @param caseSensitive - Indicates weather case takes a role during
     * searching.
     * @returns Processed result.
     */
    static stringMark(
        target, mark, marker = '<span class="tools-mark">{1}</span>',
        caseSensitiv = false
    ) {
        target = $.trim(target)
        mark = $.trim(mark)
        if (target && mark) {
            let offset = 0
            let searchTarget = target
            if (!caseSensitiv)
                searchTarget = searchTarget.toLowerCase()
            if (!caseSensitiv)
                mark = mark.toLowerCase()
            while (true) {
                const index = searchTarget.indexOf(mark, offset)
                if (index === -1)
                    break
                else {
                    target = target.substring(0, index) + Tools.stringFormat(
                        marker, target.substr(index, mark.length)
                    ) + target.substring(index + mark.length)
                    if (!caseSensitiv)
                        searchTarget = target.toLowerCase()
                    offset = index + (
                        marker.length - '{1}'.length
                    ) + mark.length
                }
            }
        }
        return target
    }
    /**
     * Implements the md5 hash algorithm.
     * @param value - Value to calculate md5 hash for.
     * @returns Calculated md5 hash value.
     */
    static stringMD5(value) {
        const rotateLeft = (lValue, iShiftBits) =>
            (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))

        const addUnsigned = (lX, lY) => {
            const lX8 = (lX & 0x80000000)
            const lY8 = (lY & 0x80000000)
            const lX4 = (lX & 0x40000000)
            const lY4 = (lY & 0x40000000)
            const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
            if (lX4 & lY4)
                return lResult ^ 0x80000000 ^ lX8 ^ lY8
            if (lX4 | lY4) {
                if (lResult & 0x40000000)
                    return lResult ^ 0xC0000000 ^ lX8 ^ lY8
                return lResult ^ 0x40000000 ^ lX8 ^ lY8
            }
            return lResult ^ lX8 ^ lY8
        }

        const _F = (x, y, z) => (x & y) | ((~x) & z)
        const _G = (x, y, z) => (x & z) | (y & (~z))
        const _H = (x, y, z) => x ^ y ^ z
        const _I = (x, y, z) => y ^ (x | (~z))

        const _FF = (a, b, c, d, x, s, ac) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac))
            return addUnsigned(rotateLeft(a, s), b)
        }

        const _GG = (a, b, c, d, x, s, ac) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac))
            return addUnsigned(rotateLeft(a, s), b)
        }

        const _HH = (a, b, c, d, x, s, ac) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac))
            return addUnsigned(rotateLeft(a, s), b)
        }

        const _II = (a, b, c, d, x, s, ac) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac))
            return addUnsigned(rotateLeft(a, s), b)
        }

        convertToWordArray = (value) => {
            const lMessageLength = value.length
            const lNumberOfWords_temp1 = lMessageLength + 8
            const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (
                lNumberOfWords_temp1 % 64
            )) / 64
            const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
            let lWordArray = [lNumberOfWords - 1]
            let lBytePosition = 0
            let lByteCount = 0
            let lWordCount
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4
                lBytePosition = (lByteCount % 4) * 8
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (
                    value.charCodeAt(lByteCount) << lBytePosition))
                lByteCount += 1
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4
            lBytePosition = (lByteCount % 4) * 8
            lWordArray[lWordCount] = lWordArray[lWordCount] | (
                0x80 << lBytePosition)
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
            return lWordArray
        }

        const wordToHex = (lValue) => {
            let wordToHexValue = ''
            let wordToHexValueTemp = ''
            let lCount = 0
            while (lCount <= 3) {
                const lByte = (lValue >>> (lCount * 8)) & 255
                wordToHexValueTemp = `0${lByte.toString(16)}`
                wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(
                    wordToHexValueTemp.length - 2, 2)
                lCount += 1
            }
            return wordToHexValue
        }

        let x = []
        const S11 = 7
        const S12 = 12
        const S13 = 17
        const S14 = 22
        const S21 = 5
        const S22 = 9
        const S23 = 14
        const S24 = 20
        const S31 = 4
        const S32 = 11
        const S33 = 16
        const S34 = 23
        const S41 = 6
        const S42 = 10
        const S43 = 15
        const S44 = 21

        x = convertToWordArray(value)
        let a = 0x67452301
        let b = 0xEFCDAB89
        let c = 0x98BADCFE
        let d = 0x10325476

        let k = 0
        while (k < x.length) {
            const AA = a
            const BB = b
            const CC = c
            const DD = d
            a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
            d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
            c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
            b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
            a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
            d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
            c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
            b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
            a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
            d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
            c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
            b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
            a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
            d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
            c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
            b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
            a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
            d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
            c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
            b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
            a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
            d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453)
            c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
            b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
            a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
            d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
            c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
            b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
            a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
            d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
            c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
            b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
            a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
            d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
            c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
            b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
            a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
            d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
            c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
            b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
            a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
            d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
            c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
            b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
            a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
            d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
            c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
            b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
            a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244)
            d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
            c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
            b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
            a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
            d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
            c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
            b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
            a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
            d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
            c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314)
            b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
            a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
            d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
            c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
            b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
            a = addUnsigned(a, AA)
            b = addUnsigned(b, BB)
            c = addUnsigned(c, CC)
            d = addUnsigned(d, DD)
            k += 16
        }
        return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(
            d
        )).toLowerCase()
    }
    /**
     * Normalizes given phone number for automatic dialing mechanisms.
     * @param phoneNumber - Number to normalize.
     * @returns Normalized number.
     */
    static stringNormalizePhoneNumber(phoneNumber) {
        if (honeNumber)
            return `${phoneNumber}`.replace(/[^0-9]*\+/, '00').replace(
                /[^0-9]+/g, '')
        return ''
    }
    /**
     * Represents given phone number. NOTE: Currently only support german phone
     * numbers.
     * @param phoneNumber - Number to format.
     * @returns Formatted number.
     */
    static stringRepresentPhoneNumber(phoneNumber) {
        if ($.type(phoneNumber === 'string') && phoneNumber) {
            // Represent country code and leading area code zero.
            phoneNumber = phoneNumber.replace(
                /^(00|\+)([0-9]+)-([0-9-]+)$/, '+$2 (0) $3')
            // Add German country code if not exists.
            phoneNumber = phoneNumber.replace(
                /^0([1-9][0-9-]+)$/, '+49 (0) $1')
            // Separate area code from base number.
            phoneNumber = phoneNumber.replace(/^([^-]+)-([0-9-]+)$/, '$1 / $2')
            // Partition base number in one triple and tuples or tuples only.
            return $.trim(phoneNumber.replace(
                /^(.*?)([0-9]+)(-?[0-9]*)$/, (
                    match, prefix, number, suffix
                ) => prefix + $.trim(
                    (number.length % 2 === 0) ? number.replace(
                        /([0-9]{2})/g, '$1 '
                    ) : number.replace(
                        /^([0-9]{3})([0-9]+)$/, (match, triple, rest) =>
                            `${triple} ` + $.trim(rest.replace(
                                /([0-9]{2})/g, '$1 '))
                    ) + suffix)))
        }
        return ''
    }
    /**
     * Decodes all html symbols in text nodes in given html string.
     * @param htmlString - HTML string to decode.
     * @returns Decoded html string.
     */
    static stringDecodeHTMLEntities(htmlString) {
        if (context.hasOwnProperty('document')) {
            const textareaDomNode = context.document.createElement('textarea')
            textareaDomNode.innerHTML = htmlString
            return textareaDomNode.value
        }
        return null
    }
    // / endregion
    // / region number
    /**
     * Checks if given object is java scripts native "Number.NaN" object.
     * @param object - Object to Check.
     * @returns Returns weather given value is not a number or not.
     */
    static numberIsNotANumber(object) {
        return $.type(object) === 'number' && isNaN(object)
    }
    /**
     * Rounds a given number accurate to given number of digits.
     * @param number - The number to round.
     * @param digits - The number of digits after comma.
     * @returns Returns the rounded number.
     */
    static numberRound(number, digits = 0) {
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
    }
    // / endregion
    // / region data transfer
    /**
     * Send given data to a given iframe.
     * @param target - Name of the target iframe or the target iframe itself.
     * @param url - URL to send to data to.
     * @param data - Data holding object to send data to.
     * @param requestType - The forms action attribute value. If nothing is
     * provided "post" will be used as default.
     * @param removeAfterLoad - Indicates if created iframe should be removed
     * right after load event. Only works if an iframe object is given instead
     * of a simple target name.
     * @returns Returns the given target.
     */
    static sendToIFrame(
        target, url, data, requestType = 'post', removeAfterLoad = false
    ) {
        const $formDomNode = $('<form>').attr({
            action: url,
            method: requestType,
            target: $.type(target) === 'string' ? target : target.attr('name')
        })
        for (name in data)
            if (data.hasOwnProperty(name))
                $formDomNode.append($('<input>').attr({
                    type: 'hidden',
                    name: name,
                    value: value
                }))
        $formDomNode.submit().remove()
        if (removeAfterLoad && 'on' in target)
            target.on('load', () => target.remove())
        return target
    }
    /**
     * Send given data to a temporary created iframe.
     * @param url - URL to send to data to.
     * @param data - Data holding object to send data to.
     * @param requestType - The forms action attribute value. If nothing is
     * provided "post" will be used as default.
     * @param removeAfterLoad - Indicates if created iframe should be removed
     * right after load event.
     * @returns Returns the dynamically created iframe.
     */
    sendToExternalURL(
        url, data, requestType = 'post', removeAfterLoad = true
    ) {
        const iFrameDomNode = $('<iframe>').attr('name', Tools.__name__.charAt(
            0
        ).toLowerCase() + Tools.__name__.substring(1) + (new Date).getTime(
        )).hide()
        this.$domNode.after($iFrameDomNode)
        return Tools.sendToIFrame(
            iFrameDomNode, url, data, requestType, removeAfterLoad)
    }
    // / endregion
    // endregion
    // region protected
    /**
     * Helper method for attach event handler methods and their event handler
     * remove pendants.
     * @param parameter - Arguments object given to methods like "bind()" or
     * "unbind()".
     * @param removeEvent - Indicates if "unbind()" or "bind()" was given.
     * @param eventFunctionName - Name of function to wrap.
     * @returns Returns $'s wrapped dom node.
     */
    _bindHelper(
        parameter, removeEvent = false, eventFunctionName = 'on'
    ) {
        const $domNode = $(parameter[0])
        if ($.type(parameter[1]) === 'object' && !removeEvent) {
            $.each(parameter[1], (eventType, handler) =>
                this[eventFunctionName]($domNode, eventType, handler))
            return $domNode
        }
        parameter = Tools.argumentsObjectToArray(parameter).slice(1)
        if (parameter.length === 0)
            parameter.push('')
        if (!parameter[0].includes('.'))
            parameter[0] += `.${Tools.__name__}`
        if (removeEvent)
            return $domNode[eventFunctionName].apply($domNode, parameter)
        return $domNode[eventFunctionName].apply($domNode, parameter)
    }
    /**
     * Converts a dom selector to a prefixed dom selector string.
     * @param key - Current element in options array to grab.
     * @param selector - A dom node selector.
     * @param domNodeSelectors - An object with dom node selectors.
     * @returns Returns given selector prefixed.
     */
    _grabDomNodeHelper(key, selector, domNodeSelectors) {
        const domNodeSelectorPrefix = ''
        if (this._options.domNodeSelectorPrefix)
            domNodeSelectorPrefix = `${this._options.domNodeSelectorPrefix} `
        if (!(selector.startsWith(domNodeSelectorPrefix) || $.trim(
            selector
        ).startsWith('<'))) {
            domNodeSelectors[key] = domNodeSelectorPrefix + selector
            return $.trim(domNodeSelectors[key])
        }
        return $.trim(selector)
    }
    // endregion
}
// endregion
// region handle $ extending
if ($.hasOwnProperty('fn'))
    $.fn.Tools = function() {
        return (new Tools()).controller(Tools, arguments, this)
    }
$.Tools = function() {
    return (new Tools()).controller(Tools, arguments)
}
$.Tools.class = Tools
// / region prop fix for comments and text nodes
if ($.hasOwnProperty('fn')) {
    const nativePropFunction = $.fn.prop
    /**
     * JQuery's native prop implementation ignores properties for text nodes,
     * comments and attribute nodes.
     */
    $.fn.prop = function(key, value) {
        if (arguments.length < 3 && this.length && [
            '#text', '#comment'
        ].includes(this[0].nodeName) && this[0].hasOwnProperty(key)) {
            if (arguments.length === 1)
                return this[0][key]
            if (arguments.length === 2) {
                this[0][key] = value
                return this
            }
        }
        nativePropFunction.apply(this, arguments)
    }
}
// / endregion
// endregion
export default $.Tools
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
