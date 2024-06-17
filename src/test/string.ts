// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    [Project page](https://torben.website/clientnode)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {expect, test} from '@jest/globals'

import {MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION} from '../constants'
import {$} from '../context'
import {identity} from '../function'
import {
    addSeparatorToPath,
    camelCaseToDelimited,
    capitalize,
    compile,
    compressStyleValue,
    convertToValidVariableName,
    decodeHTMLEntities,
    delimitedToCamelCase,
    encodeURIComponent,
    escapeRegularExpressions,
    evaluate,
    findNormalizedMatchRange,
    fixKnownEncodingErrors,
    format,
    getDomainName,
    getEditDistance,
    getPortNumber,
    getProtocolName,
    getURLParameter,
    hasPathPrefix,
    lowerCase,
    mark,
    maskForRegularExpression,
    normalizeDomNodeSelector,
    normalizePhoneNumber,
    normalizeURL,
    normalizeZipCode,
    parseEncodedObject,
    representPhoneNumber,
    representURL,
    serviceURLEquals,
    sliceAllExceptNumberAndLastSeperator
} from '../string'
import {testEach, testEachAgainstSameExpectation} from '../test-helper'
import {EvaluationResult, FirstParameter, Mapping} from '../type'

declare const TARGET_TECHNOLOGY:string

