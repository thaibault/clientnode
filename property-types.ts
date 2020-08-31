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
import {Mapping, ValueOf} from 'clientnode/type'
import PropTypes from 'prop-types'
// endregion
let Types:Mapping<ValueOf<(() => void)|PropertyTypes>>
if (process.env.NODE_ENV === 'production') {
    Types = {}
    for (const name of Object.keys(PropTypes))
        Types[name] = ():void => {}
} else
    Types = PropTypes

export const any = Types.any
export const array = Types.array
export const arrayOf = Types.arrayOf
export const bool = Types.bool
export const boolean = Types.bool
export const element = Types.element
export const elementType = Types.elementType
export const instanceOf = Types.instanceOf
export const func = Types.func
export const node = Types.node
export const number = Types.number
export const object = Types.object
export const objectOf = Types.objectOf
export const oneOf = Types.oneOf
export const oneOfType = Types.oneOfType
export const exact = Types.exact
export const shape = Types.shape
export const string = Types.string
export const symbol = Types.symbol

export const PropertyTypes:typeof PropTypes = Types
export default PropertyTypes
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
