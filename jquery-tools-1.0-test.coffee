#!/usr/bin/env require
# -*- coding: utf-8 -*-

# region header

# Copyright Torben Sickert (t.sickert["~at~"]gmail.com) 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

module 'jQuery/tools'

# endregion

# region tests

## region mock- up

$bodyDomNode = $ 'body'
tools = $bodyDomNode.Tools()

## endregion

## region public methods

## # region special

test 'constructor', -> ok tools
test 'destructor', -> strictEqual tools.destructor(), tools
test 'initialize', ->
    secondToolsInstance = $.Tools logging: true
    thirdToolsInstance = $.Tools domNodeSelectorPrefix: 'body.{1} div.{1}'

    notOk tools._options.logging
    ok secondToolsInstance._options.logging
    strictEqual(
        thirdToolsInstance._options.domNodeSelectorPrefix,
        'body.tools div.tools')

## # endregion

## # region object orientation

test 'controller', ->
    strictEqual tools.controller(tools, []), tools
    strictEqual tools.controller(
        $.Tools.class, [], $ 'body'
    ).__name__, tools.__name__

## # endregion

## # region mutual exclusion

test 'acquireLock|releaseLock', ->
    testValue = false
    tools.acquireLock 'test', -> testValue = true

    ok testValue
    strictEqual tools.acquireLock('test', (-> testValue = false), true), tools
    ok testValue
    ok $.Tools().releaseLock 'test'
    ok testValue
    strictEqual tools.releaseLock('test'), tools
    notOk testValue
    strictEqual tools.acquireLock('test', (-> testValue = true), true), tools
    ok testValue
    strictEqual tools.acquireLock('test', -> testValue = false), tools
    notOk testValue

## # endregion

## # region language fixes

test 'mouseOutEventHandlerFix', -> ok tools.mouseOutEventHandlerFix ->

## # endregion

## # region logging

test 'log', -> strictEqual tools.log('test'), tools
test 'info', -> strictEqual tools.info('test {0}'), tools
test 'debug', -> strictEqual tools.debug('test'), tools
test 'error', -> strictEqual tools.error(
    'ignore this error, it is only a {1}', 'test'
), tools
test 'warn', -> strictEqual tools.warn('test'), tools
test 'show', ->
    strictEqual tools.show('hans'), 'hans\n(Type: "string")'
    strictEqual tools.show(A: 'a', B: 'b'), 'A: a\nB: b\n(Type: "object")'
    ok new RegExp(
        '^(.|\n|\r|\u2028|\u2029)+\\(Type: "function"\\)$'
    ).test tools.show $.Tools
    ok new RegExp('^.+: .+\\n(.|\\n)+$').test tools.show tools

## # endregion

## # region dom node handling

test 'getPositionRelativeToViewport', ->
    ok tools.getPositionRelativeToViewport() in [
        'above', 'left', 'right', 'below', 'in']
