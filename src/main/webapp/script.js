// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// fetch Irene JSON string from server

async function calculate() {

    // // Send a request to correct-url
    // const responseFromServer = await fetch('/form-handler');

    // // Parse the response as JSON.
    // const myObject = await responseFromServer.json();

    // Or hardcoded option, variable for json
    var json = {
        "milk":[
            {
                "item":"milk",
                "price":5.50,
                "store":"california"
            },
            {
                "item":"milk",
                "price":6.30,
                "store":"oregon"
            },
            {
                "item":"milk",
                "price":3.50,
                "store":"washington"
            }
        ]
    }

    // Converting JSON-encoded string to JS object
    var obj = JSON.parse(JSON.stringify(json));

    // Define recursive function to print nested values

    function printValues(obj) {
        for(var k in obj) {
            if(obj[k] instanceof Object) {
                const array = [];
                printValues(obj[k]);
                array.push(obj[k]);
                console.log(array);
            } else {
                document.write(obj[k] + "<br>");
            };
        }
    };

    // Printing all the values from the resulting object
    printValues(obj);

    document.write("<hr>");

    // Calculate totals here ...

}

async function loadTable() {
    // const responseFromServer = await fetch('/data-processing');
    // const data = await responseFromServer.json();

    // hardcoded for now
    const response = '{"stores": ["A", "B", "C"], "items": ["milk", "egg", "apple"], "prices": [[1, 2, 3], [4, 5, 6], [7, 8, 9]], "totals": [12, 15, 18]}';
    const data = JSON.parse(response);

    const dataTable = document.getElementById('data-table');

    for (let r = 0; r < data.items.length + 2; r++) {
        var rowElement = document.createElement('tr');
        for (let c = 0; c < data.stores.length + 1; c++) {
            if (c == 0 && r == 0) {
                const cell = document.createElement('th');
                cell.appendChild(document.createTextNode("Item"));
                rowElement.appendChild(cell);
            }
            else if (c == 0 && r == data.items.length + 1) {
                const cell = document.createElement('th');
                cell.appendChild(document.createTextNode("Total"));
                rowElement.appendChild(cell);
            }
            // handle store names
            else if (r == 0) {
                const cell = document.createElement('th');
                cell.appendChild(document.createTextNode(data.stores[c-1]));
                rowElement.appendChild(cell);
            }
            // handle item names
            else if (c == 0) {
                const cell = document.createElement('th');
                cell.appendChild(document.createTextNode(data.items[r-1]));
                rowElement.appendChild(cell);
            }
            // handle totals
            else if (r == data.items.length + 1) {
                const cell = document.createElement('th');
                cell.appendChild(document.createTextNode(data.totals[c-1]));
                rowElement.appendChild(cell);
            }
            // handle individual prices
            else {
                const cell = document.createElement('td');
                cell.appendChild(document.createTextNode(data.prices[r-1][c-1]));
                rowElement.appendChild(cell);
            }
        }
        dataTable.appendChild(rowElement);
    }
}