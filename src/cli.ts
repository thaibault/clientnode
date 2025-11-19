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

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
export const CLI_COLOR = {
    black: '\x1b[30m',
    blink: '\x1b[5m',
    blue: '\x1b[0;34m',
    bold: '\x1b[1m',
    cyan: '\x1b[36m',
    darkGray: '\x1b[0;90m',
    default: '\x1b[0m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    invert: '\x1b[7m',
    invisible: '\x1b[8m',
    lightBlue: '\x1b[0;94m',
    lightCyan: '\x1b[0;96m',
    lightGray: '\x1b[0;37m',
    lightGreen: '\x1b[0;92m',
    lightMagenta: '\x1b[0;95m',
    lightRed: '\x1b[0;91m',
    lightYellow: '\x1b[0;93m',
    magenta: '\x1b[35m',
    nodim: '\x1b[22m',
    noblink: '\x1b[25m',
    nobold: '\x1b[21m',
    noinvert: '\x1b[27m',
    noinvisible: '\x1b[28m',
    nounderline: '\x1b[24m',
    red: '\x1b[31m',
    underline: '\x1b[4m',
    white: '\x1b[37m',
    yellow: '\x1b[33m'
} as const
