# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion

# region header

# Copyright Torben Sickert 16.12.2012

# License
#    This library written by Torben Sickert stand under a creative commons
#    naming 3.0 unported license.
#    see http://creativecommons.org/licenses/by/3.0/deed.de

module 'Tools'

# endregion

# region tests

    # region public methods

        # region special

test 'constructor', -> ok $.Tools()
test 'destructor', -> ok $.Tools().destructor()
test 'initialize', ->
    firstToolsInstance = $.Tools()
    secondToolsInstance = $.Tools logging: true
    thirdToolsInstance = $.Tools domNodeSelectorPrefix: 'body.{1} div.{1}'

    ok not firstToolsInstance._options.logging
    ok secondToolsInstance._options.logging
    strictEqual(
        thirdToolsInstance._options.domNodeSelectorPrefix,
        'body.tools div.tools')

        # endregion

        # region object orientation

test 'controller', ->
    ok $.Tools().controller $.Tools.class, arguments
    ok $.Tools().controller $.Tools.class, arguments, $ 'body'

        # endregion

        # region mutual exclusion

test 'acquireLock|releaseLock', ->
    testValue = false
    tools = $.Tools()
    tools.acquireLock 'test', -> testValue = true

    ok testValue
    tools.acquireLock 'test', -> testValue = false
    ok testValue
    $.Tools().releaseLock 'test'
    ok testValue
    tools.releaseLock 'test'
    ok not testValue
    tools.acquireLock 'test', (-> testValue = true), true
    ok testValue
    tools.acquireLock 'test', -> testValue = false
    ok not testValue

        # endregion

        # region language fixes

test 'mouseOutEventHandlerFix', -> ok $.Tools().mouseOutEventHandlerFix ->

        # endregion

        # region logging

test 'log', -> ok $.Tools().log 'test'
test 'info', -> ok $.Tools().info('test {1}', 'test')
test 'debug', -> ok $.Tools().debug 'test'
test 'error', -> ok $.Tools().error 'test {0}'
test 'warn', -> ok $.Tools().warn 'test'
test 'show', ->
    strictEqual $.Tools().show('hans'), 'hans\n(Type: "string")'
    strictEqual $.Tools().show(A: 'a', B: 'b'), 'A: a\nB: b\n(Type: "object")'
    ok new RegExp(
        '^(.+\n)+\\(Type: "function"\\)$'
    ).test $.Tools().show $.Tools
    ok new RegExp('^.+: .+\\n(.|\\n)+$').test $.Tools().show $.Tools()

        # endregion

        # region dom node handling

test 'sliceDomNodeSelectorPrefix', ->
    strictEqual $.Tools().sliceDomNodeSelectorPrefix('body div'), 'div'
    strictEqual $.Tools(
        domNodeSelectorPrefix: 'body div'
    ).sliceDomNodeSelectorPrefix('body div'), ''
    strictEqual $.Tools(
        domNodeSelectorPrefix: ''
    ).sliceDomNodeSelectorPrefix('body div'), 'body div'
test 'getDomNodeName', ->
    strictEqual $.Tools().getDomNodeName('div'), 'div'
    strictEqual $.Tools().getDomNodeName('<div>'), 'div'
    strictEqual $.Tools().getDomNodeName('<div />'), 'div'
    strictEqual $.Tools().getDomNodeName('<div></div>'), 'div'

    strictEqual $.Tools().getDomNodeName('a'), 'a'
    strictEqual $.Tools().getDomNodeName('<a>'), 'a'
    strictEqual $.Tools().getDomNodeName('<a />'), 'a'
    strictEqual $.Tools().getDomNodeName('<a></a>'), 'a'
test 'grabDomNode', ->
    $domNodes = $.Tools().grabDomNode
        qunit: 'body div#qunit', qunitFixture: 'body div#qunit-fixture'
    delete $domNodes.window
    delete $domNodes.document
    deepEqual $domNodes,
        qunit: $('body div#qunit'), qunitFixture: $('body div#qunit-fixture')
        parent: $ 'body'
    $domNodes = $.Tools().grabDomNode
        qunit: 'div#qunit', qunitFixture: 'div#qunit-fixture'
    delete $domNodes.window
    delete $domNodes.document
    deepEqual $domNodes,
        parent: $('body'), qunit: $('body div#qunit')
        qunitFixture: $ 'body div#qunit-fixture'

        # endregion

        # region function handling

