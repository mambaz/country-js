# country-js

`country-js` is an npm package designed to provide extensive information about countries, encompassing details such as country code, name, currency symbol, capital city, phone code, latitude, and longitude.


## Installation

You can easily install country-js via npm:

```bash
npm install country-js --save
```
## Usage

```js

const countryInfo = require('country-js');

// Search by country code, name, currencyCode, currencyName, or symbol
countryInfo.search('austria'); // Returns information about Austria
countryInfo.search('at'); // Returns information about Austria
countryInfo.search('euro'); // Returns information about countries using Euro as currency
countryInfo.search('eur'); // Returns information about countries using Euro as currency
countryInfo.search('€'); // Returns information about countries using Euro as currency

// Example outputs:
/*
[
  {
    code: 'AT',
    name: 'AUSTRIA',
    currency: {
      currencyName: 'EURO',
      currencyCode: 'EUR',
      currencySymbol: '€'
    },
    geo: { latitude: 47.516231, longitude: 14.550072 },
    capital: 'VIENNA',
    phone: '43'
  }
]
*/

// You can search for other countries like 'USA', 'SG' (Singapore), 'IN' (India), etc., and get their information in a similar structured output.

```
