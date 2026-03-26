import {BasicScopeType, RecursiveKeyOf} from './types'

export const viewArrayAsScope = <Type extends Record<string, unknown>[], ScopeType extends BasicScopeType>(
    data: Type,
    childrenPropertyNames: Array<RecursiveKeyOf<Type>>,
    propertyReferenceKeys: Array<RecursiveKeyOf<Type>>
): ScopeType =>
    new Proxy<Type>(data, {
        ownKeys(target: Type) {
            return Reflect.ownKeys(target)
        },
        get(target: Type, name: string | symbol) {
            for (const element of target)
                for (const key of propertyReferenceKeys)
                    if (element[key as keyof typeof element] === name) {
                        type ValueType = Record<string, unknown> // NOTE: Type[keyof Type]
                        //type ScopeValueType = object // NOTE: ScopeType[keyof ScopeType]

                        return viewObjectAsScope<ValueType/*, ScopeValueType*/>(
                            element, childrenPropertyNames, propertyReferenceKeys
                        )
                    }

            return undefined
        },
        set(target: Type, name: string | symbol, value: unknown): boolean {
            let index = 0
            for (const element of target) {
                for (const key of propertyReferenceKeys)
                    if (element[key as keyof typeof element] === name) {
                        (target[index] as unknown) = value

                        return true
                    }
                index += 1
            }

            return false
        }
    }) as unknown as ScopeType

export const viewObjectAsScope = <Type extends Record<string, unknown>, ScopeType extends object = BasicScopeType>(
    data: Type,
    childrenPropertyNames: Array<RecursiveKeyOf<Type>> = ['children'] as
        Array<RecursiveKeyOf<Type>>,
    propertyReferenceKeys: Array<RecursiveKeyOf<Type>> = ['name'] as
        Array<RecursiveKeyOf<Type>>
): ScopeType =>
    new Proxy<Type>(data, {
        ownKeys(target: Type) {
            return Reflect.ownKeys(target)
        },
        get(target: Type, name: string | symbol) {
            const value = target[name as keyof Type]

            if (Object.prototype.hasOwnProperty.call(target, name)) {
                if (
                    childrenPropertyNames.includes(name as RecursiveKeyOf<Type>) &&
                    Array.isArray(value)
                ) {
                    type ValueType = Array<Record<string, unknown>> // NOTE: Type[keyof Type]
                    type ScopeValueType = Array<BasicScopeType> // NOTE: ScopeType[keyof ScopeType]

                    return viewArrayAsScope<ValueType, ScopeValueType>(
                        value,
                        childrenPropertyNames,
                        propertyReferenceKeys
                    )
                }

                if (value !== null && typeof value === 'object') {
                    type ValueType = Record<string, unknown> // NOTE: Type[keyof Type]
                    //type ScopeValueType = object // NOTE: ScopeType[keyof ScopeType]

                    return viewObjectAsScope<ValueType/*, ScopeValueType*/>(
                        value as ValueType, childrenPropertyNames, propertyReferenceKeys
                    )
                }

                return value
            }

            return undefined
        },
        set(target: Type, name: string | symbol, value: Type[keyof Type]) {
            if (Object.prototype.hasOwnProperty.call(target, name)) {
                if (Object.prototype.hasOwnProperty.call(target, name)) {
                    target[name as keyof Type] = value

                    return true
                }
            }

            return false
        }
    }) as unknown as ScopeType
