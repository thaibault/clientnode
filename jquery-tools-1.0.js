/// require

// region header

/*!
    jQuery plugin for "jquery-1.8.3".

    Copyright see require on https://github.com/thaibault/require

    Conventions see require on https://github.com/thaibault/require

    @author t.sickert@gmail.com (Torben Sickert)
    @version 1.0 stable
    @requires require-1.0+
              jquery-1.9.1+
    @fileOverview
    This module provides common resuable logic for every jquery non trivial
    plugin.
*/

/**
    @name jQuery
    @see www.jquery.com
*/
/// standalone (function(jQuery) {
this.require([['jQuery', 'jquery-1.9.1']], function(jQuery) {

// endregion

// region plugins

    /**
        Provides such interface logic like generic controller logic, mutual
        exclusion for depending gui elements or logging.

        @memberOf jQuery
        @class

        @example

// Direct access of a method in "Tools".

var tools = jQuery.Tools({'logging': true});
tools.log('test');

-------------------------------------------------------------------------------

// Use as extension for object orientated jquery plugin using inheritance and
// dom node reference. This plugin pattern gives their instance back.

(function(jQuery) {
    var Example = function(domNode) {
        this._options = {...};
        this.initialize = function(options) {
            // "domNode" points to jQuery's wrapped dom node.
            // "this" points to this "Examples" instance extended by "Tools".
            if (options)
                jQuery.extend(true, this._options, options);
            ...
            return this;
        };
        this.staticMethod = function(anArgument) {
            ...
            return this;
        };
        ...
    };
    jQuery.fn.Example = function() {
        var self = jQuery.Tools()._extend(new Example(this));
        self.__name__ = 'Example';
        return self._controller.apply(self, arguments);
    };
}).call(this, this.jQuery);

// Initialisation:
var examplesInstance = jQuery('#domNode').Example({'firstOption': 'value'...});
// Static function call:
var returnValue = jQuery('#domNode').Example('staticMethod', 'anArgument');

-------------------------------------------------------------------------------

// Use as extension for object orientated jquery plugin using inheritance,
// dom node reference and chaining support.

(function(jQuery) {
    var Example = function(domNode) {
        this._options = {...};
        this.initialize = function(options) {
            // "domNode" points to jQuery's wrapped dom node.
            // "this" points to this "Examples" instance extended by "Tools".
            if (options)
                jQuery.extend(true, this._options, options);
            ...
            return domNode;
        };
        this.staticMethod = function(anArgument) {
            ...
            return domNode;
        };
        ...
    };
    jQuery.fn.Example = function() {
        var self = jQuery.Tools()._extend(new Example(this));
        self.__name__ = 'Example';
        return self._controller.apply(self, arguments);
    };
}).call(this, this.jQuery);

// Initialisation:
var domNode = jQuery('#domNode').Example({'firstOption': 'value'...});
// Static function call:
var returnValue = jQuery('#domNode').Example('staticMethod', 'anArgument');

-------------------------------------------------------------------------------

// Use as extension for object orientated jquery plugin using inheritance.

(function(jQuery) {
    var Example = function() {
        this._options = {...};
        this.initialize = function(options) {
            // "this" points to this "Examples" instance extended by "Tools".
            if (options)
                jQuery.extend(true, this._options, options);
            ...
            return this;
        };
        this.staticMethod = function(anArgument) {
            ...
            return this;
        };
        ...
    };
    jQuery.Example = function() {
        var self = jQuery.Tools()._extend(new Example());
        self.__name__ = 'Example';
        return self._controller.apply(self, arguments);
    };
}).call(this, this.jQuery);

// Initialisation:
var exampleInstance = jQuery.Example({'firstOption': 'value'...});
// Static function call:
var returnValue = jQuery.Example('staticMethod', 'anArgument');

-------------------------------------------------------------------------------

// Use as extension for default functional orientated jquery plugin pattern
// using composition, dom node reference and chaining support.

(function(jQuery) {
    var options = {...};
    var tools = jQuery.Tools();
    var example = function(options) {
        // "this" points to dom node graped by jQuery.
        if (options)
            jQuery.extend(true, this._options, options);
        tools.log('initialized.');
        ...
    };
    jQuery.fn.example = function() {
        if (methods[method])
            return methods[method].apply(
                this, Array.prototype.slice.call(arguments, 1));
        else if (jQuery.type(method) === 'object' || !method)
            return methods.init.apply(this, arguments);
        else
            $.error('Method ' + method + ' does not exist on jQuery.example');
    };
}).call(this, this.jQuery);

// Function call:
var domNode = jQuery('#domNode').example({'firstOption': 'value'...});
    */
    var Tools = function() {

    // region protected properties

        /**
            Saves default options for manipulating the default behaviour.

            @property {Object}
        */
        this._options = {
            'logging': false,
            'domNodeSelectorPrefix': 'body'};
        /**
            Used for internal mutual exclusion in critical areas. To prevent
            race conditions. Represents a map with critical area description
            and queues saving all functions waiting for unlocking their
            mapped critical area.

            @property {Object}
        */
        this._mutex = {};

    // endregion

    // region public methods

        /**
            @description This method should be overwritten normally.

            @param {Object} options An options object.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this.initialize = function(options) {
            if (options)
                jQuery.extend(true, this._options, options);
            return this;
        };
        /**
            @description This method could be overwritten normally.
                         It acts like a destructor.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this.destruct = function() {
            this.unbind('*');
            return this;
        };

        // region mutual exclusion

        /**
            @description Calling this method introduces a starting point for a
                         critical area with potential race conditions.
                         The area will be binded to this string. So don't use
                         same names for different areas.

            @param {String} description A short string describing the criticial
                                        areas properties.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this.lock = function(description) {
            var self = this;
            this.checkLock(description, function() {
                self._mutex[description] = new Array();
            }, true);
            return this;
        };
        /**
            @description Calling this method the given critical area will be
                         finished and all functions given to "this.checkLock()"
                         will be executed in right order.

            @param {String} description A short string describing the criticial
                                        areas properties.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this.unlock = function(description) {
            while (jQuery.isArray(this._mutex[description]) &&
                   this._mutex[description].length)
                this._mutex[description].shift()();
            this._mutex[description] = undefined;
            return this;
        };
        /**
            @description Takes a procedure given by a function which only
                         should executed if the given critical area isn't
                         present. If the interpreter is in the critical area
                         the procedure will be saved and executed if the
                         critical area is finished by calling "this.unlock()"
                         method.

            @param {String} description A short string describing the criticial
                                        areas properties.
            @param {Function} callbackFunction A procedure which should only be
                                               executed if the interpreter
                                               isn't in the given critical
                                               area.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this.checkLock = function(description, callbackFunction, noEnqueue) {
            if (this._mutex[description] === undefined)
                callbackFunction();
            else if (!noEnqueue)
                this._mutex[description].push(callbackFunction);
            return this;
        };

        // endregion

        // region language fixes

        /**
            @description This method fixes an ugly javascript bug.
                         If you add a mouseout event listener to a dom node
                         the given handler will be called each time any dom
                         node inside the observed dom node triggers a mouseout
                         event. This methods guarantees that the given event
                         handler is only called if the observed dom node was
                         leaved.

            @param {Function} eventHandler The mouse out event handler.

            @returns {Function} Returns the given function wrapped by the
                                workaround logic.
        */
        this.mouseOutEventHandlerFix = function(eventHandler) {
            var self = this;
            return function(event) {
                var relatedTarget = event.toElement;
                if (event.relatedTarget)
                    relatedTarget = event.relatedTarget;
                while (relatedTarget && relatedTarget.tagName != 'BODY') {
                    if (relatedTarget === this)
                        return;
                    relatedTarget = relatedTarget.parentNode;
                }
                eventHandler.apply(self, arguments);
            };
        };

        // endregion

        /**
            @description Read a page's GET URL variables and return them as an
                         associative array.

            @param {String} key A get array key. If given only the
                                corresponding value is returned and full array
                                otherwise.

            @returns {Mixed} Returns the current get array or requested value.
                                     If requested key doesn't exist "undefined"
                                     is returned.
        */
        this.getUrlVariables = function(key) {
            var variables = new Array();
            jQuery.each(window.location.href.slice(
                window.location.href.indexOf('?') + 1
            ).split('&'), function(key, value) {
                variables.push(value.split('=')[0]);
                variables[value.split('=')[0]] = value.split('=')[1];
            });
            if (jQuery.type(key) === 'string')
                if (key in variables)
                    return variables[key];
                else
                    return undefined;
            return variables;
        };
        /**
            @description Dumps a given object in a human readable format.

            @param {Object} object Any type.

            @returns {String} Returns the searialized object.
        */
        this.show = function(object) {
            var output = '';
            if (jQuery.type(object) === 'string')
                output = object;
            else
                jQuery.each(object, function(key, value) {
                    output += key.toString() + ': ' + value.toString() +
                              '\n';
                });
            return jQuery.trim((output) ? output : object.toString()) +
                this.stringFormat('\n(Type: "{1}")', jQuery.type(object));
        };
        /**
            @description Removes a selector prefix from a given selector.
                         This methods searches in the options object for a
                         given "domNodeSelectorPrefix".

            @param {String} domNodeSelector The dom node selector to slice.

            @return {String} Returns the silced selector.
        */
        this.sliceDomNodeSelectorPrefix = function(domNodeSelector) {
            if (this._options && this._options.domNodeSelectorPrefix &&
                domNodeSelector.substring(
                    0, this._options.domNodeSelectorPrefix.length
                ) === this._options.domNodeSelectorPrefix)
                return jQuery.trim(domNodeSelector.substring(
                    this._options.domNodeSelectorPrefix.length));
            return domNodeSelector;
        };
        /**
            @description Determines the dom node name of a given dom node
                         string.

            @param {String} domNode A given to dom node selector to determine
                            its name.

            @returns {String}

            @example
jQuery.Tools.getDomNodeName('&lt;div&gt;');
'div'

jQuery.Tools.getDomNodeName('&lt;div&gt;&lt;/div&gt;');
'div'

jQuery.Tools.getDomNodeName('&lt;br/&gt;');
'br'
        */
        this.getDomNodeName = function(domNode) {
            return domNode.match(new RegExp('^<?([a-zA-Z]+).*>?.*'))[1];
        };
        /**
            @description Shows the given object's representation in the
                         browsers console if possible or in a standalone
                         alert-window as fallback.

            @param {Mixed} object Any type to show.
            @param {Boolean} force If set to "true" given input will be shown
                                   independly from current logging
                                   configuration.
            @param {Boolean} noModuleAnnotation If set to "true" given input
                                                has no module specified
                                                annotation.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this.log = function(object, force, noModuleAnnotation) {
            if (this._options.logging || force) {
                if (noModuleAnnotation)
                    var message = object;
                else if (jQuery.type(object) === 'string')
                    var message = (
                        this.__name__ + ': ' + this.stringFormat.apply(
                            this, arguments));
                else if (jQuery.isNumeric(object))
                    var message = this.__name__ + ': ' + object;
                else {
                    this.log(',--------------------------------------------,');
                    this.log(object, force, true);
                    this.log("'--------------------------------------------'");
                }
                if (message)
                    if (window.console && window.console.log)
                        window.console.log(message);
                    else
                        window.alert(message);
            }
            return this;
        };
        /**
            @description Converts an object of dom selectors to an array of
                         jQuery wrapped dom nodes. Note if selector
                         description as one of "class" or "id" as suffix
                         element will be ignored.

            @param {Object} domNodeSelectors An object with dom node selectors.

            @returns {Object} Returns all jQuery wrapped dom nodes
                              corressponding to given selectors.
        */
        this.grapDomNodes = function(domNodeSelectors) {
            var domNodes = {};
            var self = this;
            jQuery.each(domNodeSelectors, function(key, value) {
                if (key.substring(key.length - 2) !== 'Id' &&
                    key.substring(key.length - 5) !== 'Class') {
                    var match = value.match(', *');
                    if (match)
                        jQuery.each(
                            value.split(match[0]), function(key, valuePart) {
                            if (key)
                                value += ', ' + self._grapDomNodesHelper(
                                    key, valuePart, domNodeSelectors);
                            else
                                value = valuePart;
                        });
                    value = self._grapDomNodesHelper(
                        key, value, domNodeSelectors);
                }
                domNodes[key] = jQuery(value);
            });
            if (this._options && this._options.domNodeSelectorPrefix)
                domNodes.parent = jQuery(this._options.domNodeSelectorPrefix);
            domNodes.window = jQuery(window);
            return domNodes;
        };
        /**
            @description Methods given by this method has the plugin scope
                         referenced with "this". Otherwise "this" usualy
                         points to the object the given method was attached to.
                         If "method" doesn't match string arguments are passed
                         through "jquery.proxy()" with "context" setted as
                         "scope" or "this" if nothing is provided.

            @param {String|Function|Object} method A method name of given
                                                   scope.
            @param {Object|String} scope A given scope.

            @returns {Mixed} Returns the given methods return value.
        */
        this.getMethod = function(method, scope) {
            var self = (scope) ? scope : this;
            /*
                This following outcomment line would be responsible for a
                bug in yuicompressor.
                Because of declaration of arguments the parser things that
                arguments is a local variable and could be renamed.
                It doesn't care about that the magic arguments object is
                neccessary to generate the arguments array in this context.

                var arguments = this.argumentsObjectToArray(arguments);
            */
            var parameter = this.argumentsObjectToArray(arguments);
            if (jQuery.type(method) === 'string' &&
                jQuery.type(self) === 'object') {
                var additionalArguments = parameter.slice(2);
                return function() {
                    if (!self[method])
                        throw jQuery.Tools().stringFormat(
                            'Method "{1}" doesn\'t exists in "{2}".', method,
                            self);
                    var thisFunction = arguments.callee;
                    parameter = jQuery.Tools().argumentsObjectToArray(
                        arguments);
                    parameter.push(thisFunction);
                    return self[method].apply(self, parameter.concat(
                        additionalArguments));
                };
            }
            parameter.unshift(self);
            parameter.unshift(method);
            return jQuery.proxy.apply(jQuery, parameter);
        };
        /**
            @description A wrapper method for "jQuery.bind()".
                         It sets current plugin name as event scope if no scope
                         is given. Given arguments are modified and passed
                         through "jquery.bind()".

            @returns {jQuery} Returns jQuery's graped dom node.
        */
        this.bind = function() {
            return this._bindHelper(arguments);
        };
        /**
            @description A wrapper method fo "jQuery.unbind()".
                         It sets current plugin name as event scope if no scope
                         is given. Given arguments are modified and passed
                         through "jquery.unbind()".

            @returns {jQuery} Returns jQuery's graped dom node.
        */
        this.unbind = function() {
            return this._bindHelper(arguments, true);
        };
        /**
            @description Converts a given argument object to an array.

            @param {Object} argumentsObject The arguments object to convert.

            @returns {Object[]} Returns the given arguments as array.
        */
        this.argumentsObjectToArray = function(argumentsObject) {
            return Array.prototype.slice.call(argumentsObject);
        };
        /**
            @description Searches for internal event handler methods and runs
                         them by default. In addition this method searches for
                         a given event method by the options object.

            @param {String} eventName An event name.
            @param {Boolean} callOnlyOptionsMethod Prevents from trying to
                                                   call an internal event
                                                   handler.
            @param {Object} scope The scope from where the given event handler
                                  should be called.

            @returns {Boolean} Returns "true" if an event handler was called
                               and "false" otherwise.
        */
        this.fireEvent = function(eventName, callOnlyOptionsMethod, scope) {
            var self = (scope) ? scope : this;
            var eventHandlerName = 'on' +
                eventName.substr(0, 1).toUpperCase() + eventName.substr(1);
            /*
                This following outcomment line would be responsible for a bug
                in yuicompressor.
                Because of declaration of arguments the parser things that
                arguments is a local variable and could be renamed.
                It doesn't care about that the magic arguments object is
                neccessary to generate the arguments array in this context.

                var arguments = this.argumentsObjectToArray(arguments);
            */
            var parameter = this.argumentsObjectToArray(arguments);
            var additionalArguments = parameter.slice(3);
            if (!callOnlyOptionsMethod)
                if (self[eventHandlerName])
                    self[eventHandlerName].apply(self, additionalArguments);
                else if (self['_' + eventHandlerName])
                    self['_' + eventHandlerName].apply(
                        self, additionalArguments);
            if (self._options && self._options[eventHandlerName]) {
                self._options[eventHandlerName].apply(
                    self, additionalArguments);
                return true;
            }
            return false;
        };
        /**
            @description Rounds a given number accurate to given number of
                         digits.

            @param {Float} number The number to round.
            @param {Integer} digits The number of digits after comma.

            @returns {Float} Returns the rounded number.
        */
        this.round = function(number, digits) {
            if (!digits)
                digits = 0;
            return Math.round(number * Math.pow(10, digits)) /
                Math.pow(10, digits);
        };
        /**
            @description Performs a string formation. Replaces every
                         placeholder "{i}" with the i'th argument.

            @param {String} string The string to format.

            @returns {String} The formatted string.
        */
        this.stringFormat = function(string) {
            jQuery.each(arguments, function(key, value) {
                string = string.replace(new RegExp(
                    '\\{' + key + '\\}', 'gm'), value);
            });
            return string;
        };
        /**
            @description Converts a camel case string to a string with given
                         delimiter between each camel case seperation.

            @param {String} string The string to format.
            @param {String} delimiter The string tu put between each camel case
                                      seperation.

            @returns {String} The formatted string.
        */
        this.camelCaseStringToDelimited = function(string, delimiter) {
            if (delimiter === undefined)
                delimiter = '-';
            return string.replace(new RegExp('(.)([A-Z])', 'g'), function() {
                return arguments[1] + delimiter + arguments[2];
            }).toLowerCase();
        };
        /**
            @description Appends a path selector to the given path if there
                         isn't one yet.

            @param {String} path The path for appending a selector.
            @param {String} pathSeperator The selector for appending to path.

            @returns {String} The appended path.
        */
        this.addSeperatorToPath = function(path, pathSeperator) {
            path = jQuery.trim(path);
            if (path.substr(-1) !== pathSeperator && path.length)
                return path + pathSeperator;
            return path;
        };

    // endregion

    // region protected methods

        /**
            @description Helper method for "bind()" and "unbind()".

            @param {Object} bindArguments Arguments object given to "bind()" or
                                          "unbind()".
            @param {Boolean} unbind Indicates if "unbind()" or "bind()" was
                                    given.

            @returns {jQuery} Returns jQuery's graped dom node.
        */
        this._bindHelper = function(bindArguments, unbind) {
            var jQueryObject = jQuery(bindArguments[0]);
            if (jQuery.type(bindArguments[1]) === 'object' && !unbind) {
                var self = this;
                jQuery.each(bindArguments[1], function(eventType, handler) {
                    self.bind(jQueryObject, eventType, handler);
                });
                return jQueryObject;
            }
            bindArguments = this.argumentsObjectToArray(
                bindArguments
            ).slice(1);
            if (bindArguments.length === 0)
                bindArguments.push('');
            if (bindArguments[0].indexOf('.') === -1)
                bindArguments[0] += '.' + this.__name__;
            if (unbind)
                return jQueryObject.unbind.apply(
                    jQueryObject, bindArguments);
            return jQueryObject.bind.apply(jQueryObject, bindArguments);
        };
        /**
            @description Extends a given object with the tools attributes.

            @param {Object} childAttributs The attributes from child.

            @returns {jQuery.Tools} Returns the current instance.
        */
        this._extend = function(childAttributes) {
            if (childAttributes)
                jQuery.extend(true, this, childAttributes);
            return this;
        };
        /**
            @description Defines a generic controller for jQuery plugings.

            @param {Function | Object} attribute A called method from outside
                                                 via the controller.
                                                 Default value is "initialize".
                                                 If the initializer is called
                                                 implicit an options object is
                                                 expected.

            @returns {Mixed} Returns the result of called method.

            @example

// Call a plugins method.

jQuery('body').InheritedFromTools(options).method();

// Call the initializer.

jQuery('div#id').InheritedFromTools(options);
        */
        this._controller = function(attribute) {
            /*
                This following outcomment line would be responsible for a bug
                in yuicompressor.
                Because of declaration of arguments the parser things that
                arguments is a local variable and could be renamed.
                It doesn't care about that the magic arguments object is
                neccessary to generate the arguments array in this context.

                var arguments = this.argumentsObjectToArray(arguments);
            */
            var parameter = this.argumentsObjectToArray(arguments);
            if (this[attribute])
                return this[attribute].apply(this, parameter.slice(1));
            /*
                If an options object or no method name is given the
                initializer will be called.
            */
            else if (jQuery.type(attribute) === 'object' || !attribute)
                return this.initialize.apply(this, parameter);
            return jQuery.error(
                'Method "' + attribute + '" does not exist on ' +
                'jQuery-extension "' + this.__name__ + '".');
        };
        /**
            @description Converts a dom selector to a prefixed dom selector
                         string.

            @param {Integer} key Current element in options array to grap.
            @param {String} selector A dom node selector.
            @param {Object} domNodeSelectors An object with dom node selectors.

            @returns {Object}
        */
        this._grapDomNodesHelper = function(key, selector, domNodeSelectors) {
            var domNodeSelectorPrefix = 'body';
            if (this._options && this._options.domNodeSelectorPrefix)
                domNodeSelectorPrefix = this._options.domNodeSelectorPrefix;
            if (selector.substr(0, domNodeSelectorPrefix.length) !==
                    domNodeSelectorPrefix)
                return domNodeSelectors[key] = domNodeSelectorPrefix + ' ' +
                    selector;
            return selector;
        };

    // endregion

    };

    /** @ignore */
    jQuery.Tools = function() {
        var self = new Tools();
        self.__name__ = 'Tools';
        return self._controller.apply(self, arguments);
    };

// endregion

/// standalone }).call(this, this.jQuery);
});
