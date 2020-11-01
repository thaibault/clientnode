// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module property-types */
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
import PropTypes from 'prop-types'

import {ValueOf} from './type'
// endregion
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
    result:any = undefined
):ValueOf<typeof RealTypes> => {
    const type = ():any => result
    type.isRequired = ():null => null
    return type
}
/*
    NOTE: Each value has to be different (a real copy) to distinguish them from
    each other during runtime property reflections.
    Strict equality checks between different values have to be negative.
*/
export const DummyTypes = {
    any: createDummy(),
    array: createDummy(),
    arrayOf: createDummy(():void => {}),
    bool: createDummy(),
    boolean: createDummy(),
    element: createDummy(),
    elementType: createDummy(():void => {}),
    exact: createDummy(),
    func: createDummy(),
    instanceOf: createDummy(():void => {}),
    node: createDummy(),
    number: createDummy(),
    object: createDummy(),
    objectOf: createDummy(():void => {}),
    oneOf: createDummy(():void => {}),
    oneOfType: createDummy(():void => {}),
    shape: createDummy(():void => {}),
    string: createDummy(),
    symbol: createDummy()
} as const

export const PropertyTypes:typeof RealTypes =
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

export default PropertyTypes
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
