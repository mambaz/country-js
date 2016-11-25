# country-js

Npm package to Get the country code, name, currency symbol, capital, phone code, latitude and longitude

## Installation

Installation is easiest through npm:

`npm install country-js --save`

## Usage

```js


var n = require('country-js');
// Search by country code, name, currencyCode, currencyName and symbol
//  n.search('austria'); || n.search('at'); || n.search('euro');  || n.search('eur');   || n.search('€');
// [ { code: 'AT',
//     name: 'AUSTRIA',
//     currency: 
//      { currencyName: 'EURO',
//        currencyCode: 'EUR',
//        currencySymbol: '€' },
//     geo: { latitude: 47.516231, longitude: 14.550072 },
//     capital: 'VIENNA',
//     phone: '43' } ]


//  n.search('USA'); 
// [ { code: 'US',
//     name: 'USA',
//     currency: 
//      { currencyName: 'US DOLLAR',
//        currencyCode: 'USD',
//        currencySymbol: '$' },
//     geo: { latitude: 37.09024, longitude: -95.712891 },
//     capital: 'WASHINGTON',
//     phone: '1' } ]

//  n.search('SG'); 
// [ { code: 'SG',
//     name: 'SINGAPORE',
//     currency: 
//      { currencyName: 'SINGAPORE DOLLAR',
//        currencyCode: 'SGD',
//        currencySymbol: 'S$' },
//     geo: { latitude: 1.352083, longitude: 103.819836 },
//     capital: 'SINGAPORE',
//     phone: '65' } ]

//  n.search('IN'); 
// [ { code: 'IN',
//     name: 'INDIA',
//     currency: 
//      { currencyName: 'INDIAN RUPEE',
//        currencyCode: 'INR',
//        currencySymbol: '₹' },
//     geo: { latitude: 20.593684, longitude: 78.96288 },
//     capital: 'NEW DELHI',
//     phone: '91' } ]


```

