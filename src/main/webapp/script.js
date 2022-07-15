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

var itemList = [];
var stores = ["California", "Oregon", "Washington"];  // hard-coded for now

async function addToCart(){
    var list = document.getElementById('shopping-cart');
    var itemName = document.getElementById("item-name").value;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(itemName));
    list.appendChild(entry);
    const responseFromServer = await fetch(`/item-lookup?item_name=${encodeURIComponent(itemName)}`, {
        method: 'POST'});
    const newItemObject = await responseFromServer.json();
    console.log(newItemObject);
    itemList.push(newItemObject);
    console.log(itemList);
}

async function calculate() {
    // Calculate totals here ...

    // it can just use the global itemList array. 
    const totals = [];  // change this with real totals

    // You can loop over itemList and keep track of & add up the totals in each store.
    var price1 = 0;
    var price2 = 0;
    var price3 = 0;

    for (let i = 0; i < itemList.length; i++) {
        // get price
        const dataArr = Object.values(itemList[i])[0];
        
        console.log(dataArr);
        price1 += dataArr[0].price;
        console.log(price1);
        price2 += dataArr[1].price;
        price3 += dataArr[2].price;

    }

    totals.push(price1);
    totals.push(price2);
    totals.push(price3);

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

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}