testEach<typeof escapeRegularExpressions>(
    'EscapeRegularExpressions',
    escapeRegularExpressions,

    ['', ''],
    [`that's no regex: \\.\\*\\$`, `that's no regex: .*$`],
    ['\\-\\\\[\\]\\(\\)\\^\\$\\*\\+\\.}\\-', '-\\[]()^$*+.}-', ['}']],
    [
        '\\-\\[]()^$*+.{\\}\\-',
        '-\\[]()^$*+.{}-',
        ['[', ']', '(', ')', '^', '$', '*', '+', '.', '{']
    ],
    ['\\-', '-', ['\\']]
)
testEach<typeof convertToValidVariableName>(
    'convertToValidVariableName',
    convertToValidVariableName,

    ['', ''],
    ['a', 'a'],
    ['_a', '_a'],
    ['_a_a', '_a_a'],
    ['_aA', '_a-a'],
    ['aA', '-a-a'],
    ['aA', '-a--a'],
    ['aA', '--a--a']
)
//// region url handling
testEach<typeof encodeURIComponent>(
    'encodeURIComponent',
    encodeURIComponent,

    ['', ''],
    ['+', ' '],
    ['%20', ' ', true],
    ['@:$,+', '@:$, '],
    ['%2B', '+']
)
testEach<typeof addSeparatorToPath>(
    'addSeparatorToPath',
    addSeparatorToPath,

    ['', ''],
    ['/', '/'],
    ['/a/', '/a'],
    ['/a/bb/', '/a/bb/'],
    ['/a/bb/', '/a/bb'],
    ['/a/bb|', '/a/bb', '|'],
    ['/a/bb/|', '/a/bb/', '|']
)
testEachAgainstSameExpectation<typeof hasPathPrefix>(
    'hasPathPrefix',
    hasPathPrefix,
    true,

    ['/admin', '/admin'],
    ['test', 'test'],
    ['', ''],
    ['a', 'a/b'],
    ['a/', 'a/b'],
    ['/admin', '/admin#test', '#']
)
testEachAgainstSameExpectation<typeof hasPathPrefix>(
    'hasPathPrefix',
    hasPathPrefix,
    false,

    ['b', 'a/b'],
    ['b/', 'a/b'],
    ['/admin/', '/admin/test', '#'],
    ['/admin', '/admin/test', '#']
)
testEach<typeof getDomainName>(
    'getDomainName',
    getDomainName,

    ['www.test.de', 'https://www.test.de/site/subSite?param=value#hash'],
    ['', 'a', ''],
    ['www.test.de', 'http://www.test.de'],
    ['a.de', 'http://a.de'],
    ['localhost', 'http://localhost'],
    ['a', 'localhost', 'a'],
    /*
        NOTE: "$.location?.hostname" does not work since experiencing a
        compiler bug.
    */
    [
        $.location && $.location.hostname || '',
        'a',
        $.location && $.location.hostname
    ],
    ['a', '//a'],
    [
        $.location && $.location.hostname || '',
        'a/site/subSite?param=value#hash',
        $.location && $.location.hostname
    ],
    [
        $.location && $.location.hostname || '',
        '/a/site/subSite?param=value#hash',
        $.location && $.location.hostname
    ],
    [
        'alternate.local',
        '//alternate.local/a/site/subSite?param=value#hash'
    ],
    ['alternate.local', '//alternate.local/']
)
testEach<typeof getPortNumber>(
    'getPortNumber',
    getPortNumber,

    [443, 'https://www.test.de/site/subSite?param=value#hash'],
    [80, 'http://www.test.de'],
    [0, 'http://www.test.de', 0],
    [0, 'www.test.de', 0],
    [0, 'a', 0],
    [0, 'a', 0],
    [80, 'a:80'],
    [20, 'a:20'],
    [444, 'a:444'],
    [89, 'http://localhost:89'],
    [89, 'https://localhost:89']
)
testEach<typeof getProtocolName>(
    'getProtocolName',
    getProtocolName,

    ['https', 'https://www.test.de/site/subSite?param=value#hash'],
    ['http', 'http://www.test.de'],
    /*
        NOTE: "$.location?.hostname" does not work since experiencing a
        compiler bug.
    */
    [
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1) ||
        '',
        '//www.test.de',
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1)
    ],
    ['http', 'http://a.de'],
    ['ftp', 'ftp://localhost'],
    [
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1) ||
        '',
        'a',
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1)

    ],
    [
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1) ||
        '',
        'a/site/subSite?param=value#hash',
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1)

    ],
    ['a', '/a/site/subSite?param=value#hash', 'a'],
    ['b', 'alternate.local/a/site/subSite?param=value#hash', 'b'],
    ['c', 'alternate.local/', 'c'],
    [
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1) ||
        '',
        '',
        $.location &&
        $.location.protocol.substring(0, $.location.protocol.length - 1)
    ]
)
test.each([
    [null], [null, true, '&'], [null, false, '&'], [null, false, '#']
])(
    'Array.isArray(getURLParameter(...%p)) === true',
    (...parameters:Parameters<typeof getURLParameter>):void =>
        expect(Array.isArray(getURLParameter(...parameters)))
            .toStrictEqual(true)
)
testEach<typeof getURLParameter>(
    'getURLParameter',
    getURLParameter,

    [null, 'notExisting'],
    [null, 'notExisting', true],
    [null, 'notExisting', false, '&'],
    [null, 'notExisting', false, '#'],
    [null, 'notExisting', true, '#'],
    ['2', 'test', false, '?test=2'],
    ['2', 'test', false, 'test=2'],
    ['2', 'test', false, 'test=2&a=2'],
    ['2', 'test', false, 'b=3&test=2&a=2'],
    ['2', 'test', false, '?b=3&test=2&a=2'],
    ['2', 'test', false, '?b=3&test=2&a=2'],
    [['2'], 'test', true, '?b=3&test=2&a=2'],
    [['1', '2'], 'test', true, '?test=1&b=3&test=2&a=2'],
    ['2', 'test', false, '&', '$', '!', '', '#$test=2'],
    ['4', 'test', false, '&', '$', '!', '?test=4', '#$test=3'],
    [null, 'a', false, '&', '$', '!', '?test=4', '#$test=3'],
    ['3', 'test', false, '#', '$', '!', '?test=4', '#$test=3'],
    ['4', 'test', false, '#', '$', '!', '', '#!test#$test=4'],
    ['4', 'test', false, '#', '$', '!', '', '#!/test/a#$test=4'],
    ['4', 'test', false, '#', '$', '!', '', '#!/test/a/#$test=4'],
    ['4', 'test', false, '#', '$', '!', '', '#!test/a/#$test=4'],
    ['4', 'test', false, '#', '$', '!', '', '#!/#$test=4'],
    ['4', 'test', false, '#', '$', '!', '', '#!test?test=3#$test=4'],
    ['3', 'test', false, '&', '?', '!', null, '#!a?test=3'],
    ['4', 'test', false, '&', '$', '!', null, '#!test#$test=4'],
    ['4', 'test', false, '&', '$', '!', null, '#!test?test=3#$test=4'],
    [['4'], 'test', true, '&', '$', '!', null, '#!test?test=3#$test=4'],
    [
        ['2', '4'],
        'test',
        true,
        '&',
        '$',
        '!',
        null,
        '#!test?test=3#$test=2&test=4'
    ]
)
testEachAgainstSameExpectation<typeof serviceURLEquals>(
    'serviceURLEquals',
    serviceURLEquals,
    true,

    [
        'https://www.test.de/site/subSite?param=value#hash',
        'https://www.test.de/site/subSite?param=value#hash'
    ],
    [
        '//www.test.de/site/subSite?param=value#hash',
        '//www.test.de/site/subSite?param=value#hash'
    ],
    /*
        NOTE: "$.location?.hostname" does not work since experiencing a
        compiler bug.
    */
    [
        `${$.location && $.location.protocol || 'http:'}//www.test.de/` +
        'site/subSite?param=value#hash',
        `${$.location && $.location.protocol || 'http:'}//www.test.de/` +
        'site/subSite?param=value#hash'
    ],
    [
        'https://www.test.de:443/site/subSite?param=value#hash',
        'https://www.test.de/site/subSite?param=value#hash'
    ],
    [
        '//www.test.de:80/site/subSite?param=value#hash',
        '//www.test.de/site/subSite?param=value#hash'
    ],
    [
        $.location && $.location.href || 'http://localhost',
        $.location && $.location.href || 'http://localhost'
    ],
    ['1', $.location && $.location.href || 'http://localhost'],
    ['#1', $.location && $.location.href || 'http://localhost'],
    ['/a', $.location && $.location.href || 'http://localhost']
)
testEachAgainstSameExpectation<typeof serviceURLEquals>(
    'serviceURLEquals',
    serviceURLEquals,
    false,

    /*
        NOTE: "$.location?.hostname" does not work since experiencing a
        compiler bug.
    */
    [
        `${$.location && $.location.protocol || 'http:'}//www.test.de/` +
        'site/subSite?param=value#hash',
        'ftp://www.test.de/site/subSite?param=value#hash'
    ],
    [
        'https://www.test.de/site/subSite?param=value#hash',
        'http://www.test.de/site/subSite?param=value#hash'
    ],
    [
        'http://www.test.de/site/subSite?param=value#hash',
        'test.de/site/subSite?param=value#hash'
    ],
    [
        `${$.location && $.location.protocol || 'http:'}//www.test.de:` +
        `${$.location && $.location.port || 80}/site/subSite` +
        '?param=value#hash/site/subSite?param=value#hash',
        $.location && $.location.href || 'http://localhost:8080'
    ],
    [
        `http://www.test.de:${$.location && $.location.port || 80}/` +
        'site/subSite?param=value#hash',
        'https://www.test.de/site/subSite?param=value#hash'
    ]
)
testEach<typeof normalizeURL>(
    'normalizeURL',
    normalizeURL,

    ['http://www.test.com', 'www.test.com'],
    ['http://test', 'test'],
    ['http://test', 'http://test'],
    ['https://test', 'https://test']
)
testEach<typeof representURL>(
    'representURL',
    representURL,

    ['www.test.com', 'http://www.test.com'],
    ['ftp://www.test.com', 'ftp://www.test.com'],
    ['www.test.com', 'https://www.test.com'],
    ['', undefined],
    ['', null],
    ['', false],
    ['', true],
    ['', ''],
    ['', ' ']
)
//// endregion
testEach<typeof camelCaseToDelimited>(
    'camelCaseToDelimited',
    camelCaseToDelimited,

    ['hans-peter', 'hansPeter'],
    ['hans|peter', 'hansPeter', '|'],
    ['', ''],
    ['h', 'h'],
    ['hp', 'hP', ''],
    ['hans-peter', 'hansPeter'],
    ['hans-peter', 'hans-peter'],
    ['hans_peter', 'hansPeter', '_'],
    ['hans+peter', 'hansPeter', '+'],
    ['hans', 'Hans'],
    ['hans-api-url', 'hansAPIURL', '-', ['api', 'url']],
    ['hans-peter', 'hansPeter', '-', []]
)
testEach<typeof capitalize>(
    'capitalize',
    capitalize,

    ['HansPeter', 'hansPeter'],
    ['', ''],
    ['A', 'a'],
    ['A', 'A'],
    ['AA', 'AA'],
    ['Aa', 'Aa'],
    ['Aa', 'aa']
)
testEach<typeof compressStyleValue>(
    'compressStyleValue',
    compressStyleValue,

    ['', ''],
    ['border:1px solid red', ' border: 1px  solid red;'],
    ['border:1px solid red', 'border : 1px solid red '],
    ['border:1px solid red', 'border : 1px  solid red ;'],
    ['border:1px solid red', 'border : 1px  solid red   ; '],
    ['height:1px;width:2px', 'height: 1px ; width:2px ; '],
    ['height:1px;width:2px', ';;height: 1px ; width:2px ; ;'],
    ['height:1px;width:2px', ' ;;height: 1px ; width:2px ; ;'],
    ['height:1px;width:2px', ';height: 1px ; width:2px ; ']
)
testEach<typeof decodeHTMLEntities>(
    'decodeHTMLEntities',
    decodeHTMLEntities,

    [$.document ? '' : null, ''],
    [$.document ? '<div></div>' : null, '<div></div>'],
    [$.document ? '<div>&</div>' : null, '<div>&amp;</div>'],
    [
        $.document ? '<div>&äÄüÜöÖ</div>' : null,
        '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>'
    ]
)
testEach<typeof delimitedToCamelCase>(
    'delimitedToCamelCase',
    delimitedToCamelCase,

    ['hansPeter', 'hans-peter'],
    ['hansPeter', 'hans|peter', '|'],
    ['', ''],
    ['h', 'h'],
    ['hansPeter', 'hans-peter'],
    ['hans-Peter', 'hans--peter'],
    ['HansPeter', 'Hans-Peter'],
    ['-HansPeter', '-Hans-Peter'],
    ['-', '-'],
    ['hans-peter', 'hans-peter', '_'],
    ['hansPeter', 'hans_peter', '_'],
    ['hansID', 'hans_id', '_'],
    ['urlHANSId', 'url_hans_id', '_', ['hans']],
    ['urlHans1', 'url_hans_1', '_'],
    ['hansUrl1', 'hansUrl1', '-', ['url'], true],
    ['hansURL', 'hans-url', '-', ['url'], true],
    ['hansUrl', 'hans-Url', '-', ['url'], true],
    ['hansURL', 'hans-Url', '-', ['url'], false],
    ['hansUrl', 'hans-Url', '-', [], false],
    ['hansUrl', 'hans--Url', '-', [], false, true]
)
test.each([
    ['function', 'null', []],
    ['function', 'null', {}],
    ['function', '5 === 3', {name: 2}],
    ['function', '5 === 3', ['name']],
    ['function', '', []]
])(
    `'%s' === typeof compile('%s', %p).templateFunction`,
    (expected:string, ...parameters:Parameters<typeof compile>) =>
        expect<string>(typeof compile(...parameters).templateFunction)
            .toStrictEqual(expected)
)
//// region compile / evaluation
///// region compile
test.each([
    ['string', '= null', []],
    ['string', '{', {}],
    ['object', '', {}]
])(
    `'%s' === typeof compile('%s', %p).error`,
    (expected:string, ...parameters:Parameters<typeof compile>) =>
        expect<string>(typeof compile(...parameters).error)
            .toStrictEqual(expected)
)
test.each([
    [
        `
            function anonymous(
            ) {
            return null
            }
        `,
        'null'
    ],
    [
        `
            function anonymous(
            ) {
            return \`test \${test} value\`
            }
        `,
        '`test ${test} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return \`test \${test} value\`
            }
        `,
        '`test ${test} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return \`test \\\${test} value\`
            }
        `,
        '`test \\${test} value`'
    ]
])(
    '"%s" === String(compile("%s").templateFunction)',
    (expected:string, expression:FirstParameter<typeof compile>) =>
        expect(
            String(compile(expression, [], false, false)
                .templateFunction)
        ).toStrictEqual(expected.trim().replace(/\n +/g, '\n'))
)
test.each([
    [
        `
            function anonymous(
            ) {
            return String(a + b)
            }
        `,
        '`${a + b}`'
    ],
    [
        `
            function anonymous(
            ) {
            return 'test '+(name)+' - '+(other)+' value'
            }
        `,
        '`test ${name} - ${other} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return "test "+(name)+" '-' "+(other)+" value"
            }
        `,
        '`test ${name} \'-\' ${other} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return "test "+(name)+" '-' "+(other)+"                  value"
            }
        `,
        `\`test \${name} '-' \${other}
                  value\``
    ],
    [
        `
            function anonymous(
            ) {
            return String(loading ? 'A' : 'B')
            }
        `,
        `\`\${loading ? 'A' : 'B'}\``
    ],
    [
        `
            function anonymous(
            ) {
            return String(loading ? 'A' : results.join(''))
            }
        `,
        `\`\${loading ? 'A' : results.join('')}\``
    ],
    [
        `
            function anonymous(
            ) {
            return "[: "+(loading ? 'A' : results.join(''))+" :]"
            }
        `,
        `\`[: \${loading ? 'A' : results.join('')} :]\``
    ],
    [
        `
            function anonymous(
            ) {
            return '[: '+(a ? '<div class="idle">loading...</div>' : ` +
                `results.join(''))+' :]'
            }
        `,
        `\`[: \${a ?\n '<div class="idle">loading...</div>' : ` +
        `results.join('')} :]\``
    ],
    [
        `
        function anonymous(
        ) {
        return ' '+(loading ?                ` +
        `'<div class="idle">loading...</div>' :                ` +
        `results.map(function(result) {                    ` +
        `return ('<ul>' +                        '<li>' +               ` +
        `             Object.keys(result)                               ` +
        ` .filter(function(name) {                                    ` +
        `return ['number', 'string']                                    ` +
        `    .includes(typeof result[name])                             ` +
        `   })                                .join('') +               ` +
        `         '</li>' +                    '</ul>')                ` +
        `}).join('')            )+''
                }
            `,
        `\` \${loading ?
            '<div class="idle">loading...</div>' :
            results.map(function(result) {
                return ('<ul>' +
                    '<li>' +
                        Object.keys(result)
                            .filter(function(name) {
                                return ['number', 'string']
                                    .includes(typeof result[name])
                            })
                            .join('') +
                    '</li>' +
                '</ul>')
            }).join('')
        }\``.replace('\n', '')
    ],
    [
        `
            function anonymous(
            ) {
            return 'test {test} value'
            }
        `,
        '`test {test} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return 'test \\\${test} value \\\${test}'
            }
        `,
        '`test \\${test} value \\${test}`'
    ]
])(
    'IE 11: "%s" === String(compile("%s").templateFunction)',
    (expected:string, expression:FirstParameter<typeof compile>) => {
        const backup = MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value
        MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = 11

        expect(
            String(compile(expression, [], false, false).templateFunction)
        ).toStrictEqual(expected.trim().replace(/\n +/g, '\n'))

        MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = backup
    }
)
///// endregion
///// region evaluate
const advancedTemplateEvaluationExample:string =
    `\`\${loading ?
        '<div class="idle">loading...</div>' :
        results.map(function(result) {
            return ('<ul>' +
                '<li>' +
                    Object.keys(result)
                        .filter(function(name) {
                            return ['number', 'string']
                                .includes(typeof result[name])
                        })
                        .join('') +
                '</li>' +
            '</ul>')
        }).join('')
    }\``.replace('\n', '')
