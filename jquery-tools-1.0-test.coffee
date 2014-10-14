#!/usr/bin/env require
# -*- coding: utf-8 -*-

# region header

# Copyright Torben Sickert (t.sickert["~at~"]gmail.com) 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

module 'tools'

# endregion

# region tests

    # region mock-up

tools = $.Tools()

    # endregion

    # region public methods

        # region special

test 'constructor', -> ok tools
test 'destructor', -> strictEqual tools.destructor(), tools
test 'initialize', ->
    secondToolsInstance = $.Tools logging: true
    thirdToolsInstance = $.Tools domNodeSelectorPrefix: 'body.{1} div.{1}'

    ok not tools._options.logging
    ok secondToolsInstance._options.logging
    strictEqual(
        thirdToolsInstance._options.domNodeSelectorPrefix,
        'body.tools div.tools')

        # endregion

        # region object orientation

test 'controller', ->
    strictEqual tools.controller(tools, []), tools
    strictEqual tools.controller(
        $.Tools.class, [], $ 'body'
    ).__name__, tools.__name__

        # endregion

        # region mutual exclusion

test 'acquireLock|releaseLock', ->
    testValue = false
    tools.acquireLock 'test', -> testValue = true

    ok testValue
    strictEqual tools.acquireLock('test', (-> testValue = false), true), tools
    ok testValue
    ok $.Tools().releaseLock 'test'
    ok testValue
    strictEqual tools.releaseLock('test'), tools
    ok not testValue
    strictEqual tools.acquireLock('test', (-> testValue = true), true), tools
    ok testValue
    strictEqual tools.acquireLock('test', -> testValue = false), tools
    ok not testValue

        # endregion

        # region language fixes

test 'mouseOutEventHandlerFix', -> ok tools.mouseOutEventHandlerFix ->

        # endregion

        # region logging

test 'log', -> strictEqual tools.log('test'), tools
test 'info', -> strictEqual tools.info('test {1}', 'test'), tools
test 'debug', -> strictEqual tools.debug('test'), tools
test 'error', -> strictEqual tools.error('test {0}'), tools
test 'warn', -> strictEqual tools.warn('test'), tools
test 'show', ->
    strictEqual tools.show('hans'), 'hans\n(Type: "string")'
    strictEqual tools.show(A: 'a', B: 'b'), 'A: a\nB: b\n(Type: "object")'
    ok new RegExp(
        '^(.|\n|\r|\u2028|\u2029)+\\(Type: "function"\\)$'
    ).test tools.show $.Tools
    ok new RegExp('^.+: .+\\n(.|\\n)+$').test tools.show tools

        # endregion

        # region dom node handling

test 'generateDirectiveSelector', ->
    strictEqual tools.generateDirectiveSelector('a-b'), 'a-b, [a-b], .a-b'
    strictEqual tools.generateDirectiveSelector('aB'), 'a-b, [a-b], .a-b'
    strictEqual tools.generateDirectiveSelector('a'), 'a, [a], .a'
    strictEqual tools.generateDirectiveSelector('aa'), 'aa, [aa], .aa'
    strictEqual tools.generateDirectiveSelector(
        'aaBB'
    ), 'aa-bb, [aa-bb], .aa-bb'
test 'removeDirective', ->
    $bodyDomNode = $ 'body'
    $bodyDomNode = $bodyDomNode.Tools 'removeDirective', 'a'
    equal $bodyDomNode.Tools().removeDirective('a'), $bodyDomNode
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
    deepEqual $domNodes,
        qunit: $('body div#qunit'), qunitFixture: $('body div#qunit-fixture')
        parent: $ 'body'
    $domNodes = tools.grabDomNode
        qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
    delete $domNodes.window
    delete $domNodes.document
    deepEqual $domNodes,
        parent: $('body'), qunit: $('body div#qunit')
        qunitFixture: $ 'body div#qunit-fixture'

        # endregion

        # region scope

test 'determineUniqueScopeName', ->
    ok tools.stringStartsWith tools.determineUniqueScopeName(), 'callback'
    ok tools.stringStartsWith tools.determineUniqueScopeName('hans'), 'hans'
    ok tools.stringStartsWith tools.determineUniqueScopeName(
        'hans', {}
    ), 'hans'

        # endregion

        # region function handling

test 'getMethod', ->
    testObject = value: false

    tools.getMethod(-> testObject.value = true)()
    ok testObject.value

    tools.getMethod((-> this.value = false), testObject)()
    ok not testObject.value

    strictEqual tools.getMethod(
        ((thisFunction, context, five, two, three) ->
            context.value = five + two + three
        ), testObject, 5
    )(2, 3), 10

        # endregion

        # region event handling

test 'debounce', ->
    testValue = false
    tools.debounce(-> testValue = true)()
    ok testValue
    tools.debounce((-> testValue = false), 1000)()
    ok not testValue
test 'fireEvent', ->
    testValue = false

    strictEqual(
        $.Tools('onClick': -> testValue = true).fireEvent('click', true),
        true)
    ok testValue
    strictEqual(
        $.Tools('onClick': -> testValue = false).fireEvent('click', true),
        true)
    ok not testValue
    strictEqual tools.fireEvent('click'), false
    ok not testValue
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
    ok not testValue

        # endregion

        # region array handling

