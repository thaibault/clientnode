# region header

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

test 'initialize', ->
    ok jQuery.Tools()

test 'show', ->
    strictEqual jQuery.Tools().show('hans'), 'hans\n(Type: "string")'
    strictEqual(
        jQuery.Tools().show(A: 'a', B: 'b'),
        'A: a\nB: b\n(Type: "object")')
    ok new RegExp(
        '^(.+\n)+\\(Type: "function"\\)$').test jQuery.Tools().show(
            jQuery.Tools)
    ok new RegExp('^.+: .+\\n(.|\\n)+$').test jQuery.Tools().show(
        jQuery.Tools())

test 'getDomNodeName', ->
    strictEqual jQuery.Tools().getDomNodeName('div'), 'div'
    strictEqual jQuery.Tools().getDomNodeName('<div>'), 'div'
    strictEqual jQuery.Tools().getDomNodeName('<div />'), 'div'
    strictEqual jQuery.Tools().getDomNodeName('<div></div>'), 'div'

    strictEqual jQuery.Tools().getDomNodeName('a'), 'a'
    strictEqual jQuery.Tools().getDomNodeName('<a>'), 'a'
    strictEqual jQuery.Tools().getDomNodeName('<a />'), 'a'
    strictEqual jQuery.Tools().getDomNodeName('<a></a>'), 'a'

test 'grapdomNodes', ->
    domNodes = jQuery.Tools().grapDomNodes(
        qunit: 'body div#qunit'
        qunitFixture: 'body div#qunit-fixture')
    delete domNodes.window
    deepEqual domNodes,
        qunit: jQuery 'body div#qunit'
        qunitFixture: jQuery 'body div#qunit-fixture'
        parent: jQuery 'body'

    domNodes = jQuery.Tools().grapDomNodes(
        qunit: 'div#qunit'
        qunitFixture: 'div#qunit-fixture')
    delete domNodes.window
    deepEqual domNodes,
        parent: jQuery 'body'
        qunit: jQuery 'body div#qunit'
        qunitFixture: jQuery 'body div#qunit-fixture'
