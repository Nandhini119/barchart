/*To append the three svg's*/
// function ReadAppend(file,appendFile){
//  
//   fs.readFile(appendFile, function (err, data) {
//    if (err) throw err;
//   console.log('File was read');
//
//     fs.appendFile(file, data, function (err) {
//       if (err) throw err;
//       console.log('The "data to append" was appended to file!');
//
//     });
//   });
// }
// file = 'data/India2011.csv';
//// appendFile = 'data/IndiaSC2011.csv';
//// ReadAppend(file,appendFile);
////
// appendFile = 'data/IndiaST2011.csv';
// ReadAppend(file,appendFile);


var fs = require('fs');
let arOfObj = [];
let set1 = new Set();
let result = [];
let result_north_east = [];
let result_all_states = [];
/*reading the svg file*/
fs.readFile('data/India2011.csv', 'utf8', function (err, content) {
	let line = content.split('\n');
	line.pop();
	/*split the headers alone*/
	let header = line[0].split(',');
	for (let i = 1; i < line.length; i++) {
		let obj = {};
		let currentline = line[i].split(',');
		for (let j = 0; j < header.length; j++) {
			obj[header[j]] = currentline[j];
		}
		/*push all the datas in to the object*/
		arOfObj.push(obj);
	}
	arOfObj.pop();
	/*----------------------------------------Part-2------------------------------------*/

	let Total_Male_literate = 0;
	let Total_Male_illiterate = 0;
	let Total_Female_literate = 0;
	let Total_Female_illiterate = 0;
	line.map(function (currLine) {
		let currentLine = currLine.split(',');
		/*checking the header of the required column and calculating the total */
		if (header[11] === 'Illiterate - Females') {
			let str = Number(currentLine[11]);
			let num = isNaN(str) ? 0 : str
			Total_Female_illiterate = Total_Female_illiterate + num;
		}
		if (header[10] === 'Illiterate - Males') {
			let str = Number(currentLine[10]);
			let num = isNaN(str) ? 0 : str
			Total_Male_illiterate = Total_Male_illiterate + num;
		}
		if (header[14] === 'Literate - Females') {
			let str = Number(currentLine[14]);
			let num = isNaN(str) ? 0 : str
			Total_Female_literate = Total_Female_literate + num;
		}
		if (header[13] === 'Literate - Males') {
			let str = Number(currentLine[13]);
			let num = isNaN(str) ? 0 : str
			Total_Male_literate = Total_Male_literate + num;
		}
	});
	/*adding the result in to object*/
	result.push({
			'content': 'Female_illiterate ',
			'value': Total_Female_illiterate
		}, {
			'content': 'Male_illiterate ',
			'value': Total_Male_illiterate
		}, {
			'content': 'Female_literate ',
			'value': Total_Female_literate
		}, {
			'content': 'Male_literate ',
			'value': Total_Male_literate
		})
		/*writing the output in to a json*/
	fs.writeFile('output/Literacy_Ratio_India_json.json', JSON.stringify(result), (err) => {
		if (err) throw err;
	});
	console.log('Done');

	/*----------------------------------------part-2-2-------------------------------------*/
	let Total_Male_literate_NE = 0;
	let Total_Male_illiterate_NE = 0;
	let Total_Female_literate_NE = 0;
	let Total_Female_illiterate_NE = 0;
	line.map(function (currLine) {
		let currentLine = currLine.split(',');
		/*checking the header of the required column and calculating the total */
		if (header[11] === 'Illiterate - Females' && header[1] === 'State Code') {
			if (currentLine[1] === '11' || currentLine[1] === '12' || currentLine[1] === '13' || currentLine[1] === '14' || currentLine[1] === '15' || currentLine[1] === '16' || currentLine[1] === '17') {
				let str = Number(currentLine[11]);
				let num = isNaN(str) ? 0 : str
				Total_Female_illiterate_NE = Total_Female_illiterate_NE + num;
			}
		}

		if (header[10] === 'Illiterate - Males' && header[1] === 'State Code') {
			if (currentLine[1] === '11' || currentLine[1] === '12' || currentLine[1] === '13' || currentLine[1] === '14' || currentLine[1] === '15' || currentLine[1] === '16' || currentLine[1] === '17') {
				let str = Number(currentLine[10]);
				let num = isNaN(str) ? 0 : str
				Total_Male_illiterate_NE = Total_Male_illiterate_NE + num;
			}
		}
		if (header[14] === 'Literate - Females' && header[1] === 'State Code') {
			if (currentLine[1] === '11' || currentLine[1] === '12' || currentLine[1] === '13' || currentLine[1] === '14' || currentLine[1] === '15' || currentLine[1] === '16' || currentLine[1] === '17') {
				let str = Number(currentLine[14]);
				let num = isNaN(str) ? 0 : str
				Total_Female_literate_NE = Total_Female_literate_NE + num;
			}
		}
		if (header[13] === 'Literate - Males' && header[1] === 'State Code') {
			if (currentLine[1] === '11' || currentLine[1] === '12' || currentLine[1] === '13' || currentLine[1] === '14' || currentLine[1] === '15' || currentLine[1] === '16' || currentLine[1] === '17') {
				let str = Number(currentLine[13]);
				let num = isNaN(str) ? 0 : str
				Total_Male_literate_NE = Total_Male_literate_NE + num;
			}
		}
	});
	/*adding the result in to object*/
	result_north_east.push({
			'content': 'Female_illiterate',
			'value': Total_Female_illiterate_NE
		}, {
			'content': 'Male_illiterate',
			'value': Total_Male_illiterate_NE
		}, {
			'content': 'Female_literate',
			'value': Total_Female_literate_NE
		}, {
			'content': 'Male_literate',
			'value': Total_Male_literate_NE
		})
		/*writing the output in to a json*/
	fs.writeFile('output/Literacy_Ratio_NE_states_json.json', JSON.stringify(result_north_east), (err) => {
		if (err) throw err;
	});
	console.log('Done');

	/*-----------------------------------------part-2-3-----------------------------------*/
	line.map(function (currLine) {
		let currentLine = currLine.split(',');
		set1.add(currentLine[3]);
	});
	/*adding the area name in set to remove duplicates*/
	set1.delete('Area Name');
	for (stateName of set1) {
		let Total_literate_all_states = 0;
		let Total_illiterate_all_states = 0;
		let State_Name = null;
		line.map(function (currLine) {
			let currentLine = currLine.split(',');
			/*checking the header of the required column and calculating the total */
			if (header[3] === 'Area Name' && header[9] === 'Illiterate - Persons' && stateName === currentLine[3]) {
				State_Name = currentLine[3];
				let str = Number(currentLine[9]);
				let num = isNaN(str) ? 0 : str
				Total_illiterate_all_states += num;
			}
			if (header[3] === 'Area Name' && header[12] === 'Literate - Persons' && stateName === currentLine[3]) {
				var strslice = currentLine[3];
				State_Name = strslice.slice(8, strslice.length);
				let str = Number(currentLine[12]);
				let num = isNaN(str) ? 0 : str
				Total_literate_all_states += num;
			}
		});
		/*adding the result in to object*/
		result_all_states.push({
			State_Name: State_Name,
			Literate: Total_literate_all_states,
			Illiterate: Total_illiterate_all_states
		})
	}
	/*writing the output in to a json*/
	fs.writeFileSync('output/Literacy_All_states_json.json', JSON.stringify(result_all_states), (err) => {
		if (err) throw err;
	});
	console.log('Done');
});
console.log(set1);
module.exports = {
	a: result,
	b: result_north_east,
	c: result_all_states,
};