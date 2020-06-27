import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { tableNames } from './tableNames';
import * as json2csv from 'json2csv';
import * as fs from 'fs';


(async () => {
	const allFields: any[] = [];

	// for (let i = 0; i < tableNames.length; i++) {
	for (let i = 0; i < 10; i++) {
		const values = await getTableValues(tableNames[i].SAP_Table);

		allFields.push(...values);

		console.log('values', allFields.length);

		await timeout(1000);
	}

	const csv = json2csv.parse(allFields);
	const fileName = 'Table fields.csv';
	fs.writeFile(fileName, csv, (err) => {
		if (err) {
			console.log('error saving file', err);
		}
	})

})();

async function getTableValues(tableName: string) {
	const url = `http://leanx.eu/en/sap/table/${tableName}.html`;
	console.log('Searching - ', url);

	let axiosResponse: AxiosResponse;

	try {
		axiosResponse = await axios.get(url);
	}
	catch (e) {
		console.log('Error searching ', url, e.response ? e.response.status : '');
		return [];
	}
	const fieldValues: any = [];

	const $ = cheerio.load(axiosResponse.data);

	const rows = $('h3:nth-of-type(1) + .table-responsive > table > tbody > tr');

	for (let i = 0; i < rows.length; i++) {
		const row$ = cheerio.load(rows[i]);
		const field = row$('td:nth-of-type(1)').first().text();

		const possibleValues = row$('.collapse tr');

		if (possibleValues.length > 0) {
			for (let possibleValueIndex = 0; possibleValueIndex < possibleValues.length; possibleValueIndex++) {
				const possibleValue$ = cheerio.load(possibleValues[possibleValueIndex]);
				const possibleValue = possibleValue$('td:nth-of-type(2)').text();

				fieldValues.push({
					table: tableName,
					field: field,
					value: possibleValue
				});

			}
		}
		else {
			fieldValues.push({
				table: tableName,
				field: field,
				value: field
			});
		}
	}

	console.log('Found ', fieldValues.length, ' fields.');
	return fieldValues;
}


function timeout(ms: number) {
	return new Promise(res => setTimeout(res, ms));
}

