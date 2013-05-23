<!-- region modline

vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:

endregion

region header

Copyright Torben Sickert 16.12.2012

License
   This library written by Torben Sickert stand under a creative commons
   naming 3.0 unported license.
   see http://creativecommons.org/licenses/by/3.0/deed.de

endregion -->

jquery-tools
============

Provides mutual exclusion, generic interface controller, object orientated
design through the original jquery pattern and selector scoping.

Usage

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
    })(window.jQuery);

    // Initialisation:
    var examplesInstance = jQuery('#domNode').Example({'firstOption': 'value'...});
    // Static function call:
    var exampleInstance = jQuery('#domNode').Example('staticMethod', 'anArgument');

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
    })(window.jQuery);

    // Initialisation:
    var domNode = jQuery('#domNode').Example({'firstOption': 'value'...});
    // Static function call:
    var domNode = jQuery('#domNode').Example('staticMethod', 'anArgument');

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
    })(window.jQuery);

    // Initialisation:
    var exampleInstance = jQuery.Example({'firstOption': 'value'...});
    // Static function call:
    var exampleInstance = jQuery.Example('staticMethod', 'anArgument');

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
    })(window.jQuery);

    // Function call:
    var domNode = jQuery('#domNode').example({'firstOption': 'value'...});
