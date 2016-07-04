// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import browserAPI from 'webOptimizer/browserAPI'
import type {Window} from 'webOptimizer/type'
import type {$DomNode} from './index'
// endregion
// region declaration
declare var TARGET:string
// endregion
// region types
type JQueryFunction = (object:any) => Object
// endregion
const QUnit:Object = (TARGET === 'node') ? require('qunit-cli') : require(
    'qunitjs')
browserAPI((window:Window):void => {
    /*
        NOTE: We have to define window globally before jQuery is loaded to
        ensure that all jquery instances share the same window object.
    */
    if (typeof global !== 'undefined' && global !== window) {
        global.window = window
        for (const key in window)
            if (window.hasOwnProperty(key) && !global.hasOwnProperty(key))
                global[key] = window[key]
    }
    const $:JQueryFunction = require('jquery')
    $.context = window.document
    require('./index')
    if (TARGET === 'node')
        QUnit.load()
    else
        QUnit.start()
    // region tests
    // / region mock-up
    const $bodyDomNode:$DomNode = $('body')
    const tools:$.Tools = $('body').Tools()
    // / endregion
    // / region public methods
    // // region special
    QUnit.test('constructor', (assert:Object):void => assert.ok(tools))
    QUnit.test('destructor', (assert:Object):void => assert.strictEqual(
        tools.destructor(), tools))
    QUnit.test('initialize', (assert:Object):void => {
        const secondToolsInstance = $.Tools({logging: true})
        const thirdToolsInstance = $.Tools({
            domNodeSelectorPrefix: 'body.{1} div.{1}'})

        assert.notOk(tools._options.logging)
        assert.ok(secondToolsInstance._options.logging)
        assert.strictEqual(
            thirdToolsInstance._options.domNodeSelectorPrefix,
            'body.tools div.tools')
    })
    // // endregion
    // // region object orientation
    QUnit.test('controller', (assert:Object):void => {
        assert.strictEqual(tools.controller(tools, []), tools)
        assert.strictEqual(tools.controller(
            $.Tools.class, [], $('body')
        ).constructor.name, tools.constructor.name)
    })
    // // endregion
    // // region mutual exclusion
    QUnit.test('acquireLock|releaseLock', (assert:Object):void => {
        let testValue = false
        tools.acquireLock('test', ():void => {
            testValue = true
        })

        assert.ok(testValue)
        assert.strictEqual(tools.acquireLock('test', ():void => {
            testValue = false
        }, true), tools)
        assert.ok(testValue)
        assert.ok($.Tools().releaseLock('test'))
        assert.ok(testValue)
        assert.strictEqual(tools.releaseLock('test'), tools)
        assert.notOk(testValue)
        assert.strictEqual(tools.acquireLock('test', ():void => {
            testValue = true
        }, true), tools)
        assert.ok(testValue)
        assert.strictEqual(tools.acquireLock('test', ():void => {
            testValue = false
        }), tools)
        assert.notOk(testValue)
    })
    // // endregion
    // // region language fixes
    QUnit.test('mouseOutEventHandlerFix', (assert:Object):void => assert.ok(
        $.Tools.class.mouseOutEventHandlerFix(():void => {})))
    // // endregion
    // // region logging
    QUnit.test('log', (assert:Object):void => assert.strictEqual(
        tools.log('test'), tools))
    QUnit.test('info', (assert:Object):void =>
        assert.strictEqual(tools.info('test {0}'), tools))
    QUnit.test('debug', (assert:Object):void =>
        assert.strictEqual(tools.debug('test'), tools))
    /*
    NOTE: This test breaks java script modules in strict mode.
    QUnit.test('error', (assert:Object):void => assert.strictEqual(tools.error(
        'ignore this error, it is only a {1}', 'test'
    ), tools))
    */
    QUnit.test('warn', (assert:Object):void => assert.strictEqual(
        tools.warn('test'), tools))
    QUnit.test('show', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.show('hans'), 'hans\n(Type: "string")')
        assert.strictEqual($.Tools.class.show({
            A: 'a', B: 'b'
        }), 'A: a\nB: b\n(Type: "object")')
        /* eslint-disable no-control-regex */
        assert.ok((new RegExp(
            '^(.|\n|\r|\u2028|\u2029)+\\(Type: "function"\\)$'
        )).test($.Tools.class.show($.Tools)))
        /* eslint-enable no-control-regex */
        assert.ok((new RegExp('^.+: .+\\n(.|\\n)+$')).test($.Tools.class.show(
            tools)))
    })
    // // endregion
    // // region dom node handling
    QUnit.test('normalizeClassNames', (assert:Object):void => {
        assert.strictEqual($('<div>').Tools(
            'normalizeClassNames'
        ).$domNode.prop('outerHTML'), $('<div>').prop('outerHTML'))
        assert.strictEqual($('<div class>').Tools(
            'normalizeClassNames'
        ).$domNode.html(), $('<div>').html())
        assert.strictEqual($('<div class="">').Tools(
            'normalizeClassNames'
        ).$domNode.html(), $('<div>').html())
        assert.strictEqual(
            $('<div class="a">').Tools('normalizeClassNames').$domNode.prop(
                'outerHTML'
            ), $('<div class="a">').prop('outerHTML'))
        assert.strictEqual(
            $('<div class="b a">').Tools('normalizeClassNames').$domNode.prop(
                'outerHTML'
            ), $('<div class="a b">').prop('outerHTML'))
        assert.strictEqual(
            $('<div class="b a"><pre class="c b a"></pre></div>').Tools(
                'normalizeClassNames'
            ).$domNode.prop('outerHTML'),
            $('<div class="a b"><pre class="a b c"></pre></div>').prop(
                'outerHTML'))
    })
    QUnit.test('isEquivalentDom', (assert:Object):void => {
        assert.ok($.Tools.class.isEquivalentDom('test', 'test'))
        assert.notOk($.Tools.class.isEquivalentDom('test', ''))
        assert.notOk($.Tools.class.isEquivalentDom('test', 'hans'))
        assert.ok($.Tools.class.isEquivalentDom('test test', 'test test'))
        assert.notOk($.Tools.class.isEquivalentDom('test test', 'testtest'))
        assert.notOk($.Tools.class.isEquivalentDom('test test:', ''))
        assert.ok($.Tools.class.isEquivalentDom('<div>', '<div>'))
        assert.ok($.Tools.class.isEquivalentDom('<div class>', '<div>'))
        assert.ok($.Tools.class.isEquivalentDom('<div class="">', '<div>'))
        assert.ok($.Tools.class.isEquivalentDom('<div></div>', '<div>'))
        assert.notOk($.Tools.class.isEquivalentDom(
            '<div class="a"></div>', '<div>'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<div class="a"></div>', '<div class="a"></div>'))
        assert.ok($.Tools.class.isEquivalentDom(
            $('<a target="_blank" class="a"></a>'),
            '<a class="a" target="_blank"></a>'))
        assert.notOk($.Tools.class.isEquivalentDom(
            $('<a class="a"></a>'), '<a class="a" target="_blank"></a>'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="a"></a>',
            '<a class="a" target="_blank"></a>'))
        assert.notOk($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="a"><div a="2"></div></a>',
            '<a class="a" target="_blank"></a>'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="a"><div b="3" a="2"></div></a>',
            '<a class="a" target="_blank"><div a="2" b="3"></div></a>'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="b a"><div b="3" a="2"></div></a>',
            '<a class="a b" target="_blank"><div a="2" b="3"></div></a>'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<div>a</div><div>b</div>', '<div>a</div><div>b</div>'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<div>a</div>b', '<div>a</div>b'))
        assert.notOk($.Tools.class.isEquivalentDom(
            '<div>a</div>b', '<div>a</div>c'))
        assert.notOk($.Tools.class.isEquivalentDom(
            '<div>a</div><div>bc</div>', '<div>a</div><div>b</div>'))
        assert.notOk($.Tools.class.isEquivalentDom('text', 'text a'))
        assert.notOk($.Tools.class.isEquivalentDom('text', 'text a'))
        assert.notOk($.Tools.class.isEquivalentDom('text', 'text a & +'))
        assert.ok($.Tools.class.isEquivalentDom('<br>', '<br />'))
        assert.ok($.Tools.class.isEquivalentDom(
            '<div><br><br /></div>', '<div><br /><br /></div>'))
        assert.ok($.Tools.class.isEquivalentDom('a<br>', 'a<br />', true))
    })
    QUnit.test('getPositionRelativeToViewport', (assert:Object):void =>
        assert.ok(['above', 'left', 'right', 'below', 'in'].includes(
            tools.getPositionRelativeToViewport())))
    QUnit.test('generateDirectiveSelector', (assert:Object):void => {
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'a-b'
        ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]')
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'aB'
        ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]')
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'a'
        ), 'a, .a, [a], [data-a], [x-a]')
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'aa'
        ), 'aa, .aa, [aa], [data-aa], [x-aa]')
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'aaBB'
        ), 'aa-bb, .aa-bb, [aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb], ' +
            '[aa_bb]')
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'aaBbCcDd'
        ), 'aa-bb-cc-dd, .aa-bb-cc-dd, [aa-bb-cc-dd], [data-aa-bb-cc-dd], ' +
        '[x-aa-bb-cc-dd], [aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]')
        assert.strictEqual($.Tools.class.generateDirectiveSelector(
            'mceHREF'
        ), 'mce-href, .mce-href, [mce-href], [data-mce-href], [x-mce-href], ' +
            '[mce\\:href], [mce_href]')
    })
    QUnit.test('removeDirective', (assert:Object):void => {
        const $localBodyDomNode = $bodyDomNode.Tools('removeDirective', 'a')
        assert.equal(
            $localBodyDomNode.Tools().removeDirective('a'), $localBodyDomNode)
    })
    QUnit.test('getNormalizedDirectiveName', (assert:Object):void => {
        assert.equal($.Tools.class.getNormalizedDirectiveName('data-a'), 'a')
        assert.equal($.Tools.class.getNormalizedDirectiveName('x-a'), 'a')
        assert.equal(
            $.Tools.class.getNormalizedDirectiveName('data-a-bb'), 'aBb')
        assert.equal($.Tools.class.getNormalizedDirectiveName('x:a:b'), 'aB')
    })
    QUnit.test('getDirectiveValue', (assert:Object):void => assert.equal(
        $('body').Tools('getDirectiveValue', 'a'), null))
    QUnit.test('sliceDomNodeSelectorPrefix', (assert:Object):void => {
        assert.strictEqual(tools.sliceDomNodeSelectorPrefix('body div'), 'div')
        assert.strictEqual($.Tools({
            domNodeSelectorPrefix: 'body div'
        }).sliceDomNodeSelectorPrefix('body div'), '')
        assert.strictEqual($.Tools({
            domNodeSelectorPrefix: ''
        }).sliceDomNodeSelectorPrefix('body div'), 'body div')
    })
    QUnit.test('getDomNodeName', (assert:Object):void => {
        assert.strictEqual($.Tools.class.getDomNodeName('div'), 'div')
        assert.strictEqual($.Tools.class.getDomNodeName('<div>'), 'div')
        assert.strictEqual($.Tools.class.getDomNodeName('<div />'), 'div')
        assert.strictEqual($.Tools.class.getDomNodeName('<div></div>'), 'div')

        assert.strictEqual($.Tools.class.getDomNodeName('a'), 'a')
        assert.strictEqual($.Tools.class.getDomNodeName('<a>'), 'a')
        assert.strictEqual($.Tools.class.getDomNodeName('<a />'), 'a')
        assert.strictEqual($.Tools.class.getDomNodeName('<a></a>'), 'a')
    })
    QUnit.test('grabDomNode', (assert:Object):void => {
        let $domNodes = tools.grabDomNode({
            qunit: 'body div#qunit', qunitFixture: 'body div#qunit-fixture'})
        delete $domNodes.window
        delete $domNodes.document
        assert.deepEqual($domNodes, {
            qunit: $('body div#qunit'),
            qunitFixture: $('body div#qunit-fixture'),
            parent: $('body')
        })
        $domNodes = tools.grabDomNode({
            qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'})
        delete $domNodes.window
        delete $domNodes.document
        assert.deepEqual($domNodes, {
            parent: $('body'),
            qunit: $('body div#qunit'),
            qunitFixture: $('body div#qunit-fixture')
        })
        $domNodes = tools.grabDomNode({
            qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
        }, 'body')
        delete $domNodes.window
        delete $domNodes.document
        assert.deepEqual($domNodes, {
            parent: $('body'),
            qunit: $('body').find('div#qunit'),
            qunitFixture: $('body').find('div#qunit-fixture')
        })
    })
    // // endregion
    // // region scope
    QUnit.test('isolateScope', (assert:Object):void => {
        assert.deepEqual($.Tools.class.isolateScope({}), {})
        assert.deepEqual($.Tools.class.isolateScope({a: 2}), {a: 2})
        assert.deepEqual($.Tools.class.isolateScope({
            a: 2, b: {a: [1, 2]}
        }), {a: 2, b: {a: [1, 2]}})
        let scope = function():void {
            this.a = 2
        }
        scope.prototype = {b: 2, _a: 5}
        scope = new scope()
        assert.deepEqual($.Tools.class.isolateScope(scope), {
            _a: 5, a: 2, b: undefined
        })
        scope.b = 3
        assert.deepEqual($.Tools.class.isolateScope(scope), {_a: 5, a: 2, b: 3})
        assert.deepEqual($.Tools.class.isolateScope(scope, []), {
            _a: undefined, a: 2, b: 3})
        scope._a = 6
        assert.deepEqual($.Tools.class.isolateScope(scope), {_a: 6, a: 2, b: 3})
        scope = function():void {
            this.a = 2
        }
        scope.prototype = {b: 3}
        assert.deepEqual($.Tools.class.isolateScope(
            new scope(), ['b']
        ), {a: 2, b: 3})
        assert.deepEqual($.Tools.class.isolateScope(new scope()), {
            a: 2, b: undefined
        })
    })
    QUnit.test('determineUniqueScopeName', (assert:Object):void => {
        assert.ok($.Tools.class.determineUniqueScopeName().startsWith(
            'callback'))
        assert.ok($.Tools.class.determineUniqueScopeName('hans').startsWith(
            'hans'))
        assert.ok($.Tools.class.determineUniqueScopeName(
            'hans', '', {}
        ).startsWith('hans'))
        assert.strictEqual($.Tools.class.determineUniqueScopeName(
            'hans', '', {}, 'peter'
        ), 'peter')
        assert.ok($.Tools.class.determineUniqueScopeName(
            'hans', '', {peter: 2}, 'peter'
        ).startsWith('hans'))
        const name:string = $.Tools.class.determineUniqueScopeName(
            'hans', 'klaus', {peter: 2}, 'peter')
        assert.ok(name.startsWith('hans'))
        assert.ok(name.endsWith('klaus'))
        assert.ok(name.length > 'hans'.length + 'klaus'.length)
    })
    // // endregion
    // // region function handling
    QUnit.test('getMethod', (assert:Object):void => {
        const testObject = {value: false}

        tools.getMethod(():void => {
            testObject.value = true
        })()
        assert.ok(testObject.value)

        tools.getMethod(function():void {
            this.value = false
        }, testObject)()
        assert.notOk(testObject.value)

        assert.strictEqual(tools.getMethod((
            five:5, two:2, three:3
        ):number => five + two + three, testObject, 5)(2, 3), 10)
    })
    QUnit.test('identity', (assert:Object):void => {
        assert.strictEqual($.Tools.class.identity(2), 2)
        assert.strictEqual($.Tools.class.identity(''), '')
        assert.strictEqual($.Tools.class.identity(), undefined)
        assert.strictEqual($.Tools.class.identity(null), null)
        assert.strictEqual($.Tools.class.identity('hans'), 'hans')
        assert.ok($.Tools.class.identity({}) !== {})
        const testObject = {}
        assert.strictEqual($.Tools.class.identity(testObject), testObject)
    })
    QUnit.test('invertArrayFilter', (assert:Object):void => {
        assert.deepEqual($.Tools.class.invertArrayFilter(
            $.Tools.class.arrayDeleteEmptyItems
        )([{a: null}]), [{a: null}])
        assert.deepEqual($.Tools.class.invertArrayFilter(
            $.Tools.class.arrayExtractIfMatches
        )(['a', 'b'], '^a$'), ['b'])
    })
    // // endregion
    // // region event
    QUnit.test('debounce', (assert:Object):void => {
        let testValue = false
        $.Tools.class.debounce(():void => {
            testValue = true
        })()
        assert.ok(testValue)
        $.Tools.class.debounce(():void => {
            testValue = false
        }, 1000)()
        assert.notOk(testValue)
    })
    QUnit.test('fireEvent', (assert:Object):void => {
        let testValue = false

        assert.strictEqual($.Tools({onClick: ():void => {
            testValue = true
        }}).fireEvent('click', true), true)
        assert.ok(testValue)
        assert.strictEqual($.Tools({onClick: ():void => {
            testValue = false
        }}).fireEvent('click', true), true)
        assert.notOk(testValue)
        assert.strictEqual(tools.fireEvent('click'), false)
        assert.notOk(testValue)
        tools.onClick = ():void => {
            testValue = true
        }
        assert.strictEqual(tools.fireEvent('click'), false)
        assert.ok(testValue)
        tools.onClick = ():void => {
            testValue = false
        }
        assert.strictEqual(tools.fireEvent('click', true), false)
        assert.ok(testValue)
    })
    QUnit.test('on', (assert:Object):void => {
        let testValue = false
        assert.strictEqual(tools.on('body', 'click', ():void => {
            testValue = true
        })[0], $('body')[0])

        $('body').trigger('click')
        assert.ok(testValue)
    })
    QUnit.test('off', (assert:Object):void => {
        let testValue = false
        assert.strictEqual(tools.on('body', 'click', ():void => {
            testValue = true
        })[0], $('body')[0])
        assert.strictEqual(tools.off('body', 'click')[0], $('body')[0])

        $('body').trigger('click')
        assert.notOk(testValue)
    })
    // // endregion
    // // region object
    QUnit.test('convertPlainObjectToMap', (assert:Object):void => {
        assert.deepEqual($.Tools.class.convertPlainObjectToMap(null), null)
        assert.deepEqual($.Tools.class.convertPlainObjectToMap(true), true)
        assert.deepEqual($.Tools.class.convertPlainObjectToMap(0), 0)
        assert.deepEqual($.Tools.class.convertPlainObjectToMap(2), 2)
        assert.deepEqual($.Tools.class.convertPlainObjectToMap('a'), 'a')
        assert.deepEqual($.Tools.class.convertPlainObjectToMap({}), new Map())
        assert.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{}]), [new Map()])
        assert.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{}], false), [{}])
        assert.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{a: {}, b: 2}]),
            [new Map([['a', new Map()], ['b', 2]])])
        assert.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{b: 2, a: {}}]),
            [new Map([['a', new Map()], ['b', 2]])])
        assert.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{b: 2, a: new Map()}]),
            [new Map([['a', new Map()], ['b', 2]])])
        assert.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{b: 2, a: [{}]}]),
            [new Map([['a', [new Map()]], ['b', 2]])])
    })
    QUnit.test('convertMapToPlainObject', (assert:Object):void => {
        assert.deepEqual($.Tools.class.convertMapToPlainObject(null), null)
        assert.deepEqual($.Tools.class.convertMapToPlainObject(true), true)
        assert.deepEqual($.Tools.class.convertMapToPlainObject(0), 0)
        assert.deepEqual($.Tools.class.convertMapToPlainObject(2), 2)
        assert.deepEqual($.Tools.class.convertMapToPlainObject('a'), 'a')
        assert.deepEqual($.Tools.class.convertMapToPlainObject(new Map()), {})
        assert.deepEqual(
            $.Tools.class.convertMapToPlainObject([new Map()]), [{}])
        assert.deepEqual(
            $.Tools.class.convertMapToPlainObject([new Map()], false),
            [new Map()])
        assert.deepEqual($.Tools.class.convertMapToPlainObject(
            [new Map([['a', 2], [2, 2]])]
        ), [{a: 2, '2': 2}])
        assert.deepEqual($.Tools.class.convertMapToPlainObject(
            [new Map([['a', new Map()], [2, 2]])]
        ), [{a: {}, '2': 2}])
        assert.deepEqual($.Tools.class.convertMapToPlainObject(
            [new Map([['a', new Map([['a', 2]])], [2, 2]])]
        ), [{a: {a: 2}, '2': 2}])
    })
    QUnit.test('forEachSorted', (assert:Object):void => {
        let result = []
        const tester = (item:Array<any>|Object):Array<any> =>
            $.Tools.class.forEachSorted(
                item, (value:any, key:string|number):number =>
                    result.push([key, value]))
        tester({})
        assert.deepEqual(result, [])
        assert.deepEqual(tester({}), [])
        assert.deepEqual(tester([]), [])
        assert.deepEqual(tester({a: 2}), ['a'])
        assert.deepEqual(tester({b: 1, a: 2}), ['a', 'b'])
        result = []
        tester({b: 1, a: 2})
        assert.deepEqual(result, [['a', 2], ['b', 1]])
        result = []

        tester([2, 2])
        assert.deepEqual(result, [[0, 2], [1, 2]])
        result = []
        tester({'5': 2, '6': 2, '2': 3})
        assert.deepEqual(result, [['2', 3], ['5', 2], ['6', 2]])
        result = []
        tester({a: 2, c: 2, z: 3})
        assert.deepEqual(result, [['a', 2], ['c', 2], ['z', 3]])
        $.Tools.class.forEachSorted([1], function():number {
            result = this
            return result
        }, 2)
        assert.deepEqual(result, 2)
    })
    QUnit.test('sort', (assert:Object):void => {
        assert.deepEqual($.Tools.class.sort([]), [])
        assert.deepEqual($.Tools.class.sort({}), [])
        assert.deepEqual($.Tools.class.sort([1]), [0])
        assert.deepEqual($.Tools.class.sort([1, 2, 3]), [0, 1, 2])
        assert.deepEqual($.Tools.class.sort([3, 2, 1]), [0, 1, 2])
        assert.deepEqual($.Tools.class.sort([2, 3, 1]), [0, 1, 2])
        assert.deepEqual($.Tools.class.sort({'1': 2, '2': 5, '3': 'a'}), [
            '1', '2', '3'])
        assert.deepEqual($.Tools.class.sort({'2': 2, '1': 5, '-5': 'a'}), [
            '-5', '1', '2'])
        assert.deepEqual($.Tools.class.sort({'3': 2, '2': 5, '1': 'a'}), [
            '1', '2', '3'])
        assert.deepEqual($.Tools.class.sort(
            {a: 2, b: 5, c: 'a'}), ['a', 'b', 'c'])
        assert.deepEqual($.Tools.class.sort(
            {c: 2, b: 5, a: 'a'}), ['a', 'b', 'c'])
        assert.deepEqual($.Tools.class.sort(
            {b: 2, c: 5, z: 'a'}), ['b', 'c', 'z'])
    })
    QUnit.test('equals', (assert:Object):void => {
        assert.ok($.Tools.class.equals(1, 1))
        assert.ok($.Tools.class.equals((new Date()), (new Date())))
        assert.ok($.Tools.class.equals((new Date(1995, 11, 17)), (new Date(
            1995, 11, 17))))
        assert.notOk($.Tools.class.equals((new Date(1995, 11, 17)), (new Date(
            1995, 11, 16))))
        assert.ok($.Tools.class.equals(/a/, /a/))
        assert.notOk($.Tools.class.equals(/a/i, /a/))
        assert.notOk($.Tools.class.equals(1, 2))
        assert.ok($.Tools.class.equals({a: 2}, {a: 2}))
        assert.notOk($.Tools.class.equals({a: 2, b: 3}, {a: 2}))
        assert.ok($.Tools.class.equals({a: 2, b: 3}, {a: 2, b: 3}))
        assert.ok($.Tools.class.equals([1, 2, 3], [1, 2, 3]))
        assert.notOk($.Tools.class.equals([1, 2, 3, 4], [1, 2, 3, 5]))
        assert.notOk($.Tools.class.equals([1, 2, 3, 4], [1, 2, 3]))
        assert.ok($.Tools.class.equals([], []))
        assert.ok($.Tools.class.equals({}, {}))
        assert.ok($.Tools.class.equals([1, 2, 3, {a: 2}], [1, 2, 3, {a: 2}]))
        assert.notOk($.Tools.class.equals([1, 2, 3, {a: 2}], [1, 2, 3, {b: 2}]))
        assert.ok($.Tools.class.equals([1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]))
        assert.notOk($.Tools.class.equals([1, 2, 3, [1, 2]], [1, 2, 3, [
            1, 2, 3]]))
        assert.notOk($.Tools.class.equals([1, 2, 3, [1, 2, 3]], [1, 2, 3, [
            1, 2]]))
        assert.notOk($.Tools.class.equals([1, 2, 3, [1, 2, 3]], [1, 2, 3, [
            1, 2, {}]]))
        assert.ok($.Tools.class.equals([{a: 1}], [{a: 1}]))
        assert.notOk($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}]))
        assert.ok($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], []))
        assert.ok($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], ['a']))
        assert.notOk($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], ['a', 'b']))
        assert.ok($.Tools.class.equals(2, 2, 0))
        assert.notOk($.Tools.class.equals(1, 2, 0))
        assert.ok($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], null, 0))
        assert.notOk($.Tools.class.equals([{a: 1}, {b: 1}], [{a: 1}], null, 1))
        assert.ok($.Tools.class.equals(
            [{a: 1}, {b: 1}], [{a: 1}, {b: 1}], null, 1))
        assert.ok($.Tools.class.equals(
            [{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], null, 1))
        assert.notOk($.Tools.class.equals(
            [{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], null, 2))
        assert.ok($.Tools.class.equals(
            [{a: {b: 1}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 2))
        assert.ok($.Tools.class.equals(
            [{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 2))
        assert.notOk($.Tools.class.equals(
            [{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 3))
        assert.ok($.Tools.class.equals(
            [{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 3, ['b']))
        assert.ok($.Tools.class.equals(():void => {}, ():void => {}))
        assert.notOk($.Tools.class.equals(
            ():void => {}, ():void => {}, null, -1, [], false))
        const test = ():void => {}
        assert.ok($.Tools.class.equals(test, test, null, -1, [], false))
    })
    // // endregion
    // // region array
    QUnit.test('argumentsObjectToArray', (assert:Object):void => {
        assert.notOk($.isArray(arguments))
        assert.ok($.isArray($.Tools.class.argumentsObjectToArray(arguments)))
    })
    QUnit.test('arrayUnique', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayUnique([1, 2, 3, 1]), [1, 2, 3])
        assert.deepEqual(
            $.Tools.class.arrayUnique([1, 2, 3, 1, 2, 3]), [1, 2, 3])
        assert.deepEqual($.Tools.class.arrayUnique([]), [])
        assert.deepEqual($.Tools.class.arrayUnique([1, 2, 3]), [1, 2, 3])
    })
    QUnit.test('arrayAggregatePropertyIfEqual', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.arrayAggregatePropertyIfEqual([{a: 'b'}], 'a'), 'b')
        assert.strictEqual($.Tools.class.arrayAggregatePropertyIfEqual(
            [{a: 'b'}, {a: 'b'}], 'a'
        ), 'b')
        assert.strictEqual($.Tools.class.arrayAggregatePropertyIfEqual(
            [{a: 'b'}, {a: 'c'}], 'a'
        ), '')
        assert.strictEqual($.Tools.class.arrayAggregatePropertyIfEqual(
            [{a: 'b'}, {a: 'c'}], 'a', false
        ), false)
    })
    QUnit.test('arrayDeleteEmptyItems', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayDeleteEmptyItems([{a: null}]), [])
        assert.deepEqual($.Tools.class.arrayDeleteEmptyItems(
            [{a: null, b: 2}]
        ), [{a: null, b: 2}])
        assert.deepEqual($.Tools.class.arrayDeleteEmptyItems(
            [{a: null, b: 2}], ['a']
        ), [])
        assert.deepEqual($.Tools.class.arrayDeleteEmptyItems([], ['a']), [])
        assert.deepEqual($.Tools.class.arrayDeleteEmptyItems([]), [])
    })
    QUnit.test('arrayExtract', (assert:Object):void => {
        assert.deepEqual(
            $.Tools.class.arrayExtract([{a: 'b', c: 'd'}], ['a']), [{a: 'b'}])
        assert.deepEqual(
            $.Tools.class.arrayExtract([{a: 'b', c: 'd'}], ['b']), [{}])
        assert.deepEqual(
            $.Tools.class.arrayExtract([{a: 'b', c: 'd'}], ['c']), [{c: 'd'}])
        assert.deepEqual($.Tools.class.arrayExtract(
            [{a: 'b', c: 'd'}, {a: 3}], ['c']
        ), [{c: 'd'}, {}])
        assert.deepEqual($.Tools.class.arrayExtract(
            [{a: 'b', c: 'd'}, {c: 3}], ['c']
        ), [{c: 'd'}, {c: 3}])
    })
    QUnit.test('arrayExtractIfMatches', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayExtractIfMatches(['b'], /b/), ['b'])
        assert.deepEqual($.Tools.class.arrayExtractIfMatches(['b'], 'b'), ['b'])
        assert.deepEqual($.Tools.class.arrayExtractIfMatches(['b'], 'a'), [])
        assert.deepEqual($.Tools.class.arrayExtractIfMatches([], 'a'), [])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], ''), ['a', 'b'])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], '^$'), [])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], 'b'), ['b'])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], '[ab]'),
            ['a', 'b'])
    })
    QUnit.test('arrayExtractIfPropertyExists', (assert:Object):void => {
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([{a: 2}], 'a'),
            [{a: 2}])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([{a: 2}], 'b'), [])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([], 'b'), [])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([{a: 2}, {b: 3}], 'a'
        ), [{a: 2}])
    })
    QUnit.test('arrayExtractIfPropertyMatches', (assert:Object):void => {
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([{a: 'b'}],
            {a: 'b'}), [{a: 'b'}])
        assert.deepEqual($.Tools.class.arrayExtractIfPropertyMatches(
            [{a: 'b'}], {a: '.'}
        ), [{a: 'b'}])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([{a: 'b'}], {a: 'a'}),
            [])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([], {a: 'a'}), [])
        assert.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([{a: 2}], {b: /a/}),
            [])
        assert.deepEqual($.Tools.class.arrayExtractIfPropertyMatches([{
            mimeType: 'text/x-webm'
        }], {mimeType: new RegExp('^text/x-webm$')}),
        [{mimeType: 'text/x-webm'}])
    })
    QUnit.test('arrayIntersect', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayIntersect(['A'], ['A']), ['A'])
        assert.deepEqual($.Tools.class.arrayIntersect(['A', 'B'], ['A']), ['A'])
        assert.deepEqual($.Tools.class.arrayIntersect([], []), [])
        assert.deepEqual($.Tools.class.arrayIntersect([5], []), [])
        assert.deepEqual($.Tools.class.arrayIntersect(
            [{a: 2}], [{a: 2}]), [{a: 2}])
        assert.deepEqual($.Tools.class.arrayIntersect([{a: 3}], [{a: 2}]), [])
        assert.deepEqual($.Tools.class.arrayIntersect([{a: 3}], [{b: 3}]), [])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{a: 3}], [{b: 3}], ['b']), [])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{a: 3}], [{b: 3}], ['b'], false), [])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{b: null}], [{b: null}], ['b']),
            [{b: null}])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{b: null}], [{b: undefined}], ['b']),
            [])
        assert.deepEqual($.Tools.class.arrayIntersect(
            [{b: null}], [{b: undefined}], ['b'], false
        ), [{b: null}])
        assert.deepEqual($.Tools.class.arrayIntersect(
            [{b: null}], [{}], ['b'], false
        ), [{b: null}])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{b: undefined}], [{}], ['b'], false),
            [{b: undefined}])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{}], [{}], ['b'], false), [{}])
        assert.deepEqual(
            $.Tools.class.arrayIntersect([{b: null}], [{}], ['b']), [])
        assert.deepEqual($.Tools.class.arrayIntersect(
            [{b: undefined}], [{}], ['b'], true), [{b: undefined}])
        assert.deepEqual($.Tools.class.arrayIntersect(
            [{b: 1}], [{a: 1}], {b: 'a'}, true), [{b: 1}])
    })
    QUnit.test('arrayMakeRange', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayMakeRange([0]), [0])
        assert.deepEqual($.Tools.class.arrayMakeRange([5]), [0, 1, 2, 3, 4, 5])
        assert.deepEqual($.Tools.class.arrayMakeRange([]), [])
        assert.deepEqual($.Tools.class.arrayMakeRange([2, 5]), [2, 3, 4, 5])
    })
    QUnit.test('arraySumUpProperty', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.arraySumUpProperty([{a: 2}, {a: 3}], 'a'), 5)
        assert.strictEqual(
            $.Tools.class.arraySumUpProperty([{a: 2}, {b: 3}], 'a'), 2)
        assert.strictEqual(
            $.Tools.class.arraySumUpProperty([{a: 2}, {b: 3}], 'c'), 0)
    })
    QUnit.test('arrayAppendAdd', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayAppendAdd({}, {}, 'b'), {b: [{}]})
        const test = {}
        assert.deepEqual(
            $.Tools.class.arrayAppendAdd(test, {a: 3}, 'b'), {b: [{a: 3}]})
        assert.deepEqual($.Tools.class.arrayAppendAdd(
            test, {a: 3}, 'b'
        ), {b: [{a: 3}, {a: 3}]})
        assert.deepEqual(
            $.Tools.class.arrayAppendAdd({b: [2]}, 2, 'b', false), {b: [2, 2]})
        assert.deepEqual(
            $.Tools.class.arrayAppendAdd({b: [2]}, 2, 'b'), {b: [2]})
    })
    QUnit.test('arrayRemove', (assert:Object):void => {
        assert.deepEqual($.Tools.class.arrayRemove([], 2), [])
        assert.throws(():?Array<any> => $.Tools.class.arrayRemove(
            [], 2, true
        ), Error("Given target doesn't exists in given list."))
        assert.deepEqual($.Tools.class.arrayRemove([2], 2), [])
        assert.deepEqual($.Tools.class.arrayRemove([2], 2, true), [])
        assert.deepEqual($.Tools.class.arrayRemove([1, 2], 2), [1])
        assert.deepEqual($.Tools.class.arrayRemove([1, 2], 2, true), [1])
    })
    // // endregion
    // // region string
    // /// region url handling
    QUnit.test('stringEncodeURIComponent', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringEncodeURIComponent(''), '')
        assert.strictEqual($.Tools.class.stringEncodeURIComponent(' '), '+')
        assert.strictEqual(
            $.Tools.class.stringEncodeURIComponent(' ', true), '%20')
        assert.strictEqual(
            $.Tools.class.stringEncodeURIComponent('@:$, '), '@:$,+')
        assert.strictEqual($.Tools.class.stringEncodeURIComponent('+'), '%2B')
    })
    QUnit.test('stringAddSeparatorToPath', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringAddSeparatorToPath(''), '')
        assert.strictEqual($.Tools.class.stringAddSeparatorToPath('/'), '/')
        assert.strictEqual($.Tools.class.stringAddSeparatorToPath('/a'), '/a/')
        assert.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb/'), '/a/bb/')
        assert.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb'), '/a/bb/')
        assert.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb', '|'), '/a/bb|')
        assert.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb/', '|'), '/a/bb/|')
    })
    QUnit.test('stringHasPathPrefix', (assert:Object):void => {
        assert.ok($.Tools.class.stringHasPathPrefix('/admin', '/admin'))
        assert.ok($.Tools.class.stringHasPathPrefix('test', 'test'))
        assert.ok($.Tools.class.stringHasPathPrefix('', ''))
        assert.ok($.Tools.class.stringHasPathPrefix('a', 'a/b'))
        assert.notOk($.Tools.class.stringHasPathPrefix('b', 'a/b'))
        assert.notOk($.Tools.class.stringHasPathPrefix('b/', 'a/b'))
        assert.ok($.Tools.class.stringHasPathPrefix('a/', 'a/b'))
        assert.notOk(
            $.Tools.class.stringHasPathPrefix('/admin/', '/admin/test', '#'))
        assert.notOk(
            $.Tools.class.stringHasPathPrefix('/admin', '/admin/test', '#'))
        assert.ok(
            $.Tools.class.stringHasPathPrefix('/admin', '/admin#test', '#'))
    })
    QUnit.test('stringGetDomainName', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringGetDomainName(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 'www.test.de')
        assert.strictEqual($.Tools.class.stringGetDomainName('a', true), true)
        assert.strictEqual(
            $.Tools.class.stringGetDomainName('http://www.test.de'),
            'www.test.de')
        assert.strictEqual(
            $.Tools.class.stringGetDomainName('http://a.de'), 'a.de')
        assert.strictEqual(
            $.Tools.class.stringGetDomainName('http://localhost'), 'localhost')
        assert.strictEqual(
            $.Tools.class.stringGetDomainName('localhost', 'a'), 'a')
        assert.strictEqual($.Tools.class.stringGetDomainName(
            'a', location.hostname
        ), location.hostname)
        assert.strictEqual($.Tools.class.stringGetDomainName('//a'), 'a')
        assert.strictEqual($.Tools.class.stringGetDomainName(
            'a/site/subSite?param=value#hash', location.hostname
        ), location.hostname)
        assert.strictEqual($.Tools.class.stringGetDomainName(
            '/a/site/subSite?param=value#hash', location.hostname
        ), location.hostname)
        assert.strictEqual($.Tools.class.stringGetDomainName(
            '//alternate.local/a/site/subSite?param=value#hash'
        ), 'alternate.local')
        assert.strictEqual($.Tools.class.stringGetDomainName(
            '//alternate.local/'
        ), 'alternate.local')
    })
    QUnit.test('stringGetPortNumber', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringGetPortNumber(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 443)
        assert.strictEqual(
            $.Tools.class.stringGetPortNumber('http://www.test.de'), 80)
        assert.strictEqual(
            $.Tools.class.stringGetPortNumber('http://www.test.de', true),
            true)
        assert.strictEqual(
            $.Tools.class.stringGetPortNumber('www.test.de', true), true)
        assert.strictEqual($.Tools.class.stringGetPortNumber('a', true), true)
        assert.strictEqual($.Tools.class.stringGetPortNumber('a', true), true)
        assert.strictEqual($.Tools.class.stringGetPortNumber('a:80'), 80)
        assert.strictEqual($.Tools.class.stringGetPortNumber('a:20'), 20)
        assert.strictEqual($.Tools.class.stringGetPortNumber('a:444'), 444)
        assert.strictEqual(
            $.Tools.class.stringGetPortNumber('http://localhost:89'), 89)
        assert.strictEqual(
            $.Tools.class.stringGetPortNumber('https://localhost:89'), 89)
    })
    QUnit.test('stringGetProtocolName', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 'https')
        assert.strictEqual(
            $.Tools.class.stringGetProtocolName('http://www.test.de'), 'http')
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            '//www.test.de', location.protocol.substring(
                0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
        assert.strictEqual($.Tools.class.stringGetProtocolName('http://a.de'), 'http')
        assert.strictEqual(
            $.Tools.class.stringGetProtocolName('ftp://localhost'), 'ftp')
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            'a', location.protocol.substring(0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            'a/site/subSite?param=value#hash', location.protocol.substring(
                0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            '/a/site/subSite?param=value#hash', 'a'
        ), 'a')
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            'alternate.local/a/site/subSite?param=value#hash', 'b'
        ), 'b')
        assert.strictEqual(
            $.Tools.class.stringGetProtocolName('alternate.local/', 'c'), 'c')
        assert.strictEqual($.Tools.class.stringGetProtocolName(
            '', location.protocol.substring(0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
    })
    QUnit.test('stringGetURLVariable', (assert:Object):void => {
        assert.ok($.isArray($.Tools.class.stringGetURLVariable()))
        assert.ok($.isArray($.Tools.class.stringGetURLVariable(null, '&')))
        assert.ok($.isArray($.Tools.class.stringGetURLVariable(null, '#')))
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('notExisting'), undefined)
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('notExisting', '&'), undefined)
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('notExisting', '#'), undefined)
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('test', '?test=2'), '2')
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('test', 'test=2'), '2')
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('test', 'test=2&a=2'), '2')
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('test', 'b=3&test=2&a=2'), '2')
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2')
        assert.strictEqual(
            $.Tools.class.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', '', '#$test=2'
        ), '2')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', '?test=4', '#$test=3'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'a', '&', '$', '!', '?test=4', '#$test=3'
        ), undefined)
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '?test=4', '#$test=3'
        ), '3')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/test/a#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/test/a/#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test/a/#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test?test=3#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '?', '!', null, '#!a?test=3'
        ), '3')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!test#$test=4'
        ), '4')
        assert.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!test?test=3#$test=4'
        ), '4')
    })
    QUnit.test('stringIsInternalURL', (assert:Object):void => {
        assert.ok($.Tools.class.stringIsInternalURL(
            'https://www.test.de/site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'))
        assert.notOk($.Tools.class.stringIsInternalURL(
            `${location.protocol}//www.test.de/site/subSite?param=value#hash`,
            'ftp://www.test.de/site/subSite?param=value#hash'))
        assert.notOk($.Tools.class.stringIsInternalURL(
            'https://www.test.de/site/subSite?param=value#hash',
            'http://www.test.de/site/subSite?param=value#hash'))
        assert.notOk($.Tools.class.stringIsInternalURL(
            'http://www.test.de/site/subSite?param=value#hash',
            'test.de/site/subSite?param=value#hash'))
        assert.notOk($.Tools.class.stringIsInternalURL(
            `${location.protocol}//www.test.de:${location.port}/site/` +
            'subSite?param=value#hash/site/subSite?param=value#hash'))
        assert.ok($.Tools.class.stringIsInternalURL(
            '//www.test.de/site/subSite?param=value#hash',
            '//www.test.de/site/subSite?param=value#hash'))
        assert.ok($.Tools.class.stringIsInternalURL(
            `${location.protocol}//www.test.de/site/subSite?param=value#hash`,
            `${location.protocol}//www.test.de/site/subSite?param=value#hash`))
        assert.notOk($.Tools.class.stringIsInternalURL(
            `http://www.test.de:${location.port}/site/subSite?param=value` +
                '#hash',
            'https://www.test.de/site/subSite?param=value#hash'))
        assert.ok($.Tools.class.stringIsInternalURL(
            'https://www.test.de:443/site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'))
        assert.ok($.Tools.class.stringIsInternalURL(
            '//www.test.de:80/site/subSite?param=value#hash',
            '//www.test.de/site/subSite?param=value#hash'))
        assert.ok(
            $.Tools.class.stringIsInternalURL(location.href, location.href))
        assert.ok($.Tools.class.stringIsInternalURL('1', location.href))
        assert.ok($.Tools.class.stringIsInternalURL('#1', location.href))
        assert.ok($.Tools.class.stringIsInternalURL('/a', location.href))
    })
    QUnit.test('stringNormalizeURL', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringNormalizeURL('www.test.com'),
            'http://www.test.com')
        assert.strictEqual(
            $.Tools.class.stringNormalizeURL('test'), 'http://test')
        assert.strictEqual(
            $.Tools.class.stringNormalizeURL('http://test'), 'http://test')
        assert.strictEqual(
            $.Tools.class.stringNormalizeURL('https://test'), 'https://test')
    })
    QUnit.test('stringRepresentURL', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringRepresentURL('http://www.test.com'),
            'www.test.com')
        assert.strictEqual($.Tools.class.stringRepresentURL(
            'ftp://www.test.com'
        ), 'ftp://www.test.com')
        assert.strictEqual($.Tools.class.stringRepresentURL(
            'https://www.test.com'
        ), 'www.test.com')
        assert.strictEqual($.Tools.class.stringRepresentURL(undefined), '')
        assert.strictEqual($.Tools.class.stringRepresentURL(null), '')
        assert.strictEqual($.Tools.class.stringRepresentURL(false), '')
        assert.strictEqual($.Tools.class.stringRepresentURL(true), '')
        assert.strictEqual($.Tools.class.stringRepresentURL(''), '')
        assert.strictEqual($.Tools.class.stringRepresentURL(' '), '')
    })
    // /// endregion
    QUnit.test('stringCamelCaseToDelimited', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hansPeter'),
            'hans-peter')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '|'
        ), 'hans|peter')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited(''), '')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited('h'), 'h')
        assert.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hP', ''), 'hp')
        assert.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hansPeter'),
            'hans-peter')
        assert.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hans-peter'),
            'hans-peter')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '_'
        ), 'hans_peter')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '+'
        ), 'hans+peter')
        assert.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('Hans'), 'hans')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansAPIURL', '-', ['api', 'url']
        ), 'hans-api-url')
        assert.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '-', []), 'hans-peter')
    })
    QUnit.test('stringCapitalize', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringCapitalize('hansPeter'), 'HansPeter')
        assert.strictEqual($.Tools.class.stringCapitalize(''), '')
        assert.strictEqual($.Tools.class.stringCapitalize('a'), 'A')
        assert.strictEqual($.Tools.class.stringCapitalize('A'), 'A')
        assert.strictEqual($.Tools.class.stringCapitalize('AA'), 'AA')
        assert.strictEqual($.Tools.class.stringCapitalize('Aa'), 'Aa')
        assert.strictEqual($.Tools.class.stringCapitalize('aa'), 'Aa')
    })
    QUnit.test('stringDelimitedToCamelCase', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans-peter'),
            'hansPeter')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans|peter', '|'
        ), 'hansPeter')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(''), '')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase('h'), 'h')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans-peter'),
            'hansPeter')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans--peter'),
            'hans-Peter')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('Hans-Peter'),
            'HansPeter')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('-Hans-Peter'),
            '-HansPeter')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase('-'), '-')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans-peter', '_'),
            'hans-peter')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans_peter', '_'),
            'hansPeter')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans_id', '_'), 'hansID')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'url_hans_id', '_', ['hans']
        ), 'urlHANSId')
        assert.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('url_hans_1', '_'),
            'urlHans1')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hansUrl1', '-', ['url'], true
        ), 'hansUrl1')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-url', '-', ['url'], true
        ), 'hansURL')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-Url', '-', ['url'], true
        ), 'hansUrl')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-Url', '-', ['url'], false
        ), 'hansURL')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-Url', '-', [], false
        ), 'hansUrl')
        assert.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans--Url', '-', [], false, true
        ), 'hansUrl')
    })
    QUnit.test('stringFormat', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringFormat('{1}', 'test'), 'test')
        assert.strictEqual($.Tools.class.stringFormat('', 'test'), '')
        assert.strictEqual($.Tools.class.stringFormat('{1}'), '{1}')
        assert.strictEqual(
            $.Tools.class.stringFormat('{1} test {2} - {2}', 1, 2),
            '1 test 2 - 2')
    })
    QUnit.test('stringGetRegularExpressionValidated', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringGetRegularExpressionValidated(
            "that's no regex: .*$"
        ), "that's no regex: \\.\\*\\$")
        assert.strictEqual(
            $.Tools.class.stringGetRegularExpressionValidated(''), '')
        assert.strictEqual($.Tools.class.stringGetRegularExpressionValidated(
            '-[]()^$*+.}-\\'
        ), '\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\')
        assert.strictEqual(
            $.Tools.class.stringGetRegularExpressionValidated('-'), '\\-')
    })
    QUnit.test('stringLowerCase', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringLowerCase('HansPeter'), 'hansPeter')
        assert.strictEqual($.Tools.class.stringLowerCase(''), '')
        assert.strictEqual($.Tools.class.stringLowerCase('A'), 'a')
        assert.strictEqual($.Tools.class.stringLowerCase('a'), 'a')
        assert.strictEqual($.Tools.class.stringLowerCase('aa'), 'aa')
        assert.strictEqual($.Tools.class.stringLowerCase('Aa'), 'aa')
        assert.strictEqual($.Tools.class.stringLowerCase('aa'), 'aa')
    })
    QUnit.test('stringMark', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringMark(''), '')
        assert.strictEqual($.Tools.class.stringMark(
            'test', 'e'
        ), 't<span class="tools-mark">e</span>st')
        assert.strictEqual($.Tools.class.stringMark(
            'test', 'es'
        ), 't<span class="tools-mark">es</span>t')
        assert.strictEqual($.Tools.class.stringMark(
            'test', 'test'
        ), '<span class="tools-mark">test</span>')
        assert.strictEqual($.Tools.class.stringMark('test', ''), 'test')
        assert.strictEqual($.Tools.class.stringMark('test', 'tests'), 'test')
        assert.strictEqual($.Tools.class.stringMark('', 'test'), '')
        assert.strictEqual(
            $.Tools.class.stringMark('test', 'e', '<a>{1}</a>'), 't<a>e</a>st')
        assert.strictEqual(
            $.Tools.class.stringMark('test', 'E', '<a>{1}</a>'), 't<a>e</a>st')
        assert.strictEqual($.Tools.class.stringMark(
            'test', 'E', '<a>{1}</a>', false
        ), 't<a>e</a>st')
        assert.strictEqual($.Tools.class.stringMark(
            'tesT', 't', '<a>{1}</a>'
        ), '<a>t</a>es<a>T</a>')
        assert.strictEqual($.Tools.class.stringMark(
            'tesT', 't', '<a>{1} - {1}</a>'
        ), '<a>t - t</a>es<a>T - T</a>')
        assert.strictEqual(
            $.Tools.class.stringMark('test', 'E', '<a>{1}</a>', true), 'test')
    })
    QUnit.test('stringMD5', (assert:Object):void => {
        assert.strictEqual(
            $.Tools.class.stringMD5(''), 'd41d8cd98f00b204e9800998ecf8427e')
        assert.strictEqual(
            $.Tools.class.stringMD5('test'), '098f6bcd4621d373cade4e832627b4f6'
        )
        assert.strictEqual(
            $.Tools.class.stringMD5('ä'), '8419b71c87a225a2c70b50486fbee545')
        assert.strictEqual(
            $.Tools.class.stringMD5('test', true),
            '098f6bcd4621d373cade4e832627b4f6')
        assert.strictEqual(
            $.Tools.class.stringMD5('ä', true),
            'c15bcc5577f9fade4b4a3256190a59b0')
    })
    QUnit.test('stringNormalizePhoneNumber', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringNormalizePhoneNumber('0'), '0')
        assert.strictEqual($.Tools.class.stringNormalizePhoneNumber(0), '0')
        assert.strictEqual($.Tools.class.stringNormalizePhoneNumber(
            '+49 172 (0) / 0212 - 3'
        ), '0049172002123')
    })
    QUnit.test('stringRepresentPhoneNumber', (assert:Object):void => {
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber('0'), '0')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(
            '0172-12321-1'
        ), '+49 (0) 172 / 123 21-1')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(
            '0172-123211'
        ), '+49 (0) 172 / 12 32 11')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(
            '0172-1232111'
        ), '+49 (0) 172 / 123 21 11')
        assert.strictEqual(
            $.Tools.class.stringRepresentPhoneNumber(undefined), '')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(null), '')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(false), '')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(true), '')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(''), '')
        assert.strictEqual($.Tools.class.stringRepresentPhoneNumber(' '), '')
    })
    QUnit.test('stringDecodeHTMLEntities', (assert:Object):void => {
        assert.equal($.Tools.class.stringDecodeHTMLEntities(''), '')
        assert.equal($.Tools.class.stringDecodeHTMLEntities(
            '<div></div>'
        ), '<div></div>')
        assert.equal(
            $.Tools.class.stringDecodeHTMLEntities('<div>&amp;</div>'),
            '<div>&</div>')
        assert.equal($.Tools.class.stringDecodeHTMLEntities(
            '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>'
        ), '<div>&äÄüÜöÖ</div>')
    })
    // / endregion
    // // region number
    QUnit.test('numberIsNotANumber', (assert:Object):void => {
        assert.strictEqual($.Tools.class.numberIsNotANumber(NaN), true)
        assert.strictEqual($.Tools.class.numberIsNotANumber({}), false)
        assert.strictEqual($.Tools.class.numberIsNotANumber(undefined), false)
        assert.strictEqual(
            $.Tools.class.numberIsNotANumber(new Date().toString()), false)
        assert.strictEqual($.Tools.class.numberIsNotANumber(null), false)
        assert.strictEqual($.Tools.class.numberIsNotANumber(false), false)
        assert.strictEqual($.Tools.class.numberIsNotANumber(true), false)
        assert.strictEqual($.Tools.class.numberIsNotANumber(0), false)
    })
    QUnit.test('numberRound', (assert:Object):void => {
        assert.strictEqual($.Tools.class.numberRound(1.5, 0), 2)
        assert.strictEqual($.Tools.class.numberRound(1.4, 0), 1)
        assert.strictEqual($.Tools.class.numberRound(1.4, -1), 0)
        assert.strictEqual($.Tools.class.numberRound(1000, -2), 1000)
        assert.strictEqual($.Tools.class.numberRound(999, -2), 1000)
        assert.strictEqual($.Tools.class.numberRound(950, -2), 1000)
        assert.strictEqual($.Tools.class.numberRound(949, -2), 900)
        assert.strictEqual($.Tools.class.numberRound(1.2345), 1)
        assert.strictEqual($.Tools.class.numberRound(1.2345, 2), 1.23)
        assert.strictEqual($.Tools.class.numberRound(1.2345, 3), 1.235)
        assert.strictEqual($.Tools.class.numberRound(1.2345, 4), 1.2345)
        assert.strictEqual($.Tools.class.numberRound(699, -2), 700)
        assert.strictEqual($.Tools.class.numberRound(650, -2), 700)
        assert.strictEqual($.Tools.class.numberRound(649, -2), 600)
    })
    // // endregion
    // // region data transfer
    QUnit.test('sendToIFrame', (assert:Object):void => {
        const iFrame = $('<iframe>').hide().attr('name', 'test')
        $('body').append(iFrame)
        assert.ok($.Tools.class.sendToIFrame(iFrame, window.document.URL, {
            test: 5
        }, 'get', true))
    })
    QUnit.test('sendToExternalURL', (assert:Object):void => {
        assert.ok(tools.sendToExternalURL(window.document.URL, {test: 5}))
    })
    // // endregion
    // / endregion
    // / region protected
    QUnit.test('_bindHelper', (assert:Object):void => {
        assert.ok(tools._bindHelper(['body']))
        assert.ok(tools._bindHelper(['body'], true))
        assert.ok(tools._bindHelper(['body'], false, 'bind'))
    })
    QUnit.test('_grabDomNodeHelper', (assert:Object):void => {
        assert.strictEqual(
            tools._grabDomNodeHelper('test', 'div', {}), 'body div')
        assert.strictEqual(
            tools._grabDomNodeHelper('test', 'body div', {}), 'body div')
        assert.strictEqual(tools._grabDomNodeHelper('test', '', {}), 'body')
        assert.strictEqual($.Tools({
            domNodeSelectorPrefix: ''
        })._grabDomNodeHelper('test', '', {}), '')
        assert.strictEqual($.Tools({
            domNodeSelectorPrefix: ''
        })._grabDomNodeHelper('test', 'div', {}), 'div')
    })
    // / endregion
    // endregion
})
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
