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

jQuery-tools
============

This plugin provides such interface logic like generic controller
logic for integrating plugins into jQuery, mutual exclusion for
depending gui elements, logging additional string, array or function
handling. A set of helper functions to parse option objects dom trees
or handle events is also provided.

Inhalt
======

<!--Place for automatic generated table of contents.-->
[TOC]

Examples (in javaScript):
-------------------------

TODO adapt js version.

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
                return computedValue;
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
var exampleInstance = jQuery('#domNode').Example({'firstOption': 'value'...});
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
dom node reference. This plugin pattern gives their instance back. Direct
initializing the plugin without providing a dom node is also provided.

    #!/usr/bin/env coffee

    class Example extends $.Tools.class
        __name__: 'Example'
        _options: {...}
        initialize: (options={}) ->
            # "this.$domNode" points to jQuery's wrapped dom node
            # (if provided).
            # "this" points to this "Example" instance extended by "Tools".
            # Merges given options with default options recursively.
            super options
        method: (anArgument) ->
            ...
            returnValue
        ...
    $.fn.Example = -> $.Tools().controller Example, arguments, this
    $.Example = -> $.Tools().controller Example, arguments

Initialisation with given dom node:

```coffee
exampleInstance = $('#domNode').Example firstOption: 'value'...
$domNode = exampleInstance.$domNode
```

Function call from previous generated instance:

```coffee
returnValue = $('#domNode').Example 'method', 'anArgument'
```

Initialisation without given dom node and function call:

```coffee
exampleInstance = $.Example firstOption: 'value'...
exampleInstance.method 'anArgument'
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
            super(options).$domNode
        method: (anArgument) ->
            ...
            this.$domNode
        ...
    $.fn.Example = -> $.controller Example, arguments, this

Initialisation:

```coffee
$domNode = jQuery('#domNode').Example firstOption: 'value'...
```

Function call from same instance:

```coffee
$domNode = jQuery('#domNode').Example 'staticMethod', 'anArgument'
```

Use as extension for default functional orientated jQuery plugin pattern
using composition, dom node reference and chaining support.

    #!/usr/bin/env coffee

    $ = this.jQuery
    defaultOptions = {...}
    tools = $.Tools
    example = (options={}) ->
        # "this" points to dom node grabbed by jQuery.
        $.extend true, defaultOptions, options
        tools.log 'initialized.'
        ...
    $.fn.example = ->
        if methods[method]
            methods[method].apply(
                this, Array.prototype.slice.call arguments, 1)
        else if $.type(method) is 'object' or not method
            methods.init.apply this, arguments
        else
            $.error "Method \"#{method}\" does not exist on $.example."

Function call:

```coffee
domNode = $('#domNode').example firstOption: 'value'...
```
