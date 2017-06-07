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
let fs = require('fs');
let arOfObj = [];
let set1 = new Set();
let result = [];
let result_north_east = [];
let result_all_states = [];
/*reading the svg file*/
fs.readFile('data/India2011.csv', 'utf8', function(err, content) {
    let line = content.split('\n');
    line.pop();
    let header = line[0].split(',');
    /*split the header part alone*/
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
    /*----------------------Part-2-------------------*/
    /*calculating literacy rate by clubing all states in India*/
    let Total_Male_literate = 0;
    let Total_Male_illiterate = 0;
    let Total_Female_literate = 0;
    let Total_Female_illiterate = 0;
    let header_set = new Set();
    /*added header into set*/
    for (let i in header) {
        header_set.add(header[i]);
    }
    line.map(function(currLine) {
        let currentLine = currLine.split(',');
        /*checking the header of the literate and illiterate and calculating the total */
        function literacy_rate(headers) {
            let i = 0;
            for (heading of header_set) {
                if (heading === headers) {
                    let str = Number(currentLine[i]);
                    let num = isNaN(str) ? 0 : str
                    return num;
                }
                i++;
            }
        }
        Total_Female_illiterate = Total_Female_illiterate + literacy_rate('Illiterate - Females');
        Total_Male_illiterate = Total_Male_illiterate + literacy_rate('Illiterate - Males');
        Total_Female_literate = Total_Female_literate + literacy_rate('Literate - Females');
        Total_Male_literate = Total_Male_literate + literacy_rate('Literate - Males');
    });
    /*adding the result in to object*/
    result.push({
        'key': 'Female_illiterate ',
        'value': Total_Female_illiterate
    }, {
        'key': 'Male_illiterate ',
        'value': Total_Male_illiterate
    }, {
        'key': 'Female_literate ',
        'value': Total_Female_literate
    }, {
        'key': 'Male_literate ',
        'value': Total_Male_literate
    })
    
    /*writing the output in to a json file*/
    fs.writeFile('output/ageWiseLiterateDistribution.json', JSON.stringify(result), (err) => {
        if (err) throw err;
    });



    /*---------------part-2-2-------------*/
    /*calculating literacy rate by clubing 7 North Eastern states in India*/
    let Total_Male_literate_NE = 0;
    let Total_Male_illiterate_NE = 0;
    let Total_Female_literate_NE = 0;
    let Total_Female_illiterate_NE = 0;
    line.map(function(currLine) {
        let currentLine = currLine.split(',');
        /*checking the header of the required column and calculating the total */
        function literacy_rate_NE(headers) {
            let j = 0;
            for (heading of header_set) {
                if (heading === headers) {
                    if (currentLine[1] === '11' || currentLine[1] === '12' || currentLine[1] === '13' || currentLine[1] === '14' || currentLine[1] === '15' || currentLine[1] === '16' || currentLine[1] === '17') {
                        let str = Number(currentLine[j]);
                        let num = isNaN(str) ? 0 : str
                        return num;
                    }
                }
                j++;
            }
        }
        let str2 = literacy_rate_NE('Illiterate - Females');
        let str3 = literacy_rate_NE('Illiterate - Males');
        let str4 = literacy_rate_NE('Literate - Females');
        let str5 = literacy_rate_NE('Literate - Males');
        let out = isNaN(str2) ? 0 : str2
        let out1 = isNaN(str3) ? 0 : str3
        let out2 = isNaN(str4) ? 0 : str4
        let out3 = isNaN(str5) ? 0 : str5
        Total_Female_illiterate_NE = Total_Female_illiterate_NE + out;
        Total_Male_illiterate_NE = Total_Male_illiterate_NE + out1;
        Total_Female_literate_NE = Total_Female_literate_NE + out2;
        Total_Male_literate_NE = Total_Male_literate_NE + out3;
    });
    /*adding the result in to object*/
    result_north_east.push({
        'key': 'Female_illiterate',
        'value': Total_Female_illiterate_NE
    }, {
        'key': 'Male_illiterate',
        'value': Total_Male_illiterate_NE
    }, {
        'key': 'Female_literate',
        'value': Total_Female_literate_NE
    }, {
        'key': 'Male_literate',
        'value': Total_Male_literate_NE
    })
    /*writing the output in to a json*/
    fs.writeFile('output/eduCategWise.json', JSON.stringify(result_north_east), (err) => {
        if (err) throw err;
    });



    /*-------------------------part-2-3--------------------*/
    /*calculating literacy rate by statewise in India*/
    line.map(function(currLine) {
        let currentLine = currLine.split(',');
        set1.add(currentLine[3]);
    });
    /*adding the area name in set to remove duplicate area names*/
    set1.delete('Area Name');
    for (stateName of set1) {
        let Total_literate_all_states = 0;
        let Total_illiterate_all_states = 0;
        let State_Name = null;
        line.map(function(currLine) {
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
    fs.writeFileSync('output/gradPopStateAndGradeWise.json', JSON.stringify(result_all_states), (err) => {
        if (err) throw err;
    });
});
module.exports = {
    all_states: result,
    NE_states: result_north_east,
    Statewise: result_all_states,
};