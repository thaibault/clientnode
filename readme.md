<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

License
-------

This library written by Torben Sickert stands under a creative commons naming
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

You need utilities for:<!--deDE:Sie benötigen Hilfsfunktionen für:-->

- Primitive types
  - Arrays
  - Functions
  - Numbers
  - Objects
  - Strings
  - Date and time
- Mutual exclusion
  - Lock management
  - Semaphore management
- Backend
  - CLIs
  - Filesystem
  - Processes
- Frontend
  - Cookies
  - DOM
  - Data-Transfer
- JSON-based Expressions
- Logging
- Scopes
- Testing
- Typescript
- URLs

<div class="wd-table-of-contents">
    <!--|deDE:Inhalt-->
    <h2 id="content">Content</h2>
    <!--wd-table-of-contents-->
</div>

<!--|deDE:Installation-->
Installation
------------

You can install via package manager, simply download the compiled version as
zip file here and inject or request via cdn in HTML:
<!--deDE:
    Sie können das Paket über den Paketmanager installieren oder einfach die
    kompilierte Version als ZIP-Datei hier herunterladen und in HTML einbinden
    oder über ein CDN abrufen:
-->

```bash
npm install clientnode
```

```TypeScript
import {createDomNodes, evaluateExpression} from 'cientnode'

// ...
```

<!--showExample-->

```HTML
<script src="https://unpkg.com/clientnode@latest/dist/bundle/index.js">
</script>

<div id="first-example-playground"></div>
```

<!--showExample:JavaScript-->

```JavaScript
const domNode = clientnode.createDomNodes('<p>some content to animate</p>');

const endless = () => {
    clientnode.fadeIn(domNode)
        .then(() => clientnode.fadeOut(domNode))
        .then(endless)
};
endless();

document.querySelector('#first-example-playground').appendChild(domNode);
```

The compiled bundle supports AMD, commonjs, commonjs2 and variable injection
into given context (UMD) as export format: You can use a module bundler if you
want.
<!--deDE:
    Das kompilierte Bundle unterstützt AMD, commonjs, commonjs2 und
    Variable-Injection in den gegebenen Context (UMD) als Export-Format:
    Dadurch können verschiedene Module-Bundler genutzt werden.
-->

<!--|deDE:Nutzung-->
Usage
-----

Execute a JSON based expression:
<!--deDE:Ausführung eines JSON basierten Ausdrucks:-->

<!--showExample-->

```HTML
<div id="second-example-playground"></div>
```

<!--showExample:JavaScript-->

```JavaScript
document.querySelector('#second-example-playground').innerText =
    clientnode.evaluateExpression(
        {
            $operator: '+',
            operand1: 2,
            operand2: {$select: 'some.data.in.scope'}
        },
        {some: {data: {in: {scope: 3}}}}
    );
```
