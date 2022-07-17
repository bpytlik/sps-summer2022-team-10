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
var stores = ["QFC", "FRYS", "FOODSCO"];  
var products="";
// var cheapProductArray=[];
var allCheapProductArray=[];
var accessToken = "";

async function addToCart(){
    var list = document.getElementById('shopping-cart');
    var cheapProductFirstStore={};
    var cheapProductSecondStore={};
    var cheapProductThirdStor={};
    var newCheapProductArray=[];
    var itemName = document.getElementById("item-name").value;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(itemName));
    list.appendChild(entry);
    cheapProductFirstStore = await getCheapProductOneStore(itemName,"70500828")
    cheapProductSecondStore= await getCheapProductOneStore(itemName,"66000103")
    cheapProductThirdStore= await getCheapProductOneStore(itemName,"70400352")
    newCheapProductArray.push(cheapProductFirstStore);
    newCheapProductArray.push(cheapProductSecondStore);
    newCheapProductArray.push(cheapProductThirdStore);
    console.log("newCheapProductArray");
    console.log(newCheapProductArray);
    allCheapProductArray.push(newCheapProductArray);
    console.log("allCheapProductArray");
    console.log(allCheapProductArray);

    
    // console.log(cheapProductArray);
    // const responseFromServer = await fetch(`/item-lookup?item_name=${encodeURIComponent(itemName)}`, {
    //     method: 'POST'});
    // const newItemObject = await responseFromServer.json();
    // console.log(newItemObject);
    // itemList.push(newItemObject);
    // console.log(itemList);
}

async function calculate() {
    const totals = [];

    var total1 = 0;
    var total2 = 0;
    var total3 = 0;

    for (let i = 0; i < allCheapProductArray.length; i++) {
        // get price
        const dataArr = allCheapProductArray[i];
        console.log(dataArr);
        total1 += dataArr[0].itemPrice;
        total2 += dataArr[1].itemPrice;
        total3 += dataArr[2].itemPrice;

    }

    totals.push(total1);
    totals.push(total2);
    totals.push(total3);

    loadTable(totals);
}

async function loadTable(totals) {
    const compTable = document.getElementById('comparison-table');

    compTable.innerHTML = "";

    // adding the first row which shows store names
    const rowStores = document.createElement('tr');
    for (let i = 0; i < stores.length; i++) {
        const cell = document.createElement('th');
        cell.appendChild(document.createTextNode(stores[i]));
        rowStores.appendChild(cell);
    }
    compTable.appendChild(rowStores);

    // add following rows to show item and price in each store
    for (let i = 0; i < allCheapProductArray.length; i++) {
        const rowItem = document.createElement('tr');
        // get info of one shopping item in all stores
        const dataArr = allCheapProductArray[i];
        for (let j = 0; j < dataArr.length; j++) {
            const cell = document.createElement('td');

            const picture = document.createElement('img');
            picture.src = dataArr[j].itemImage;
            picture.className = "item-image";

            const description = document.createElement('div');
            description.appendChild(document.createTextNode(dataArr[j].itemDescription));
            description.className = "item-description";
            const sizePrice = document.createElement('div');
            sizePrice.appendChild(document.createTextNode(dataArr[j].itemSize + ", $" + dataArr[j].itemPrice));
            sizePrice.className = "item-size-price";

            cell.appendChild(picture);
            cell.appendChild(description);
            cell.appendChild(sizePrice);

            rowItem.appendChild(cell);
        }
        compTable.appendChild(rowItem);
    }

    // add the last row to show total prices in each store
    const rowTotals = document.createElement('tr');
    for (let i = 0; i < totals.length; i++) {
        const cell = document.createElement('td');
        cell.className = "total";
        const currTot = Math.round((totals[i] + Number.EPSILON) * 100) / 100;
        cell.appendChild(document.createTextNode("Total: $" + currTot));
        rowTotals.appendChild(cell);
    }
    compTable.appendChild(rowTotals);
}

async function getToken() {
    const responseFromServer = await fetch('/token');
    const jsonObj = await responseFromServer.json();
    accessToken = jsonObj.access_token;
}

  async function getProduct(itemName, locationId) {
    await getToken();
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.kroger.com/v1/products?filter.term="+itemName+"&filter.locationId="+ locationId,
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }

    await $.ajax(settings).done(function (response) {
      console.log(response);
       products =  response;
      // console.log(products[0]);
    });
    
  }

  async function getCheapProductOneStore(itemName, locationId){    
    await getProduct(itemName, locationId);

    console.log("products");
    console.log(products);

    var productsDictArray=[];
    var priceDictArray=[];
      
      for (let i = 0; i < products.data.length; i++) {
          if (products.data[i].items[0].size == "1/2 gal"||products.data[i].items[0].size == "1 lb"||products.data[i].items[0].size == "12 ct"){
        var productDict = {
          location:locationId,
          itemDescription: products.data[i].description,
          itemPrice: products.data[i].items[0].price.regular,
          itemSize: products.data[i].items[0].size,
          itemImage: products.data[i].images[0].sizes[0].url
        }
        productsDictArray.push(productDict);
        console.log("productDict");
        console.log(productDict);
      }
    }
    for (let i = 0; i < productsDictArray.length; i++){
        priceDictArray.push(productsDictArray[i].itemPrice);
    }
    var min = Math.min(...priceDictArray);

    var index = priceDictArray.indexOf(min);

    //   console.log("productsDictArray[index]");
    //   console.log(productsDictArray[index]);
      return productsDictArray[index]
  }