type MandatoryGivenStringEvaluateTestTuple = [
    FirstParameter<typeof evaluate>,
    Mapping<unknown>,
    'compileError'|'result'|'runtimeError'
]
type GivenStringEvaluateTestTuple = [
    ...MandatoryGivenStringEvaluateTestTuple, unknown?, unknown?
]
type StringEvaluateTestTuple = [
    ...MandatoryGivenStringEvaluateTestTuple, unknown, unknown
]
test.each(([
    ['null', {}, 'result', null],
    ['5', {}, 'result', 5],
    ['a', {a: 2}, 'result', 2],
    ['a + b', {a: 2, b: 3}, 'result', 5],
    ['a + b + this.c', {a: 2, b: 3}, 'result', 6, {c: 1}],
    ['a + b + c', {a: 2, b: 3}, 'runtimeError'],
    ['}', {a: 2}, 'compileError'],
    ['}', {}, 'compileError'],
    [
        '`test \\${test} value \\${test}`',
        {},
        'result',
        'test ${test} value ${test}'
    ],
    [
        advancedTemplateEvaluationExample,
        {loading: false, results: []},
        'result',
        ''
    ],
    [
        advancedTemplateEvaluationExample,
        {loading: false, results: [{a: 'a'}]},
        'result',
        '<ul><li>a</li></ul>'
    ],
    [
        advancedTemplateEvaluationExample,
        {loading: true, results: []},
        'result',
        '<div class="idle">loading...</div>'
    ]
] as Array<GivenStringEvaluateTestTuple>)
    .map((
        parameters:GivenStringEvaluateTestTuple
    ):StringEvaluateTestTuple =>
        parameters.concat(undefined, undefined).slice(0, 5) as
            StringEvaluateTestTuple
    )
)(
    'evaluate(`%s`, %p...)[%p] === %p',
    (
        expression:string,
        scope:Mapping<unknown>,
        resultKey:string,
        expected:unknown,
        binding:unknown
    ):void => {
        const evaluation:EvaluationResult = evaluate(
            expression,
            scope,
            false,
            false,
            binding
        )

        expect(evaluation).toHaveProperty(resultKey)

        if (expected !== undefined)
            if (
                resultKey === 'result' &&
                typeof evaluation[resultKey] === 'string'
            )
                expect(evaluation[resultKey].trim())
                    .toStrictEqual(expected)
            else
                expect(evaluation[resultKey as keyof EvaluationResult])
                    .toStrictEqual(expected)
    }
)
test.each(([
    ['null', {}, 'result', null],
    ['window', {}, 'result', undefined],
    ['globalThis', {}, 'result', undefined],
    ['globalThis', {globalThis: 5}, 'result', 5]
] as Array<GivenStringEvaluateTestTuple>)
    .map((
        parameters:GivenStringEvaluateTestTuple
    ):StringEvaluateTestTuple =>
        parameters.concat(undefined, undefined).slice(0, 5) as
            StringEvaluateTestTuple
    )
)(
    'evaluate(`%s`, %p...)[%p] === %p',
    (
        expression:string,
        scope:Mapping<unknown>,
        resultKey:string,
        expected:unknown
    ):void => {
        const evaluation:EvaluationResult = evaluate(
            expression,
            scope,
            false
        )

        expect(evaluation).toHaveProperty(resultKey)

        if (expected !== undefined)
            if (
                resultKey === 'result' &&
                typeof evaluation[resultKey] === 'string'
            )
                expect(evaluation[resultKey].trim())
                    .toStrictEqual(expected)
            else
                expect(evaluation[resultKey as keyof EvaluationResult])
                    .toStrictEqual(expected)
    }
)
test.each(([
    [
        '`test \\${test} value \\${test}`',
        {},
        'result',
        'test ${test} value ${test}'
    ],
    /*
        Nested quotes in code can work in IE 11 if only one type of quote
        is used according to escaping.
    */
    [
        `\`
            <div class="test">
                \\\${Object.keys(item)
                    .filter(function(name) {
                        return true
                    })
                    .join(",")
                }
            </div>
        \``.replace(/(\s\s+)|\n+/g, ''),
        {},
        'result',
        '<div class="test">' +
        '${Object.keys(item).filter(function(name) {' +
        'return true' +
        '}).join(",")}' +
        '</div>'
    ],
    [
        advancedTemplateEvaluationExample,
        {loading: false, results: []}, 'result', ''
    ],
    [
        advancedTemplateEvaluationExample,
        {loading: false, results: [{a: 'a'}]},
        'result',
        '<ul><li>a</li></ul>'
    ],
    [
        advancedTemplateEvaluationExample,
        {loading: true, results: []},
        'result',
        '<div class="idle">loading...</div>'
    ]
] as Array<GivenStringEvaluateTestTuple>)
    .map((parameters:GivenStringEvaluateTestTuple):StringEvaluateTestTuple =>
        parameters.concat(undefined, undefined).slice(0, 5) as
            StringEvaluateTestTuple
    )
)(
    'IE 11: evaluate(`%s`, %p...)[%p] === %p',
    (
        expression:string,
        scope:Mapping<unknown>,
        resultKey:string,
        expected:unknown,
        binding:unknown
    ):void => {
        const backup = MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value
        MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = 11

        const evaluation:EvaluationResult = evaluate(
            expression,
            scope,
            false,
            true,
            binding
        )

        expect(evaluation).toHaveProperty(resultKey)

        if (expected !== undefined)
            if (
                resultKey === 'result' &&
                typeof evaluation[resultKey] === 'string'
            )
                expect(evaluation[resultKey].trim())
                    .toStrictEqual(expected)
            else
                expect(evaluation[resultKey as keyof EvaluationResult])
                    .toStrictEqual(expected)

        MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = backup
    }
)
///// endregion
//// endregion
testEach<typeof findNormalizedMatchRange>(
    'findNormalizedMatchRange',
    findNormalizedMatchRange,

    [null, '', ''],
    [null, 'hans', ''],
    [[1, 2], 'hans', 'a'],
    [[1, 3], 'hans', 'an'],
    [[0, 3], 'hans', 'han'],
    [[0, 4], 'hans', 'hans'],
    [[1, 4], 'hans', 'ans'],
    [[1, 4], 'hans hans', 'ans'],
    [
        [2, 5],
        ' hAns ',
        'ans',
        (value:unknown):string => (value as string).toLowerCase()
    ],
    [
        [2, 8],
        'a straße b', 'strasse',
        (value:unknown):string =>
            (value as string).replace(/ß/g, 'ss').toLowerCase()
    ],
    [
        [2, 9],
        'a strasse b',
        'strasse',
        (value:unknown):string =>
            (value as string).replace(/ß/g, 'ss').toLowerCase()
    ],
    [
        [2, 9],
        'a strasse b',
        'straße',
        (value:unknown):string =>
            (value as string).replace(/ß/g, 'ss').toLowerCase()
    ]
)
testEach<typeof fixKnownEncodingErrors>(
    'fixKnownEncodingErrors',
    fixKnownEncodingErrors,

    ['', ''],
    ['a', 'a'],
    ['-', '\x96'],
    ['a-a', 'a\x96a']
)
testEach<typeof format>(
    'gormat',
    format,

    ['test', '{1}', 'test'],
    ['', '', 'test'],
    ['{1}', '{1}'],
    ['1 test 2 - 2', '{1} test {2} - {2}', 1, 2]
)
testEach<typeof getEditDistance>(
    'getEditDistance',
    getEditDistance,

    [0, '', ''],
    [0, 'h', 'h'],
    [0, 'hans', 'hans'],
    [1, 'hans', 'hansa'],
    [1, 'hansa', 'hans'],
    [1, 'hans', 'hbns'],
    [1, 'hbns', 'hans'],
    [2, 'hbbs', 'hans'],
    [4, 'beer', 'hans']
)
testEach<typeof maskForRegularExpression>(
    'maskForRegularExpression',
    maskForRegularExpression,

    [`that's no regex: \\.\\*\\$`, `that's no regex: .*$`],
    ['', ''],
    ['\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\', '-[]()^$*+.}-\\'],
    ['\\-', '-']
)

