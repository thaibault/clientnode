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
test 'info', -> ok $.Tools().info 'test'
test 'debug', -> ok $.Tools().debug 'test'
test 'error', -> ok $.Tools().error 'test'
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
test 'fireEvent', -> # TODO
test 'delegate', -> # TODO
test 'undelegate', -> # TODO
test 'on', -> # TODO
test 'off', -> # TODO
test 'bind', -> # TODO
test 'unbind', -> # TODO

        # endregion

        # region array handling

test 'argumentsObjectToArray', -> # TODO

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
test 'addSeperatorToPath', -> # TODO
test 'getUrlVariables', -> # TODO

        # endregion

    # endregion

    # region protected

test '_bindHelper', -> # TODO
test '_grabDomNodeHelper', -> # TODO

    # endregion

# endregion
