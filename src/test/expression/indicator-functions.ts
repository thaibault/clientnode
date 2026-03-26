import {describe, expect, test} from '@jest/globals'

import {isValue} from '../../expression'

describe('indicator-functions', () => {
    test('isValue', () => {
        expect(isValue(5)).toStrictEqual(true)
        expect(isValue({})).toStrictEqual(true)
        expect(isValue({$value: 2})).toStrictEqual(true)
        expect(isValue({$operator: {}})).toStrictEqual(true)

        expect(isValue({$operator: {}, operand: 2}))
            .toStrictEqual(false)
        expect(isValue({$select: ''})).toStrictEqual(false)
        expect(isValue({$switch: []})).toStrictEqual(false)
        expect(isValue({$operator: {}})).toStrictEqual(true)

        expect(isValue({$mapping: {}})).toStrictEqual(true)
        expect(isValue({$mapping: {}, data: []})).toStrictEqual(false)

        expect(isValue({$arrayContains: {key: 'foo'}})).toStrictEqual(false)
        expect(isValue({$arrayContains: {key: 'foo', value: 'bar'}}))
            .toStrictEqual(false)
        expect(isValue({
            $arrayContains: {key: 'foo', value: 'bar', target: {$select: ''}}
        })).toStrictEqual(false)
    })
})