test 'generateDirectiveSelector', ->
    strictEqual tools.generateDirectiveSelector(
        'a-b'
    ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'
    strictEqual tools.generateDirectiveSelector(
        'aB'
    ), 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'
    strictEqual tools.generateDirectiveSelector(
        'a'
    ), 'a, .a, [a], [data-a], [x-a]'
    strictEqual tools.generateDirectiveSelector(
        'aa'
    ), 'aa, .aa, [aa], [data-aa], [x-aa]'
    strictEqual tools.generateDirectiveSelector(
        'aaBB'
    ), 'aa-bb, .aa-bb, [aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb], [aa_bb]'
    strictEqual tools.generateDirectiveSelector(
        'aaBbCcDd'
    ), 'aa-bb-cc-dd, .aa-bb-cc-dd, [aa-bb-cc-dd], [data-aa-bb-cc-dd], ' +
    '[x-aa-bb-cc-dd], [aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]'
    strictEqual tools.generateDirectiveSelector(
        'mceHREF'
    ), 'mce-href, .mce-href, [mce-href], [data-mce-href], [x-mce-href], ' +
        '[mce\\:href], [mce_href]'
test 'removeDirective', ->
    $bodyDomNode = $bodyDomNode.Tools 'removeDirective', 'a'
    equal $bodyDomNode.Tools().removeDirective('a'), $bodyDomNode
test 'getNormalizedDirectiveName', ->
    equal tools.getNormalizedDirectiveName('data-a'), 'a'
    equal tools.getNormalizedDirectiveName('x-a'), 'a'
    equal tools.getNormalizedDirectiveName('data-a-bb'), 'aBb'
    equal tools.getNormalizedDirectiveName('x:a:b'), 'aB'
test 'getDirectiveValue', ->
    equal $('body').Tools('getDirectiveValue', 'a'), null
test 'sliceDomNodeSelectorPrefix', ->
    strictEqual tools.sliceDomNodeSelectorPrefix('body div'), 'div'
    strictEqual $.Tools(
        domNodeSelectorPrefix: 'body div'
    ).sliceDomNodeSelectorPrefix('body div'), ''
    strictEqual $.Tools(
        domNodeSelectorPrefix: ''
    ).sliceDomNodeSelectorPrefix('body div'), 'body div'
test 'getDomNodeName', ->
    strictEqual tools.getDomNodeName('div'), 'div'
    strictEqual tools.getDomNodeName('<div>'), 'div'
    strictEqual tools.getDomNodeName('<div />'), 'div'
    strictEqual tools.getDomNodeName('<div></div>'), 'div'

    strictEqual tools.getDomNodeName('a'), 'a'
    strictEqual tools.getDomNodeName('<a>'), 'a'
    strictEqual tools.getDomNodeName('<a />'), 'a'
    strictEqual tools.getDomNodeName('<a></a>'), 'a'
test 'grabDomNode', ->
    $domNodes = tools.grabDomNode
        qunit: 'body div#qunit', qunitFixture: 'body div#qunit-fixture'
    delete $domNodes.window
    delete $domNodes.document
    deepEqual(
        $domNodes
        qunit: $('body div#qunit'), qunitFixture: $('body div#qunit-fixture')
        parent: $ 'body')
    $domNodes = tools.grabDomNode
        qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
    delete $domNodes.window
    delete $domNodes.document
    deepEqual(
        $domNodes
        parent: $('body'), qunit: $('body div#qunit')
        qunitFixture: $ 'body div#qunit-fixture')
    $domNodes = tools.grabDomNode {
        qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
    }, 'body'
    delete $domNodes.window
    delete $domNodes.document
    deepEqual(
        $domNodes
        parent: $('body'), qunit: $('body').find 'div#qunit'
        qunitFixture: $('body').find 'div#qunit-fixture')

## # endregion

## # region scope

test 'isolateScope', ->
    deepEqual tools.isolateScope({}), {}
    deepEqual tools.isolateScope(a: 2), a: 2
    deepEqual tools.isolateScope(a: 2, b: a: [1, 2]), a: 2, b: a: [1, 2]
    scope = -> this.a = 2
    scope.prototype = b: 2, _a: 5
    scope = new scope
    deepEqual tools.isolateScope(scope), _a: 5, a: 2, b: undefined
    scope.b = 3
    deepEqual tools.isolateScope(scope), _a: 5, a: 2, b: 3
    deepEqual tools.isolateScope(scope, []), _a: undefined, a: 2, b: 3
    scope._a = 6
    deepEqual tools.isolateScope(scope), _a: 6, a: 2, b: 3
    scope = -> this.a = 2
    scope.prototype = b: 3
    deepEqual tools.isolateScope(new scope, ['b']), a: 2, b: 3
    deepEqual tools.isolateScope(new scope), a: 2, b: undefined
test 'determineUniqueScopeName', ->
    ok tools.stringStartsWith tools.determineUniqueScopeName(), 'callback'
    ok tools.stringStartsWith tools.determineUniqueScopeName('hans'), 'hans'
    ok tools.stringStartsWith tools.determineUniqueScopeName(
        'hans', {}
    ), 'hans'

## # endregion

## # region function handling

test 'getMethod', ->
    testObject = value: false

    tools.getMethod(-> testObject.value = true)()
    ok testObject.value

    tools.getMethod((-> this.value = false), testObject)()
    notOk testObject.value

    strictEqual tools.getMethod(
        ((thisFunction, context, five, two, three) ->
            context.value = five + two + three
        ), testObject, 5
    )(2, 3), 10
test 'identity', ->
    strictEqual tools.identity(2), 2
    strictEqual tools.identity(''), ''
    strictEqual tools.identity(), undefined
    strictEqual tools.identity(null), null
    strictEqual tools.identity('hans'), 'hans'
    ok tools.identity({}) isnt {}
    testObject = {}
    strictEqual tools.identity(testObject), testObject
test 'invertArrayFilter', ->
    deepEqual tools.invertArrayFilter(tools.arrayDeleteEmptyItems)([
        a: null
    ]), [a: null]
    deepEqual tools.invertArrayFilter(tools.arrayExtractIfMatches)([
        'a', 'b'
    ], '^a$'), ['b']

## # endregion

## # region event

test 'debounce', ->
    testValue = false
    tools.debounce(-> testValue = true)()
    ok testValue
    tools.debounce((-> testValue = false), 1000)()
    notOk testValue
test 'fireEvent', ->
    testValue = false

    strictEqual(
        $.Tools('onClick': -> testValue = true).fireEvent('click', true),
        true)
    ok testValue
    strictEqual(
        $.Tools('onClick': -> testValue = false).fireEvent('click', true),
        true)
    notOk testValue
    strictEqual tools.fireEvent('click'), false
    notOk testValue
    tools.onClick = -> testValue = true
    strictEqual tools.fireEvent('click'), false
    ok testValue
    tools.onClick = -> testValue = false
    strictEqual tools.fireEvent('click', true), false
    ok testValue
test 'on', ->
    testValue = false
    strictEqual tools.on('body', 'click', -> testValue = true)[0], $('body')[0]

    $('body').trigger 'click'
    ok testValue
test 'off', ->
    testValue = false
    strictEqual tools.on('body', 'click', -> testValue = true)[0], $('body')[0]
    strictEqual tools.off('body', 'click')[0], $('body')[0]

    $('body').trigger 'click'
    notOk testValue

## # endregion

## # region object

test 'forEachSorted', ->
    result = []
    tester = (item) -> tools.forEachSorted item, (value, key) ->
        result.push [key, value]
    tester {}
    deepEqual result, []
    deepEqual tester({}), []
    deepEqual tester([]), []
    deepEqual tester(a: 2), ['a']
    deepEqual tester(b: 1, a: 2), ['a', 'b']
    result = []
    tester b: 1, a: 2
    deepEqual result, [['a', 2], ['b', 1]]
    result = []
    tester [2, 2]
    deepEqual result, [[0, 2], [1, 2]]
    result = []
    tester {5: 2, 6: 2, 2: 3}
    deepEqual result, [['2', 3], ['5', 2], ['6', 2]]
    result = []
    tester {'a': 2, 'c': 2, 'z': 3}
    deepEqual result, [['a', 2], ['c', 2], ['z', 3]]
    tools.forEachSorted [1], ((value, key) ->
        result = this
    ), 2
    deepEqual result, 2
test 'sort', ->
    deepEqual tools.sort([]), []
    deepEqual tools.sort({}), []
    deepEqual tools.sort([1]), [0]
    deepEqual tools.sort([1, 2, 3]), [0, 1, 2]
    deepEqual tools.sort([3, 2, 1]), [0, 1, 2]
    deepEqual tools.sort([2, 3, 1]), [0, 1, 2]
    deepEqual tools.sort({1: 2, 2: 5, 3: 'a'}), ['1', '2', '3']
    deepEqual tools.sort({2: 2, 1: 5, '-5': 'a'}), ['-5', '1', '2']
    deepEqual tools.sort({3: 2, 2: 5, 1: 'a'}), ['1', '2', '3']
    deepEqual tools.sort({'a': 2, 'b': 5, 'c': 'a'}), ['a', 'b', 'c']
    deepEqual tools.sort({'c': 2, 'b': 5, 'a': 'a'}), ['a', 'b', 'c']
    deepEqual tools.sort({'b': 2, 'c': 5, 'z': 'a'}), ['b', 'c', 'z']
test 'equals', ->
    ok tools.equals 1, 1
    ok tools.equals (new window.Date), (new window.Date)
    ok tools.equals (new window.Date 1995, 11, 17), (new window.Date(
        1995, 11, 17))
    notOk tools.equals (new window.Date 1995, 11, 17), (new window.Date(
        1995, 11, 16))
    ok tools.equals /a/, /a/
    notOk tools.equals /a/i, /a/
    notOk tools.equals 1, 2
    ok tools.equals {a: 2}, a: 2
    notOk tools.equals {a: 2, b: 3}, a: 2
    ok tools.equals {a: 2, b: 3}, a: 2, b: 3
    ok tools.equals [1, 2, 3], [1, 2, 3]
    notOk tools.equals [1, 2, 3, 4], [1, 2, 3, 5]
    notOk tools.equals [1, 2, 3, 4], [1, 2, 3]
    ok tools.equals [], []
    ok tools.equals {}, {}
    ok tools.equals [1, 2, 3, a: 2], [1, 2, 3, a: 2]
    notOk tools.equals [1, 2, 3, a: 2], [1, 2, 3, b: 2]
    ok tools.equals [1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]
    notOk tools.equals [1, 2, 3, [1, 2]], [1, 2, 3, [1, 2, 3]]
    notOk tools.equals [1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2]]
    notOk tools.equals [1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, {}]]
    ok tools.equals [a: 1], [a: 1]
    notOk tools.equals [a: 1, b: 1], [a: 1]
    ok tools.equals [a: 1, b: 1], [a: 1], []
    ok tools.equals [a: 1, b: 1], [a: 1], ['a']
    notOk tools.equals [a: 1, b: 1], [a: 1], ['a', 'b']
    ok tools.equals 2, 2, 0
    notOk tools.equals 1, 2, 0
    ok tools.equals [a: 1, b: 1], [a: 1], null, 0
    notOk tools.equals [{a: 1}, b: 1], [a: 1], null, 1
    ok tools.equals [{a: 1}, b: 1], [{a: 1}, b: 1], null, 1
    ok tools.equals [{a: b: 1}, b: 1], [{a: 1}, b: 1], null, 1
    notOk tools.equals [{a: b: 1}, b: 1], [{a: 1}, b: 1], null, 2
    ok tools.equals [{a: b: 1}, b: 1], [{a: b: 1}, b: 1], null, 2
    ok tools.equals [{a: b: c: 1}, b: 1], [{a: b: 1}, b: 1], null, 2
    notOk tools.equals [{a: b: c: 1}, b: 1], [{a: b: 1}, b: 1], null, 3
    ok tools.equals [{a: b: c: 1}, b: 1], [{a: b: 1}, b: 1], null, 3, ['b']
    ok tools.equals (->), ->
    notOk tools.equals (->), (->), null, -1, [], false
    test = ->
    ok tools.equals test, test, null, -1, [], false

