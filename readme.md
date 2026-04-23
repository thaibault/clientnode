<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. See https://creativecommons.org/licenses/by/3.0/deed.de
endregion -->

Project status
--------------

[![npm](https://img.shields.io/npm/v/clientnode?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d&style=for-the-badge)](https://www.npmjs.com/package/clientnode)
[![npm downloads](https://img.shields.io/npm/dy/clientnode.svg?style=for-the-badge)](https://www.npmjs.com/package/clientnode)

[![build](https://img.shields.io/github/actions/workflow/status/thaibault/clientnode/build.yaml?style=for-the-badge)](https://github.com/thaibault/clientnode/actions/workflows/build.yaml)
[![build push package](https://img.shields.io/github/actions/workflow/status/thaibault/clientnode/build-package-and-push.yaml?label=build%20push%20package&style=for-the-badge)](https://github.com/thaibault/clientnode/actions/workflows/build-package-and-push.yaml)

[![check types](https://img.shields.io/github/actions/workflow/status/thaibault/clientnode/check-types.yaml?label=Check%20types&style=for-the-badge)](https://github.com/thaibault/clientnode/actions/workflows/check-types.yaml)
[![lint](https://img.shields.io/github/actions/workflow/status/thaibault/clientnode/lint.yaml?label=lint&style=for-the-badge)](https://github.com/thaibault/clientnode/actions/workflows/lint.yaml)
[![test](https://img.shields.io/github/actions/workflow/status/thaibault/clientnode/test-coverage-report.yaml?label=test&style=for-the-badge)](https://github.com/thaibault/clientnode/actions/workflows/test-coverage-report.yaml)

[![code coverage](https://img.shields.io/coverallsCoverage/github/thaibault/clientnode?label=code%20coverage&style=for-the-badge)](https://coveralls.io/github/thaibault/clientnode)

[![deploy web documentation](https://img.shields.io/github/actions/workflow/status/thaibault/clientnode/deploy-web-documentation.yaml?label=deploy%20web%20documentation&style=for-the-badge)](https://github.com/thaibault/clientnode/actions/workflows/deploy-web-documentation.yaml)
[![web documentation](https://img.shields.io/website-up-down-green-red/https/torben.website/clientnode.svg?label=web-documentation&style=for-the-badge)](https://torben.website/clientnode)

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=for-the-badge&logo=codesandbox)](https://githubbox.com/thaibault/clientnode)

<!--|deDE:Einsatz-->
Use case
--------

Simple generic (web and node compatible) utility library.
<!--deDE:
    Einfache generische (Web- und Node-kompatible) Hilfsbibliothek.
-->

<!--Place for automatic generated table of contents.-->
<div class="doc-toc" style="display:none">
    <!--|deDE:Inhalt-->
    <h2 id="content">Content</h2>
</div>

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
        Plugin scoped event handling.
        <!--deDE:Plugineigene Namensräume für Events.-->
    </li>
    <li>
        Generic none-redundant plugin pattern for JavaScript and CoffeeScript
        <!--deDE:Generischer Plugin-Muster für JavaScript und CoffeeScript-->
    </li>
</ul>

<!--|deDE:Installation-->
Installation
------------

<!--|deDE:Klassische Dom-Integration-->
### Classical dom injection

You can simply download the compiled version as zip file here and inject it
after needed dependencies:
<!--deDE:
    Du kannst einfach das Plugin als Zip-Archiv herunterladen und per
    Script-Tag in deine Webseite integrieren:
-->

```HTML
<!--Inject downloaded file:
<script src="index.js"></script>
-->
<!--Or integrate via cdn:-->
<script
    src="https://torben.website/clientnode/data/distributionBundle/index.js"
></script>
```

The compiled bundle supports AMD, commonjs, commonjs2 and variable injection
into given context (UMD) as export format: You can use a module bundler if you
want.
<!--deDE:
    Das kompilierte Bundle unterstützt AMD, commonjs, commonjs2 und
    Variable-Injection in den gegebenen Context (UMD) als Export-Format:
    Dadurch können verschiedene Module-Bundler genutzt werden.
-->

<!--|deDE:Paket-Management und Modul-Komposition-->
### Package managed and module bundled

If you are using npm as package manager you can simply add this tool to your
**package.json** as dependency:
<!--deDE:
    Nutzt du npm als Paket-Manager, dann solltest du einfach deine
    <strong>package.json</strong> erweitern:
-->

```JSON
...
"dependencies": {
    ...
    "clientnode": "latest",
    ...
},
...
```

After updating your packages you can simply depend on this script and let
a module bundler do the hard stuff or access it via an exported variable name
in given context.
<!--deDE:
    Nach einem Update deiner Pakete kannst du dieses Plugin einfach in deine
    JavaScript-Module importieren oder die exportierte Variable im gegebenen
    Context referenzieren.
-->

```JavaScript
'use strict'
import {$} from 'clientnode'
/**
 * This plugin holds all needed methods to extend input fields to select
 * numbers very smart.
 * @extends clientnode:Tools
 * @property static:_name - Defines this class name to allow retrieving them
 * after name mangling.
 * @property _options - Options extended by the options given to the
 * initializer method.
 */
export default class Example extends $.Tools.class {
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
```

Initialisation with given dom node and without:
<!--deDE:Aufruf mit und ohne übergebenen DOM-Knoten:-->

```JavaScript
const $domNode = $('#domNode').Example({firstOption: 'value'});
const exampleInstance = $.Example({firstOption: 'value'});
```

Function call from previous generated instance via dom node or instance
reference:
<!--deDE:
    Aufruf einer Plugin-Methode anhand der zuvor generierten Instanz bzw. über
    den zurückgegebene DOM-Knoten:
-->

```JavaScript
const returnValue = $('#domNode').Example('method', 'anArgument')
const returnValue = $('#domNode').Example().method('anArgument')
const exampleInstance = $.Example({firstOption: 'value'})
const returnValue = exampleInstance.method('anArgument')
```
