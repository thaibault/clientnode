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

const TEST_ENVIRONMENT:string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const path = optionalRequire<typeof import('path')>('path')
const resolve = path?.resolve.bind(path)
const {sync: removeDirectoryRecursivelySync = null} =
    optionalRequire<typeof import('rimraf')>('rimraf') || {}
const {unlink} =
    optionalRequire<typeof import('fs/promises')>('fs/promises') || {}

if (TARGET_TECHNOLOGY === 'node') {
    if (!(removeDirectoryRecursivelySync && resolve && unlink))
        throw new Error('Failed to load filesystem api.')

    const testPath = './copyDirectoryRecursiveTest.compiled'

    test('copyDirectoryRecursive', async ():Promise<void> => {
        removeDirectoryRecursivelySync(testPath)
        expect(await copyDirectoryRecursive(
            './node_modules/.bin', testPath, NOOP
        )).toMatch(/\/copyDirectoryRecursiveTest.compiled$/)
        removeDirectoryRecursivelySync(testPath)
    })
    test('copyDirectoryRecursiveSync', () => {
        removeDirectoryRecursivelySync(testPath)
        expect(copyDirectoryRecursiveSync(
            './node_modules/.bin', testPath, NOOP
        )).toMatch(/\/copyDirectoryRecursiveTest.compiled$/)
        removeDirectoryRecursivelySync(testPath)
    })
    test('copyFile', async ():Promise<void> => {
        try {
            await unlink(`./test.copyFile.${TEST_ENVIRONMENT}.compiled.js`)
        } catch (_error) {
            // Continue regardless of an error.
        }
        let result = ''
        try {
            result = await copyFile(
                resolve('./src/filesystem.ts'),
                `./test.copyFile.${TEST_ENVIRONMENT}.compiled.js`
            )
        } catch (error) {
            console.error(error)
        }
        expect(result).toMatch(new RegExp(
            `\\.\\/test\\.copyFile\\.${TEST_ENVIRONMENT}\\.compiled\\.js$`
        ))
        /*
            NOTE: A race condition was identified here. So we need an
            additional digest loop to have this test artefact placed here.
        */
        await timeout()
        await unlink(`./test.copyFile.${TEST_ENVIRONMENT}.compiled.js`)
    })
    test('copyFileSync', async ():Promise<void> => {
        try {
            await unlink(`./test.copyFileSync.${TEST_ENVIRONMENT}.compiled.js`)
        } catch (_error) {
            // Continue regardless of an error.
        }

        expect(copyFileSync(
            resolve('./src/filesystem.ts'),
            `./test.copyFileSync.${TEST_ENVIRONMENT}.compiled.js`
        )).toMatch(new RegExp(
            `\\.\\/test\\.copyFileSync\\.${TEST_ENVIRONMENT}\\.compiled\\` +
            '.js$'
        ))

        await unlink(`./test.copyFileSync.${TEST_ENVIRONMENT}.compiled.js`)
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
        for (const filePath of [resolve('./test.ts')]) {
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

        resolve('./test.ts')
    )
    test('isFile', async ():Promise<void> => {
        for (const filePath of [resolve('./src/filesystem.ts')]) {
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

        resolve('./src/filesystem.ts')
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
