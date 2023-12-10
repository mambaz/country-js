const countries = require('./countries.json');

/**
 * Get the country array object
 * @param   {string}   parameter to find the country
 * @returns {array}    return array object
 */
module.exports.search = (txt) => {
    const searchText = txt ? txt.toUpperCase().trim() : null;
    const results = [];

    if (countries && searchText !== null) {
        countries.forEach((country) => {
            const values = Object.values(country);

            values.forEach((value) => {
                if (value === searchText || (typeof value === 'object' && Object.values(value).includes(searchText))) {
                    results.push(country);
                }
            });
        });
    }

    return results;
};
