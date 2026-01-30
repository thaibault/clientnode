// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module filesystem */
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
import {DEFAULT_ENCODING} from './constants'
import {NOOP} from './context'
import {optionalRequire} from './require'
import {AnyFunction, Encoding, File, FileTraverseResult} from './type'
import {ObjectEncodingOptions} from 'node:fs'

export const {
    mkdirSync = null,
    readdirSync = null,
    readFileSync = null,
    statSync = null,
    writeFileSync = null
} = optionalRequire<typeof import('fs')>('fs') || {}
const {
    mkdir = null,
    readdir = null,
    readFile = null,
    stat = null,
    writeFile = null
} = optionalRequire<typeof import('fs/promises')>('fs/promises') || {}
const {basename = null, join = null, resolve = null} =
    optionalRequire<typeof import('path')>('path') || {}
/**
 * Copies given source directory via path to given target directory location
 * with same target name as source file has or copy to given complete target
 * directory path.
 * @param sourcePath - Path to directory to copy.
 * @param targetPath - Target directory or complete directory location to copy
 * in.
 * @param callback - Function to invoke for each traversed file.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Promise holding the determined target directory path.
 */
export const copyDirectoryRecursive = async (
    sourcePath: string,
    targetPath: string,
    callback: AnyFunction = NOOP,
    readOptions = {encoding: null, flag: 'r'},
    writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
): Promise<string> => {
    if (!(basename && join && mkdir && resolve))
        throw new Error('Could not load filesystem functions.')

    // NOTE: Check if folder needs to be created or integrated.
    sourcePath = resolve(sourcePath)
    if (await isDirectory(targetPath))
        targetPath = resolve(targetPath, basename(sourcePath))

    try {
        await mkdir(targetPath)
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
            throw error
    }
    for (
        const currentSourceFile of
        await walkDirectoryRecursively(sourcePath, callback)
    ) {
        const currentTargetPath: string = join(
            targetPath, currentSourceFile.path.substring(sourcePath.length)
        )

        if (currentSourceFile.stats?.isDirectory())
            try {
                await mkdir(currentTargetPath)
            } catch (error) {
                if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
                    throw error
            }
        else
            await copyFile(
                currentSourceFile.path,
                currentTargetPath,
                readOptions,
                writeOptions
            )
    }

    return targetPath
}
/**
 * Copies given source directory via path to given target directory location
 * with same target name as source file has or copy to given complete target
 * directory path.
 * @param sourcePath - Path to directory to copy.
 * @param targetPath - Target directory or complete directory location to copy
 * in.
 * @param callback - Function to invoke for each traversed file.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target directory path.
 */
export const copyDirectoryRecursiveSync = (
    sourcePath: string,
    targetPath: string,
    callback: AnyFunction = NOOP,
    readOptions = {encoding: null, flag: 'r'},
    writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
): string => {
    if (!(basename && join && mkdirSync && resolve))
        throw new Error('Could not load filesystem functions.')

    // NOTE: Check if folder needs to be created or integrated.
    sourcePath = resolve(sourcePath)
    if (isDirectorySync(targetPath))
        targetPath = resolve(targetPath, basename(sourcePath))
    try {
        mkdirSync(targetPath)
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
            throw error
    }

    for (
        const currentSourceFile of
        walkDirectoryRecursivelySync(sourcePath, callback)
    ) {
        const currentTargetPath: string = join(
            targetPath, currentSourceFile.path.substring(sourcePath.length)
        )
        if (currentSourceFile.stats?.isDirectory())
            try {
                mkdirSync(currentTargetPath)
            } catch (error) {
                if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
                    throw error
            }
        else
            copyFileSync(
                currentSourceFile.path,
                currentTargetPath,
                readOptions,
                writeOptions
            )
    }

    return targetPath
}
/**
 * Copies given source file via path to given target directory location with
 * same target name as source file has or copy to given complete target file
 * path.
 * @param sourcePath - Path to file to copy.
 * @param targetPath - Target directory or complete file location to copy to.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target file path.
 */
