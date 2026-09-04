// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module cli */
'use strict'
/* !
    region header
    [Project page](https://torben.website/clientnode)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
/*
    NOTE: "CLI_COLOR" is defined in and re-exported from "./constants" (instead
    of being declared here directly) to avoid a webpack code generation issue
    where an import-less module loses its export declarations when bundled as a
    dependency of another entry point.
*/
export {CLI_COLOR} from './constants'