## # endregion

## # region array

test 'argumentsObjectToArray', ->
    notOk $.isArray arguments
    ok $.isArray tools.argumentsObjectToArray arguments
test 'arrayUnique', ->
    deepEqual tools.arrayUnique([1, 2, 3, 1]), [1, 2, 3]
    deepEqual tools.arrayUnique([1, 2, 3, 1, 2, 3]), [1, 2, 3]
    deepEqual tools.arrayUnique([]), []
    deepEqual tools.arrayUnique([1, 2, 3]), [1, 2, 3]
test 'arrayAggregatePropertyIfEqual', ->
    strictEqual tools.arrayAggregatePropertyIfEqual([a: 'b'], 'a'), 'b'
    strictEqual tools.arrayAggregatePropertyIfEqual([{a: 'b'}, {
        a: 'b'
    }], 'a'), 'b'
    strictEqual tools.arrayAggregatePropertyIfEqual([{a: 'b'}, {
        a: 'c'
    }], 'a'), ''
    strictEqual tools.arrayAggregatePropertyIfEqual([{a: 'b'}, {
        a: 'c'
    }], 'a', false), false
test 'arrayDeleteEmptyItems', ->
    deepEqual tools.arrayDeleteEmptyItems([a: null]), []
    deepEqual tools.arrayDeleteEmptyItems([a: null, b: 2]), [a: null, b: 2]
    deepEqual tools.arrayDeleteEmptyItems([a: null, b: 2], ['a']), []
    deepEqual tools.arrayDeleteEmptyItems([], ['a']), []
    deepEqual tools.arrayDeleteEmptyItems([]), []