export const copyFile = async (
    sourcePath: string,
    targetPath: string,
    readOptions = {encoding: null, flag: 'r'},
    writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
): Promise<string> => {
    if (!(basename && readFile && resolve && writeFile))
        throw new Error('Could not load filesystem functions.')

    /*
        NOTE: If target path references a directory a new file with the same
        name will be created.
    */
    if (await isDirectory(targetPath))
        targetPath = resolve(targetPath, basename(sourcePath))

    await writeFile(
        targetPath, await readFile(sourcePath, readOptions), writeOptions
    )

    return targetPath
}
/**
 * Copies given source file via path to given target directory location with
 * same target name as source file has or copy to given complete target file
 * path.
 * @param sourcePath - Path to file to copy.
 * @param targetPath - Target directory or complete file location to copy to.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target file path.
 */
export const copyFileSync = (
    sourcePath: string,
    targetPath: string,
    readOptions = {encoding: null, flag: 'r'},
    writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
): string => {
    if (!(basename && readFileSync && resolve && writeFileSync))
        throw new Error('Could not load filesystem functions.')

    /*
        NOTE: If target path references a directory a new file with the same
        name will be created.
    */
    if (isDirectorySync(targetPath))
        targetPath = resolve(targetPath, basename(sourcePath))

    writeFileSync(
        targetPath, readFileSync(sourcePath, readOptions), writeOptions
    )

    return targetPath
}
/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */
export const isDirectory = async (filePath: string): Promise<boolean> => {
    if (!stat)
        throw new Error('Could not load filesystem functions.')

    try {
        return (await stat(filePath)).isDirectory()
    } catch (error) {
        if (
            Object.prototype.hasOwnProperty.call(error, 'code') &&
            ['ENOENT', 'ENOTDIR'].includes(
                (error as NodeJS.ErrnoException).code as string
            )
        )
            return false

        throw error
    }
}
/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A boolean which indicates directory existence.
 */
export const isDirectorySync = (filePath: string): boolean => {
    if (!statSync)
        throw new Error('Could not load filesystem functions.')

    try {
        return statSync(filePath).isDirectory()
    } catch (error) {
        if (
            Object.prototype.hasOwnProperty.call(error, 'code') &&
            ['ENOENT', 'ENOTDIR'].includes(
                (error as NodeJS.ErrnoException).code as string
            )
        )
            return false

        throw error
    }
}
/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */
export const isFile = async (filePath: string): Promise<boolean> => {
    if (!stat)
        throw new Error('Could not load filesystem functions.')

    try {
        return (await stat(filePath)).isFile()
    } catch (error) {
        if (
            Object.prototype.hasOwnProperty.call(error, 'code') &&
            ['ENOENT', 'ENOTDIR'].includes(
                (error as NodeJS.ErrnoException).code as string
            )
        )
            return false

        throw error
    }
}
/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to file.
 * @returns A boolean which indicates file existence.
 */
export const isFileSync = (filePath: string): boolean => {
    if (!statSync)
        throw new Error('Could not load filesystem functions.')

    try {
        return statSync(filePath).isFile()
    } catch (error) {
        if (
            Object.prototype.hasOwnProperty.call(error, 'code') &&
            ['ENOENT', 'ENOTDIR'].includes(
                (error as NodeJS.ErrnoException).code as string
            )
        )
            return false

        throw error
    }
}
/**
 * Iterates through given directory structure recursively and calls given
 * callback for each found file. Callback gets file path and corresponding stat
 * object as argument.
 * @param directoryPath - Path to directory structure to traverse.
 * @param callback - Function to invoke for each traversed file and potentially
 * manipulate further traversing in alphabetical sorted order.
 * If it returns "null" or a promise resolving to "null", no further files
 * will be traversed afterward.
 * If it handles a directory and returns "false" or a promise resolving to
 * "false" no traversing into that directory will occur.
 * @param options - Options to use for nested "readdir" calls.
 * @returns A promise holding the determined files.
 */
