/**
 * TypeScript definitions for country-js
 */

export interface CurrencyInfo {
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
}

export interface GeoInfo {
    latitude: number;
    longitude: number;
}

export interface Country {
    code: string;
    name: string;
    currency: CurrencyInfo;
    geo: GeoInfo;
    capital: string;
    phone: string;
}

/**
 * Search for countries by code, name, currency, capital, or phone
 * Prioritizes exact matches over partial matches
 * 
 * @param txt - Search text (country code, name, currency, symbol, capital, or phone)
 * @returns Array of matching country objects, prioritized by match type
 * @throws TypeError if input is not a string
 * 
 * @example
 * search('AT') // Returns Austria
 * search('austria') // Returns Austria
 * search('euro') // Returns all Euro countries
 * search('€') // Returns all Euro countries
 */
export function search(txt: string): Country[];

/**
 * Get a country by its code (ISO 3166-1 alpha-2)
 * 
 * @param code - Country code (e.g., 'US', 'IN', 'FR')
 * @returns Country object or null if not found
 * @throws TypeError if input is not a string
 * 
 * @example
 * getByCode('US') // Returns USA country object
 * getByCode('at') // Returns Austria country object (case-insensitive)
 */
export function getByCode(code: string): Country | null;

/**
 * Get a country by its name
 * 
 * @param name - Country name (e.g., 'UNITED STATES', 'INDIA')
 * @returns Country object or null if not found
 * @throws TypeError if input is not a string
 * 
 * @example
 * getByName('USA') // Returns USA country object
 * getByName('austria') // Returns Austria country object (case-insensitive)
 */
export function getByName(name: string): Country | null;

/**
 * Get all available countries
 * 
 * @returns Array of all country objects
 * 
 * @example
 * getAll() // Returns array of all countries
 */
export function getAll(): Country[];

/**
 * Get total count of countries in the database
 * 
 * @returns Total number of countries
 * 
 * @example
 * count() // Returns 250 (or similar)
 */
export function count(): number;