test 'argumentsObjectToArray', ->
    ok not $.isArray arguments
    ok $.isArray tools.argumentsObjectToArray arguments

        # endregion

        # region number handling

test 'round', ->
    strictEqual tools.round(1.5, 0), 2
    strictEqual tools.round(1.4, 0), 1
    strictEqual tools.round(1.4, -1), 0
    strictEqual tools.round(1000, -2), 1000
    strictEqual tools.round(999, -2), 1000
    strictEqual tools.round(950, -2), 1000
    strictEqual tools.round(949, -2), 900
    strictEqual tools.round(1.2345), 1
    strictEqual tools.round(1.2345, 2), 1.23
    strictEqual tools.round(1.2345, 3), 1.235
    strictEqual tools.round(1.2345, 4), 1.2345

        # endregion

        # region string manipulating

test 'stringStartsWith', ->
    ok tools.stringStartsWith 'hans', 'ha'
    ok tools.stringStartsWith 'ha', 'ha'
    ok tools.stringStartsWith 'ha', 'h'
    ok tools.stringStartsWith 'ha', ''
    ok tools.stringStartsWith '', ''
    ok not tools.stringStartsWith 'ha', 'a'
    ok not tools.stringStartsWith '', 'a'
    ok not tools.stringStartsWith 'ha', 'H'
test 'stringEndsWith', ->
    ok tools.stringEndsWith 'hans', 'ns'
    ok tools.stringEndsWith 'ns', 'ns'
    ok tools.stringEndsWith 'ns', 's'
    ok tools.stringEndsWith 'ns', ''
    ok tools.stringEndsWith '', ''
    ok not tools.stringEndsWith 'ns', 'n'
    ok not tools.stringEndsWith '', 'n'
    ok not tools.stringEndsWith 'ns', 'S'
test 'stringFormat', ->
    strictEqual tools.stringFormat('{1}', 'test'), 'test'
    strictEqual tools.stringFormat('', 'test'), ''
    strictEqual tools.stringFormat('{1}'), '{1}'
    strictEqual tools.stringFormat(
        '{1} test {2} - {2}', 1, 2
    ), '1 test 2 - 2'
test 'stringCamelCaseToDelimited', ->
    strictEqual tools.stringCamelCaseToDelimited('hansPeter'), 'hans-peter'
    strictEqual tools.stringCamelCaseToDelimited(
        'hansPeter', '|'
    ), 'hans|peter'
    strictEqual tools.stringCamelCaseToDelimited(''), ''
    strictEqual tools.stringCamelCaseToDelimited('h'), 'h'
    strictEqual tools.stringCamelCaseToDelimited('hP', ''), 'hp'
test 'stringDelimitedToCamelCase', ->
    strictEqual tools.stringDelimitedToCamelCase('HansAN-Peter'), 'hansANPeter'
    strictEqual tools.stringDelimitedToCamelCase('hans-peter'), 'hansPeter'
    strictEqual tools.stringDelimitedToCamelCase(
        'hans|peter', '|'
    ), 'hansPeter'
    strictEqual tools.stringDelimitedToCamelCase(''), ''
    strictEqual tools.stringDelimitedToCamelCase('h'), 'h'
test 'stringLowerCase', ->
    strictEqual tools.stringLowerCase('HansPeter'), 'hansPeter'
    strictEqual tools.stringLowerCase(''), ''
    strictEqual tools.stringLowerCase('A'), 'a'
    strictEqual tools.stringLowerCase('a'), 'a'
    strictEqual tools.stringLowerCase('aa'), 'aa'
    strictEqual tools.stringLowerCase('Aa'), 'aa'
    strictEqual tools.stringLowerCase('aa'), 'aa'
test 'stringCapitalize', ->
    strictEqual tools.stringCapitalize('hansPeter'), 'HansPeter'
    strictEqual tools.stringCapitalize(''), ''
    strictEqual tools.stringCapitalize('a'), 'A'
    strictEqual tools.stringCapitalize('A'), 'A'
    strictEqual tools.stringCapitalize('AA'), 'AA'
    strictEqual tools.stringCapitalize('Aa'), 'Aa'
    strictEqual tools.stringCapitalize('aa'), 'Aa'
test 'stringAddSeparatorToPath', ->
    strictEqual tools.stringAddSeparatorToPath(''), ''
    strictEqual tools.stringAddSeparatorToPath('/'), '/'
    strictEqual tools.stringAddSeparatorToPath('/a'), '/a/'
    strictEqual tools.stringAddSeparatorToPath('/a/bb/'), '/a/bb/'
    strictEqual tools.stringAddSeparatorToPath('/a/bb'), '/a/bb/'
    strictEqual tools.stringAddSeparatorToPath('/a/bb', '|'), '/a/bb|'
    strictEqual tools.stringAddSeparatorToPath('/a/bb/', '|'), '/a/bb/|'
test 'stringGetURLVariables', ->
    ok $.isArray tools.stringGetURLVariables()
    ok tools.stringGetURLVariables('not_existing') is undefined

        # endregion

    # endregion

    # region protected

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

    # endregion

# endregion

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
