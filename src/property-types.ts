// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module propertTypes */
'use strict'
/* !
    region header
    [Project page](https://torben.website/react-material-input)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import PropTypes, {Requireable} from 'prop-types'

import {ValueOf} from './type'
// endregion
export const NullSymbol = Symbol('clientnodePropertyTypesNull')
export const UndefinedSymbol = Symbol('clientnodePropertyTypesUndefined')

export const RealTypes = {
    any: PropTypes.any,
    array: PropTypes.array,
    arrayOf: PropTypes.arrayOf,
    bool: PropTypes.bool,
    boolean: PropTypes.bool,
    element: PropTypes.element,
    elementType: PropTypes.elementType,
    exact: PropTypes.exact,
    func: PropTypes.func,
    instanceOf: PropTypes.instanceOf,
    node: PropTypes.node,
    number: PropTypes.number,
    object: PropTypes.object,
    objectOf: PropTypes.objectOf,
    oneOf: PropTypes.oneOf,
    oneOfType: PropTypes.oneOfType,
    shape: PropTypes.shape,
    string: PropTypes.string,
    symbol: PropTypes.symbol
} as const
export const createDummy = (
    result: Error|null = null
): ValueOf<typeof RealTypes> => {
    const type: Requireable<unknown> = (): Error|null => result

    type.isRequired = (): null => null

    return type
}
/**
 * Dummy validation class.
 * @property message - Holds error message as string.
 */
export class ValidationError extends Function {
    message = 'DummyErrorMessage'

    /**
     * Initializes dummy validation error instance.
     */
    constructor() {
        super('return null')
    }
}
/*
    NOTE: Each value has to be different (a real copy) to distinguish them from
    each other during runtime property reflections.
    Strict equality checks between different values have to be negative.
*/
export const DummyTypes = {
    any: createDummy(),
    array: createDummy(),
    arrayOf: createDummy(new ValidationError()),
    bool: createDummy(),
    boolean: createDummy(),
    element: createDummy(),
    elementType: createDummy(new ValidationError()),
    exact: createDummy(),
    func: createDummy(),
    instanceOf: createDummy(new ValidationError()),
    node: createDummy(),
    number: createDummy(),
    object: createDummy(),
    objectOf: createDummy(new ValidationError()),
    oneOf: createDummy(new ValidationError()),
    oneOfType: createDummy(new ValidationError()),
    shape: createDummy(new ValidationError()),
    string: createDummy(),
    symbol: createDummy()
} as const

export const PropertyTypes: typeof RealTypes =
    ['debug', 'dev', 'development'].includes(
        (process.env.NODE_ENV || '').trim().toLowerCase()
    ) ?
        RealTypes :
        DummyTypes as typeof RealTypes

export const any = PropertyTypes.any
export const array = PropertyTypes.array
export const arrayOf = PropertyTypes.arrayOf
export const bool = PropertyTypes.bool
export const boolean = PropertyTypes.bool
export const element = PropertyTypes.element
export const elementType = PropertyTypes.elementType
export const exact = PropertyTypes.exact
export const func = PropertyTypes.func
export const instanceOf = PropertyTypes.instanceOf
export const node = PropertyTypes.node
export const number = PropertyTypes.number
export const object = PropertyTypes.object
export const objectOf = PropertyTypes.objectOf
export const oneOf = PropertyTypes.oneOf
export const oneOfType = PropertyTypes.oneOfType
export const shape = PropertyTypes.shape
export const string = PropertyTypes.string
export const symbol = PropertyTypes.symbol

export type {Requireable, ValidationMap, Validator} from 'prop-types'

export default PropertyTypes
