# country-js

`country-js` is an npm package designed to provide extensive information about countries, encompassing details such as country code, name, currency symbol, capital city, phone code, latitude, and longitude.

## Installation

You can easily install country-js via npm:

```bash
npm install country-js --save
```

## Features

- ✅ Search countries by code, name, currency, capital, or phone
- ✅ Direct country lookup by code or name
- ✅ Get all countries or count total
- ✅ Optimized search with exact match prioritization
- ✅ No duplicate results
- ✅ Input validation & error handling
- ✅ TypeScript support with type definitions
- ✅ Comprehensive test coverage

## Usage

### Basic Import

```js
const countryInfo = require('country-js');
```

### 1. Search Function

Search by country code, name, currency code, currency name, currency symbol, capital, or phone code.

```js
// Search by country code
countryInfo.search('US');        // Returns USA
countryInfo.search('at');        // Returns Austria (case-insensitive)

// Search by country name
countryInfo.search('austria');   // Returns Austria
countryInfo.search('FRANCE');    // Returns France

// Search by currency
countryInfo.search('euro');      // Returns all Euro countries
countryInfo.search('eur');       // Returns all EUR countries
countryInfo.search('€');         // Returns all Euro countries

// Search by capital
countryInfo.search('PARIS');     // Returns France

// Search by phone code
countryInfo.search('1');         // Returns USA, Canada, etc.
```

**Returns:** Array of country objects (prioritizes exact matches first)

```js
// Example output:
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
```

### 2. Get By Code

Directly retrieve a country by its ISO code (faster than search).

```js
const country = countryInfo.getByCode('US');
const country = countryInfo.getByCode('sg');  // case-insensitive

// Returns: Country object or null if not found
```

### 3. Get By Name

Directly retrieve a country by its name.

```js
const country = countryInfo.getByName('AUSTRIA');
const country = countryInfo.getByName('france');  // case-insensitive

// Returns: Country object or null if not found
```

### 4. Get All Countries

Retrieve all available countries.

```js
const allCountries = countryInfo.getAll();

// Returns: Array of all country objects
// Example: Array with 250+ countries
```

### 5. Count

Get the total number of countries in the database.

```js
const total = countryInfo.count();

// Returns: 250 (or similar number)
```

## Error Handling

The library validates input and throws `TypeError` for invalid parameters:

```js
try {
    countryInfo.search(123);  // Throws TypeError
} catch (error) {
    console.error(error.message);
}
```

**Valid inputs:** `search()`, `getByCode()`, `getByName()` accept strings only
**Invalid inputs:** `null`, `undefined`, numbers, objects, arrays (except empty strings return empty array)

## Response Structure

Each country object contains:

```ts
{
  code: string;                    // ISO 3166-1 alpha-2 code (e.g., 'US')
  name: string;                    // Country name in uppercase
  currency: {
    currencyName: string;          // Currency name
    currencyCode: string;          // ISO 4217 code
    currencySymbol: string;        // Currency symbol
  };
  geo: {
    latitude: number;              // Geographic latitude
    longitude: number;             // Geographic longitude
  };
  capital: string;                 // Capital city name
  phone: string;                   // International phone code
}
```

## TypeScript Support

Type definitions are included with the package:

```ts
import * as country from 'country-js';

const result: country.Country[] = country.search('US');
const usa: country.Country | null = country.getByCode('US');
const count: number = country.count();
```

## Examples

```js
const countryInfo = require('country-js');

// Get all Euro countries
const euroCountries = countryInfo.search('EUR');

// Get information about a specific country
const usa = countryInfo.getByCode('US');
console.log(usa.capital);  // Output: 'WASHINGTON'

// Find countries by capital
const parisCountry = countryInfo.search('PARIS');

// Check total countries
console.log('Total countries:', countryInfo.count());

// Get all countries
const all = countryInfo.getAll();
console.log(`Database contains ${all.length} countries`);
```

## Performance Notes

- **search()**: O(n) complexity, optimized with Set for deduplication
- **getByCode()**: O(n) complexity (faster for direct lookups)
- **getByName()**: O(n) complexity (faster for direct lookups)
- **getAll()**: O(1) - instant

For best performance with frequent lookups by code or name, use `getByCode()` or `getByName()` instead of `search()`.

## Testing

Run the comprehensive test suite:

```bash
npm test
```

Tests cover:
- Search functionality (by code, name, currency, capital, phone)
- Direct getters (getByCode, getByName)
- Edge cases (null, undefined, empty strings)
- Error handling (invalid input types)
- Data integrity (unique codes, valid coordinates)
