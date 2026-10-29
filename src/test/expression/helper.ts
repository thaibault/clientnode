// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {describe, expect, test} from '@jest/globals'

import {viewArrayAsScope, viewObjectAsScope} from '../../expression/index'

describe('helper', () => {
    test('viewArrayAsScope', () => {
        const data = [
            {name: 'first', value: 1, children: [{name: 'child', value: 3}]},
            {id: 'second', value: 2}
        ]
        interface ScopeType {
            first: {value: number, children: {child: {value: number}}},
            second?: {value: number},
            third?: {value: number}
        }

        const scope = viewArrayAsScope<typeof data, ScopeType>(
            data, ['children'], ['name', 'id']
        )
        // Read items by any of the given reference keys.
        expect(scope.first.value).toStrictEqual(1)
        expect(scope.second?.value).toStrictEqual(2)
        expect(scope.third).toStrictEqual(undefined)
        // Children are viewed as scope as well.
        expect(scope.first.children.child.value).toStrictEqual(3)

        // Replace an item by its reference key.
        const replacement = {name: 'first', value: 4, children: []}
        ;(scope as unknown as {first: unknown}).first = replacement
        expect(data[0]).toStrictEqual(replacement)
        // Unknown items can not be set.
        const shouldFail = () => {
            scope.third = {value: 5}
        }
        expect(shouldFail).toThrow(TypeError)
        expect(data).toHaveLength(2)
    })
    test('viewObjectAsScope with children', () => {
        const data = {
            a: 'a',
            children: [
                {
                    name: 'childB',
                    b: 'b',
                    children: [
                        {
                            name: 'childC',
                            c: 'c'
                        }
                    ],
                    nested: {}
                }
            ]
        }
        interface ObjectType {
            children: {
                childB: {
                    b: string,
                    children: {
                        childC: {c: string}
                    },
                    nested: {a?: ''}
                },
                [key: number]: undefined
            },
            length: number
        }

        const scope = viewObjectAsScope<typeof data, ObjectType>(data)
        // Read from data
        expect(scope.children.childB.b).toStrictEqual('b')
        expect(scope.children.childB.nested).toEqual({})
        // We can trigger "ownKeys" proxy method.
        expect(scope.children).toStrictEqual(scope.children)
        expect(scope.children[0]).toStrictEqual(undefined)

        expect(data.children[0].b).toStrictEqual('b')

        // Write into data
        scope.children.childB.b = 'another b'
        expect(scope.children.childB.b).toStrictEqual('another b')
        expect(data.children[0].b).toStrictEqual('another b')
        const shouldFail = () => {
            scope.children.childB.nested.a = undefined
        }
        expect(shouldFail).toThrow(TypeError)

        // Read from data
        expect(scope.children.childB.children.childC.c).toStrictEqual('c')

        // Write into data
        scope.children.childB.children.childC.c = 'another c'
        expect(scope.children.childB.children.childC.c)
            .toStrictEqual('another c')
        expect(data.children[0].children[0].c).toStrictEqual('another c')
    })

    test('viewObjectAsScope with alternate children property name', () => {
        const data = {
            a: 'a',
            members: [
                {
                    name: 'childB',
                    b: 'b'
                }
            ]
        }
        interface ObjectType {
            members: {
                childB: {
                    b: string
                },
                [key: number]: undefined
            }
        }

        const scope =
            viewObjectAsScope<typeof data, ObjectType>(data, ['members'])
        // Read from data
        expect(scope.members.childB.b).toStrictEqual('b')
        expect(scope.members[0]).toStrictEqual(undefined)

        expect(data.members[0].b).toStrictEqual('b')

        // Write into data
        scope.members.childB.b = 'another b'
        expect(scope.members.childB.b).toStrictEqual('another b')
        expect(data.members[0].b).toStrictEqual('another b')
    })

    test('viewObjectAsScope with members and children property names', () => {
        const data = {
            a: 'a',
            members: [{
                name: 'childB',
                b: 'b',
                children: [
                    {
                        name: 'childC',
                        c: 'c'
                    },
                    {
                        name: 'childD',
                        d: 'd'
                    }
                ]
            }]
        }
        interface ObjectType {
            members: {
                childB: {
                    b: string,
                    children: {
                        childC: {name: string, c: string}
                        childD: {name: string, d: string}
                        childE?: string
                        [key: number]: undefined
                    }
                },
                [key: number]: undefined
            }
        }

        const scope = viewObjectAsScope<typeof data, ObjectType>(
            data, ['children', 'members']
        )
        // Read from data
        expect(scope.members.childB.children.childC.c).toStrictEqual('c')
        expect(scope.members.childB.children[0]).toStrictEqual(undefined)

        expect(data.members[0].children[0].c).toStrictEqual('c')

        // Write into data
        scope.members.childB.children.childC.c = 'another c'
        expect(scope.members.childB.children.childC.c)
            .toStrictEqual('another c')
        expect(data.members[0].children[0].c).toStrictEqual('another c')

        scope.members.childB.children.childC = {
            name: 'childC',
            c: 'c'
        }
        expect(scope.members.childB.children.childC.c).toStrictEqual('c')
        expect(data.members[0].children[0].c).toStrictEqual('c')

        scope.members.childB.children.childD = {
            name: 'childD',
            d: 'another d'
        }
        expect(scope.members.childB.children.childD.d)
            .toStrictEqual('another d')
        expect(data.members[0].children[1].d).toStrictEqual('another d')

        const shouldFail = () => {
            scope.members.childB.children.childE = ''
        }
        expect(shouldFail).toThrow(TypeError)
    })
})

test('viewObjectAsScope with children ambiguously property names', () => {
    const data = {
        a: 'a',
        children: [
            {
                name: 'childB',
                b: 'first b'
            },
            {
                name: 'childB',
                b: 'second b'
            }
        ]
    }
    interface ObjectType {
        children: {
            childB: {
                b: string,
                children: Record<number, undefined>
            },
            [key: number]: undefined
        }
    }

    const scope = viewObjectAsScope<typeof data, ObjectType>(data)
    // Read from data
    expect(scope.children.childB.b).toStrictEqual('first b')
    expect(scope.children[0]).toStrictEqual(undefined)

    // Write into data
    scope.children.childB.b = 'another b'
    expect(scope.children.childB.b).toStrictEqual('another b')
    expect(data.children[0].b).toStrictEqual('another b')
})
