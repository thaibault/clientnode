import {Mapping} from '../'

import {BasicScopeType, RecursiveKeyOf} from './types'

export const viewArrayAsScope = <
    Type extends Array<Mapping<unknown>>, ScopeType extends BasicScopeType
>(
        data: Type,
        childrenPropertyNames: Array<RecursiveKeyOf<Type>>,
        propertyReferenceKeys: Array<RecursiveKeyOf<Type>>
    ): ScopeType =>
    new Proxy(data, {
        ownKeys(target: Type) {
            return Reflect.ownKeys(target)
        },
        get(target: Type, name: string | symbol) {
            for (const element of target)
                for (const key of propertyReferenceKeys)
                    if (element[key as keyof typeof element] === name) {
                        // NOTE: Type[keyof Type]
                        type ValueType = Record<string, unknown>
                        // NOTE: ScopeType[keyof ScopeType]
                        // type ScopeValueType = object

                        return viewObjectAsScope<
                            ValueType/*, ScopeValueType*/
                        >(
                            element,
                            childrenPropertyNames,
                            propertyReferenceKeys
                        )
                    }

            return undefined
        },
        set(target: Type, name: string | symbol, value: unknown): boolean {
            let index = 0
            for (const item of target) {
                for (const key of propertyReferenceKeys)
                    if (item[key as keyof typeof item] === name) {
                        (target[index] as unknown) = value

                        return true
                    }
                index += 1
            }

            return false
        }
    }) as unknown as ScopeType

export const viewObjectAsScope = <
    Type extends Record<string, unknown>,
    ScopeType extends object = BasicScopeType
>(
        data: Type,
        childrenPropertyNames: Array<RecursiveKeyOf<Type>> = ['children'] as
            Array<RecursiveKeyOf<Type>>,
        propertyReferenceKeys: Array<RecursiveKeyOf<Type>> = ['name'] as
            Array<RecursiveKeyOf<Type>>
): ScopeType =>
    new Proxy(data, {
        ownKeys(target: Type) {
            return Reflect.ownKeys(target)
        },
        get(target: Type, name: string | symbol) {
            const value = target[name as keyof Type]

            if (Object.prototype.hasOwnProperty.call(target, name)) {
                if (
                    childrenPropertyNames.includes(
                        name as RecursiveKeyOf<Type>
                    ) &&
                    Array.isArray(value)
                ) {
                    // NOTE: Type[keyof Type]
                    type ValueType = Array<Record<string, unknown>>
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

                    return viewObjectAsScope<
                        ValueType/*, ScopeValueType*/
                    >(
                        value as ValueType,
                        childrenPropertyNames,
                        propertyReferenceKeys
                    )
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
