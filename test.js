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
import type {Location, Window} from 'webOptimizer/type'
// endregion
// region declaration
declare var TARGET:string
/* eslint-disable no-unused-vars */
declare var window:Window
/* eslint-enable no-unused-vars */
// endregion
// region types
type JQueryFunction = (object:any) => Object
// endregion
const qunit:Object = (TARGET === 'node') ? require('qunit-cli') : require(
    'qunitjs')
browserAPI((window:Window, location:Location):void => {
    // NOTE: We have to define window globally before jQuery is loaded to
    // ensure that all jquery instances share the same window object.
    if (typeof global !== 'undefined') {
        global.window = window
        for (const key in window)
            if (window.hasOwnProperty(key) && !global.hasOwnProperty(key))
                global[key] = window[key]
    }
    const $:JQueryFunction = require('jquery')
    $.context = window.document
    require('./index')
    if (TARGET === 'node')
        qunit.load()
    else
        qunit.start()
    // region tests
    // / region mock-up
    const $bodyDomNode = $('body')
    const tools = $('body').Tools()
    // / endregion
    // / region public methods
    // // region special
    qunit.test('constructor', ():?null => qunit.ok(tools))
    qunit.test('destructor', ():?null => qunit.strictEqual(
        tools.destructor(), tools))
    qunit.test('initialize', ():void => {
        const secondToolsInstance = $.Tools({logging: true})
        const thirdToolsInstance = $.Tools({
            domNodeSelectorPrefix: 'body.{1} div.{1}'})

        qunit.assert.notOk(tools._options.logging)
        qunit.ok(secondToolsInstance._options.logging)
        qunit.strictEqual(
            thirdToolsInstance._options.domNodeSelectorPrefix,
            'body.tools div.tools')
    })
    // // endregion
    // // region object orientation
    qunit.test('controller', ():void => {
        qunit.strictEqual(tools.controller(tools, []), tools)
        qunit.strictEqual(tools.controller(
            $.Tools.class, [], $('body')
        ).constructor.name, tools.constructor.name)
    })
    // // endregion
    // // region mutual exclusion
    qunit.test('acquireLock|releaseLock', ():void => {
        let testValue = false
        tools.acquireLock('test', ():void => {
            testValue = true
        })

        qunit.ok(testValue)
        qunit.strictEqual(tools.acquireLock('test', ():void => {
            testValue = false
        }, true), tools)
        qunit.ok(testValue)
        qunit.ok($.Tools().releaseLock('test'))
        qunit.ok(testValue)
        qunit.strictEqual(tools.releaseLock('test'), tools)
        qunit.notOk(testValue)
        qunit.strictEqual(tools.acquireLock('test', ():void => {
            testValue = true
        }, true), tools)
        qunit.ok(testValue)
        qunit.strictEqual(tools.acquireLock('test', ():void => {
            testValue = false
        }), tools)
        qunit.notOk(testValue)
    })
    // // endregion
    // // region language fixes
    qunit.test('mouseOutEventHandlerFix', ():void => qunit.ok(
        $.Tools.class.mouseOutEventHandlerFix(():void => {})))
    // // endregion
    // // region logging
    qunit.test('log', ():void => qunit.strictEqual(tools.log('test'), tools))
    qunit.test('info', ():void =>
        qunit.strictEqual(tools.info('test {0}'), tools))
    qunit.test('debug', ():void =>
        qunit.strictEqual(tools.debug('test'), tools))
    /*
    NOTE: This test breaks java script modules in strict mode.
    qunit.test('error', ():void => qunit.strictEqual(tools.error(
        'ignore this error, it is only a {1}', 'test'
    ), tools))
    */
    qunit.test('warn', ():void => qunit.strictEqual(tools.warn('test'), tools))
    qunit.test('show', ():void => {
        qunit.strictEqual($.Tools.class.show('hans'), 'hans\n(Type: "string")')
        qunit.strictEqual($.Tools.class.show({
            A: 'a', B: 'b'
        }), 'A: a\nB: b\n(Type: "object")')
        /* eslint-disable no-control-regex */
        qunit.ok((new RegExp(
            '^(.|\n|\r|\u2028|\u2029)+\\(Type: "function"\\)$'
        )).test($.Tools.class.show($.Tools)))
        /* eslint-enable no-control-regex */
        qunit.ok((new RegExp('^.+: .+\\n(.|\\n)+$')).test($.Tools.class.show(
            tools)))
    })
    // // endregion
    // // region dom node handling
    qunit.test('normalizeClassNames', ():void => {
        qunit.strictEqual($('<div>').Tools(
            'normalizeClassNames'
        ).$domNode.prop('outerHTML'), $('<div>').prop('outerHTML'))
        qunit.strictEqual($('<div class>').Tools(
            'normalizeClassNames'
        ).$domNode.html(), $('<div>').html())
        qunit.strictEqual($('<div class="">').Tools(
            'normalizeClassNames'
        ).$domNode.html(), $('<div>').html())
        qunit.strictEqual(
            $('<div class="a">').Tools('normalizeClassNames').$domNode.prop(
                'outerHTML'
            ), $('<div class="a">').prop('outerHTML'))
        qunit.strictEqual(
            $('<div class="b a">').Tools('normalizeClassNames').$domNode.prop(
                'outerHTML'
            ), $('<div class="a b">').prop('outerHTML'))
        qunit.strictEqual(
            $('<div class="b a"><pre class="c b a"></pre></div>').Tools(
                'normalizeClassNames'
            ).$domNode.prop('outerHTML'),
            $('<div class="a b"><pre class="a b c"></pre></div>').prop(
                'outerHTML'))
    })
    qunit.test('isEquivalentDom', ():void => {
        qunit.ok($.Tools.class.isEquivalentDom('test', 'test'))
        qunit.notOk($.Tools.class.isEquivalentDom('test', ''))
        qunit.notOk($.Tools.class.isEquivalentDom('test', 'hans'))
        qunit.ok($.Tools.class.isEquivalentDom('test test', 'test test'))
        qunit.notOk($.Tools.class.isEquivalentDom('test test', 'testtest'))
        qunit.notOk($.Tools.class.isEquivalentDom('test test:', ''))
        qunit.ok($.Tools.class.isEquivalentDom('<div>', '<div>'))
        qunit.ok($.Tools.class.isEquivalentDom('<div class>', '<div>'))
        qunit.ok($.Tools.class.isEquivalentDom('<div class="">', '<div>'))
        qunit.ok($.Tools.class.isEquivalentDom('<div></div>', '<div>'))
        qunit.notOk($.Tools.class.isEquivalentDom(
            '<div class="a"></div>', '<div>'))
        qunit.ok($.Tools.class.isEquivalentDom(
            '<div class="a"></div>', '<div class="a"></div>'))
        qunit.ok($.Tools.class.isEquivalentDom(
            $('<a target="_blank" class="a"></a>'),
            '<a class="a" target="_blank"></a>'))
        qunit.notOk($.Tools.class.isEquivalentDom(
            $('<a class="a"></a>'), '<a class="a" target="_blank"></a>'))
        qunit.ok($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="a"></a>',
            '<a class="a" target="_blank"></a>'))
        qunit.notOk($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="a"><div a="2"></div></a>',
            '<a class="a" target="_blank"></a>'))
        qunit.ok($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="a"><div b="3" a="2"></div></a>',
            '<a class="a" target="_blank"><div a="2" b="3"></div></a>'))
        qunit.ok($.Tools.class.isEquivalentDom(
            '<a target="_blank" class="b a"><div b="3" a="2"></div></a>',
            '<a class="a b" target="_blank"><div a="2" b="3"></div></a>'))
    })
    qunit.test('getPositionRelativeToViewport', ():void => qunit.ok(
        ['above', 'left', 'right', 'below', 'in'].includes(
            tools.getPositionRelativeToViewport())))
    qunit.test('generateDirectiveSelector', ():void => {
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'a-b'
        ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]')
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'aB'
        ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]')
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'a'
        ), 'a, .a, [a], [data-a], [x-a]')
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'aa'
        ), 'aa, .aa, [aa], [data-aa], [x-aa]')
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'aaBB'
        ), 'aa-bb, .aa-bb, [aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb], ' +
            '[aa_bb]')
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'aaBbCcDd'
        ), 'aa-bb-cc-dd, .aa-bb-cc-dd, [aa-bb-cc-dd], [data-aa-bb-cc-dd], ' +
        '[x-aa-bb-cc-dd], [aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]')
        qunit.strictEqual($.Tools.class.generateDirectiveSelector(
            'mceHREF'
        ), 'mce-href, .mce-href, [mce-href], [data-mce-href], [x-mce-href], ' +
            '[mce\\:href], [mce_href]')
    })
    qunit.test('removeDirective', ():void => {
        const $localBodyDomNode = $bodyDomNode.Tools('removeDirective', 'a')
        qunit.equal(
            $localBodyDomNode.Tools().removeDirective('a'), $localBodyDomNode)
    })
    qunit.test('getNormalizedDirectiveName', ():void => {
        qunit.equal($.Tools.class.getNormalizedDirectiveName('data-a'), 'a')
        qunit.equal($.Tools.class.getNormalizedDirectiveName('x-a'), 'a')
        qunit.equal(
            $.Tools.class.getNormalizedDirectiveName('data-a-bb'), 'aBb')
        qunit.equal($.Tools.class.getNormalizedDirectiveName('x:a:b'), 'aB')
    })
    qunit.test('getDirectiveValue', ():void => qunit.equal($('body').Tools(
        'getDirectiveValue', 'a'
    ), null))
    qunit.test('sliceDomNodeSelectorPrefix', ():void => {
        qunit.strictEqual(tools.sliceDomNodeSelectorPrefix('body div'), 'div')
        qunit.strictEqual($.Tools({
            domNodeSelectorPrefix: 'body div'
        }).sliceDomNodeSelectorPrefix('body div'), '')
        qunit.strictEqual($.Tools({
            domNodeSelectorPrefix: ''
        }).sliceDomNodeSelectorPrefix('body div'), 'body div')
    })
    qunit.test('getDomNodeName', ():void => {
        qunit.strictEqual($.Tools.class.getDomNodeName('div'), 'div')
        qunit.strictEqual($.Tools.class.getDomNodeName('<div>'), 'div')
        qunit.strictEqual($.Tools.class.getDomNodeName('<div />'), 'div')
        qunit.strictEqual($.Tools.class.getDomNodeName('<div></div>'), 'div')

        qunit.strictEqual($.Tools.class.getDomNodeName('a'), 'a')
        qunit.strictEqual($.Tools.class.getDomNodeName('<a>'), 'a')
        qunit.strictEqual($.Tools.class.getDomNodeName('<a />'), 'a')
        qunit.strictEqual($.Tools.class.getDomNodeName('<a></a>'), 'a')
    })
    qunit.test('grabDomNode', ():void => {
        let $domNodes = tools.grabDomNode({
            qunit: 'body div#qunit', qunitFixture: 'body div#qunit-fixture'})
        delete $domNodes.window
        delete $domNodes.document
        qunit.deepEqual($domNodes, {
            qunit: $('body div#qunit'),
            qunitFixture: $('body div#qunit-fixture'),
            parent: $('body')
        })
        $domNodes = tools.grabDomNode({
            qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'})
        delete $domNodes.window
        delete $domNodes.document
        qunit.deepEqual($domNodes, {
            parent: $('body'),
            qunit: $('body div#qunit'),
            qunitFixture: $('body div#qunit-fixture')
        })
        $domNodes = tools.grabDomNode({
            qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
        }, 'body')
        delete $domNodes.window
        delete $domNodes.document
        qunit.deepEqual($domNodes, {
            parent: $('body'),
            qunit: $('body').find('div#qunit'),
            qunitFixture: $('body').find('div#qunit-fixture')
        })
    })
    // // endregion
    // // region scope
    qunit.test('isolateScope', ():void => {
        qunit.deepEqual($.Tools.class.isolateScope({}), {})
        qunit.deepEqual($.Tools.class.isolateScope({a: 2}), {a: 2})
        qunit.deepEqual($.Tools.class.isolateScope({
            a: 2, b: {a: [1, 2]}
        }), {a: 2, b: {a: [1, 2]}})
        let scope = function():void {
            this.a = 2
        }
        scope.prototype = {b: 2, _a: 5}
        scope = new scope()
        qunit.deepEqual($.Tools.class.isolateScope(scope), {
            _a: 5, a: 2, b: undefined
        })
        scope.b = 3
        qunit.deepEqual($.Tools.class.isolateScope(scope), {_a: 5, a: 2, b: 3})
        qunit.deepEqual($.Tools.class.isolateScope(scope, []), {
            _a: undefined, a: 2, b: 3})
        scope._a = 6
        qunit.deepEqual($.Tools.class.isolateScope(scope), {_a: 6, a: 2, b: 3})
        scope = function():void {
            this.a = 2
        }
        scope.prototype = {b: 3}
        qunit.deepEqual($.Tools.class.isolateScope(
            new scope(), ['b']
        ), {a: 2, b: 3})
        qunit.deepEqual($.Tools.class.isolateScope(new scope()), {
            a: 2, b: undefined
        })
    })
    qunit.test('determineUniqueScopeName', ():void => {
        qunit.ok($.Tools.class.determineUniqueScopeName().startsWith(
            'callback'))
        qunit.ok($.Tools.class.determineUniqueScopeName('hans').startsWith(
            'hans'))
        qunit.ok($.Tools.class.determineUniqueScopeName('hans', {}).startsWith(
            'hans'))
    })
    // // endregion
    // // region function handling
    qunit.test('getMethod', ():void => {
        const testObject = {value: false}

        tools.getMethod(():void => {
            testObject.value = true
        })()
        qunit.ok(testObject.value)

        tools.getMethod(function():void {
            this.value = false
        }, testObject)()
        qunit.notOk(testObject.value)

        qunit.strictEqual(tools.getMethod((
            thisFunction:Function, context:Object, five:5, two:2, three:3
        ):number => five + two + three, testObject, 5)(2, 3), 10)
    })
    qunit.test('identity', ():void => {
        qunit.strictEqual($.Tools.class.identity(2), 2)
        qunit.strictEqual($.Tools.class.identity(''), '')
        qunit.strictEqual($.Tools.class.identity(), undefined)
        qunit.strictEqual($.Tools.class.identity(null), null)
        qunit.strictEqual($.Tools.class.identity('hans'), 'hans')
        qunit.ok($.Tools.class.identity({}) !== {})
        const testObject = {}
        qunit.strictEqual($.Tools.class.identity(testObject), testObject)
    })
    qunit.test('invertArrayFilter', ():void => {
        qunit.deepEqual($.Tools.class.invertArrayFilter(
            $.Tools.class.arrayDeleteEmptyItems
        )([{a: null}]), [{a: null}])
        qunit.deepEqual($.Tools.class.invertArrayFilter(
            $.Tools.class.arrayExtractIfMatches
        )(['a', 'b'], '^a$'), ['b'])
    })
    // // endregion
    // // region event
    qunit.test('debounce', ():void => {
        let testValue = false
        $.Tools.class.debounce(():void => {
            testValue = true
        })()
        qunit.ok(testValue)
        $.Tools.class.debounce(():void => {
            testValue = false
        }, 1000)()
        qunit.notOk(testValue)
    })
    qunit.test('fireEvent', ():void => {
        let testValue = false

        qunit.strictEqual($.Tools({onClick: ():void => {
            testValue = true
        }}).fireEvent('click', true), true)
        qunit.ok(testValue)
        qunit.strictEqual($.Tools({onClick: ():void => {
            testValue = false
        }}).fireEvent('click', true), true)
        qunit.notOk(testValue)
        qunit.strictEqual(tools.fireEvent('click'), false)
        qunit.notOk(testValue)
        tools.onClick = ():void => {
            testValue = true
        }
        qunit.strictEqual(tools.fireEvent('click'), false)
        qunit.ok(testValue)
        tools.onClick = ():void => {
            testValue = false
        }
        qunit.strictEqual(tools.fireEvent('click', true), false)
        qunit.ok(testValue)
    })
    qunit.test('on', ():void => {
        let testValue = false
        qunit.strictEqual(tools.on('body', 'click', ():void => {
            testValue = true
        })[0], $('body')[0])

        $('body').trigger('click')
        qunit.ok(testValue)
    })
    qunit.test('off', ():void => {
        let testValue = false
        qunit.strictEqual(tools.on('body', 'click', ():void => {
            testValue = true
        })[0], $('body')[0])
        qunit.strictEqual(tools.off('body', 'click')[0], $('body')[0])

        $('body').trigger('click')
        qunit.notOk(testValue)
    })
    // // endregion
    // // region object
    qunit.test('convertPlainObjectToMap', ():void => {
        qunit.deepEqual($.Tools.class.convertPlainObjectToMap(null), null)
        qunit.deepEqual($.Tools.class.convertPlainObjectToMap(true), true)
        qunit.deepEqual($.Tools.class.convertPlainObjectToMap(0), 0)
        qunit.deepEqual($.Tools.class.convertPlainObjectToMap(2), 2)
        qunit.deepEqual($.Tools.class.convertPlainObjectToMap('a'), 'a')
        qunit.deepEqual($.Tools.class.convertPlainObjectToMap({}), new Map())
        qunit.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{}]), [new Map()])
        qunit.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{}], false), [{}])
        qunit.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{a: {}, b: 2}]),
            [new Map([['a', new Map()], ['b', 2]])])
        qunit.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{b: 2, a: {}}]),
            [new Map([['a', new Map()], ['b', 2]])])
        qunit.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{b: 2, a: new Map()}]),
            [new Map([['a', new Map()], ['b', 2]])])
        qunit.deepEqual(
            $.Tools.class.convertPlainObjectToMap([{b: 2, a: [{}]}]),
            [new Map([['a', [new Map()]], ['b', 2]])])
    })
    qunit.test('convertMapToPlainObject', ():void => {
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(null), null)
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(true), true)
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(0), 0)
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(2), 2)
        qunit.deepEqual($.Tools.class.convertMapToPlainObject('a'), 'a')
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(new Map()), {})
        qunit.deepEqual(
            $.Tools.class.convertMapToPlainObject([new Map()]), [{}])
        qunit.deepEqual(
            $.Tools.class.convertMapToPlainObject([new Map()], false),
            [new Map()])
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(
            [new Map([['a', 2], [2, 2]])]
        ), [{a: 2, '2': 2}])
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(
            [new Map([['a', new Map()], [2, 2]])]
        ), [{a: {}, '2': 2}])
        qunit.deepEqual($.Tools.class.convertMapToPlainObject(
            [new Map([['a', new Map([['a', 2]])], [2, 2]])]
        ), [{a: {a: 2}, '2': 2}])
    })
    qunit.test('forEachSorted', ():void => {
        let result = []
        const tester = (item:Array<any>|Object):Array<any> =>
            $.Tools.class.forEachSorted(
                item, (value:any, key:string|number):number =>
                    result.push([key, value]))
        tester({})
        qunit.deepEqual(result, [])
        qunit.deepEqual(tester({}), [])
        qunit.deepEqual(tester([]), [])
        qunit.deepEqual(tester({a: 2}), ['a'])
        qunit.deepEqual(tester({b: 1, a: 2}), ['a', 'b'])
        result = []
        tester({b: 1, a: 2})
        qunit.deepEqual(result, [['a', 2], ['b', 1]])
        result = []

        tester([2, 2])
        qunit.deepEqual(result, [[0, 2], [1, 2]])
        result = []
        tester({'5': 2, '6': 2, '2': 3})
        qunit.deepEqual(result, [['2', 3], ['5', 2], ['6', 2]])
        result = []
        tester({a: 2, c: 2, z: 3})
        qunit.deepEqual(result, [['a', 2], ['c', 2], ['z', 3]])
        $.Tools.class.forEachSorted([1], function():number {
            result = this
            return result
        }, 2)
        qunit.deepEqual(result, 2)
    })
    qunit.test('sort', ():void => {
        qunit.deepEqual($.Tools.class.sort([]), [])
        qunit.deepEqual($.Tools.class.sort({}), [])
        qunit.deepEqual($.Tools.class.sort([1]), [0])
        qunit.deepEqual($.Tools.class.sort([1, 2, 3]), [0, 1, 2])
        qunit.deepEqual($.Tools.class.sort([3, 2, 1]), [0, 1, 2])
        qunit.deepEqual($.Tools.class.sort([2, 3, 1]), [0, 1, 2])
        qunit.deepEqual($.Tools.class.sort({'1': 2, '2': 5, '3': 'a'}), [
            '1', '2', '3'])
        qunit.deepEqual($.Tools.class.sort({'2': 2, '1': 5, '-5': 'a'}), [
            '-5', '1', '2'])
        qunit.deepEqual($.Tools.class.sort({'3': 2, '2': 5, '1': 'a'}), [
            '1', '2', '3'])
        qunit.deepEqual($.Tools.class.sort(
            {a: 2, b: 5, c: 'a'}), ['a', 'b', 'c'])
        qunit.deepEqual($.Tools.class.sort(
            {c: 2, b: 5, a: 'a'}), ['a', 'b', 'c'])
        qunit.deepEqual($.Tools.class.sort(
            {b: 2, c: 5, z: 'a'}), ['b', 'c', 'z'])
    })
    qunit.test('equals', ():void => {
        qunit.ok($.Tools.class.equals(1, 1))
        qunit.ok($.Tools.class.equals((new Date()), (new Date())))
        qunit.ok($.Tools.class.equals((new Date(1995, 11, 17)), (new Date(
            1995, 11, 17))))
        qunit.notOk($.Tools.class.equals((new Date(1995, 11, 17)), (new Date(
            1995, 11, 16))))
        qunit.ok($.Tools.class.equals(/a/, /a/))
        qunit.notOk($.Tools.class.equals(/a/i, /a/))
        qunit.notOk($.Tools.class.equals(1, 2))
        qunit.ok($.Tools.class.equals({a: 2}, {a: 2}))
        qunit.notOk($.Tools.class.equals({a: 2, b: 3}, {a: 2}))
        qunit.ok($.Tools.class.equals({a: 2, b: 3}, {a: 2, b: 3}))
        qunit.ok($.Tools.class.equals([1, 2, 3], [1, 2, 3]))
        qunit.notOk($.Tools.class.equals([1, 2, 3, 4], [1, 2, 3, 5]))
        qunit.notOk($.Tools.class.equals([1, 2, 3, 4], [1, 2, 3]))
        qunit.ok($.Tools.class.equals([], []))
        qunit.ok($.Tools.class.equals({}, {}))
        qunit.ok($.Tools.class.equals([1, 2, 3, {a: 2}], [1, 2, 3, {a: 2}]))
        qunit.notOk($.Tools.class.equals([1, 2, 3, {a: 2}], [1, 2, 3, {b: 2}]))
        qunit.ok($.Tools.class.equals([1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]))
        qunit.notOk($.Tools.class.equals([1, 2, 3, [1, 2]], [1, 2, 3, [
            1, 2, 3]]))
        qunit.notOk($.Tools.class.equals([1, 2, 3, [1, 2, 3]], [1, 2, 3, [
            1, 2]]))
        qunit.notOk($.Tools.class.equals([1, 2, 3, [1, 2, 3]], [1, 2, 3, [
            1, 2, {}]]))
        qunit.ok($.Tools.class.equals([{a: 1}], [{a: 1}]))
        qunit.notOk($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}]))
        qunit.ok($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], []))
        qunit.ok($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], ['a']))
        qunit.notOk($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], ['a', 'b']))
        qunit.ok($.Tools.class.equals(2, 2, 0))
        qunit.notOk($.Tools.class.equals(1, 2, 0))
        qunit.ok($.Tools.class.equals([{a: 1, b: 1}], [{a: 1}], null, 0))
        qunit.notOk($.Tools.class.equals([{a: 1}, {b: 1}], [{a: 1}], null, 1))
        qunit.ok($.Tools.class.equals(
            [{a: 1}, {b: 1}], [{a: 1}, {b: 1}], null, 1))
        qunit.ok($.Tools.class.equals(
            [{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], null, 1))
        qunit.notOk($.Tools.class.equals(
            [{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], null, 2))
        qunit.ok($.Tools.class.equals(
            [{a: {b: 1}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 2))
        qunit.ok($.Tools.class.equals(
            [{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 2))
        qunit.notOk($.Tools.class.equals(
            [{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 3))
        qunit.ok($.Tools.class.equals(
            [{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 3, ['b']))
        qunit.ok($.Tools.class.equals(():void => {}, ():void => {}))
        qunit.notOk($.Tools.class.equals(
            ():void => {}, ():void => {}, null, -1, [], false))
        const test = ():void => {}
        qunit.ok($.Tools.class.equals(test, test, null, -1, [], false))
    })
    // // endregion
    // // region array
    qunit.test('argumentsObjectToArray', ():void => {
        qunit.notOk($.isArray(arguments))
        qunit.ok($.isArray($.Tools.class.argumentsObjectToArray(arguments)))
    })
    qunit.test('arrayUnique', ():void => {
        qunit.deepEqual($.Tools.class.arrayUnique([1, 2, 3, 1]), [1, 2, 3])
        qunit.deepEqual(
            $.Tools.class.arrayUnique([1, 2, 3, 1, 2, 3]), [1, 2, 3])
        qunit.deepEqual($.Tools.class.arrayUnique([]), [])
        qunit.deepEqual($.Tools.class.arrayUnique([1, 2, 3]), [1, 2, 3])
    })
    qunit.test('arrayAggregatePropertyIfEqual', ():void => {
        qunit.strictEqual(
            $.Tools.class.arrayAggregatePropertyIfEqual([{a: 'b'}], 'a'), 'b')
        qunit.strictEqual($.Tools.class.arrayAggregatePropertyIfEqual(
            [{a: 'b'}, {a: 'b'}], 'a'
        ), 'b')
        qunit.strictEqual($.Tools.class.arrayAggregatePropertyIfEqual(
            [{a: 'b'}, {a: 'c'}], 'a'
        ), '')
        qunit.strictEqual($.Tools.class.arrayAggregatePropertyIfEqual(
            [{a: 'b'}, {a: 'c'}], 'a', false
        ), false)
    })
    qunit.test('arrayDeleteEmptyItems', ():void => {
        qunit.deepEqual($.Tools.class.arrayDeleteEmptyItems([{a: null}]), [])
        qunit.deepEqual($.Tools.class.arrayDeleteEmptyItems(
            [{a: null, b: 2}]
        ), [{a: null, b: 2}])
        qunit.deepEqual($.Tools.class.arrayDeleteEmptyItems(
            [{a: null, b: 2}], ['a']
        ), [])
        qunit.deepEqual($.Tools.class.arrayDeleteEmptyItems([], ['a']), [])
        qunit.deepEqual($.Tools.class.arrayDeleteEmptyItems([]), [])
    })
    qunit.test('arrayExtract', ():void => {
        qunit.deepEqual(
            $.Tools.class.arrayExtract([{a: 'b', c: 'd'}], ['a']), [{a: 'b'}])
        qunit.deepEqual(
            $.Tools.class.arrayExtract([{a: 'b', c: 'd'}], ['b']), [{}])
        qunit.deepEqual(
            $.Tools.class.arrayExtract([{a: 'b', c: 'd'}], ['c']), [{c: 'd'}])
        qunit.deepEqual($.Tools.class.arrayExtract(
            [{a: 'b', c: 'd'}, {a: 3}], ['c']
        ), [{c: 'd'}, {}])
        qunit.deepEqual($.Tools.class.arrayExtract(
            [{a: 'b', c: 'd'}, {c: 3}], ['c']
        ), [{c: 'd'}, {c: 3}])
    })
    qunit.test('arrayExtractIfMatches', ():void => {
        qunit.deepEqual($.Tools.class.arrayExtractIfMatches(['b'], /b/), ['b'])
        qunit.deepEqual($.Tools.class.arrayExtractIfMatches(['b'], 'b'), ['b'])
        qunit.deepEqual($.Tools.class.arrayExtractIfMatches(['b'], 'a'), [])
        qunit.deepEqual($.Tools.class.arrayExtractIfMatches([], 'a'), [])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], ''), ['a', 'b'])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], '^$'), [])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], 'b'), ['b'])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfMatches(['a', 'b'], '[ab]'),
            ['a', 'b'])
    })
    qunit.test('arrayExtractIfPropertyExists', ():void => {
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([{a: 2}], 'a'),
            [{a: 2}])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([{a: 2}], 'b'), [])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([], 'b'), [])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyExists([{a: 2}, {b: 3}], 'a'
        ), [{a: 2}])
    })
    qunit.test('arrayExtractIfPropertyMatches', ():void => {
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([{a: 'b'}],
            {a: 'b'}), [{a: 'b'}])
        qunit.deepEqual($.Tools.class.arrayExtractIfPropertyMatches(
            [{a: 'b'}], {a: '.'}
        ), [{a: 'b'}])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([{a: 'b'}], {a: 'a'}),
            [])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([], {a: 'a'}), [])
        qunit.deepEqual(
            $.Tools.class.arrayExtractIfPropertyMatches([{a: 2}], {b: /a/}),
            [])
        qunit.deepEqual($.Tools.class.arrayExtractIfPropertyMatches([{
            mimeType: 'text/x-webm'
        }], {mimeType: new RegExp('^text/x-webm$')}),
        [{mimeType: 'text/x-webm'}])
    })
    qunit.test('arrayIntersect', ():void => {
        qunit.deepEqual($.Tools.class.arrayIntersect(['A'], ['A']), ['A'])
        qunit.deepEqual($.Tools.class.arrayIntersect(['A', 'B'], ['A']), ['A'])
        qunit.deepEqual($.Tools.class.arrayIntersect([], []), [])
        qunit.deepEqual($.Tools.class.arrayIntersect([5], []), [])
        qunit.deepEqual($.Tools.class.arrayIntersect(
            [{a: 2}], [{a: 2}]), [{a: 2}])
        qunit.deepEqual($.Tools.class.arrayIntersect([{a: 3}], [{a: 2}]), [])
        qunit.deepEqual($.Tools.class.arrayIntersect([{a: 3}], [{b: 3}]), [])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{a: 3}], [{b: 3}], ['b']), [])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{a: 3}], [{b: 3}], ['b'], false), [])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{b: null}], [{b: null}], ['b']),
            [{b: null}])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{b: null}], [{b: undefined}], ['b']),
            [])
        qunit.deepEqual($.Tools.class.arrayIntersect(
            [{b: null}], [{b: undefined}], ['b'], false
        ), [{b: null}])
        qunit.deepEqual($.Tools.class.arrayIntersect(
            [{b: null}], [{}], ['b'], false
        ), [{b: null}])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{b: undefined}], [{}], ['b'], false),
            [{b: undefined}])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{}], [{}], ['b'], false), [{}])
        qunit.deepEqual(
            $.Tools.class.arrayIntersect([{b: null}], [{}], ['b']), [])
        qunit.deepEqual($.Tools.class.arrayIntersect(
            [{b: undefined}], [{}], ['b'], true), [{b: undefined}])
        qunit.deepEqual($.Tools.class.arrayIntersect(
            [{b: 1}], [{a: 1}], {b: 'a'}, true), [{b: 1}])
    })
    qunit.test('arrayMakeRange', ():void => {
        qunit.deepEqual($.Tools.class.arrayMakeRange([0]), [0])
        qunit.deepEqual($.Tools.class.arrayMakeRange([5]), [0, 1, 2, 3, 4, 5])
        qunit.deepEqual($.Tools.class.arrayMakeRange([]), [])
        qunit.deepEqual($.Tools.class.arrayMakeRange([2, 5]), [2, 3, 4, 5])
    })
    qunit.test('arraySumUpProperty', ():void => {
        qunit.strictEqual(
            $.Tools.class.arraySumUpProperty([{a: 2}, {a: 3}], 'a'), 5)
        qunit.strictEqual(
            $.Tools.class.arraySumUpProperty([{a: 2}, {b: 3}], 'a'), 2)
        qunit.strictEqual(
            $.Tools.class.arraySumUpProperty([{a: 2}, {b: 3}], 'c'), 0)
    })
    qunit.test('arrayAppendAdd', ():void => {
        qunit.deepEqual($.Tools.class.arrayAppendAdd({}, {}, 'b'), {b: [{}]})
        const test = {}
        qunit.deepEqual(
            $.Tools.class.arrayAppendAdd(test, {a: 3}, 'b'), {b: [{a: 3}]})
        qunit.deepEqual($.Tools.class.arrayAppendAdd(
            test, {a: 3}, 'b'
        ), {b: [{a: 3}, {a: 3}]})
        qunit.deepEqual(
            $.Tools.class.arrayAppendAdd({b: [2]}, 2, 'b', false), {b: [2, 2]})
        qunit.deepEqual(
            $.Tools.class.arrayAppendAdd({b: [2]}, 2, 'b'), {b: [2]})
    })
    qunit.test('arrayRemove', ():void => {
        qunit.deepEqual($.Tools.class.arrayRemove([], 2), [])
        qunit.throws(():?Array<any> => $.Tools.class.arrayRemove(
            [], 2, true
        ), Error("Given target doesn't exists in given list."))
        qunit.deepEqual($.Tools.class.arrayRemove([2], 2), [])
        qunit.deepEqual($.Tools.class.arrayRemove([2], 2, true), [])
        qunit.deepEqual($.Tools.class.arrayRemove([1, 2], 2), [1])
        qunit.deepEqual($.Tools.class.arrayRemove([1, 2], 2, true), [1])
    })
    // // endregion
    // // region string
    // /// region url handling
    qunit.test('stringEncodeURIComponent', ():void => {
        qunit.strictEqual($.Tools.class.stringEncodeURIComponent(''), '')
        qunit.strictEqual($.Tools.class.stringEncodeURIComponent(' '), '+')
        qunit.strictEqual(
            $.Tools.class.stringEncodeURIComponent(' ', true), '%20')
        qunit.strictEqual(
            $.Tools.class.stringEncodeURIComponent('@:$, '), '@:$,+')
        qunit.strictEqual($.Tools.class.stringEncodeURIComponent('+'), '%2B')
    })
    qunit.test('stringAddSeparatorToPath', ():void => {
        qunit.strictEqual($.Tools.class.stringAddSeparatorToPath(''), '')
        qunit.strictEqual($.Tools.class.stringAddSeparatorToPath('/'), '/')
        qunit.strictEqual($.Tools.class.stringAddSeparatorToPath('/a'), '/a/')
        qunit.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb/'), '/a/bb/')
        qunit.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb'), '/a/bb/')
        qunit.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb', '|'), '/a/bb|')
        qunit.strictEqual(
            $.Tools.class.stringAddSeparatorToPath('/a/bb/', '|'), '/a/bb/|')
    })
    qunit.test('stringHasPathPrefix', ():void => {
        qunit.ok($.Tools.class.stringHasPathPrefix('/admin', '/admin'))
        qunit.ok($.Tools.class.stringHasPathPrefix('test', 'test'))
        qunit.ok($.Tools.class.stringHasPathPrefix('', ''))
        qunit.ok($.Tools.class.stringHasPathPrefix('a', 'a/b'))
        qunit.notOk($.Tools.class.stringHasPathPrefix('b', 'a/b'))
        qunit.notOk($.Tools.class.stringHasPathPrefix('b/', 'a/b'))
        qunit.ok($.Tools.class.stringHasPathPrefix('a/', 'a/b'))
        qunit.notOk(
            $.Tools.class.stringHasPathPrefix('/admin/', '/admin/test', '#'))
        qunit.notOk(
            $.Tools.class.stringHasPathPrefix('/admin', '/admin/test', '#'))
        qunit.ok(
            $.Tools.class.stringHasPathPrefix('/admin', '/admin#test', '#'))
    })
    qunit.test('stringGetDomainName', ():void => {
        qunit.strictEqual($.Tools.class.stringGetDomainName(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 'www.test.de')
        qunit.strictEqual($.Tools.class.stringGetDomainName('a', true), true)
        qunit.strictEqual(
            $.Tools.class.stringGetDomainName('http://www.test.de'),
            'www.test.de')
        qunit.strictEqual(
            $.Tools.class.stringGetDomainName('http://a.de'), 'a.de')
        qunit.strictEqual(
            $.Tools.class.stringGetDomainName('http://localhost'), 'localhost')
        qunit.strictEqual(
            $.Tools.class.stringGetDomainName('localhost', 'a'), 'a')
        qunit.strictEqual($.Tools.class.stringGetDomainName(
            'a', location.hostname
        ), location.hostname)
        qunit.strictEqual($.Tools.class.stringGetDomainName('//a'), 'a')
        qunit.strictEqual($.Tools.class.stringGetDomainName(
            'a/site/subSite?param=value#hash', location.hostname
        ), location.hostname)
        qunit.strictEqual($.Tools.class.stringGetDomainName(
            '/a/site/subSite?param=value#hash', location.hostname
        ), location.hostname)
        qunit.strictEqual($.Tools.class.stringGetDomainName(
            '//alternate.local/a/site/subSite?param=value#hash'
        ), 'alternate.local')
        qunit.strictEqual($.Tools.class.stringGetDomainName(
            '//alternate.local/'
        ), 'alternate.local')
    })
    qunit.test('stringGetPortNumber', ():void => {
        qunit.strictEqual($.Tools.class.stringGetPortNumber(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 443)
        qunit.strictEqual(
            $.Tools.class.stringGetPortNumber('http://www.test.de'), 80)
        qunit.strictEqual(
            $.Tools.class.stringGetPortNumber('http://www.test.de', true),
            true)
        qunit.strictEqual(
            $.Tools.class.stringGetPortNumber('www.test.de', true), true)
        qunit.strictEqual($.Tools.class.stringGetPortNumber('a', true), true)
        qunit.strictEqual($.Tools.class.stringGetPortNumber('a', true), true)
        qunit.strictEqual($.Tools.class.stringGetPortNumber('a:80'), 80)
        qunit.strictEqual($.Tools.class.stringGetPortNumber('a:20'), 20)
        qunit.strictEqual($.Tools.class.stringGetPortNumber('a:444'), 444)
        qunit.strictEqual(
            $.Tools.class.stringGetPortNumber('http://localhost:89'), 89)
        qunit.strictEqual(
            $.Tools.class.stringGetPortNumber('https://localhost:89'), 89)
    })
    qunit.test('stringGetProtocolName', ():void => {
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            'https://www.test.de/site/subSite?param=value#hash'
        ), 'https')
        qunit.strictEqual(
            $.Tools.class.stringGetProtocolName('http://www.test.de'), 'http')
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            '//www.test.de', location.protocol.substring(
                0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
        qunit.strictEqual($.Tools.class.stringGetProtocolName('http://a.de'), 'http')
        qunit.strictEqual(
            $.Tools.class.stringGetProtocolName('ftp://localhost'), 'ftp')
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            'a', location.protocol.substring(0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            'a/site/subSite?param=value#hash', location.protocol.substring(
                0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            '/a/site/subSite?param=value#hash', 'a'
        ), 'a')
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            'alternate.local/a/site/subSite?param=value#hash', 'b'
        ), 'b')
        qunit.strictEqual(
            $.Tools.class.stringGetProtocolName('alternate.local/', 'c'), 'c')
        qunit.strictEqual($.Tools.class.stringGetProtocolName(
            '', location.protocol.substring(0, location.protocol.length - 1)
        ), location.protocol.substring(0, location.protocol.length - 1))
    })
    qunit.test('stringGetURLVariable', ():void => {
        qunit.ok($.isArray($.Tools.class.stringGetURLVariable()))
        qunit.ok($.isArray($.Tools.class.stringGetURLVariable(null, '&')))
        qunit.ok($.isArray($.Tools.class.stringGetURLVariable(null, '#')))
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('notExisting'), undefined)
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('notExisting', '&'), undefined)
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('notExisting', '#'), undefined)
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('test', '?test=2'), '2')
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('test', 'test=2'), '2')
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('test', 'test=2&a=2'), '2')
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('test', 'b=3&test=2&a=2'), '2')
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2')
        qunit.strictEqual(
            $.Tools.class.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', '', '#$test=2'
        ), '2')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', '?test=4', '#$test=3'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'a', '&', '$', '!', '?test=4', '#$test=3'
        ), undefined)
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '?test=4', '#$test=3'
        ), '3')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/test/a#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/test/a/#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test/a/#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!/#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '#', '$', '!', '', '#!test?test=3#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '?', '!', null, '#!a?test=3'
        ), '3')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!test#$test=4'
        ), '4')
        qunit.strictEqual($.Tools.class.stringGetURLVariable(
            'test', '&', '$', '!', null, '#!test?test=3#$test=4'
        ), '4')
    })
    qunit.test('stringIsInternalURL', ():void => {
        qunit.ok($.Tools.class.stringIsInternalURL(
            'https://www.test.de/site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'))
        qunit.notOk($.Tools.class.stringIsInternalURL(
            `${location.protocol}//www.test.de/site/subSite?param=value#hash`,
            'ftp://www.test.de/site/subSite?param=value#hash'))
        qunit.notOk($.Tools.class.stringIsInternalURL(
            'https://www.test.de/site/subSite?param=value#hash',
            'http://www.test.de/site/subSite?param=value#hash'))
        qunit.notOk($.Tools.class.stringIsInternalURL(
            'http://www.test.de/site/subSite?param=value#hash',
            'test.de/site/subSite?param=value#hash'))
        qunit.notOk($.Tools.class.stringIsInternalURL(
            `${location.protocol}//www.test.de:${location.port}/site/` +
            'subSite?param=value#hash/site/subSite?param=value#hash'))
        qunit.ok($.Tools.class.stringIsInternalURL(
            '//www.test.de/site/subSite?param=value#hash',
            '//www.test.de/site/subSite?param=value#hash'))
        qunit.ok($.Tools.class.stringIsInternalURL(
            `${location.protocol}//www.test.de/site/subSite?param=value#hash`,
            `${location.protocol}//www.test.de/site/subSite?param=value#hash`))
        qunit.notOk($.Tools.class.stringIsInternalURL(
            `http://www.test.de:${location.port}/site/subSite?param=value` +
                '#hash',
            'https://www.test.de/site/subSite?param=value#hash'))
        qunit.ok($.Tools.class.stringIsInternalURL(
            'https://www.test.de:443/site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'))
        qunit.ok($.Tools.class.stringIsInternalURL(
            '//www.test.de:80/site/subSite?param=value#hash',
            '//www.test.de/site/subSite?param=value#hash'))
        qunit.ok(
            $.Tools.class.stringIsInternalURL(location.href, location.href))
        qunit.ok($.Tools.class.stringIsInternalURL('1', location.href))
        qunit.ok($.Tools.class.stringIsInternalURL('#1', location.href))
        qunit.ok($.Tools.class.stringIsInternalURL('/a', location.href))
    })
    qunit.test('stringNormalizeURL', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringNormalizeURL('www.test.com'),
            'http://www.test.com')
        qunit.strictEqual(
            $.Tools.class.stringNormalizeURL('test'), 'http://test')
        qunit.strictEqual(
            $.Tools.class.stringNormalizeURL('http://test'), 'http://test')
        qunit.strictEqual(
            $.Tools.class.stringNormalizeURL('https://test'), 'https://test')
    })
    qunit.test('stringRepresentURL', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringRepresentURL('http://www.test.com'),
            'www.test.com')
        qunit.strictEqual($.Tools.class.stringRepresentURL(
            'ftp://www.test.com'
        ), 'ftp://www.test.com')
        qunit.strictEqual($.Tools.class.stringRepresentURL(
            'https://www.test.com'
        ), 'www.test.com')
        qunit.strictEqual($.Tools.class.stringRepresentURL(undefined), '')
        qunit.strictEqual($.Tools.class.stringRepresentURL(null), '')
        qunit.strictEqual($.Tools.class.stringRepresentURL(false), '')
        qunit.strictEqual($.Tools.class.stringRepresentURL(true), '')
        qunit.strictEqual($.Tools.class.stringRepresentURL(''), '')
        qunit.strictEqual($.Tools.class.stringRepresentURL(' '), '')
    })
    // /// endregion
    qunit.test('stringCamelCaseToDelimited', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hansPeter'),
            'hans-peter')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '|'
        ), 'hans|peter')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited(''), '')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited('h'), 'h')
        qunit.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hP', ''), 'hp')
        qunit.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hansPeter'),
            'hans-peter')
        qunit.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('hans-peter'),
            'hans-peter')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '_'
        ), 'hans_peter')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '+'
        ), 'hans+peter')
        qunit.strictEqual(
            $.Tools.class.stringCamelCaseToDelimited('Hans'), 'hans')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansAPIURL', '-', ['api', 'url']
        ), 'hans-api-url')
        qunit.strictEqual($.Tools.class.stringCamelCaseToDelimited(
            'hansPeter', '-', []), 'hans-peter')
    })
    qunit.test('stringCapitalize', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringCapitalize('hansPeter'), 'HansPeter')
        qunit.strictEqual($.Tools.class.stringCapitalize(''), '')
        qunit.strictEqual($.Tools.class.stringCapitalize('a'), 'A')
        qunit.strictEqual($.Tools.class.stringCapitalize('A'), 'A')
        qunit.strictEqual($.Tools.class.stringCapitalize('AA'), 'AA')
        qunit.strictEqual($.Tools.class.stringCapitalize('Aa'), 'Aa')
        qunit.strictEqual($.Tools.class.stringCapitalize('aa'), 'Aa')
    })
    qunit.test('stringDelimitedToCamelCase', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans-peter'),
            'hansPeter')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans|peter', '|'
        ), 'hansPeter')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(''), '')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase('h'), 'h')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans-peter'),
            'hansPeter')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans--peter'),
            'hans-Peter')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('Hans-Peter'),
            'HansPeter')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('-Hans-Peter'),
            '-HansPeter')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase('-'), '-')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans-peter', '_'),
            'hans-peter')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans_peter', '_'),
            'hansPeter')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('hans_id', '_'), 'hansID')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'url_hans_id', '_', ['hans']
        ), 'urlHANSId')
        qunit.strictEqual(
            $.Tools.class.stringDelimitedToCamelCase('url_hans_1', '_'),
            'urlHans1')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hansUrl1', '-', ['url'], true
        ), 'hansUrl1')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-url', '-', ['url'], true
        ), 'hansURL')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-Url', '-', ['url'], true
        ), 'hansUrl')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-Url', '-', ['url'], false
        ), 'hansURL')
        qunit.strictEqual($.Tools.class.stringDelimitedToCamelCase(
            'hans-Url', '-', [], false
        ), 'hansUrl')
    })
    qunit.test('stringFormat', ():void => {
        qunit.strictEqual($.Tools.class.stringFormat('{1}', 'test'), 'test')
        qunit.strictEqual($.Tools.class.stringFormat('', 'test'), '')
        qunit.strictEqual($.Tools.class.stringFormat('{1}'), '{1}')
        qunit.strictEqual(
            $.Tools.class.stringFormat('{1} test {2} - {2}', 1, 2),
            '1 test 2 - 2')
    })
    qunit.test('stringGetRegularExpressionValidated', ():void => {
        qunit.strictEqual($.Tools.class.stringGetRegularExpressionValidated(
            "that's no regex: .*$"
        ), "that's no regex: \\.\\*\\$")
        qunit.strictEqual(
            $.Tools.class.stringGetRegularExpressionValidated(''), '')
        qunit.strictEqual($.Tools.class.stringGetRegularExpressionValidated(
            '-[]()^$*+.}-\\'
        ), '\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\')
        qunit.strictEqual(
            $.Tools.class.stringGetRegularExpressionValidated('-'), '\\-')
    })
    qunit.test('stringLowerCase', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringLowerCase('HansPeter'), 'hansPeter')
        qunit.strictEqual($.Tools.class.stringLowerCase(''), '')
        qunit.strictEqual($.Tools.class.stringLowerCase('A'), 'a')
        qunit.strictEqual($.Tools.class.stringLowerCase('a'), 'a')
        qunit.strictEqual($.Tools.class.stringLowerCase('aa'), 'aa')
        qunit.strictEqual($.Tools.class.stringLowerCase('Aa'), 'aa')
        qunit.strictEqual($.Tools.class.stringLowerCase('aa'), 'aa')
    })
    qunit.test('stringMark', ():void => {
        qunit.strictEqual($.Tools.class.stringMark(''), '')
        qunit.strictEqual($.Tools.class.stringMark(
            'test', 'e'
        ), 't<span class="tools-mark">e</span>st')
        qunit.strictEqual($.Tools.class.stringMark(
            'test', 'es'
        ), 't<span class="tools-mark">es</span>t')
        qunit.strictEqual($.Tools.class.stringMark(
            'test', 'test'
        ), '<span class="tools-mark">test</span>')
        qunit.strictEqual($.Tools.class.stringMark('test', ''), 'test')
        qunit.strictEqual($.Tools.class.stringMark('test', 'tests'), 'test')
        qunit.strictEqual($.Tools.class.stringMark('', 'test'), '')
        qunit.strictEqual(
            $.Tools.class.stringMark('test', 'e', '<a>{1}</a>'), 't<a>e</a>st')
        qunit.strictEqual(
            $.Tools.class.stringMark('test', 'E', '<a>{1}</a>'), 't<a>e</a>st')
        qunit.strictEqual($.Tools.class.stringMark(
            'test', 'E', '<a>{1}</a>', false
        ), 't<a>e</a>st')
        qunit.strictEqual($.Tools.class.stringMark(
            'tesT', 't', '<a>{1}</a>'
        ), '<a>t</a>es<a>T</a>')
        qunit.strictEqual($.Tools.class.stringMark(
            'tesT', 't', '<a>{1} - {1}</a>'
        ), '<a>t - t</a>es<a>T - T</a>')
        qunit.strictEqual(
            $.Tools.class.stringMark('test', 'E', '<a>{1}</a>', true), 'test')
    })
    qunit.test('stringMD5', ():void => {
        qunit.strictEqual(
            $.Tools.class.stringMD5(''), 'd41d8cd98f00b204e9800998ecf8427e')
        qunit.strictEqual(
            $.Tools.class.stringMD5('test'), '098f6bcd4621d373cade4e832627b4f6'
        )
        qunit.strictEqual(
            $.Tools.class.stringMD5('ä'), '8419b71c87a225a2c70b50486fbee545')
        qunit.strictEqual(
            $.Tools.class.stringMD5('test', true),
            '098f6bcd4621d373cade4e832627b4f6')
        qunit.strictEqual(
            $.Tools.class.stringMD5('ä', true),
            'c15bcc5577f9fade4b4a3256190a59b0')
    })
    qunit.test('stringNormalizePhoneNumber', ():void => {
        qunit.strictEqual($.Tools.class.stringNormalizePhoneNumber('0'), '0')
        qunit.strictEqual($.Tools.class.stringNormalizePhoneNumber(0), '0')
        qunit.strictEqual($.Tools.class.stringNormalizePhoneNumber(
            '+49 172 (0) / 0212 - 3'
        ), '0049172002123')
    })
    qunit.test('stringRepresentPhoneNumber', ():void => {
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber('0'), '0')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(
            '0172-12321-1'
        ), '+49 (0) 172 / 123 21-1')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(
            '0172-123211'
        ), '+49 (0) 172 / 12 32 11')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(
            '0172-1232111'
        ), '+49 (0) 172 / 123 21 11')
        qunit.strictEqual(
            $.Tools.class.stringRepresentPhoneNumber(undefined), '')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(null), '')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(false), '')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(true), '')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(''), '')
        qunit.strictEqual($.Tools.class.stringRepresentPhoneNumber(' '), '')
    })
    qunit.test('stringDecodeHTMLEntities', ():void => {
        qunit.equal($.Tools.class.stringDecodeHTMLEntities(''), '')
        qunit.equal($.Tools.class.stringDecodeHTMLEntities(
            '<div></div>'
        ), '<div></div>')
        qunit.equal(
            $.Tools.class.stringDecodeHTMLEntities('<div>&amp;</div>'),
            '<div>&</div>')
        qunit.equal($.Tools.class.stringDecodeHTMLEntities(
            '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>'
        ), '<div>&äÄüÜöÖ</div>')
    })
    // / endregion
    // // region number
    qunit.test('numberIsNotANumber', ():void => {
        qunit.strictEqual($.Tools.class.numberIsNotANumber(NaN), true)
        qunit.strictEqual($.Tools.class.numberIsNotANumber({}), false)
        qunit.strictEqual($.Tools.class.numberIsNotANumber(undefined), false)
        qunit.strictEqual(
            $.Tools.class.numberIsNotANumber(new Date().toString()), false)
        qunit.strictEqual($.Tools.class.numberIsNotANumber(null), false)
        qunit.strictEqual($.Tools.class.numberIsNotANumber(false), false)
        qunit.strictEqual($.Tools.class.numberIsNotANumber(true), false)
        qunit.strictEqual($.Tools.class.numberIsNotANumber(0), false)
    })
    qunit.test('numberRound', ():void => {
        qunit.strictEqual($.Tools.class.numberRound(1.5, 0), 2)
        qunit.strictEqual($.Tools.class.numberRound(1.4, 0), 1)
        qunit.strictEqual($.Tools.class.numberRound(1.4, -1), 0)
        qunit.strictEqual($.Tools.class.numberRound(1000, -2), 1000)
        qunit.strictEqual($.Tools.class.numberRound(999, -2), 1000)
        qunit.strictEqual($.Tools.class.numberRound(950, -2), 1000)
        qunit.strictEqual($.Tools.class.numberRound(949, -2), 900)
        qunit.strictEqual($.Tools.class.numberRound(1.2345), 1)
        qunit.strictEqual($.Tools.class.numberRound(1.2345, 2), 1.23)
        qunit.strictEqual($.Tools.class.numberRound(1.2345, 3), 1.235)
        qunit.strictEqual($.Tools.class.numberRound(1.2345, 4), 1.2345)
        qunit.strictEqual($.Tools.class.numberRound(699, -2), 700)
        qunit.strictEqual($.Tools.class.numberRound(650, -2), 700)
        qunit.strictEqual($.Tools.class.numberRound(649, -2), 600)
    })
    // // endregion
    // // region data transfer
    qunit.test('sendToIFrame', ():void => {
        const iFrame = $('<iframe>').hide().attr('name', 'test')
        $('body').append(iFrame)
        qunit.ok($.Tools.class.sendToIFrame(iFrame, window.document.URL, {
            test: 5
        }, 'get', true))
    })
    qunit.test('sendToExternalURL', ():void => {
        qunit.ok(tools.sendToExternalURL(window.document.URL, {test: 5}))
    })
    // // endregion
    // / endregion
    // / region protected
    qunit.test('_bindHelper', ():void => {
        qunit.ok(tools._bindHelper(['body']))
        qunit.ok(tools._bindHelper(['body'], true))
        qunit.ok(tools._bindHelper(['body'], false, 'bind'))
    })
    qunit.test('_grabDomNodeHelper', ():void => {
        qunit.strictEqual(
            tools._grabDomNodeHelper('test', 'div', {}), 'body div')
        qunit.strictEqual(
            tools._grabDomNodeHelper('test', 'body div', {}), 'body div')
        qunit.strictEqual(tools._grabDomNodeHelper('test', '', {}), 'body')
        qunit.strictEqual($.Tools({
            domNodeSelectorPrefix: ''
        })._grabDomNodeHelper('test', '', {}), '')
        qunit.strictEqual($.Tools({
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
