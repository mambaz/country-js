const countries = require('./countries.json');

/**
 * Validates and normalizes search input
 * @param   {*}       input - Input to validate
 * @returns {string}  Normalized uppercase string or null
 * @throws  {TypeError} If input is not a string
 */
const validateInput = (input) => {
    if (input === null || input === undefined) {
        return null;
    }

    if (typeof input !== 'string') {
        throw new TypeError('Search parameter must be a string');
    }

    const normalized = input.toUpperCase().trim();
    if (normalized.length === 0) {
        return null;
    }

    return normalized;
};

/**
 * Search for countries by code, name, currency, capital, or phone
 * Prioritizes exact matches over partial matches
 * @param   {string}  txt - Search text (country code, name, currency, symbol, capital, or phone)
 * @returns {array}   Array of matching country objects, prioritized by match type
 * @example
 * search('AT') // Returns Austria
 * search('austria') // Returns Austria
 * search('euro') // Returns all Euro countries
 * search('€') // Returns all Euro countries
 */
module.exports.search = (txt) => {
    try {
        const searchText = validateInput(txt);

        if (searchText === null || !countries || countries.length === 0) {
            return [];
        }

        const exactMatches = new Set();
        const partialMatches = new Set();

        countries.forEach((country) => {
            // Check exact matches on main fields
            if (country.code === searchText ||
                country.name === searchText ||
                country.capital === searchText ||
                country.phone === searchText) {
                exactMatches.add(JSON.stringify(country));
                return;
            }

            // Check currency fields
            if (country.currency) {
                if (country.currency.currencyCode === searchText ||
                    country.currency.currencyName === searchText ||
                    country.currency.currencySymbol === searchText) {
                    exactMatches.add(JSON.stringify(country));
                    return;
                }
            }

            // Partial matches
            const allValues = [
                country.code,
                country.name,
                country.capital,
                country.phone,
                country.currency?.currencyCode,
                country.currency?.currencyName,
                country.currency?.currencySymbol
            ].filter(Boolean);

            allValues.forEach((value) => {
                if (value?.includes(searchText)) {
                    partialMatches.add(JSON.stringify(country));
                }
            });
        });

        // Return exact matches first, then partial matches, without duplicates
        return [
            ...Array.from(exactMatches).map(JSON.parse),
            ...Array.from(partialMatches).map(JSON.parse)
        ];
    } catch (error) {
        if (error instanceof TypeError) {
            throw error;
        }
        return [];
    }
};

/**
 * Get a country by its code (ISO 3166-1 alpha-2)
 * @param   {string}  code - Country code (e.g., 'US', 'IN', 'FR')
 * @returns {object}  Country object or null if not found
 * @example
 * getByCode('US') // Returns USA country object
 * getByCode('at') // Returns Austria country object (case-insensitive)
 */
module.exports.getByCode = (code) => {
    try {
        const searchCode = validateInput(code);

        if (searchCode === null) {
            return null;
        }

        return countries.find(country => country.code === searchCode) || null;
    } catch (error) {
        if (error instanceof TypeError) {
            throw error;
        }
        return null;
    }
};

/**
 * Get a country by its name
 * @param   {string}  name - Country name (e.g., 'UNITED STATES', 'INDIA')
 * @returns {object}  Country object or null if not found
 * @example
 * getByName('USA') // Returns USA country object
 * getByName('austria') // Returns Austria country object (case-insensitive)
 */
module.exports.getByName = (name) => {
    try {
        const searchName = validateInput(name);

        if (searchName === null) {
            return null;
        }

        return countries.find(country => country.name === searchName) || null;
    } catch (error) {
        if (error instanceof TypeError) {
            throw error;
        }
        return null;
    }
};

/**
 * Get all available countries
 * @returns {array} Array of all country objects
 * @example
 * getAll() // Returns array of all countries
 */
module.exports.getAll = () => {
    return countries;
};

/**
 * Get total count of countries in the database
 * @returns {number} Total number of countries
 * @example
 * count() // Returns 250 (or similar)
 */
module.exports.count = () => {
    return countries.length;
};