testEach<typeof lowerCase>(
    'lowerCase',
    lowerCase,

    ['hansPeter', 'HansPeter'],
    ['', ''],
    ['a', 'A'],
    ['a', 'a'],
    ['aa', 'aa'],
    ['aa', 'Aa'],
    ['aA', 'aA']
)
testEach<typeof mark>(
    'mark',
    mark,

    ['', ''],
    ['t<span class="tools-mark">e</span>st', 'test', 'e'],
    ['t<span class="tools-mark">es</span>t', 'test', 'es'],
    ['<span class="tools-mark">test</span>', 'test', 'test'],
    ['test', 'test', ''],
    ['test', 'test', 'tests'],
    ['', '', 'test'],
    [
        't<a>e</a>st',
        'test',
        'e',
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown) => `${value as string}`.toLowerCase()
        }
    ],
    [
        't<a>e</a>st',
        'test',
        ['e'],
        {
            marker: '<a>{1}</a>',
            normalizer: identity as (_value:unknown) => string
        }
    ],
    [
        't<a>e</a>st',
        'test',
        'E',
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown) => `${value as string}`.toLowerCase()
        }
    ],
    [
        't<a>E</a>st',
        'tEst',
        'e',
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown) => `${value as string}`.toLowerCase()
        }
    ],
    [
        '<a>t</a>es<a>T</a>',
        'tesT',
        't',
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown) => `${value as string}`.toLowerCase()
        }
    ],
    [
        '<a>t - t</a>es<a>T - T</a>',
        'tesT',
        't',
        {
            marker: '<a>{1} - {1}</a>',
            normalizer: (value:unknown) => `${value as string}`.toLowerCase()
        }
    ],
    [
        'test',
        'test',
        'E',
        {
            marker: '<a>{1}</a>',
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        '<span class="tools-mark">a</span>b' +
        '<span class="tools-mark">c</span>d',
        'abcd',
        ['a', 'c']
    ],
    [
        '<span class="tools-mark">a</span>' +
        '<span class="tools-mark">a</span>b' +
        '<span class="tools-mark">c</span>d',
        'aabcd',
        ['a', 'c']
    ],
    [
        '<span class="tools-mark">a</span>' +
        '<span class="tools-mark">c</span>b' +
        '<span class="tools-mark">c</span>' +
        '<span class="tools-mark">d</span>',
        'acbcd',
        ['a', 'c', 'd']
    ],
    [
        'a <a>EBikes</a> <a>München</a>',
        'a EBikes München',
        ['ebikes', 'münchen'],
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown) => `${value as string}`.toLowerCase()
        }
    ],
    [
        'a <a>E-Bikes</a> <a>München</a>',
        'a E-Bikes München',
        ['ebikes', 'münchen'],
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown):string =>
                `${value as string}`.toLowerCase().replace('-', '')
        }
    ],
    [
        'a <a>str.</a> <a>2</a>',
        'a str. 2',
        ['straße', '2'],
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown):string =>
                `${value as string}`
                    .toLowerCase()
                    .replace('str.', 'strasse')
                    .replace('ß', 'ss')
        }
    ],
    [
        'EGO Movement Store <a>E-Bikes</a> <a>München</a>',
        'EGO Movement Store E-Bikes München',
        ['eBikes', 'München'],
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown):string =>
                `${value as string}`
                    .toLowerCase()
                    .replace(/[-_]+/g, '')
                    .replace(/ß/g, 'ss')
                    .replace(/(^| )str\./g, '$1strasse')
                    .replace(/[& ]+/g, ' ')
        }
    ],
    [
        '<a>str.</a>A <a>strasse</a> B <a>straße</a> C <a>str.</a> D',
        'str.A strasse B straße C str. D',
        ['str.'],
        {
            marker: '<a>{1}</a>',
            normalizer: (value:unknown):string =>
                `${value as string}`
                    .toLowerCase()
                    .replace(/[-_]+/g, '')
                    .replace(/ß/g, 'ss')
                    .replace(/(^| )str\./g, '$1strasse')
                    .replace(/[& ]+/g, ' ')
        }
    ],
    [
        '<mark>test</mark> <a>link</a>',
        'test <a>link</a>',
        ['test'],
        {
            marker: '<mark>{1}</mark>',
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        'test <a><mark>link</mark></a>',
        'test <a>link</a>',
        ['link'],
        {
            marker: '<mark>{1}</mark>',
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        'test <a href="foo">link</a>',
        'test <a href="foo">link</a>',
        ['foo'],
        {
            marker: '<mark>{1}</mark>',
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        'test <a href="foo">a <mark>foo</mark> link</a>',
        'test <a href="foo">a foo link</a>',
        ['foo'],
        {
            marker: '<mark>{1}</mark>',
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        'test [a href="foo"]a [mark]foo[/mark] link[/a]',
        'test [a href="foo"]a foo link[/a]',
        ['foo'],
        {
            marker: '[mark]{1}[/mark]',
            normalizer: identity as (value:unknown) => string,
            skipTagDelimitedParts: ['[', ']']
        }
    ],
    [
        '<mark>foo</mark> <mark>foo</mark> <mark>foo</mark>',
        'foo foo foo',
        ['foo'],
        {
            marker: '<mark>{1}</mark>',
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        [
            '<mark>foo</mark>',
            ' ',
            '<mark>foo</mark>',
            ' ',
            '<mark>foo</mark>'
        ],
        'foo foo foo',
        ['foo'],
        {
            marker: (foundWord:string) => `<mark>${foundWord}</mark>`,
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        [],
        '',
        ['foo'],
        {
            marker: (foundWord:string) => `<a>${foundWord}</a>`,
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        ['<a>a</a>'],
        'a',
        ['a'],
        {
            marker: (foundWord:string) => `<a>${foundWord}</a>`,
            normalizer: identity as (value:unknown) => string
        }
    ],
    [
        ['a', {foundWord: 'b'}, 'a'],
        'aba',
        ['b'],
        {
            marker: (foundWord:string):{foundWord:string} => ({foundWord}),
            normalizer: identity as (value:unknown) => string
        }
    ]
)
testEach<typeof normalizePhoneNumber>(
    'normalizePhoneNumber',
    normalizePhoneNumber,

    ['0', '0'],
    ['0', ' 0  '],
    ['0', 0],
    ['12345', 12345],
    ['0049172002123', '+49 172 (0) / 0212 - 3'],
    ['', 'no entry', true],
    ['', 'no entry', false],
    ['', '', false],
    ['0', '0', false],
    ['0', ' 0  ', false],
    ['0', 0, false],
    ['12345', 12345, false],
    ['0049-176-1234-56', '+49 (0) 176-12 34-56', false],
    ['0049-176-123456', '+49(0)176 12-34 56', false],
    ['0049-176-123456', '+49 176 12 34 56', false],
    ['0049-176-123456', '+49-176-12 34 56', false],
    ['0172-12555433', '0172/12555433', false],
    ['0176-123456', '0176 12 34 56', false],
    ['01761-23456', '01761 234 56', false],
    ['0049-178-123456', '+49 (178) 12 34 56', false],
    ['0049-178-123456', '+49(178)123456', false],
    ['0049-178-12345-6', '+49(178)12345-6', false],
    ['0049-178-12345-6', '+49 (178) 123 45-6', false],
    ['06132-77-0', '06132-77-0', false],
    ['06132-77-0', '06132-77-0 ', false],
    ['06132-770', '06132-77-0a', false],
    ['06132-770', '06132-77-0a ', false],
    ['06132-770', '  06132-77-0a ', false],
    ['06132-770', '  061 32-77-0a ', false],
    ['06132-77-0', '  061 32-77-0 ', false],
    ['0061-32-77-0', '  0061 32-77-0 ', false],
    ['0061-32-77-0', '  +61 32-77-0 ', false],
    ['05661-711677', '05661-711677', false],
    ['0174-5661677', '0174/5661677', false],
    ['0049-174-5661677', '+49 (0) 174 / 566 16 77', false],
    ['0049-174-5661677', '+49 (174) 566 16 77', false],
    ['0049-174-5661677', ' +49 (174) 566 16 77 ', false],
    ['0291-1455', '02 91 / 14 55', false],
    ['03677842375', '03677842375', false]
)
testEach<typeof normalizeZipCode>(
    'normalizeZipCode',
    normalizeZipCode,

    ['0', '0'],
    ['0', ' 0  '],
    ['0', 0],
    ['12345', 12345],
    ['', 'abc'],
    ['12345', '1B23A45'],
    ['12345', ' 1B23A45 ']
)
if (TARGET_TECHNOLOGY === 'node')
    testEach<typeof parseEncodedObject>(
        'parseEncodedObject',
        parseEncodedObject,

        [null, ''],
        [null, 'null'],
        [{a: undefined}, '{a: undefined}'],
        [{a: undefined}, Buffer.from('{a: undefined}').toString('base64')],
        [{a: 2}, '{a: 2}'],
        [{a: 1}, Buffer.from('{a: 1}').toString('base64')],
        [null, 'null'],
        [null, Buffer.from('null').toString('base64')],
        [{}, '{}'],
        [{}, Buffer.from('{}').toString('base64')],
        [null, '{a: a}'],
        [null, Buffer.from('{a: a}').toString('base64')],
        [{a: 2}, '{a: scope.a}', {a: 2}],
        [{a: 2}, Buffer.from('{a: scope.a}').toString('base64'), {a: 2}]
    )
testEach<typeof sliceAllExceptNumberAndLastSeperator>(
    'sliceAllExceptNumberAndLastSeperator',
    sliceAllExceptNumberAndLastSeperator,

    ['1234-56', '12-34-56'],
    ['123456', '12 34 56'],
    ['123456', '123456']
)
testEach<typeof representPhoneNumber>(
    'representPhoneNumber',
    representPhoneNumber,

    ['0', '0'],
    ['+49 (0) 172 / 123 21-1', '0172-12321-1'],
    ['+49 (0) 172 / 12 32 11', '0172-123211'],
    ['+49 (0) 172 / 123 21 11', '0172-1232111'],
    ['', undefined],
    ['', null],
    ['', false],
    ['', true],
    ['', ''],
    ['', ' ']
)
testEach<typeof normalizeDomNodeSelector>(
    'normalizeDomNodeSelector',
    normalizeDomNodeSelector,

    ['body div', 'div'],
    ['body div p', 'div p'],
    ['body div', 'body div'],
    ['body div p', 'body div p'],
    ['body', '']
)
testEach<typeof normalizeDomNodeSelector>(
    'normalizeDomNodeSelector',
    normalizeDomNodeSelector,

    ['', ''],
    ['div', 'div'],
    ['div, p', 'div, p']
)
