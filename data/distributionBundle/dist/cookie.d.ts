import type { CookieOptions } from './type';
/**
 * Deletes a cookie value by given name.
 * @param name - Name to identify requested value.
 */
export declare const deleteCookie: (name: string) => void;
/**
 * Gets a cookie value by given name.
 * @param name - Name to identify requested value.
 * @returns Requested value.
 */
export declare const getCookie: (name: string) => string | null;
/**
 * Sets a cookie key-value-pair.
 * @param name - Name to identify given value.
 * @param value - Value to set.
 * @param givenOptions - Cookie set options.
 * @param givenOptions.domain - Domain to reference with given key-value-pair.
 * @param givenOptions.httpOnly - Indicates if this cookie should be accessible
 * from client or not.
 * @param givenOptions.minimal - Set only minimum number of options.
 * @param givenOptions.numberOfDaysUntilExpiration - Number of days until given
 * key shouldn't be deleted.
 * @param givenOptions.path - Path to reference with given key-value-pair.
 * @param givenOptions.sameSite - Set same site policy to "Lax", "None" or
 * "Strict".
 * @param givenOptions.secure - Indicates if this cookie is only valid for
 * "https" connections.
 * @returns A boolean indicating whether cookie could be set or not.
 */
export declare const setCookie: (name: string, value: string, givenOptions?: Partial<CookieOptions>) => boolean;