test 'getMethod', ->
    testObject = value: false

    $.Tools().getMethod(-> testObject.value = true)()
    ok testObject.value

    $.Tools().getMethod((-> this.value = false), testObject)()
    ok not testObject.value

    strictEqual $.Tools().getMethod(
        ((thisFunction, context, five, two, three) ->
            context.value = five + two + three
        ), testObject, 5
    )(2, 3), 10

        # endregion

        # region event handling

test 'debounce', ->
    testValue = false
    $.Tools().debounce(-> testValue = true)()
    ok testValue
    $.Tools().debounce((-> testValue = false), 1000)()
    ok not testValue
test 'fireEvent', ->
    testValue = false
    tools = $.Tools()

    $.Tools('onClick': -> testValue = true).fireEvent 'click', true
    ok testValue
    $.Tools('onClick': -> testValue = false).fireEvent 'click', true
    ok not testValue
    tools.fireEvent 'click'
    ok not testValue
    tools.onClick = -> testValue = true
    tools.fireEvent 'click'
    ok testValue
    tools.onClick = -> testValue = false
    tools.fireEvent 'click', true
    ok testValue
test 'on', ->
    testValue = false
    $.Tools().on 'body', 'click', -> testValue = true

    $('body').trigger 'click'
    ok testValue
test 'off', ->
    testValue = false
    $.Tools().on 'body', 'click', -> testValue = true
    $.Tools().off 'body', 'click'

    $('body').trigger 'click'
    ok not testValue

        # endregion

        # region array handling

test 'argumentsObjectToArray', ->
    ok not $.isArray arguments
    ok $.isArray $.Tools().argumentsObjectToArray arguments

        # endregion

        # region number handling

test 'round', ->
    strictEqual $.Tools().round(1.2345), 1
    strictEqual $.Tools().round(1.2345, 2), 1.23
    strictEqual $.Tools().round(1.2345, 3), 1.235
    strictEqual $.Tools().round(1.2345, 4), 1.2345

        # endregion

        # region string manipulating

test 'stringFormat', ->
    strictEqual $.Tools().stringFormat('{1}', 'test'), 'test'
    strictEqual $.Tools().stringFormat('', 'test'), ''
    strictEqual $.Tools().stringFormat('{1}'), '{1}'
    strictEqual $.Tools().stringFormat(
        '{1} test {2} - {2}', 1, 2
    ), '1 test 2 - 2'
test 'camelCaseStringToDelimited', ->
    strictEqual $.Tools().camelCaseStringToDelimited('hansPeter'), 'hans-peter'
    strictEqual $.Tools().camelCaseStringToDelimited(
        'hansPeter', '|'
    ), 'hans|peter'
    strictEqual $.Tools().camelCaseStringToDelimited(''), ''
    strictEqual $.Tools().camelCaseStringToDelimited('h'), 'h'
    strictEqual $.Tools().camelCaseStringToDelimited('hP', ''), 'hp'
test 'addSeperatorToPath', ->
    strictEqual $.Tools().addSeperatorToPath(''), ''
    strictEqual $.Tools().addSeperatorToPath('/'), '/'
    strictEqual $.Tools().addSeperatorToPath('/a'), '/a/'
    strictEqual $.Tools().addSeperatorToPath('/a/bb/'), '/a/bb/'
    strictEqual $.Tools().addSeperatorToPath('/a/bb'), '/a/bb/'
    strictEqual $.Tools().addSeperatorToPath('/a/bb', '|'), '/a/bb|'
    strictEqual $.Tools().addSeperatorToPath('/a/bb/', '|'), '/a/bb/|'
test 'getUrlVariables', ->
    ok $.isArray $.Tools().getUrlVariables()
    ok $.Tools().getUrlVariables('not_existing') is undefined

        # endregion

    # endregion

    # region protected

test '_bindHelper', ->
    ok $.Tools()._bindHelper ['body']
    ok $.Tools()._bindHelper ['body'], true
    ok $.Tools()._bindHelper ['body'], false, 'bind'
test '_grabDomNodeHelper', ->
    strictEqual $.Tools()._grabDomNodeHelper('test', 'div', {}), 'body div'
    strictEqual(
        $.Tools()._grabDomNodeHelper('test', 'body div', {}), 'body div')
    strictEqual $.Tools()._grabDomNodeHelper('test', '', {}), 'body'
    strictEqual $.Tools(domNodeSelectorPrefix: '')._grabDomNodeHelper(
        'test', '', {}
    ), ''
    strictEqual $.Tools(domNodeSelectorPrefix: '')._grabDomNodeHelper(
        'test', 'div', {}
    ), 'div'

    # endregion

# endregion