test 'arrayExtract', ->
    deepEqual tools.arrayExtract([a: 'b', c: 'd'], ['a']), [a: 'b']
    deepEqual tools.arrayExtract([a: 'b', c: 'd'], ['b']), [{}]
    deepEqual tools.arrayExtract([a: 'b', c: 'd'], ['c']), [c: 'd']
    deepEqual tools.arrayExtract([{a: 'b', c: 'd'}, a: 3], ['c']), [c: 'd', {}]
    deepEqual tools.arrayExtract([{a: 'b', c: 'd'}, c: 3], ['c']), [c: 'd', {
        c: 3}]
test 'arrayExtractIfMatches', ->
    deepEqual tools.arrayExtractIfMatches(['b'], /b/), ['b']
    deepEqual tools.arrayExtractIfMatches(['b'], 'b'), ['b']
    deepEqual tools.arrayExtractIfMatches(['b'], 'a'), []
    deepEqual tools.arrayExtractIfMatches([], 'a'), []
    deepEqual tools.arrayExtractIfMatches(['a', 'b'], ''), ['a', 'b']
    deepEqual tools.arrayExtractIfMatches(['a', 'b'], '^$'), []
    deepEqual tools.arrayExtractIfMatches(['a', 'b'], 'b'), ['b']
    deepEqual tools.arrayExtractIfMatches(['a', 'b'], '[ab]'), ['a', 'b']
test 'arrayExtractIfPropertyExists', ->
    deepEqual tools.arrayExtractIfPropertyExists([a: 2], 'a'), [a: 2]
    deepEqual tools.arrayExtractIfPropertyExists([a: 2], 'b'), []
    deepEqual tools.arrayExtractIfPropertyExists([], 'b'), []
    deepEqual tools.arrayExtractIfPropertyExists([{a: 2}, {b: 3}], 'a'), [a: 2]
test 'arrayExtractIfPropertyMatches', ->
    deepEqual tools.arrayExtractIfPropertyMatches([a: 'b'], a: 'b'), [a: 'b']
    deepEqual tools.arrayExtractIfPropertyMatches([a: 'b'], a: '.'), [a: 'b']
    deepEqual tools.arrayExtractIfPropertyMatches([a: 'b'], a: 'a'), []
    deepEqual tools.arrayExtractIfPropertyMatches([], a: 'a'), []
    deepEqual tools.arrayExtractIfPropertyMatches([a: 2], b: /a/), []
test 'arrayIntersect', ->
    deepEqual tools.arrayIntersect(['A'], ['A']), ['A']
    deepEqual tools.arrayIntersect(['A', 'B'], ['A']), ['A']
    deepEqual tools.arrayIntersect([], []), []
    deepEqual tools.arrayIntersect([5], []), []
    deepEqual tools.arrayIntersect([a: 2], [a: 2]), [a: 2]
    deepEqual tools.arrayIntersect([a: 3], [a: 2]), []
    deepEqual tools.arrayIntersect([a: 3], [b: 3]), []
    deepEqual tools.arrayIntersect([a: 3], [b: 3], ['b']), []
    deepEqual tools.arrayIntersect([a: 3], [b: 3], ['b'], false), []
    deepEqual tools.arrayIntersect([b: null], [b: null], ['b']), [b: null]
    deepEqual tools.arrayIntersect([b: null], [b: undefined], ['b']), []
    deepEqual tools.arrayIntersect([b: null], [b: undefined], ['b'], false), [
        b: null]
    deepEqual tools.arrayIntersect([b: null], [{}], ['b'], false), [b: null]
    deepEqual tools.arrayIntersect([b: undefined], [{}], ['b'], false), [
        b: undefined]
    deepEqual tools.arrayIntersect([{}], [{}], ['b'], false), [{}]
    deepEqual tools.arrayIntersect([b: null], [{}], ['b']), []
    deepEqual tools.arrayIntersect([b: undefined], [{}], ['b'], true), [
        b: undefined]
    deepEqual tools.arrayIntersect([b: 1], [a: 1], {b: 'a'}, true), [{b: 1}]
test 'arrayMakeRange', ->
    deepEqual tools.arrayMakeRange([0]), [0]
    deepEqual tools.arrayMakeRange([5]), [0, 1, 2, 3, 4, 5]
    deepEqual tools.arrayMakeRange([]), []
    deepEqual tools.arrayMakeRange([2, 5]), [2, 3, 4, 5]
test 'arraySumUpProperty', ->
    strictEqual tools.arraySumUpProperty([{a: 2}, {a: 3}], 'a'), 5
    strictEqual tools.arraySumUpProperty([{a: 2}, {b: 3}], 'a'), 2
    strictEqual tools.arraySumUpProperty([{a: 2}, {b: 3}], 'c'), 0
