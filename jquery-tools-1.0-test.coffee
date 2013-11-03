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

test 'initialize', ->
    ok $.Tools()

test 'show', ->
    strictEqual $.Tools().show('hans'), 'hans\n(Type: "string")'
    strictEqual(
        $.Tools().show(A: 'a', B: 'b'), 'A: a\nB: b\n(Type: "object")')
    ok new RegExp(
        '^(.+\n)+\\(Type: "function"\\)$').test $.Tools().show $.Tools
    ok new RegExp('^.+: .+\\n(.|\\n)+$').test $.Tools().show $.Tools()

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
