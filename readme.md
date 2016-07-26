<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*- -->

<!-- region header

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

endregion -->

<!--|deDE:Einsatz-->
Use case
--------

The main goal of This plugin is providing an generic interface logic like
controller for calling instance methods or getting property values of an object
orientated designed plugin. A set of reusable logic elements for building gui
components is integrated as well.
<!--deDE:
    Hauptziel dieses Plugins ist es einen generischen Weg zu bieten indem
    Objekt Orientierte Plugins verfasst werden können, ohne dabei gegen
    jQuery's Vorgaben an Plugins zu verstoßen.
    Desweiteren werden einige wiederverwendbare Logikbausteine zum Bau
    verschiedener GUI-Komponenten mitgeliefert.
-->

<!--|deDE:Inhalt-->
Content
-------

<!--Place for automatic generated table of contents.-->
[TOC]

<!--|deDE:Merkmale-->
Features
--------

<ul>
    <li>
        Mutual exclusion support through locking management
        <!--deDE:Wechselseitiger Ausschluss durch Lock-Management-->
    </li>
    <li>
        Cross browser logging with different log levels
        <!--deDE:
            Browserübergreifender Log-Mechanismen mit diversen Log-Levels
        -->
    </li>
    <li>
        Extending native JavaScript types like strings, arrays or functions
        <!--deDE:
            Erweiterung der Standard-JavaScript-Typen wie Strings, Arrays und
            Funktionen
        -->
    </li>
    <li>
        A set of helper functions to parse option objects
        <!--deDE:Hilfsfunktionen um Options-Objekte intelligent zu parsen-->
    </li>
    <li>
        Extended dom tree handling.<!--deDE:Erweitertes DOM-Baum-Management-->
    </li>
    <li>
        Plugin scoped event handling
        <!--deDE:Plugineigene Namensräume für Events-->
    </li>
    <li>
        Generic none-redundant plugin pattern for JavaScript and CoffeeScript
        <!--deDE:Generischer Plugin-Muster für JavaScript und CoffeeScript-->
    </li>
</ul>

<!--|deDE:Einstieg-->
Quick start
-----------

Easy access of a method in "$.Tools":
<!--deDE:Einfacher Aufruf einer Methode aus "$.Tools":-->

    #!JavaScript

    var tools = $.Tools({'logging': true});
    tools.log('test');

<!--|deDE:Plugin-Vorlage-->
Plugin pattern
--------------

Use as extension for object orientated, node and browser compatible jQuery
plugin using inheritance and dom node as return value reference. This plugin
pattern gives their instance back if no dom node is provided. Direct
initializing the plugin without providing a dom node is also provided.
<!--deDE:
    Einsatz von "$.Tools" um Objekt orientierte, node und Browser kompatible
    jQuery Plugins zu verfassen, indem von "$.Tools" geerbt wird und der durch
    jQuery erweiterte DOM-Knoten als return-Wert referenziert wird. Sollte kein
    DOM-Knoten an die $-Funktion übergeben worden sein, gibt dieser Pattern
    seine Instanz zurück.
-->

    #!JavaScript

    // !/usr/bin/env node
    // -*- coding: utf-8 -*-
    /** @module jQuery-incrementer */
    'use strict';
    import $ from 'jquery'
    import 'jQuery-tools'
    const context:Object = (():Object => {
        if ($.type(window) === 'undefined') {
            if ($.type(global) === 'undefined')
                return ($.type(module) === 'undefined') ? {} : module
            return global
        }
        return window
    })()
    if (!context.hasOwnProperty('document') && $.hasOwnProperty('context'))
        context.document = $.context
    /**
     * This plugin holds all needed methods to extend input fields to select
     * numbers very smart.
     * @extends jQuery-tools:Tools
     * @property static:_name - Defines this class name to allow retrieving them
     * after name mangling.
     * @property _options - Options extended by the options given to the
     * initializer method.
     */
    class Example extends $.Tools.class {
        static _name = 'Example';
        /* eslint-disable jsdoc/require-description-complete-sentence */
        /**
         * Initializes the plugin. Later needed dom nodes are grabbed.
         * @param options - An options object.
         * @returns Returns $'s extended current dom node.
         */
        initialize(options = {}) {
        /* eslint-enable jsdoc/require-description-complete-sentence */
            this._options = {/*Default options here*/}
            super.initialize(options)
            return this.$domNode
        }
    }
    $.fn.Example = function() {
        return $.Tools().controller(Example, arguments, this)
    }
    /** The jQuery-example plugin class. */
    export default Example

Initialisation with given dom node and without:
<!--deDE:Aufruf mit und ohne übergebenen DOM-Knoten:-->

    #!JavaScript

    const $domNode = $('#domNode').Example({firstOption: 'value'});
    const exampleInstance = $.Example({firstOption: 'value'});

Function call from previous generated instance via dom node or instance
reference:
<!--deDE:
    Aufruf einer Plugin-Method anhand der zuvor generierten Instanzreferenz
    bzw. über den zurückgegebene DOM-Knoten:
-->

    #!JavaScript

    const returnValue = $('#domNode').Example('method', 'anArgument');
    const returnValue = $('#domNode').Example().method('anArgument');
    const exampleInstance = $.Example({firstOption: 'value'});
    const returnValue = exampleInstance.method('anArgument');

<!-- region modline
vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:
endregion -->
