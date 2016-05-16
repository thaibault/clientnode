#!/usr/bin/env require
# -*- coding: utf-8 -*-
# region header
# Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de
# endregion
if TARGET is 'node'
    # region mock browser environment
    qunit = require 'qunit-cli'
    dom = require 'jsdom'
    dom.env '''
    <!doctype html>
        <html>
            <head>
                <meta charset="UTF-8">
                <!--Prevent browser caching-->
                <meta http-equiv="cache-control" content="no-cache">
                <meta http-equiv="expires" content="0">
                <meta http-equiv="pragma" content="no-cache">
                <title>test</title>
                <link
                    href="/node_modules/qunitjs/qunit/qunit.css"
                    rel="stylesheet" type="text/css"
                >
            </head>
        <body>
            <div id="qunit"></div>
            <div id="qunit-fixture"></div>
        </body>
    </html>
    ''', (error, window) ->
        if error
            throw Error error
        else
            Object.defineProperty window, 'location', {
                value:
                    hash: ''
                    search: ''
                    pathname: '/path'
                    port: ''
                    hostname: 'localhost'
                    host: 'localhost'
                    protocol: 'http:'
                    origin: 'http://localhost'
                    href: 'http://localhost/path'
                    username: ''
                    password: ''
                    assign: ->
                    reload: ->
                    replace: ->
                    toString: -> this.href
                writable: false
            }
            onDomContentLoaded window, window.location
            qunit.load()
    # endregion
else
    qunit = require 'qunit'
    window.document.addEventListener 'DOMContentLoaded', ->
        onDomContentLoaded window, window.location
        qunit.start()

