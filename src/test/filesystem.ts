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
import {expect, test} from '@jest/globals'

import {NOOP} from '../context'
import {
    copyDirectoryRecursive,
    copyDirectoryRecursiveSync,
    copyFile,
    copyFileSync,
    isDirectory,
    isDirectorySync,
    isFile,
    isFileSync,
    walkDirectoryRecursively,
    walkDirectoryRecursivelySync
} from '../filesystem'
import {optionalRequire} from '../require'
import {testEachSingleParameterAgainstSameExpectation} from '../test-helper'
import {File} from '../type'
import {timeout} from '../utility'

declare const TARGET_TECHNOLOGY:string

const testEnvironment:string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const {resolve = null} = optionalRequire<typeof import('path')>('path') || {}
const {sync: removeDirectoryRecursivelySync = null} =
    optionalRequire<typeof import('rimraf')>('rimraf') || {}
const {unlink} =
    optionalRequire<typeof import('fs/promises')>('fs/promises') || {}

if (TARGET_TECHNOLOGY === 'node') {
    const testPath = './copyDirectoryRecursiveTest.compiled'

    test('copyDirectoryRecursive', async ():Promise<void> => {
        removeDirectoryRecursivelySync!(testPath)
        expect(await copyDirectoryRecursive(
            './node_modules/.bin', testPath, NOOP
        )).toMatch(/\/copyDirectoryRecursiveTest.compiled$/)
        removeDirectoryRecursivelySync!(testPath)
    })
    test('copyDirectoryRecursiveSync', ():void => {
        removeDirectoryRecursivelySync!(testPath)
        expect(copyDirectoryRecursiveSync(
            './node_modules/.bin', testPath, NOOP
        )).toMatch(/\/copyDirectoryRecursiveTest.compiled$/)
        removeDirectoryRecursivelySync!(testPath)
    })
    test('copyFile', async ():Promise<void> => {
        try {
            await unlink!(`./test.copyFile.${testEnvironment}.compiled.js`)
        } catch (error) {
            // Continue regardless of an error.
        }
        let result = ''
        try {
            result = await copyFile(
                resolve!('./test.ts'),
                `./test.copyFile.${testEnvironment}.compiled.js`
            )
        } catch (error) {
            console.error(error)
        }
        expect(result).toMatch(new RegExp(
            `\\.\\/test\\.copyFile\\.${testEnvironment}\\.compiled\\.js$`
        ))
        /*
            NOTE: A race condition was identified here. So we need an
            additional digest loop to have this test artefact placed here.
        */
        await timeout()
        await unlink!(`./test.copyFile.${testEnvironment}.compiled.js`)
    })
    test('copyFileSync', async ():Promise<void> => {
        try {
            await unlink!(
                `./test.copyFileSync.${testEnvironment}.compiled.js`
            )
        } catch (error) {
            // Continue regardless of an error.
        }

        expect(copyFileSync(
            resolve!('./test.ts'),
            `./test.copyFileSync.${testEnvironment}.compiled.js`
        )).toMatch(new RegExp(
            `\\.\\/test\\.copyFileSync\\.${testEnvironment}\\.compiled\\` +
            '.js$'
        ))

        await unlink!(`./test.copyFileSync.${testEnvironment}.compiled.js`)
    })
    test('isDirectory', async ():Promise<void> => {
        for (const filePath of ['./', '../']) {
            let result = false
            try {
                result = await isDirectory(filePath)
            } catch (error) {
                console.error(error)
            }
            expect(result).toStrictEqual(true)
        }
        for (const filePath of [resolve!('./test.ts')]) {
            let result = true
            try {
                result = await isDirectory(filePath)
            } catch (error) {
                console.error(error)
            }
            expect(result).toStrictEqual(false)
        }
    })
    testEachSingleParameterAgainstSameExpectation<typeof isDirectorySync>(
        'isDirectorySync',
        isDirectorySync,
        true,

        './',
        '../'
    )
    testEachSingleParameterAgainstSameExpectation<typeof isDirectorySync>(
        'isDirectorySync',
        isDirectorySync,
        false,

        resolve!('./test.ts')
    )
    test('isFile', async ():Promise<void> => {
        for (const filePath of [resolve!('./test.ts')]) {
            let result = false
            try {
                result = await isFile(filePath)
            } catch (error) {
                console.error(error)
            }
            expect(result).toStrictEqual(true)
        }

        for (const filePath of ['./', '../']) {
            let result = true
            try {
                result = await isFile(filePath)
            } catch (error) {
                console.error(error)
            }
            expect(result).toStrictEqual(false)
        }
    })
    testEachSingleParameterAgainstSameExpectation<typeof isFileSync>(
        'isFileSync',
        isFileSync,
        true,

        resolve!('./test.ts')
    )
    testEachSingleParameterAgainstSameExpectation<typeof isFileSync>(
        'isFileSync',
        isFileSync,
        false,

        './',
        '../'
    )
    test('walkDirectoryRecursively', async ():Promise<void> => {
        const filePaths:Array<string> = []
        const callback = (file:File):null => {
            filePaths.push(file.path)

            return null
        }

        let files:Array<File> = []
        try {
            files = await walkDirectoryRecursively('./', callback)
        } catch (error) {
            console.error(error)
        }

        expect(files).toHaveLength(1)
        expect(files[0]).toHaveProperty('path')
        expect(files[0]).toHaveProperty('stats')
        expect(filePaths).toHaveLength(1)
    })
    test('walkDirectoryRecursivelySync', ():void => {
        const filePaths:Array<string> = []
        const callback = (filePath:string):null => {
            filePaths.push(filePath)

            return null
        }
        const files:Array<File> =
            walkDirectoryRecursivelySync('./', callback)
        expect(files).toHaveLength(1)
        expect(files[0]).toHaveProperty('path')
        expect(files[0]).toHaveProperty('stats')
        expect(filePaths).toHaveLength(1)
    })
}