test 'arrayAppendAdd', ->
    deepEqual tools.arrayAppendAdd({}, {}, 'b'), b: [{}]
    test = {}
    deepEqual tools.arrayAppendAdd(test, {a: 3}, 'b'), b: [a: 3]
    deepEqual tools.arrayAppendAdd(test, {a: 3}, 'b'), b: [{a: 3}, a: 3]
    deepEqual tools.arrayAppendAdd({b: [2]}, 2, 'b', false), b: [2, 2]
    deepEqual tools.arrayAppendAdd({b: [2]}, 2, 'b'), b: [2]
test 'arrayRemove', ->
    deepEqual tools.arrayRemove([], 2), []
    throws (-> tools.arrayRemove [], 2, true), Error(
        "Given target doesn't exists in given list.")
    deepEqual tools.arrayRemove([2], 2), []
    deepEqual tools.arrayRemove([2], 2, true), []
    deepEqual tools.arrayRemove([1, 2], 2), [1]
    deepEqual tools.arrayRemove([1, 2], 2, true), [1]

## # endregion

## # region string

## ## region url handling

test 'stringEncodeURIComponent', ->
    strictEqual tools.stringEncodeURIComponent(''), ''
    strictEqual tools.stringEncodeURIComponent(' '), '+'
    strictEqual tools.stringEncodeURIComponent(' ', true), '%20'
    strictEqual tools.stringEncodeURIComponent('@:$, '), '@:$,+'
    strictEqual tools.stringEncodeURIComponent('+'), '%2B'
test 'stringAddSeparatorToPath', ->
    strictEqual tools.stringAddSeparatorToPath(''), ''
    strictEqual tools.stringAddSeparatorToPath('/'), '/'
    strictEqual tools.stringAddSeparatorToPath('/a'), '/a/'
    strictEqual tools.stringAddSeparatorToPath('/a/bb/'), '/a/bb/'
    strictEqual tools.stringAddSeparatorToPath('/a/bb'), '/a/bb/'
    strictEqual tools.stringAddSeparatorToPath('/a/bb', '|'), '/a/bb|'
    strictEqual tools.stringAddSeparatorToPath('/a/bb/', '|'), '/a/bb/|'
test 'stringHasPathPrefix', ->
    ok tools.stringHasPathPrefix '/admin', '/admin'
    ok tools.stringHasPathPrefix 'test', 'test'
    ok tools.stringHasPathPrefix '', ''
    ok tools.stringHasPathPrefix 'a', 'a/b'
    notOk tools.stringHasPathPrefix 'b', 'a/b'
    notOk tools.stringHasPathPrefix 'b/', 'a/b'
    ok tools.stringHasPathPrefix 'a/', 'a/b'
    notOk tools.stringHasPathPrefix '/admin/', '/admin/test', '#'
    notOk tools.stringHasPathPrefix '/admin', '/admin/test', '#'
    ok tools.stringHasPathPrefix '/admin', '/admin#test', '#'
test 'stringGetDomainName', ->
    strictEqual tools.stringGetDomainName(
        'https://www.test.de/site/subSite?param=value#hash'
    ), 'www.test.de'
    strictEqual tools.stringGetDomainName('a', true), true
    strictEqual tools.stringGetDomainName('http://www.test.de'), 'www.test.de'
    strictEqual tools.stringGetDomainName('http://a.de'), 'a.de'
    strictEqual tools.stringGetDomainName('http://localhost'), 'localhost'
    strictEqual tools.stringGetDomainName('localhost'), 'localhost'
    strictEqual tools.stringGetDomainName('a'), window.location.hostname
    strictEqual tools.stringGetDomainName('//a'), 'a'
    strictEqual tools.stringGetDomainName(
        'a/site/subSite?param=value#hash'
    ), window.location.hostname
    strictEqual tools.stringGetDomainName(
        '/a/site/subSite?param=value#hash'
    ), window.location.hostname
    strictEqual tools.stringGetDomainName(
        '//alternate.local/a/site/subSite?param=value#hash'
    ), 'alternate.local'
    strictEqual tools.stringGetDomainName(
        '//alternate.local/'
    ), 'alternate.local'
test 'stringGetPortNumber', ->
    strictEqual tools.stringGetPortNumber(
        'https://www.test.de/site/subSite?param=value#hash'
    ), 443
    strictEqual tools.stringGetPortNumber('http://www.test.de'), 80
    strictEqual tools.stringGetPortNumber('http://www.test.de', true), true
    strictEqual tools.stringGetPortNumber('www.test.de'), window.parseInt(
        window.location.port)
    strictEqual tools.stringGetPortNumber('a'), window.parseInt(
        window.location.port)
    strictEqual tools.stringGetPortNumber('a', true), true
    strictEqual tools.stringGetPortNumber('a:80'), 80
    strictEqual tools.stringGetPortNumber('a:20'), 20
    strictEqual tools.stringGetPortNumber('a:444'), 444
    strictEqual tools.stringGetPortNumber('http://localhost:89'), 89
    strictEqual tools.stringGetPortNumber('https://localhost:89'), 89
    strictEqual tools.stringGetPortNumber(), window.parseInt(
        window.location.port)
