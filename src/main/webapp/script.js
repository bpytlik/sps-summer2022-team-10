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

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
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
