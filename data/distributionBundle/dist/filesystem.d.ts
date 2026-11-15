import type { ObjectEncodingOptions } from 'node:fs';
import type { AnyFunction, Encoding, File, FileTraverseResult } from './type';
export declare const imports: {
    fs?: null | typeof import('fs');
    fsPromises?: null | typeof import('fs/promises');
    path?: null | typeof import('path');
};
export declare const importFilesystemAPI: () => Promise<unknown[]>;
/**
 * Copies given source directory via path to given target directory location
 * with same target name as source file has or copy to given complete target
 * directory path.
 * @param sourcePath - Path to directory to copy.
 * @param targetPath - Target directory or complete directory location to copy
 * in.
 * @param contents - Indicates whether we only want to copy content of source
 * path without recreating the sourcefile itself on target location.
 * @param callback - Function to invoke for each traversed file.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Promise holding the determined target directory path.
 */
export declare const copyDirectoryRecursive: (sourcePath: string, targetPath: string, contents?: boolean, callback?: AnyFunction, readOptions?: {
    encoding: null;
    flag: string;
}, writeOptions?: {
    encoding: Encoding;
    flag: string;
    mode: number;
}) => Promise<string>;
/**
 * Copies given source directory via path to given target directory location
 * with same target name as source file has or copy to given complete target
 * directory path.
 * @param sourcePath - Path to directory to copy.
 * @param targetPath - Target directory or complete directory location to copy
 * in.
 * @param contents - Indicates whether we only want to copy content of source
 * path without recreating the sourcefile itself on target location.
 * @param callback - Function to invoke for each traversed file.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target directory path.
 */
export declare const copyDirectoryRecursiveSync: (sourcePath: string, targetPath: string, contents?: boolean, callback?: AnyFunction, readOptions?: {
    encoding: null;
    flag: string;
}, writeOptions?: {
    encoding: Encoding;
    flag: string;
    mode: number;
}) => string;
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
export declare const copyFile: (sourcePath: string, targetPath: string, readOptions?: {
    encoding: null;
    flag: string;
}, writeOptions?: {
    encoding: Encoding;
    flag: string;
    mode: number;
}) => Promise<string>;
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
export declare const copyFileSync: (sourcePath: string, targetPath: string, readOptions?: {
    encoding: null;
    flag: string;
}, writeOptions?: {
    encoding: Encoding;
    flag: string;
    mode: number;
}) => string;
/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */
export declare const isDirectory: (filePath: string) => Promise<boolean>;
/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A boolean which indicates directory existence.
 */
export declare const isDirectorySync: (filePath: string) => boolean;
/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */
export declare const isFile: (filePath: string) => Promise<boolean>;
/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to file.
 * @returns A boolean which indicates file existence.
 */
export declare const isFileSync: (filePath: string) => boolean;
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
export declare const walkDirectoryRecursively: (directoryPath: string, callback?: null | ((file: File) => FileTraverseResult), options?: (Encoding | (ObjectEncodingOptions & {
    withFileTypes?: false;
    recursive?: boolean;
}))) => Promise<Array<File>>;
/**
 * Iterates through given directory structure recursively and calls given
 * callback for each found file. Callback gets file path and corresponding
 * stats object as argument.
 * @param directoryPath - Path to directory structure to traverse.
 * @param callback - Function to invoke for each traversed file.
 * @param options - Options to use for nested "readdir" calls.
 * @returns Determined list if all files.
 */
export declare const walkDirectoryRecursivelySync: (directoryPath: string, callback?: AnyFunction | null, options?: (Encoding | (ObjectEncodingOptions & {
    withFileTypes?: false;
    recursive?: boolean;
}))) => Array<File>;