onDomContentLoaded = (window, location) ->
    $ = require 'jquery'
    try
        $ 'body'
    catch
        $ = $ window
        $.context = window.document
        require.cache[require.resolve('jquery')].exports = $
    require 'index'

    # region tests
    ## region mock-up
    $bodyDomNode = $ 'body'
    tools = $('body').Tools()
    ## endregion
    ## region public methods
    ## # region special
    qunit.test 'constructor', -> qunit.ok tools
    qunit.test 'destructor', -> qunit.strictEqual tools.destructor(), tools
    qunit.test 'initialize', ->
        secondToolsInstance = $.Tools logging: true
        thirdToolsInstance = $.Tools domNodeSelectorPrefix: 'body.{1} div.{1}'

        qunit.assert.notOk tools._options.logging
        qunit.ok secondToolsInstance._options.logging
        qunit.strictEqual(
            thirdToolsInstance._options.domNodeSelectorPrefix,
            'body.tools div.tools')
    ## # endregion
    ## # region object orientation
    qunit.test 'controller', ->
        qunit.strictEqual tools.controller(tools, []), tools
        qunit.strictEqual tools.controller(
            $.Tools.class, [], $ 'body'
        ).__name__, tools.__name__
    ## # endregion
    ## # region mutual exclusion
    qunit.test 'acquireLock|releaseLock', ->
        testValue = false
        tools.acquireLock 'test', -> testValue = true

        qunit.ok testValue
        qunit.strictEqual tools.acquireLock('test', (->
            testValue = false
        ), true), tools
        qunit.ok testValue
        qunit.ok $.Tools().releaseLock 'test'
        qunit.ok testValue
        qunit.strictEqual tools.releaseLock('test'), tools
        qunit.notOk testValue
        qunit.strictEqual tools.acquireLock('test', (->
            testValue = true
        ), true), tools
        qunit.ok testValue
        qunit.strictEqual(
            tools.acquireLock('test', -> testValue = false), tools)
        qunit.notOk testValue
    ## # endregion
    ## # region language fixes
    qunit.test 'mouseOutEventHandlerFix', -> qunit.ok(
        tools.mouseOutEventHandlerFix ->)
    ## # endregion
    ## # region logging
    qunit.test 'log', -> qunit.strictEqual tools.log('test'), tools
    qunit.test 'info', -> qunit.strictEqual tools.info('test {0}'), tools
    qunit.test 'debug', -> qunit.strictEqual tools.debug('test'), tools
    ###
    NOTE: This test breaks java script modules in strict mode.
    qunit.test 'error', -> qunit.strictEqual tools.error(
        'ignore this error, it is only a {1}', 'test'
    ), tools
    ###
    qunit.test 'warn', -> qunit.strictEqual tools.warn('test'), tools
    qunit.test 'show', ->
        qunit.strictEqual tools.show('hans'), 'hans\n(Type: "string")'
        qunit.strictEqual tools.show(
            A: 'a', B: 'b'
        ), 'A: a\nB: b\n(Type: "object")'
        qunit.ok new RegExp(
            '^(.|\n|\r|\u2028|\u2029)+\\(Type: "function"\\)$'
        ).test tools.show $.Tools
        qunit.ok new RegExp('^.+: .+\\n(.|\\n)+$').test tools.show tools
    ## # endregion
    ## # region dom node handling
    qunit.test 'normalizeClassNames', ->
        qunit.strictEqual $('<div>').Tools(
            'normalizeClassNames'
        ).$domNode.prop('outerHTML'), $('<div>').prop 'outerHTML'
        qunit.strictEqual $('<div class>').Tools(
            'normalizeClassNames'
        ).$domNode.html(), $('<div>').html()
        qunit.strictEqual $('<div class="">').Tools(
            'normalizeClassNames'
        ).$domNode.html(), $('<div>').html()
        qunit.strictEqual(
            $('<div class="a">').Tools('normalizeClassNames').$domNode.prop(
                'outerHTML')
            $('<div class="a">').prop('outerHTML'))
        qunit.strictEqual(
            $('<div class="b a">').Tools('normalizeClassNames').$domNode.prop(
                'outerHTML')
            $('<div class="a b">').prop 'outerHTML')
        qunit.strictEqual(
            $('<div class="b a"><pre class="c b a"></pre></div>').Tools(
                'normalizeClassNames'
            ).$domNode.prop('outerHTML')
            $('<div class="a b"><pre class="a b c"></pre></div>').prop(
                'outerHTML'))
    qunit.test 'isEquivalentDom', ->
        qunit.ok tools.isEquivalentDom 'test', 'test'
        qunit.notOk tools.isEquivalentDom 'test', ''
        qunit.notOk tools.isEquivalentDom 'test', 'hans'
        qunit.ok tools.isEquivalentDom 'test test', 'test test'
        qunit.notOk tools.isEquivalentDom 'test test', 'testtest'
        qunit.notOk tools.isEquivalentDom 'test test:', ''
        qunit.ok tools.isEquivalentDom '<div>', '<div>'
        qunit.ok tools.isEquivalentDom '<div class>', '<div>'
        qunit.ok tools.isEquivalentDom '<div class="">', '<div>'
        qunit.ok tools.isEquivalentDom '<div></div>', '<div>'
        qunit.notOk tools.isEquivalentDom '<div class="a"></div>', '<div>'
        qunit.ok tools.isEquivalentDom(
            '<div class="a"></div>', '<div class="a"></div>')
        qunit.ok tools.isEquivalentDom(
            $ '<a target="_blank" class="a"></a>'
            '<a class="a" target="_blank"></a>')
        qunit.notOk tools.isEquivalentDom(
            $ '<a class="a"></a>'
            '<a class="a" target="_blank"></a>')
        qunit.ok tools.isEquivalentDom(
            '<a target="_blank" class="a"></a>'
            '<a class="a" target="_blank"></a>')
        qunit.notOk tools.isEquivalentDom(
            '<a target="_blank" class="a"><div a="2"></div></a>'
            '<a class="a" target="_blank"></a>')
        qunit.ok tools.isEquivalentDom(
            '<a target="_blank" class="a"><div b="3" a="2"></div></a>'
            '<a class="a" target="_blank"><div a="2" b="3"></div></a>')
        qunit.ok tools.isEquivalentDom(
            '<a target="_blank" class="b a"><div b="3" a="2"></div></a>'
            '<a class="a b" target="_blank"><div a="2" b="3"></div></a>')
    qunit.test 'getPositionRelativeToViewport', ->
        qunit.ok tools.getPositionRelativeToViewport() in [
            'above', 'left', 'right', 'below', 'in']
    qunit.test 'generateDirectiveSelector', ->
        qunit.strictEqual tools.generateDirectiveSelector(
            'a-b'
        ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'
        qunit.strictEqual tools.generateDirectiveSelector(
            'aB'
        ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'
        qunit.strictEqual tools.generateDirectiveSelector(
            'a'
        ), 'a, .a, [a], [data-a], [x-a]'
        qunit.strictEqual tools.generateDirectiveSelector(
            'aa'
        ), 'aa, .aa, [aa], [data-aa], [x-aa]'
        qunit.strictEqual tools.generateDirectiveSelector(
            'aaBB'
        ), 'aa-bb, .aa-bb, [aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb], ' +
            '[aa_bb]'
        qunit.strictEqual tools.generateDirectiveSelector(
            'aaBbCcDd'
        ), 'aa-bb-cc-dd, .aa-bb-cc-dd, [aa-bb-cc-dd], [data-aa-bb-cc-dd], ' +
        '[x-aa-bb-cc-dd], [aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]'
        qunit.strictEqual tools.generateDirectiveSelector(
            'mceHREF'
        ), 'mce-href, .mce-href, [mce-href], [data-mce-href], [x-mce-href], ' +
            '[mce\\:href], [mce_href]'
    qunit.test 'removeDirective', ->
        $bodyDomNode = $bodyDomNode.Tools 'removeDirective', 'a'
        qunit.equal $bodyDomNode.Tools().removeDirective('a'), $bodyDomNode
    qunit.test 'getNormalizedDirectiveName', ->
        qunit.equal tools.getNormalizedDirectiveName('data-a'), 'a'
        qunit.equal tools.getNormalizedDirectiveName('x-a'), 'a'
        qunit.equal tools.getNormalizedDirectiveName('data-a-bb'), 'aBb'
        qunit.equal tools.getNormalizedDirectiveName('x:a:b'), 'aB'
    qunit.test 'getDirectiveValue', ->
        qunit.equal $('body').Tools('getDirectiveValue', 'a'), null
    qunit.test 'sliceDomNodeSelectorPrefix', ->
        qunit.strictEqual tools.sliceDomNodeSelectorPrefix('body div'), 'div'
        qunit.strictEqual $.Tools(
            domNodeSelectorPrefix: 'body div'
        ).sliceDomNodeSelectorPrefix('body div'), ''
        qunit.strictEqual $.Tools(
            domNodeSelectorPrefix: ''
        ).sliceDomNodeSelectorPrefix('body div'), 'body div'
    qunit.test 'getDomNodeName', ->
        qunit.strictEqual tools.getDomNodeName('div'), 'div'
        qunit.strictEqual tools.getDomNodeName('<div>'), 'div'
        qunit.strictEqual tools.getDomNodeName('<div />'), 'div'
        qunit.strictEqual tools.getDomNodeName('<div></div>'), 'div'

        qunit.strictEqual tools.getDomNodeName('a'), 'a'
        qunit.strictEqual tools.getDomNodeName('<a>'), 'a'
        qunit.strictEqual tools.getDomNodeName('<a />'), 'a'
        qunit.strictEqual tools.getDomNodeName('<a></a>'), 'a'
    qunit.test 'grabDomNode', ->
        $domNodes = tools.grabDomNode
            qunit: 'body div#qunit', qunitFixture: 'body div#qunit-fixture'
        delete $domNodes.window
        delete $domNodes.document
        qunit.deepEqual(
            $domNodes
            qunit: $('body div#qunit'),
            qunitFixture: $('body div#qunit-fixture')
            parent: $ 'body')
        $domNodes = tools.grabDomNode
            qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
        delete $domNodes.window
        delete $domNodes.document
        qunit.deepEqual(
            $domNodes
            parent: $('body'), qunit: $('body div#qunit')
            qunitFixture: $ 'body div#qunit-fixture')
        $domNodes = tools.grabDomNode {
            qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
        }, 'body'
        delete $domNodes.window
        delete $domNodes.document
        qunit.deepEqual(
            $domNodes
            parent: $('body'), qunit: $('body').find 'div#qunit'
            qunitFixture: $('body').find 'div#qunit-fixture')
    ## # endregion
    ## # region scope
    qunit.test 'isolateScope', ->
        qunit.deepEqual tools.isolateScope({}), {}
        qunit.deepEqual tools.isolateScope(a: 2), a: 2
        qunit.deepEqual tools.isolateScope(
            a: 2, b: a: [1, 2]
        ), a: 2, b: a: [1, 2]
        scope = -> this.a = 2
        scope.prototype = b: 2, _a: 5
        scope = new scope
        qunit.deepEqual tools.isolateScope(scope), _a: 5, a: 2, b: undefined
        scope.b = 3
        qunit.deepEqual tools.isolateScope(scope), _a: 5, a: 2, b: 3
        qunit.deepEqual tools.isolateScope(
            scope, []
        ), _a: undefined, a: 2, b: 3
        scope._a = 6
        qunit.deepEqual tools.isolateScope(scope), _a: 6, a: 2, b: 3
        scope = -> this.a = 2
        scope.prototype = b: 3
        qunit.deepEqual tools.isolateScope(new scope, ['b']), a: 2, b: 3
        qunit.deepEqual tools.isolateScope(new scope), a: 2, b: undefined
    qunit.test 'determineUniqueScopeName', ->
        qunit.ok tools.stringStartsWith tools.determineUniqueScopeName(
        ), 'callback'
        qunit.ok tools.stringStartsWith(
            tools.determineUniqueScopeName('hans'), 'hans')
        qunit.ok tools.stringStartsWith tools.determineUniqueScopeName(
            'hans', {}
        ), 'hans'
    ## # endregion
    ## # region function handling
    qunit.test 'getMethod', ->
        testObject = value: false

        tools.getMethod(-> testObject.value = true)()
        qunit.ok testObject.value

        tools.getMethod((-> this.value = false), testObject)()
        qunit.notOk testObject.value

        qunit.strictEqual tools.getMethod(
            ((thisFunction, context, five, two, three) ->
                context.value = five + two + three
            ), testObject, 5
        )(2, 3), 10
    qunit.test 'identity', ->
        qunit.strictEqual tools.identity(2), 2
        qunit.strictEqual tools.identity(''), ''
        qunit.strictEqual tools.identity(), undefined
        qunit.strictEqual tools.identity(null), null
        qunit.strictEqual tools.identity('hans'), 'hans'
        qunit.ok tools.identity({}) isnt {}
        testObject = {}
        qunit.strictEqual tools.identity(testObject), testObject
    qunit.test 'invertArrayFilter', ->
        qunit.deepEqual tools.invertArrayFilter(tools.arrayDeleteEmptyItems)([
            a: null
        ]), [a: null]
        qunit.deepEqual tools.invertArrayFilter(tools.arrayExtractIfMatches)([
            'a', 'b'
        ], '^a$'), ['b']
    ## # endregion
    ## # region event
    qunit.test 'debounce', ->
        testValue = false
        tools.debounce(-> testValue = true)()
        qunit.ok testValue
        tools.debounce((-> testValue = false), 1000)()
        qunit.notOk testValue
    qunit.test 'fireEvent', ->
        testValue = false

        qunit.strictEqual(
            $.Tools('onClick': -> testValue = true).fireEvent('click', true),
            true)
        qunit.ok testValue
        qunit.strictEqual(
            $.Tools('onClick': -> testValue = false).fireEvent('click', true),
            true)
        qunit.notOk testValue
        qunit.strictEqual tools.fireEvent('click'), false
        qunit.notOk testValue
        tools.onClick = -> testValue = true
        qunit.strictEqual tools.fireEvent('click'), false
        qunit.ok testValue
        tools.onClick = -> testValue = false
        qunit.strictEqual tools.fireEvent('click', true), false
        qunit.ok testValue
    qunit.test 'on', ->
        testValue = false
        qunit.strictEqual tools.on('body', 'click', -> testValue = true)[0], $(
            'body'
        )[0]

        $('body').trigger 'click'
        qunit.ok testValue
    qunit.test 'off', ->
        testValue = false
        qunit.strictEqual tools.on('body', 'click', -> testValue = true)[0], $(
            'body'
        )[0]
        qunit.strictEqual tools.off('body', 'click')[0], $('body')[0]

        $('body').trigger 'click'
        qunit.notOk testValue
    ## # endregion
    ## # region object
    qunit.test 'forEachSorted', ->
        result = []
        tester = (item) -> tools.forEachSorted item, (value, key) ->
            result.push [key, value]
        tester {}
        qunit.deepEqual result, []
        qunit.deepEqual tester({}), []
        qunit.deepEqual tester([]), []
        qunit.deepEqual tester(a: 2), ['a']
        qunit.deepEqual tester(b: 1, a: 2), ['a', 'b']
        result = []
        tester b: 1, a: 2
        qunit.deepEqual result, [['a', 2], ['b', 1]]
        result = []
        tester [2, 2]
        qunit.deepEqual result, [[0, 2], [1, 2]]
        result = []
        tester {5: 2, 6: 2, 2: 3}
        qunit.deepEqual result, [['2', 3], ['5', 2], ['6', 2]]
        result = []
        tester {'a': 2, 'c': 2, 'z': 3}
        qunit.deepEqual result, [['a', 2], ['c', 2], ['z', 3]]
        tools.forEachSorted [1], ((value, key) ->
            result = this
        ), 2
        qunit.deepEqual result, 2
    qunit.test 'sort', ->
        qunit.deepEqual tools.sort([]), []
        qunit.deepEqual tools.sort({}), []
        qunit.deepEqual tools.sort([1]), [0]
        qunit.deepEqual tools.sort([1, 2, 3]), [0, 1, 2]
        qunit.deepEqual tools.sort([3, 2, 1]), [0, 1, 2]
        qunit.deepEqual tools.sort([2, 3, 1]), [0, 1, 2]
        qunit.deepEqual tools.sort({1: 2, 2: 5, 3: 'a'}), ['1', '2', '3']
        qunit.deepEqual tools.sort({2: 2, 1: 5, '-5': 'a'}), ['-5', '1', '2']
        qunit.deepEqual tools.sort({3: 2, 2: 5, 1: 'a'}), ['1', '2', '3']
        qunit.deepEqual tools.sort({'a': 2, 'b': 5, 'c': 'a'}), ['a', 'b', 'c']
        qunit.deepEqual tools.sort({'c': 2, 'b': 5, 'a': 'a'}), ['a', 'b', 'c']
        qunit.deepEqual tools.sort({'b': 2, 'c': 5, 'z': 'a'}), ['b', 'c', 'z']
    qunit.test 'equals', ->
        qunit.ok tools.equals 1, 1
        qunit.ok tools.equals (new Date), (new Date)
        qunit.ok tools.equals (new Date 1995, 11, 17), (new Date(
            1995, 11, 17))
        qunit.notOk tools.equals (new Date 1995, 11, 17), (new Date(
            1995, 11, 16))
        qunit.ok tools.equals /a/, /a/
        qunit.notOk tools.equals /a/i, /a/
        qunit.notOk tools.equals 1, 2
        qunit.ok tools.equals {a: 2}, a: 2
        qunit.notOk tools.equals {a: 2, b: 3}, a: 2
        qunit.ok tools.equals {a: 2, b: 3}, a: 2, b: 3
        qunit.ok tools.equals [1, 2, 3], [1, 2, 3]
        qunit.notOk tools.equals [1, 2, 3, 4], [1, 2, 3, 5]
        qunit.notOk tools.equals [1, 2, 3, 4], [1, 2, 3]
        qunit.ok tools.equals [], []
        qunit.ok tools.equals {}, {}
        qunit.ok tools.equals [1, 2, 3, a: 2], [1, 2, 3, a: 2]
        qunit.notOk tools.equals [1, 2, 3, a: 2], [1, 2, 3, b: 2]
        qunit.ok tools.equals [1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]
        qunit.notOk tools.equals [1, 2, 3, [1, 2]], [1, 2, 3, [1, 2, 3]]
        qunit.notOk tools.equals [1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2]]
        qunit.notOk tools.equals [1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, {}]]
        qunit.ok tools.equals [a: 1], [a: 1]
        qunit.notOk tools.equals [a: 1, b: 1], [a: 1]
        qunit.ok tools.equals [a: 1, b: 1], [a: 1], []
        qunit.ok tools.equals [a: 1, b: 1], [a: 1], ['a']
        qunit.notOk tools.equals [a: 1, b: 1], [a: 1], ['a', 'b']
        qunit.ok tools.equals 2, 2, 0
        qunit.notOk tools.equals 1, 2, 0
        qunit.ok tools.equals [a: 1, b: 1], [a: 1], null, 0
        qunit.notOk tools.equals [{a: 1}, b: 1], [a: 1], null, 1
        qunit.ok tools.equals [{a: 1}, b: 1], [{a: 1}, b: 1], null, 1
        qunit.ok tools.equals [{a: b: 1}, b: 1], [{a: 1}, b: 1], null, 1
        qunit.notOk tools.equals [{a: b: 1}, b: 1], [{a: 1}, b: 1], null, 2
        qunit.ok tools.equals [{a: b: 1}, b: 1], [{a: b: 1}, b: 1], null, 2
        qunit.ok tools.equals [{a: b: c: 1}, b: 1], [{a: b: 1}, b: 1], null, 2
        qunit.notOk tools.equals [{a: b: c: 1}, b: 1], [{
            a: b: 1
        }, b: 1], null, 3
        qunit.ok tools.equals [{a: b: c: 1}, b: 1], [{
            a: b: 1
        }, b: 1], null, 3, ['b']
        qunit.ok tools.equals (->), ->
        qunit.notOk tools.equals (->), (->), null, -1, [], false
        test = ->
        qunit.ok tools.equals test, test, null, -1, [], false
    ## # endregion
    ## # region array
    qunit.test 'argumentsObjectToArray', ->
        qunit.notOk $.isArray arguments
        qunit.ok $.isArray tools.argumentsObjectToArray arguments
    qunit.test 'arrayUnique', ->
        qunit.deepEqual tools.arrayUnique([1, 2, 3, 1]), [1, 2, 3]
        qunit.deepEqual tools.arrayUnique([1, 2, 3, 1, 2, 3]), [1, 2, 3]
        qunit.deepEqual tools.arrayUnique([]), []
        qunit.deepEqual tools.arrayUnique([1, 2, 3]), [1, 2, 3]
    qunit.test 'arrayAggregatePropertyIfEqual', ->
        qunit.strictEqual tools.arrayAggregatePropertyIfEqual([
            a: 'b'
        ], 'a'), 'b'
        qunit.strictEqual tools.arrayAggregatePropertyIfEqual([{a: 'b'}, {
            a: 'b'
        }], 'a'), 'b'
        qunit.strictEqual tools.arrayAggregatePropertyIfEqual([{a: 'b'}, {
            a: 'c'
        }], 'a'), ''
        qunit.strictEqual tools.arrayAggregatePropertyIfEqual([{a: 'b'}, {
            a: 'c'
        }], 'a', false), false
    qunit.test 'arrayDeleteEmptyItems', ->
        qunit.deepEqual tools.arrayDeleteEmptyItems([a: null]), []
        qunit.deepEqual tools.arrayDeleteEmptyItems([a: null, b: 2]), [
            a: null, b: 2]
        qunit.deepEqual tools.arrayDeleteEmptyItems([a: null, b: 2], ['a']), []
        qunit.deepEqual tools.arrayDeleteEmptyItems([], ['a']), []
        qunit.deepEqual tools.arrayDeleteEmptyItems([]), []
    qunit.test 'arrayExtract', ->
        qunit.deepEqual tools.arrayExtract([a: 'b', c: 'd'], ['a']), [a: 'b']
        qunit.deepEqual tools.arrayExtract([a: 'b', c: 'd'], ['b']), [{}]
        qunit.deepEqual tools.arrayExtract([a: 'b', c: 'd'], ['c']), [c: 'd']
        qunit.deepEqual tools.arrayExtract([{a: 'b', c: 'd'}, a: 3], ['c']), [
            c: 'd', {}]
        qunit.deepEqual tools.arrayExtract([{a: 'b', c: 'd'}, c: 3], ['c']), [
            c: 'd', {c: 3}]
    qunit.test 'arrayExtractIfMatches', ->
        qunit.deepEqual tools.arrayExtractIfMatches(['b'], /b/), ['b']
        qunit.deepEqual tools.arrayExtractIfMatches(['b'], 'b'), ['b']
        qunit.deepEqual tools.arrayExtractIfMatches(['b'], 'a'), []
        qunit.deepEqual tools.arrayExtractIfMatches([], 'a'), []
        qunit.deepEqual tools.arrayExtractIfMatches(['a', 'b'], ''), ['a', 'b']
        qunit.deepEqual tools.arrayExtractIfMatches(['a', 'b'], '^$'), []
        qunit.deepEqual tools.arrayExtractIfMatches(['a', 'b'], 'b'), ['b']
        qunit.deepEqual tools.arrayExtractIfMatches(['a', 'b'], '[ab]'), [
            'a', 'b']
    qunit.test 'arrayExtractIfPropertyExists', ->
        qunit.deepEqual tools.arrayExtractIfPropertyExists([a: 2], 'a'), [a: 2]
        qunit.deepEqual tools.arrayExtractIfPropertyExists([a: 2], 'b'), []
        qunit.deepEqual tools.arrayExtractIfPropertyExists([], 'b'), []
        qunit.deepEqual(
            tools.arrayExtractIfPropertyExists([{a: 2}, {b: 3}], 'a'), [a: 2])
    qunit.test 'arrayExtractIfPropertyMatches', ->
        qunit.deepEqual tools.arrayExtractIfPropertyMatches([
            a: 'b'
        ], a: 'b'), [a: 'b']
        qunit.deepEqual tools.arrayExtractIfPropertyMatches([
            a: 'b'
        ], a: '.'), [a: 'b']
        qunit.deepEqual tools.arrayExtractIfPropertyMatches([
            a: 'b'
        ], a: 'a'), []
        qunit.deepEqual tools.arrayExtractIfPropertyMatches([], a: 'a'), []
        qunit.deepEqual tools.arrayExtractIfPropertyMatches([a: 2], b: /a/), []
        qunit.deepEqual tools.arrayExtractIfPropertyMatches([
            mimeType: 'text/x-webm'
        ], mimeType: new RegExp('^text/x-webm$')), [mimeType: 'text/x-webm']
    qunit.test 'arrayIntersect', ->
        qunit.deepEqual tools.arrayIntersect(['A'], ['A']), ['A']
        qunit.deepEqual tools.arrayIntersect(['A', 'B'], ['A']), ['A']
        qunit.deepEqual tools.arrayIntersect([], []), []
        qunit.deepEqual tools.arrayIntersect([5], []), []
        qunit.deepEqual tools.arrayIntersect([a: 2], [a: 2]), [a: 2]
        qunit.deepEqual tools.arrayIntersect([a: 3], [a: 2]), []
        qunit.deepEqual tools.arrayIntersect([a: 3], [b: 3]), []
        qunit.deepEqual tools.arrayIntersect([a: 3], [b: 3], ['b']), []
        qunit.deepEqual tools.arrayIntersect([a: 3], [b: 3], ['b'], false), []
        qunit.deepEqual tools.arrayIntersect([b: null], [b: null], ['b']), [
            b: null]
        qunit.deepEqual tools.arrayIntersect([b: null], [b: undefined], [
            'b'
        ]), []
        qunit.deepEqual tools.arrayIntersect([b: null], [b: undefined], [
            'b'
        ], false), [b: null]
        qunit.deepEqual tools.arrayIntersect([b: null], [{}], ['b'], false), [
            b: null]
        qunit.deepEqual tools.arrayIntersect([b: undefined], [{}], [
            'b'
        ], false), [b: undefined]
        qunit.deepEqual tools.arrayIntersect([{}], [{}], ['b'], false), [{}]
        qunit.deepEqual tools.arrayIntersect([b: null], [{}], ['b']), []
        qunit.deepEqual tools.arrayIntersect([b: undefined], [{}], [
            'b'
        ], true), [b: undefined]
        qunit.deepEqual tools.arrayIntersect([b: 1], [a: 1], {b: 'a'}, true), [{
            b: 1}]
    qunit.test 'arrayMakeRange', ->
        qunit.deepEqual tools.arrayMakeRange([0]), [0]
        qunit.deepEqual tools.arrayMakeRange([5]), [0, 1, 2, 3, 4, 5]
        qunit.deepEqual tools.arrayMakeRange([]), []
        qunit.deepEqual tools.arrayMakeRange([2, 5]), [2, 3, 4, 5]
    qunit.test 'arraySumUpProperty', ->
        qunit.strictEqual tools.arraySumUpProperty([{a: 2}, {a: 3}], 'a'), 5
        qunit.strictEqual tools.arraySumUpProperty([{a: 2}, {b: 3}], 'a'), 2
        qunit.strictEqual tools.arraySumUpProperty([{a: 2}, {b: 3}], 'c'), 0
    qunit.test 'arrayAppendAdd', ->
        qunit.deepEqual tools.arrayAppendAdd({}, {}, 'b'), b: [{}]
        test = {}
        qunit.deepEqual tools.arrayAppendAdd(test, {a: 3}, 'b'), b: [a: 3]
        qunit.deepEqual tools.arrayAppendAdd(test, {a: 3}, 'b'), b: [{a: 3}, a: 3]
        qunit.deepEqual tools.arrayAppendAdd({b: [2]}, 2, 'b', false), b: [2, 2]
        qunit.deepEqual tools.arrayAppendAdd({b: [2]}, 2, 'b'), b: [2]
    qunit.test 'arrayRemove', ->
        qunit.deepEqual tools.arrayRemove([], 2), []
        qunit.throws (-> tools.arrayRemove [], 2, true), Error(
            "Given target doesn't exists in given list.")
        qunit.deepEqual tools.arrayRemove([2], 2), []
        qunit.deepEqual tools.arrayRemove([2], 2, true), []
        qunit.deepEqual tools.arrayRemove([1, 2], 2), [1]
        qunit.deepEqual tools.arrayRemove([1, 2], 2, true), [1]
    ## # endregion
    ## # region string
    ## ## region url handling
    qunit.test 'stringEncodeURIComponent', ->
        qunit.strictEqual tools.stringEncodeURIComponent(''), ''
        qunit.strictEqual tools.stringEncodeURIComponent(' '), '+'
        qunit.strictEqual tools.stringEncodeURIComponent(' ', true), '%20'
        qunit.strictEqual tools.stringEncodeURIComponent('@:$, '), '@:$,+'
        qunit.strictEqual tools.stringEncodeURIComponent('+'), '%2B'
    qunit.test 'stringAddSeparatorToPath', ->
        qunit.strictEqual tools.stringAddSeparatorToPath(''), ''
        qunit.strictEqual tools.stringAddSeparatorToPath('/'), '/'
        qunit.strictEqual tools.stringAddSeparatorToPath('/a'), '/a/'
        qunit.strictEqual tools.stringAddSeparatorToPath('/a/bb/'), '/a/bb/'
        qunit.strictEqual tools.stringAddSeparatorToPath('/a/bb'), '/a/bb/'
        qunit.strictEqual tools.stringAddSeparatorToPath('/a/bb', '|'), '/a/bb|'
        qunit.strictEqual tools.stringAddSeparatorToPath('/a/bb/', '|'), '/a/bb/|'
    qunit.test 'stringHasPathPrefix', ->
        qunit.ok tools.stringHasPathPrefix '/admin', '/admin'
        qunit.ok tools.stringHasPathPrefix 'test', 'test'
        qunit.ok tools.stringHasPathPrefix '', ''
        qunit.ok tools.stringHasPathPrefix 'a', 'a/b'
        qunit.notOk tools.stringHasPathPrefix 'b', 'a/b'
        qunit.notOk tools.stringHasPathPrefix 'b/', 'a/b'
        qunit.ok tools.stringHasPathPrefix 'a/', 'a/b'
        qunit.notOk tools.stringHasPathPrefix '/admin/', '/admin/test', '#'
        qunit.notOk tools.stringHasPathPrefix '/admin', '/admin/test', '#'
        qunit.ok tools.stringHasPathPrefix '/admin', '/admin#test', '#'
    qunit.test 'stringGetDomainName', ->
        qunit.strictEqual tools.stringGetDomainName(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 'www.test.de'
        qunit.strictEqual tools.stringGetDomainName('a', true), true
        qunit.strictEqual(
            tools.stringGetDomainName('http://www.test.de'), 'www.test.de')
        qunit.strictEqual tools.stringGetDomainName('http://a.de'), 'a.de'
        qunit.strictEqual(
            tools.stringGetDomainName('http://localhost'), 'localhost')
        qunit.strictEqual tools.stringGetDomainName('localhost', 'a'), 'a'
        qunit.strictEqual tools.stringGetDomainName(
            'a', location.hostname
        ), location.hostname
        qunit.strictEqual tools.stringGetDomainName('//a'), 'a'
        qunit.strictEqual tools.stringGetDomainName(
            'a/site/subSite?param=value#hash', location.hostname
        ), location.hostname
        qunit.strictEqual tools.stringGetDomainName(
            '/a/site/subSite?param=value#hash', location.hostname
        ), location.hostname
        qunit.strictEqual tools.stringGetDomainName(
            '//alternate.local/a/site/subSite?param=value#hash'
        ), 'alternate.local'
        qunit.strictEqual tools.stringGetDomainName(
            '//alternate.local/'
        ), 'alternate.local'
    qunit.test 'stringGetPortNumber', ->
        qunit.strictEqual tools.stringGetPortNumber(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 443
        qunit.strictEqual tools.stringGetPortNumber('http://www.test.de'), 80
        qunit.strictEqual(
            tools.stringGetPortNumber('http://www.test.de', true), true)
        qunit.strictEqual tools.stringGetPortNumber('www.test.de', true), true
        qunit.strictEqual tools.stringGetPortNumber('a', true), true
        qunit.strictEqual tools.stringGetPortNumber('a', true), true
        qunit.strictEqual tools.stringGetPortNumber('a:80'), 80
        qunit.strictEqual tools.stringGetPortNumber('a:20'), 20
        qunit.strictEqual tools.stringGetPortNumber('a:444'), 444
        qunit.strictEqual tools.stringGetPortNumber('http://localhost:89'), 89
        qunit.strictEqual tools.stringGetPortNumber('https://localhost:89'), 89
    qunit.test 'stringGetProtocolName', ->
        qunit.strictEqual tools.stringGetProtocolName(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 'https'
        qunit.strictEqual tools.stringGetProtocolName(
            'http://www.test.de'
        ), 'http'
        qunit.strictEqual tools.stringGetProtocolName(
            '//www.test.de', location.protocol.substring(
                0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1)
        qunit.strictEqual tools.stringGetProtocolName('http://a.de'), 'http'
        qunit.strictEqual tools.stringGetProtocolName('ftp://localhost'), 'ftp'
        qunit.strictEqual tools.stringGetProtocolName(
            'a', location.protocol.substring(0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1)
        qunit.strictEqual tools.stringGetProtocolName(
            'a/site/subSite?param=value#hash', location.protocol.substring(
                0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1)
        qunit.strictEqual tools.stringGetProtocolName(
            '/a/site/subSite?param=value#hash', 'a'
        ), 'a'
        qunit.strictEqual tools.stringGetProtocolName(
            'alternate.local/a/site/subSite?param=value#hash', 'b'
        ), 'b'
        qunit.strictEqual tools.stringGetProtocolName(
            'alternate.local/', 'c'
        ), 'c'
        qunit.strictEqual tools.stringGetProtocolName(
            '', location.protocol.substring(0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1)
    qunit.test 'stringGetURLVariable', ->
        qunit.ok $.isArray tools.stringGetURLVariable()
        qunit.ok $.isArray tools.stringGetURLVariable null, '&'
        qunit.ok $.isArray tools.stringGetURLVariable null, '#'
        qunit.strictEqual tools.stringGetURLVariable('notExisting'), undefined
        qunit.strictEqual tools.stringGetURLVariable('notExisting', '&'), undefined
        qunit.strictEqual tools.stringGetURLVariable('notExisting', '#'), undefined
        qunit.strictEqual tools.stringGetURLVariable('test', '?test=2'), '2'
        qunit.strictEqual tools.stringGetURLVariable('test', 'test=2'), '2'
        qunit.strictEqual tools.stringGetURLVariable('test', 'test=2&a=2'), '2'
        qunit.strictEqual tools.stringGetURLVariable('test', 'b=3&test=2&a=2'), '2'
        qunit.strictEqual(
            tools.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2')
        qunit.strictEqual(
            tools.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2')
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '&', '$', '!', '', '#$test=2'
        ), '2'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '&', '$', '!', '?test=4', '#$test=3'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'a', '&', '$', '!', '?test=4', '#$test=3'
        ), undefined
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '?test=4', '#$test=3'
        ), '3'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/test/a#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/test/a/#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test/a/#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test?test=3#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!a?test=3'
        ), '3'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!test#$test=4'
        ), '4'
        qunit.strictEqual tools.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!test?test=3#$test=4'
        ), '3'
    qunit.test 'stringIsInternalURL', ->
        qunit.ok tools.stringIsInternalURL(
            'https://www.test.de/site/subSite?param=value#hash'
            'https://www.test.de/site/subSite?param=value#hash')
        qunit.notOk tools.stringIsInternalURL(
            "#{location.protocol}//www.test.de/site/subSite?param=value#hash"
            'ftp://www.test.de/site/subSite?param=value#hash')
        qunit.notOk tools.stringIsInternalURL(
            'https://www.test.de/site/subSite?param=value#hash'
            'http://www.test.de/site/subSite?param=value#hash')
        qunit.notOk tools.stringIsInternalURL(
            'http://www.test.de/site/subSite?param=value#hash'
            'test.de/site/subSite?param=value#hash')
        qunit.notOk tools.stringIsInternalURL(
            "#{location.protocol}//www.test.de:#{location.port}/site/" +
            'subSite?param=value#hash/site/subSite?param=value#hash')
        qunit.ok tools.stringIsInternalURL(
            '//www.test.de/site/subSite?param=value#hash'
            '//www.test.de/site/subSite?param=value#hash')
        qunit.ok tools.stringIsInternalURL(
            "#{location.protocol}//www.test.de/site/subSite?param=value#hash"
            "#{location.protocol}//www.test.de/site/subSite?param=value#hash")
        qunit.notOk tools.stringIsInternalURL(
            "http://www.test.de:#{location.port}/site/subSite?param=value#hash"
            'https://www.test.de/site/subSite?param=value#hash')
        qunit.ok tools.stringIsInternalURL(
            'https://www.test.de:443/site/subSite?param=value#hash'
            'https://www.test.de/site/subSite?param=value#hash')
        qunit.ok tools.stringIsInternalURL(
            '//www.test.de:80/site/subSite?param=value#hash'
            '//www.test.de/site/subSite?param=value#hash')
        qunit.ok tools.stringIsInternalURL location.href, location.href
        qunit.ok tools.stringIsInternalURL '1', location.href
        qunit.ok tools.stringIsInternalURL '#1', location.href
        qunit.ok tools.stringIsInternalURL '/a', location.href
    qunit.test 'stringNormalizeURL', ->
        qunit.strictEqual(
            tools.stringNormalizeURL('www.test.com'), 'http://www.test.com')
        qunit.strictEqual tools.stringNormalizeURL('test'), 'http://test'
        qunit.strictEqual tools.stringNormalizeURL('http://test'), 'http://test'
        qunit.strictEqual tools.stringNormalizeURL('https://test'), 'https://test'
    qunit.test 'stringRepresentURL', ->
        qunit.strictEqual(
            tools.stringRepresentURL('http://www.test.com'), 'www.test.com')
        qunit.strictEqual tools.stringRepresentURL(
            'ftp://www.test.com'
        ), 'ftp://www.test.com'
        qunit.strictEqual tools.stringRepresentURL(
            'https://www.test.com'
        ), 'www.test.com'
        qunit.strictEqual tools.stringRepresentURL(undefined), ''
        qunit.strictEqual tools.stringRepresentURL(null), ''
        qunit.strictEqual tools.stringRepresentURL(false), ''
        qunit.strictEqual tools.stringRepresentURL(true), ''
        qunit.strictEqual tools.stringRepresentURL(''), ''
        qunit.strictEqual tools.stringRepresentURL(' '), ''
    ## ## endregion
    qunit.test 'stringCamelCaseToDelimited', ->
        qunit.strictEqual(
            tools.stringCamelCaseToDelimited('hansPeter'), 'hans-peter')
        qunit.strictEqual tools.stringCamelCaseToDelimited(
            'hansPeter', '|'
        ), 'hans|peter'
        qunit.strictEqual tools.stringCamelCaseToDelimited(''), ''
        qunit.strictEqual tools.stringCamelCaseToDelimited('h'), 'h'
        qunit.strictEqual tools.stringCamelCaseToDelimited('hP', ''), 'hp'
        qunit.strictEqual(
            tools.stringCamelCaseToDelimited('hansPeter'), 'hans-peter')
        qunit.strictEqual(
            tools.stringCamelCaseToDelimited('hans-peter'), 'hans-peter')
        qunit.strictEqual tools.stringCamelCaseToDelimited(
            'hansPeter', '_'
        ), 'hans_peter'
        qunit.strictEqual tools.stringCamelCaseToDelimited(
            'hansPeter', '+'
        ), 'hans+peter'
        qunit.strictEqual tools.stringCamelCaseToDelimited('Hans'), 'hans'
        qunit.strictEqual tools.stringCamelCaseToDelimited('hansAPIURL', '-', [
            'api', 'url'
        ]), 'hans-api-url'
        qunit.strictEqual tools.stringCamelCaseToDelimited('hansPeter', '-', [
        ]), 'hans-peter'
    qunit.test 'stringCapitalize', ->
        qunit.strictEqual tools.stringCapitalize('hansPeter'), 'HansPeter'
        qunit.strictEqual tools.stringCapitalize(''), ''
        qunit.strictEqual tools.stringCapitalize('a'), 'A'
        qunit.strictEqual tools.stringCapitalize('A'), 'A'
        qunit.strictEqual tools.stringCapitalize('AA'), 'AA'
        qunit.strictEqual tools.stringCapitalize('Aa'), 'Aa'
        qunit.strictEqual tools.stringCapitalize('aa'), 'Aa'
    qunit.test 'stringDelimitedToCamelCase', ->
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('hans-peter'), 'hansPeter')
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans|peter', '|'
        ), 'hansPeter'
        qunit.strictEqual tools.stringDelimitedToCamelCase(''), ''
        qunit.strictEqual tools.stringDelimitedToCamelCase('h'), 'h'
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('hans-peter'), 'hansPeter')
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('hans--peter'), 'hans-Peter')
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('Hans-Peter'), 'HansPeter')
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('-Hans-Peter'), '-HansPeter')
        qunit.strictEqual tools.stringDelimitedToCamelCase('-'), '-'
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans-peter', '_'
        ), 'hans-peter'
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans_peter', '_'
        ), 'hansPeter'
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('hans_id', '_'), 'hansID')
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'url_hans_id', '_', ['hans']
        ), 'urlHANSId'
        qunit.strictEqual(
            tools.stringDelimitedToCamelCase('url_hans_1', '_'), 'urlHans1')
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hansUrl1', '-', ['url'], true
        ), 'hansUrl1'
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans-url', '-', ['url'], true
        ), 'hansURL'
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans-Url', '-', ['url'], true
        ), 'hansUrl'
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans-Url', '-', ['url'], false
        ), 'hansURL'
        qunit.strictEqual tools.stringDelimitedToCamelCase(
            'hans-Url', '-', [], false
        ), 'hansUrl'
    qunit.test 'stringEndsWith', ->
        qunit.ok tools.stringEndsWith 'hans', 'ns'
        qunit.ok tools.stringEndsWith 'ns', 'ns'
        qunit.ok tools.stringEndsWith 'ns', 's'
        qunit.ok tools.stringEndsWith 'ns', ''
        qunit.ok tools.stringEndsWith '', ''
        qunit.notOk tools.stringEndsWith 'ns', 'n'
        qunit.notOk tools.stringEndsWith '', 'n'
        qunit.notOk tools.stringEndsWith 'ns', 'S'
    qunit.test 'stringFormat', ->
        qunit.strictEqual tools.stringFormat('{1}', 'test'), 'test'
        qunit.strictEqual tools.stringFormat('', 'test'), ''
        qunit.strictEqual tools.stringFormat('{1}'), '{1}'
        qunit.strictEqual tools.stringFormat(
            '{1} test {2} - {2}', 1, 2
        ), '1 test 2 - 2'
    qunit.test 'stringGetRegularExpressionValidated', ->
        qunit.strictEqual tools.stringGetRegularExpressionValidated(
            "that's no regex: .*$"
        ), "that's no regex: \\.\\*\\$"
        qunit.strictEqual tools.stringGetRegularExpressionValidated(''), ''
        qunit.strictEqual tools.stringGetRegularExpressionValidated(
            '-\[]()^$*+.}-'
        ), '\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-'
        qunit.strictEqual tools.stringGetRegularExpressionValidated('-'), '\\-'
    qunit.test 'stringLowerCase', ->
        qunit.strictEqual tools.stringLowerCase('HansPeter'), 'hansPeter'
        qunit.strictEqual tools.stringLowerCase(''), ''
        qunit.strictEqual tools.stringLowerCase('A'), 'a'
        qunit.strictEqual tools.stringLowerCase('a'), 'a'
        qunit.strictEqual tools.stringLowerCase('aa'), 'aa'
        qunit.strictEqual tools.stringLowerCase('Aa'), 'aa'
        qunit.strictEqual tools.stringLowerCase('aa'), 'aa'
    qunit.test 'stringMark', ->
        qunit.strictEqual tools.stringMark(''), ''
        qunit.strictEqual tools.stringMark(
            'test', 'e'
        ), 't<span class="tools-mark">e</span>st'
        qunit.strictEqual tools.stringMark(
            'test', 'es'
        ), 't<span class="tools-mark">es</span>t'
        qunit.strictEqual tools.stringMark(
            'test', 'test'
        ), '<span class="tools-mark">test</span>'
        qunit.strictEqual tools.stringMark('test', ''), 'test'
        qunit.strictEqual tools.stringMark('test', 'tests'), 'test'
        qunit.strictEqual tools.stringMark('', 'test'), ''
        qunit.strictEqual(
            tools.stringMark('test', 'e', '<a>{1}</a>'), 't<a>e</a>st')
        qunit.strictEqual(
            tools.stringMark('test', 'E', '<a>{1}</a>'), 't<a>e</a>st')
        qunit.strictEqual tools.stringMark(
            'test', 'E', '<a>{1}</a>', false
        ), 't<a>e</a>st'
        qunit.strictEqual tools.stringMark(
            'tesT', 't', '<a>{1}</a>'
        ), '<a>t</a>es<a>T</a>'
        qunit.strictEqual tools.stringMark(
            'tesT', 't', '<a>{1} - {1}</a>'
        ), '<a>t - t</a>es<a>T - T</a>'
        qunit.strictEqual tools.stringMark('test', 'E', '<a>{1}</a>', true), 'test'
    qunit.test 'stringMD5', ->
        qunit.strictEqual(
            tools.stringMD5('test'), '098f6bcd4621d373cade4e832627b4f6')
        qunit.strictEqual tools.stringMD5(''), 'd41d8cd98f00b204e9800998ecf8427e'
    qunit.test 'stringNormalizePhoneNumber', ->
        qunit.strictEqual tools.stringNormalizePhoneNumber('0'), '0'
        qunit.strictEqual tools.stringNormalizePhoneNumber(0), '0'
        qunit.strictEqual tools.stringNormalizePhoneNumber(
            '+49 172 (0) / 0212 - 3'
        ), '0049172002123'
    qunit.test 'stringRepresentPhoneNumber', ->
        qunit.strictEqual tools.stringRepresentPhoneNumber('0'), '0'
        qunit.strictEqual tools.stringRepresentPhoneNumber(
            '0172-12321-1'
        ), '+49 (0) 172 / 123 21-1'
        qunit.strictEqual tools.stringRepresentPhoneNumber(
            '0172-123211'
        ), '+49 (0) 172 / 12 32 11'
        qunit.strictEqual tools.stringRepresentPhoneNumber(
            '0172-1232111'
        ), '+49 (0) 172 / 123 21 11'
        qunit.strictEqual tools.stringRepresentPhoneNumber(undefined), ''
        qunit.strictEqual tools.stringRepresentPhoneNumber(null), ''
        qunit.strictEqual tools.stringRepresentPhoneNumber(false), ''
        qunit.strictEqual tools.stringRepresentPhoneNumber(true), ''
        qunit.strictEqual tools.stringRepresentPhoneNumber(''), ''
        qunit.strictEqual tools.stringRepresentPhoneNumber(' '), ''
    qunit.test 'stringStartsWith', ->
        qunit.ok tools.stringStartsWith 'hans', 'ha'
        qunit.ok tools.stringStartsWith 'ha', 'ha'
        qunit.ok tools.stringStartsWith 'ha', 'h'
        qunit.ok tools.stringStartsWith 'ha', ''
        qunit.ok tools.stringStartsWith '', ''
        qunit.notOk tools.stringStartsWith 'ha', 'a'
        qunit.notOk tools.stringStartsWith '', 'a'
        qunit.notOk tools.stringStartsWith 'ha', 'H'
    qunit.test 'stringDecodeHTMLEntities', ->
        qunit.equal tools.stringDecodeHTMLEntities(''), ''
        qunit.equal tools.stringDecodeHTMLEntities(
            '<div></div>'
        ), '<div></div>'
        qunit.equal(
            tools.stringDecodeHTMLEntities('<div>&amp;</div>'), '<div>&</div>')
        qunit.equal tools.stringDecodeHTMLEntities(
            '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>'
        ), '<div>&äÄüÜöÖ</div>'
    ## # endregion
    ## # region number
    qunit.test 'numberIsNotANumber', ->
        qunit.strictEqual tools.numberIsNotANumber(NaN), true
        qunit.strictEqual tools.numberIsNotANumber({}), false
        qunit.strictEqual tools.numberIsNotANumber(undefined), false
        qunit.strictEqual tools.numberIsNotANumber(new Date().toString()), false
        qunit.strictEqual tools.numberIsNotANumber(null), false
        qunit.strictEqual tools.numberIsNotANumber(false), false
        qunit.strictEqual tools.numberIsNotANumber(true), false
        qunit.strictEqual tools.numberIsNotANumber(0), false
    qunit.test 'numberRound', ->
        qunit.strictEqual tools.numberRound(1.5, 0), 2
        qunit.strictEqual tools.numberRound(1.4, 0), 1
        qunit.strictEqual tools.numberRound(1.4, -1), 0
        qunit.strictEqual tools.numberRound(1000, -2), 1000
        qunit.strictEqual tools.numberRound(999, -2), 1000
        qunit.strictEqual tools.numberRound(950, -2), 1000
        qunit.strictEqual tools.numberRound(949, -2), 900
        qunit.strictEqual tools.numberRound(1.2345), 1
        qunit.strictEqual tools.numberRound(1.2345, 2), 1.23
        qunit.strictEqual tools.numberRound(1.2345, 3), 1.235
        qunit.strictEqual tools.numberRound(1.2345, 4), 1.2345
        qunit.strictEqual tools.numberRound(699, -2), 700
        qunit.strictEqual tools.numberRound(650, -2), 700
        qunit.strictEqual tools.numberRound(649, -2), 600
    ## # endregion
    ## # region data transfer
    qunit.test 'sendToIFrame', ->
        iFrame = $('<iframe>').hide().attr 'name', 'test'
        $('body').append iFrame
        qunit.ok tools.sendToIFrame iFrame, window.document.URL, {
            test: 5
        }, 'get', true
    qunit.test 'sendToExternalURL', ->
        qunit.ok tools.sendToExternalURL window.document.URL, {test: 5}
    ## # endregion
    ## endregion
    ## region protected
    qunit.test '_bindHelper', ->
        qunit.ok tools._bindHelper ['body']
        qunit.ok tools._bindHelper ['body'], true
        qunit.ok tools._bindHelper ['body'], false, 'bind'
    qunit.test '_grabDomNodeHelper', ->
        qunit.strictEqual tools._grabDomNodeHelper('test', 'div', {}), 'body div'
        qunit.strictEqual(
            tools._grabDomNodeHelper('test', 'body div', {}), 'body div')
        qunit.strictEqual tools._grabDomNodeHelper('test', '', {}), 'body'
        qunit.strictEqual $.Tools(domNodeSelectorPrefix: '')._grabDomNodeHelper(
            'test', '', {}
        ), ''
        qunit.strictEqual $.Tools(domNodeSelectorPrefix: '')._grabDomNodeHelper(
            'test', 'div', {}
        ), 'div'
    ## endregion
    # endregion
# region vim modline
# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:
# endregion
