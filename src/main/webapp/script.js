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


var itemList = [];
var stores = ["california", "oregon", "washington"];  // hard-coded for now

async function addToCart(){
    const itemName = document.getElementById("item-name").value;
    const responseFromServer = await fetch(`/item-lookup?item_name=${encodeURIComponent(itemName)}`, {
        method: 'POST'});
    const newItemObject = await responseFromServer.json();
    console.log(newItemObject);
    itemList.push(newItemObject);
    console.log(itemList);
}

async function calculate() {
    // Calculate totals here ...
    const totals = [0, 0, 0];  // change this with real totals
    loadTable(totals);
}

async function loadTable(totals) {
    const compTable = document.getElementById('comparison-table');

    // adding the first row which shows store names
    const rowStores = document.createElement('tr');
    for (let i = 0; i < stores.length; i++) {
        const cell = document.createElement('th');
        cell.appendChild(document.createTextNode(stores[i]));
        rowStores.appendChild(cell);
    }
    compTable.appendChild(rowStores);

    // add following rows to show item and price in each store
    for (let i = 0; i < itemList.length; i++) {
        const rowItem = document.createElement('tr');
        // get info of one shopping item in all stores
        const dataArr = Object.values(itemList[i])[0];
        for (let j = 0; j < dataArr.length; j++) {
            const cell = document.createElement('td');
            cell.appendChild(document.createTextNode(dataArr[j].item + " $" + dataArr[j].price));
            rowItem.appendChild(cell);
        }
        compTable.appendChild(rowItem);
    }

    // add the last row to show total prices in each store
    const rowTotals = document.createElement('tr');
    for (let i = 0; i < totals.length; i++) {
        const cell = document.createElement('th');
        cell.appendChild(document.createTextNode("Total: $" + totals[i]));
        rowTotals.appendChild(cell);
    }
    compTable.appendChild(rowTotals);
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