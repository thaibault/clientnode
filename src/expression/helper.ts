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
import {Mapping} from '../'

import {BasicScopeType} from './types'

export const viewArrayAsScope = <
    Type extends Array<Mapping<unknown>>, ScopeType extends BasicScopeType
>(
        data: Type,
        childrenPropertyNames: Array<string>,
        propertyReferenceKeys: Array<string>
    ): ScopeType =>
    new Proxy(data, {
        ownKeys(target: Type) {
            return Reflect.ownKeys(target)
        },
        get(target: Type, name: string | symbol) {
            for (const element of target)
                for (const key of propertyReferenceKeys)
                    if (element[key as unknown as string] === name) {
                        // NOTE: Type[keyof Type]
                        type ValueType = Mapping<unknown>
                        // NOTE: ScopeType[keyof ScopeType]
                        // type ScopeValueType = object

                        /*
                            eslint-disable
                            @typescript-eslint/no-unnecessary-type-arguments
                        */
                        return viewObjectAsScope<ValueType>(
                            element,
                            childrenPropertyNames,
                            propertyReferenceKeys
                        )
                        /*
                            eslint-enable
                            @typescript-eslint/no-unnecessary-type-arguments
                        */
                    }

            return undefined
        },
        set(target: Type, name: string | symbol, value: unknown): boolean {
            let index = 0
            for (const item of target) {
                for (const key of propertyReferenceKeys)
                    if (item[key as unknown as keyof typeof item] === name) {
                        (target[index] as unknown) = value

                        return true
                    }
                index += 1
            }

            return false
        }
    }) as unknown as ScopeType

export const viewObjectAsScope = <
    Type extends Mapping<unknown>,
    ScopeType extends BasicScopeType = BasicScopeType
>(
        data: Type,
        childrenPropertyNames = ['children'],
        propertyReferenceKeys = ['name']
    ): ScopeType =>
    new Proxy(data, {
        ownKeys(target: Type) {
            return Reflect.ownKeys(target)
        },
        get(target: Type, name: string | symbol) {
            const value = target[name as keyof Type]

            if (Object.prototype.hasOwnProperty.call(target, name)) {
                if (
                    childrenPropertyNames.includes(name as string) &&
                    Array.isArray(value)
                ) {
                    // NOTE: Type[keyof Type]
                    type ValueType = Array<Mapping<unknown>>
                    // NOTE: ScopeType[keyof ScopeType]
                    type ScopeValueType = Array<BasicScopeType>

                    return viewArrayAsScope<ValueType, ScopeValueType>(
                        value,
                        childrenPropertyNames,
                        propertyReferenceKeys
                    )
                }

                if (value !== null && typeof value === 'object') {
                    // NOTE: Type[keyof Type]
                    type ValueType = Mapping<unknown>
                    // NOTE: ScopeType[keyof ScopeType]
                    // type ScopeValueType = object

                    /*
                        eslint-disable
                        @typescript-eslint/no-unnecessary-type-arguments
                    */
                    return viewObjectAsScope<ValueType>(
                        value as ValueType,
                        childrenPropertyNames,
                        propertyReferenceKeys
                    )
                    /*
                        eslint-enable
                        @typescript-eslint/no-unnecessary-type-arguments
                    */
                }

                return value
            }

            return undefined
        },
        set(target: Type, name: string | symbol, value: Type[keyof Type]) {
            if (Object.prototype.hasOwnProperty.call(target, name))
                if (Object.prototype.hasOwnProperty.call(target, name)) {
                    target[name as keyof Type] = value

                    return true
                }

            return false
        }
    }) as unknown as ScopeType