export const walkDirectoryRecursively = async (
    directoryPath: string,
    callback: null | ((file: File) => FileTraverseResult) = null,
    options: (
        Encoding |
        (ObjectEncodingOptions & {withFileTypes?: false; recursive?: boolean})
    ) = DEFAULT_ENCODING
): Promise<Array<File>> => {
    if (!(readdir && resolve && stat))
        throw new Error('Could not load filesystem functions.')

    const files: Array<File> = []
    for (const directoryEntry of await readdir(
        directoryPath,
        (typeof options === 'string' ?
            {encoding: options, withFileTypes: true} :
            {...options, withFileTypes: true}
        )
    )) {
        const filePath: string = resolve(
            directoryPath, directoryEntry.name
        )
        const file: File = {
            directoryPath,
            directoryEntry,
            error: null,
            name: directoryEntry.name,
            path: filePath,
            stats: null
        }

        try {
            file.stats = await stat(filePath)
        } catch (error) {
            file.error = error as NodeJS.ErrnoException
        }

        files.push(file)
    }

    if (callback)
        /*
            NOTE: Directories and have to be iterated first to be able to
            avoid deeper unwanted traversing.
        */
        files.sort((firstFile: File, secondFile: File): -1 | 0|1 => {
            if (firstFile.stats?.isDirectory()) {
                if (secondFile.stats?.isDirectory())
                    return 0

                return -1
            }

            if (secondFile.stats?.isDirectory())
                return 1

            return 0
        })

    let finalFiles: Array<File> = []
    for (const file of files) {
        finalFiles.push(file)

        let result: FileTraverseResult =
            callback ? callback(file) : undefined

        if (result === null)
            break

        if (typeof result === 'object' && 'then' in result)
            result = await result

        if (result === null)
            break

        if (result !== false && file.stats?.isDirectory())
            finalFiles = finalFiles.concat(
                await walkDirectoryRecursively(file.path, callback, options)
            )
    }

    return finalFiles
}
/**
 * Iterates through given directory structure recursively and calls given
 * callback for each found file. Callback gets file path and corresponding
 * stats object as argument.
 * @param directoryPath - Path to directory structure to traverse.
 * @param callback - Function to invoke for each traversed file.
 * @param options - Options to use for nested "readdir" calls.
 * @returns Determined list if all files.
 */
export const walkDirectoryRecursivelySync = (
    directoryPath: string,
    callback: AnyFunction | null = NOOP,
    options: (
        Encoding |
        (ObjectEncodingOptions & {withFileTypes?: false; recursive?: boolean})
    ) = DEFAULT_ENCODING
): Array<File> => {
    if (!(readdirSync && resolve && statSync))
        throw new Error('Could not load filesystem functions.')

    const files: Array<File> = []

    for (const directoryEntry of readdirSync(
        directoryPath,
        typeof options === 'string' ?
            {encoding: options, withFileTypes: true} :
            {...options, withFileTypes: true}
    )) {
        const filePath: string =
            resolve(directoryPath, directoryEntry.name)
        const file: File = {
            directoryPath,
            directoryEntry,
            error: null,
            name: directoryEntry.name,
            path: filePath,
            stats: null
        }
        try {
            file.stats = statSync(filePath)
        } catch (error) {
            file.error = error as NodeJS.ErrnoException
        }
        files.push(file)
    }

    let finalFiles: Array<File> = []

    if (callback) {
        /*
            NOTE: Directories have to be iterated first to potentially
            avoid deeper iterations.
        */
        files.sort((firstFile: File, secondFile: File): number => {
            if (firstFile.stats?.isDirectory()) {
                if (secondFile.stats?.isDirectory())
                    return 0

                return -1
            }

            if (secondFile.stats?.isDirectory())
                return 1

            return 0
        })

        for (const file of files) {
            finalFiles.push(file)

            const result: unknown = callback(file)

            if (result === null)
                break

            if (result !== false && file.stats?.isDirectory())
                finalFiles = finalFiles.concat(
                    walkDirectoryRecursivelySync(file.path, callback, options)
                )
        }
    }

    return finalFiles
}