test 'stringGetProtocolName', ->
    strictEqual tools.stringGetProtocolName(
        'https://www.test.de/site/subSite?param=value#hash'
    ), 'https'
    strictEqual tools.stringGetProtocolName('http://www.test.de'), 'http'
    strictEqual tools.stringGetProtocolName(
        '//www.test.de'
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
    strictEqual tools.stringGetProtocolName('http://a.de'), 'http'
    strictEqual tools.stringGetProtocolName('ftp://localhost'), 'ftp'
    strictEqual tools.stringGetProtocolName(
        'a'
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
    strictEqual tools.stringGetProtocolName(
        'a/site/subSite?param=value#hash'
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
    strictEqual tools.stringGetProtocolName(
        '/a/site/subSite?param=value#hash'
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
    strictEqual tools.stringGetProtocolName(
        'alternate.local/a/site/subSite?param=value#hash'
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
    strictEqual tools.stringGetProtocolName(
        'alternate.local/'
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
    strictEqual tools.stringGetProtocolName(
    ), window.location.protocol.substring(
        0, window.location.protocol.length - 1)
test 'stringGetURLVariable', ->
    ok $.isArray tools.stringGetURLVariable()
    ok $.isArray tools.stringGetURLVariable null, '&'
    ok $.isArray tools.stringGetURLVariable null, '#'
    strictEqual tools.stringGetURLVariable('notExisting'), undefined
    strictEqual tools.stringGetURLVariable('notExisting', '&'), undefined
    strictEqual tools.stringGetURLVariable('notExisting', '#'), undefined
    strictEqual tools.stringGetURLVariable('test', '?test=2'), '2'
    strictEqual tools.stringGetURLVariable('test', 'test=2'), '2'
    strictEqual tools.stringGetURLVariable('test', 'test=2&a=2'), '2'
    strictEqual tools.stringGetURLVariable('test', 'b=3&test=2&a=2'), '2'
    strictEqual tools.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2'
    strictEqual tools.stringGetURLVariable('test', '?b=3&test=2&a=2'), '2'
    strictEqual tools.stringGetURLVariable(
        'test', '&', '$', '!', '', '#$test=2'
    ), '2'
    strictEqual tools.stringGetURLVariable(
        'test', '&', '$', '!', '?test=4', '#$test=3'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'a', '&', '$', '!', '?test=4', '#$test=3'
    ), undefined
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '?test=4', '#$test=3'
    ), '3'
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '', '#!test#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '', '#!/test/a#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '', '#!/test/a/#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '', '#!test/a/#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '', '#!/#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '#', '$', '!', '', '#!test?test=3#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '&', '$', '!', null, '#!a?test=3'
    ), '3'
    strictEqual tools.stringGetURLVariable(
        'test', '&', '$', '!', null, '#!test#$test=4'
    ), '4'
    strictEqual tools.stringGetURLVariable(
        'test', '&', '$', '!', null, '#!test?test=3#$test=4'
    ), '3'
test 'stringIsInternalURL', ->
    ok tools.stringIsInternalURL(
        'https://www.test.de/site/subSite?param=value#hash'
        'https://www.test.de/site/subSite?param=value#hash')
    notOk tools.stringIsInternalURL(
        "#{window.location.protocol}//www.test.de/site/subSite?param=value#" +
            'hash'
        'ftp://www.test.de/site/subSite?param=value#hash')
    notOk tools.stringIsInternalURL(
        'https://www.test.de/site/subSite?param=value#hash'
        'http://www.test.de/site/subSite?param=value#hash')
    notOk tools.stringIsInternalURL(
        'http://www.test.de/site/subSite?param=value#hash'
        'test.de/site/subSite?param=value#hash')
    notOk tools.stringIsInternalURL(
        "#{window.location.protocol}//www.test.de:#{window.location.port}/" +
            'site/subSite?param=value#hash'
        '/site/subSite?param=value#hash')
    ok tools.stringIsInternalURL(
        '//www.test.de/site/subSite?param=value#hash'
        '//www.test.de/site/subSite?param=value#hash')
    ok tools.stringIsInternalURL(
        "#{window.location.protocol}//www.test.de/site/subSite?param=value#" +
            'hash'
        '//www.test.de/site/subSite?param=value#hash')
    notOk tools.stringIsInternalURL(
        "http://www.test.de:#{window.location.port}/site/subSite?param=value" +
            '#hash'
        'https://www.test.de/site/subSite?param=value#hash')
    ok tools.stringIsInternalURL(
        'https://www.test.de:443/site/subSite?param=value#hash'
        'https://www.test.de/site/subSite?param=value#hash')
    ok tools.stringIsInternalURL(
        '//www.test.de:80/site/subSite?param=value#hash'
        '//www.test.de/site/subSite?param=value#hash')
    ok tools.stringIsInternalURL window.location.href
    ok tools.stringIsInternalURL '1'
    ok tools.stringIsInternalURL '#1'
    ok tools.stringIsInternalURL '/a'
test 'stringNormalizeURL', ->
    strictEqual tools.stringNormalizeURL('www.test.com'), 'http://www.test.com'
    strictEqual tools.stringNormalizeURL('test'), 'http://test'
    strictEqual tools.stringNormalizeURL('http://test'), 'http://test'
    strictEqual tools.stringNormalizeURL('https://test'), 'https://test'
test 'stringRepresentURL', ->
    strictEqual tools.stringRepresentURL('http://www.test.com'), 'www.test.com'
    strictEqual tools.stringRepresentURL(
        'ftp://www.test.com'
    ), 'ftp://www.test.com'
    strictEqual tools.stringRepresentURL(
        'https://www.test.com'
    ), 'www.test.com'

## ## endregion

test 'stringCamelCaseToDelimited', ->
    strictEqual tools.stringCamelCaseToDelimited('hansPeter'), 'hans-peter'
    strictEqual tools.stringCamelCaseToDelimited(
        'hansPeter', '|'
    ), 'hans|peter'
    strictEqual tools.stringCamelCaseToDelimited(''), ''
    strictEqual tools.stringCamelCaseToDelimited('h'), 'h'
    strictEqual tools.stringCamelCaseToDelimited('hP', ''), 'hp'
    strictEqual tools.stringCamelCaseToDelimited('hansPeter'), 'hans-peter'
    strictEqual tools.stringCamelCaseToDelimited('hans-peter'), 'hans-peter'
    strictEqual tools.stringCamelCaseToDelimited(
        'hansPeter', '_'
    ), 'hans_peter'
    strictEqual tools.stringCamelCaseToDelimited(
        'hansPeter', '+'
    ), 'hans+peter'
    strictEqual tools.stringCamelCaseToDelimited('Hans'), 'hans'
    strictEqual tools.stringCamelCaseToDelimited('hansAPIURL', '-', [
        'api', 'url'
    ]), 'hans-api-url'
    strictEqual tools.stringCamelCaseToDelimited('hansPeter', '-', [
    ]), 'hans-peter'
test 'stringCapitalize', ->
    strictEqual tools.stringCapitalize('hansPeter'), 'HansPeter'
    strictEqual tools.stringCapitalize(''), ''
    strictEqual tools.stringCapitalize('a'), 'A'
    strictEqual tools.stringCapitalize('A'), 'A'
    strictEqual tools.stringCapitalize('AA'), 'AA'
    strictEqual tools.stringCapitalize('Aa'), 'Aa'
    strictEqual tools.stringCapitalize('aa'), 'Aa'
test 'stringDelimitedToCamelCase', ->
    strictEqual tools.stringDelimitedToCamelCase('hans-peter'), 'hansPeter'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans|peter', '|'
    ), 'hansPeter'
    strictEqual tools.stringDelimitedToCamelCase(''), ''
    strictEqual tools.stringDelimitedToCamelCase('h'), 'h'
    strictEqual tools.stringDelimitedToCamelCase('hans-peter'), 'hansPeter'
    strictEqual tools.stringDelimitedToCamelCase('hans--peter'), 'hans-Peter'
    strictEqual tools.stringDelimitedToCamelCase('Hans-Peter'), 'HansPeter'
    strictEqual tools.stringDelimitedToCamelCase('-Hans-Peter'), '-HansPeter'
    strictEqual tools.stringDelimitedToCamelCase('-'), '-'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans-peter', '_'
    ), 'hans-peter'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans_peter', '_'
    ), 'hansPeter'
    strictEqual tools.stringDelimitedToCamelCase('hans_id', '_'), 'hansID'
    strictEqual tools.stringDelimitedToCamelCase(
        'url_hans_id', '_', ['hans']
    ), 'urlHANSId'
    strictEqual tools.stringDelimitedToCamelCase('url_hans_1', '_'), 'urlHans1'
    strictEqual tools.stringDelimitedToCamelCase(
        'hansUrl1', '-', ['url'], true
    ), 'hansUrl1'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans-url', '-', ['url'], true
    ), 'hansURL'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans-Url', '-', ['url'], true
    ), 'hansUrl'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans-Url', '-', ['url'], false
    ), 'hansURL'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans-Url', '-', [], false
    ), 'hansUrl'
