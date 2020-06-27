# Jordan Scrapes Leanx.eu

This scrapes [Leanx SAP Tables](https://http://leanx.eu//) for possible field values and then exports them to a CSV. It's basing its scraping targets on an array of SAP Table names found in `src/tableNames.ts`.

[Full guide here](https://javascriptwebscrapingguy.com/jordan-scrapes-leanx)

## Getting Started

Clone the repository and run `npm i`. 

After that, you just need to run `npm start` and it'll scrape the games and output the results to the 'Table fields.csv'.

### Prerequisites

Tested on Node v12.4.0 and NPM v6.9.0.

### Installing

After installing [NodeJS](https://nodejs.org/en/) you should be able to just run the following in the terminal.

```
npm i
```

## Built With

* [Axios](https://github.com/axios/axios) - HTTP request library
* [NodeJS](https://nodejs.org/en/) - NodeJS
* [Cheerio](https://github.com/cheeriojs/cheerio) - HTML parsing library
* [Json2csv] (https://github.com/zemirco/json2csv) - Parses json to CSV

## Authors

* **Jordan Hansen** - *Initial work* - [Jordan Hansen](https://github.com/aarmora)


## License

This project is licensed under the ISC License
