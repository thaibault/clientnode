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

This plugin provides such interface logic like generic controller
logic for integrating plugins into jQuery, mutual exclusion for
depending gui elements, logging additional string, array or function
handling. A set of helper functions to parse option objects dom trees
or handle events is also provided.

Examples (in javaScript):
-------------------------

Direct access of a method in "Tools".

```javaScript
var tools = jQuery.Tools({'logging': true});
tools.log('test');
```

Use as extension for object orientated jQuery plugin using inheritance and
dom node reference. This plugin pattern gives their instance back.

    #!/usr/bin/env javaScript

    (function(jQuery) {
        var Example = function(domNode) {
            this.__name__ = 'Example';
            this._domNode = domNode;
            this._options = {...};
            this.initialize = function(options) {
                // "this._domNode" points to jQuery's wrapped dom node.
                // "this" points to this "Examples" instance extended by
                // "Tools".
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
            return self._controller.apply(self, arguments);
        };
    }).call(this, this.jQuery);

Initialisation:

```javaScript
var examplesInstance = jQuery('#domNode').Example({'firstOption': 'value'...});
```

Static function call:

```javaScript
var returnValue = jQuery('#domNode').Example('staticMethod', 'anArgument');
```

Use as extension for object orientated jQuery plugin using inheritance, dom
node reference and chaining support.

    #!/usr/bin/env javaScript

    (function(jQuery) {
        var Example = function(domNode) {
            this.__name__ = 'Example';
            this._domNode = domNode;
            this._options = {...};
            this.initialize = function(options) {
                // "this._domNode" points to jQuery's wrapped dom node.
                // "this" points to this "Examples" instance extended by
                // "Tools".
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
            return self._controller.apply(self, arguments);
        };
    }).call(this, this.jQuery);

Initialisation:

```javaScript
var domNode = jQuery('#domNode').Example({'firstOption': 'value'...});
```

Static function call:

```javaScript
var returnValue = jQuery('#domNode').Example('staticMethod', 'anArgument');
```

Use as extension for object orientated jQuery plugin using inheritance.

    #!/usr/bin/env javaScript

    (function(jQuery) {
        var Example = function() {
            this.__name__ = 'Example';
            this._options = {...};
            this.initialize = function(options) {
                // "this" points to this "Examples" instance extended by
                // "Tools".
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
            var self = jQuery.Tools()._extend(new Example);
            return self._controller.apply(self, arguments);
        };
    }).call(this, this.jQuery);

Initialisation:

```javaScript
var exampleInstance = jQuery.Example({'firstOption': 'value'...});
```

Static function call:

```javaScript
var returnValue = jQuery.Example('staticMethod', 'anArgument');
```

Use as extension for default functional orientated jQuery plugin pattern
using composition, dom node reference and chaining support.

    #!/usr/bin/env javaScript

    (function(jQuery) {
        var options = {...};
        var tools = jQuery.Tools();
        var example = function(options) {
            // "this" points to dom node grabbed by jQuery.
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
                $.error(
                    'Method ' + method + ' does not exist on ' +
                    'jQuery.example');
        };
    }).call(this, this.jQuery);

Function call:

```javaScript
var domNode = jQuery('#domNode').example({'firstOption': 'value'...});
```

Examples (in coffeeScript):
---------------------------

Direct access of a method in "Tools".

```coffee
tools = jQuery.Tools logging: true
tools.log test
```

Use as extension for object orientated jQuery plugin using inheritance and
dom node reference. This plugin pattern gives their instance back.

    #!/usr/bin/env coffee

    class Example extends jQuery.Tools.class
        __name__: 'Example'
        _options: {...}
        initialize: (options={}) ->
            # "this._domNode" points to jQuery's wrapped dom node.
            # "this" points to this "Examples" instance extended by "Tools".
            super options
        staticMethod: (anArgument) ->
            ...
            this
        ...
    jQuery.fn.Example = ->
        self = new Example this
        self._controller.apply self, arguments

Initialisation:

```coffee
examplesInstance = jQuery('#domNode').Example firstOption: 'value'...
```

Static function call:

```coffee
returnValue = jQuery('#domNode').Example 'staticMethod', 'anArgument'
```

Use as extension for object orientated jQuery plugin using inheritance, dom
node reference and chaining support.

    #!/usr/bin/env coffee

    class Example extends jQuery.Tools.class
        __name__: 'Example'
        _options: {...}
        initialize: (options={}) ->
            # "this._domNode" points to jQuery's wrapped dom node.
            # "this" points to this "Examples" instance extended by "Tools".
            super(options)._domNode
        staticMethod: (anArgument) ->
            ...
            this._domNode
        ...
    jQuery.fn.Example = ->
        self = new Example this
        self._controller.apply self, arguments

Initialisation:

```coffee
domNode = jQuery('#domNode').Example firstOption: 'value'...
```

Static function call:

```coffee
returnValue = jQuery('#domNode').Example 'staticMethod', 'anArgument'
```

Use as extension for object orientated jQuery plugin using inheritance.

    #!/usr/bin/env coffee

    class Example extends jQuery.Tools.class
        __name__: 'Example'
        _options: {...}
        initialize: (options={}) ->
            # "this" points to this "Examples" instance extended by "Tools".
            super options
        staticMethod: (anArgument) ->
            ...
            this
        ...
    jQuery.Example = ->
        self = new Example
        self._controller.apply self, arguments

Initialisation:

```coffee
exampleInstance = jQuery.Example firstOption: 'value'...
```

Static function call:

```coffee
returnValue = jQuery.Example 'staticMethod', 'anArgument'
```

Use as extension for default functional orientated jQuery plugin pattern
using composition, dom node reference and chaining support.

    #!/usr/bin/env coffee

    jQuery = this.jQuery
    defaultOptions = {...}
    tools = jQuery.Tools
    example = (options={}) ->
        # "this" points to dom node grabbed by jQuery.
        jQuery.extend true, defaultOptions, options
        tools.log 'initialized.'
        ...
    jQuery.fn.example = ->
        if methods[method]
            methods[method].apply(
                this, Array.prototype.slice.call arguments, 1)
        else if jQuery.type(method) is 'object' or not method
            methods.init.apply this, arguments
        else
            $.error "Method \"#{method}\" does not exist on jQuery.example."

Function call:

```coffee
domNode = jQuery('#domNode').example firstOption: 'value'...
```