test 'stringEndsWith', ->
    ok tools.stringEndsWith 'hans', 'ns'
    ok tools.stringEndsWith 'ns', 'ns'
    ok tools.stringEndsWith 'ns', 's'
    ok tools.stringEndsWith 'ns', ''
    ok tools.stringEndsWith '', ''
    notOk tools.stringEndsWith 'ns', 'n'
    notOk tools.stringEndsWith '', 'n'
    notOk tools.stringEndsWith 'ns', 'S'
test 'stringFormat', ->
    strictEqual tools.stringFormat('{1}', 'test'), 'test'
    strictEqual tools.stringFormat('', 'test'), ''
    strictEqual tools.stringFormat('{1}'), '{1}'
    strictEqual tools.stringFormat(
        '{1} test {2} - {2}', 1, 2
    ), '1 test 2 - 2'
test 'stringGetRegularExpressionValidated', ->
    strictEqual tools.stringGetRegularExpressionValidated(
        "that's no regex: .*$"
    ), "that's no regex: \\.\\*\\$"
    strictEqual tools.stringGetRegularExpressionValidated(''), ''
    strictEqual tools.stringGetRegularExpressionValidated(
        '-\[]()^$*+.}-'
    ), '\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-'
    strictEqual tools.stringGetRegularExpressionValidated('-'), '\\-'
test 'stringLowerCase', ->
    strictEqual tools.stringLowerCase('HansPeter'), 'hansPeter'
    strictEqual tools.stringLowerCase(''), ''
    strictEqual tools.stringLowerCase('A'), 'a'
    strictEqual tools.stringLowerCase('a'), 'a'
    strictEqual tools.stringLowerCase('aa'), 'aa'
    strictEqual tools.stringLowerCase('Aa'), 'aa'
    strictEqual tools.stringLowerCase('aa'), 'aa'
