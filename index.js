const countries = require('./countries.json');
/**
 * Get the country array object
 * @param   {string}        parameter to find the country
 * @returns {array}       return array object
 */
module.exports.search = (txt) => {
    txt = (txt) ? txt.toUpperCase().trim() : null;
    let results = [];

    if (countries) {
        countries.forEach(function (value, i) {

            for (var j in value) {
                if (value[j] == txt) {
                    results.push(value);
                    break;
                }

                var obj_2 = value[j];
                if (obj_2.constructor === Object) {
                    for (var k in obj_2) {
                        if (obj_2[k] == txt) {
                            results.push(value);
                            break;
                        }
                    }
                }
            }
        });
    }

    return results;
};