test 'stringMark', ->
    strictEqual tools.stringMark(''), ''
    strictEqual tools.stringMark(
        'test', 'e'
    ), 't<span class="tools-mark">e</span>st'
    strictEqual tools.stringMark(
        'test', 'es'
    ), 't<span class="tools-mark">es</span>t'
    strictEqual tools.stringMark(
        'test', 'test'
    ), '<span class="tools-mark">test</span>'
    strictEqual tools.stringMark('test', ''), 'test'
    strictEqual tools.stringMark('test', 'tests'), 'test'
    strictEqual tools.stringMark('', 'test'), ''
    strictEqual tools.stringMark('test', 'e', '<a>{1}</a>'), 't<a>e</a>st'
    strictEqual tools.stringMark('test', 'E', '<a>{1}</a>'), 't<a>e</a>st'
    strictEqual tools.stringMark(
        'test', 'E', '<a>{1}</a>', false
    ), 't<a>e</a>st'
    strictEqual tools.stringMark(
        'tesT', 't', '<a>{1}</a>'
    ), '<a>t</a>es<a>T</a>'
    strictEqual tools.stringMark(
        'tesT', 't', '<a>{1} - {1}</a>'
    ), '<a>t - t</a>es<a>T - T</a>'
    strictEqual tools.stringMark('test', 'E', '<a>{1}</a>', true), 'test'
test 'stringMD5', ->
    strictEqual tools.stringMD5('test'), '098f6bcd4621d373cade4e832627b4f6'
    strictEqual tools.stringMD5(''), 'd41d8cd98f00b204e9800998ecf8427e'
test 'stringNormalizePhoneNumber', ->
    strictEqual tools.stringNormalizePhoneNumber('0'), '0'
    strictEqual tools.stringNormalizePhoneNumber(0), '0'
    strictEqual tools.stringNormalizePhoneNumber(
        '+49 172 (0) / 0212 - 3'
    ), '0049172002123'
test 'stringRepresentPhoneNumber', ->
    strictEqual tools.stringRepresentPhoneNumber('0'), '0'
    strictEqual tools.stringRepresentPhoneNumber(
        '0172-12321-1'
    ), '+49 (0) 172 / 123 21-1'
    strictEqual tools.stringRepresentPhoneNumber(
        '0172-123211'
    ), '+49 (0) 172 / 12 32 11'
    strictEqual tools.stringRepresentPhoneNumber(
        '0172-1232111'
    ), '+49 (0) 172 / 123 21 11'
test 'stringStartsWith', ->
    ok tools.stringStartsWith 'hans', 'ha'
    ok tools.stringStartsWith 'ha', 'ha'
    ok tools.stringStartsWith 'ha', 'h'
    ok tools.stringStartsWith 'ha', ''
    ok tools.stringStartsWith '', ''
    notOk tools.stringStartsWith 'ha', 'a'
    notOk tools.stringStartsWith '', 'a'
    notOk tools.stringStartsWith 'ha', 'H'
test 'stringDecodeHTMLEntities', ->
    equal tools.stringDecodeHTMLEntities(''), ''
    equal tools.stringDecodeHTMLEntities('<div></div>'), '<div></div>'
    equal tools.stringDecodeHTMLEntities('<div>&amp;</div>'), '<div>&</div>'
    equal tools.stringDecodeHTMLEntities(
        '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>'
    ), '<div>&äÄüÜöÖ</div>'

## # endregion

## # region number

test 'numberIsNotANumber', ->
    strictEqual tools.numberIsNotANumber(window.NaN), true
    strictEqual tools.numberIsNotANumber({}), false
    strictEqual tools.numberIsNotANumber(undefined), false
    strictEqual tools.numberIsNotANumber(new Date().toString()), false
    strictEqual tools.numberIsNotANumber(null), false
    strictEqual tools.numberIsNotANumber(false), false
    strictEqual tools.numberIsNotANumber(true), false
    strictEqual tools.numberIsNotANumber(0), false
test 'numberRound', ->
    strictEqual tools.numberRound(1.5, 0), 2
    strictEqual tools.numberRound(1.4, 0), 1
    strictEqual tools.numberRound(1.4, -1), 0
    strictEqual tools.numberRound(1000, -2), 1000
    strictEqual tools.numberRound(999, -2), 1000
    strictEqual tools.numberRound(950, -2), 1000
    strictEqual tools.numberRound(949, -2), 900
    strictEqual tools.numberRound(1.2345), 1
    strictEqual tools.numberRound(1.2345, 2), 1.23
    strictEqual tools.numberRound(1.2345, 3), 1.235
    strictEqual tools.numberRound(1.2345, 4), 1.2345
    strictEqual tools.numberRound(699, -2), 700
    strictEqual tools.numberRound(650, -2), 700
    strictEqual tools.numberRound(649, -2), 600

## # endregion

## # region data transfer

test 'sendToIFrame', ->
    iFrame = $('<iframe>').attr 'name', 'test'
    $('body').append iFrame
    ok tools.sendToIFrame iFrame, window.document.URL, {test: 5}, 'get', true
test 'sendToExternalURL', ->
    ok tools.sendToExternalURL window.document.URL, {test: 5}

## # endregion

## endregion

## region protected

test '_bindHelper', ->
    ok tools._bindHelper ['body']
    ok tools._bindHelper ['body'], true
    ok tools._bindHelper ['body'], false, 'bind'
test '_grabDomNodeHelper', ->
    strictEqual tools._grabDomNodeHelper('test', 'div', {}), 'body div'
    strictEqual(
        tools._grabDomNodeHelper('test', 'body div', {}), 'body div')
    strictEqual tools._grabDomNodeHelper('test', '', {}), 'body'
    strictEqual $.Tools(domNodeSelectorPrefix: '')._grabDomNodeHelper(
        'test', '', {}
    ), ''
    strictEqual $.Tools(domNodeSelectorPrefix: '')._grabDomNodeHelper(
        'test', 'div', {}
    ), 'div'

## endregion

# endregion

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
