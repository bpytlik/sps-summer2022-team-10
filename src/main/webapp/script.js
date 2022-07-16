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

function getToken() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.kroger.com/v1/connect/oauth2/token",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic aW5mbGF0aW9uZ3JvY2VyeWFwcC1kZWM4YTdmZjczZTlhZDRhYWI2ZmE3MGZhZGYyNzdlMTI5Njk1MTgwMzM3MDIzNTE2NjM6OEgyWXdZbjhJRFRLbEs0VFBXZEVEUnpWMjRLd1lZdi1sN0RFRzYxSA=="
      },
      "data": {
        "grant_type": "client_credentials",
        "scope": "{{scope}}"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  async function getProduct(itemName, locationId) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.kroger.com/v1/products?filter.term="+itemName+"&filter.locationId="+ locationId,
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbmZsYXRpb25ncm9jZXJ5YXBwLWRlYzhhN2ZmNzNlOWFkNGFhYjZmYTcwZmFkZjI3N2UxMjk2OTUxODAzMzcwMjM1MTY2MyIsImV4cCI6MTY1NzkwMjc1MCwiaWF0IjoxNjU3OTAwOTQ1LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6IjgyMzRjZDI1LTYzODktNTBiYi1iNWVlLWFlOTZkYjg0ZjI4MCIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjU3OTAwOTUwNjE5OTUyODU0LCJhenAiOiJpbmZsYXRpb25ncm9jZXJ5YXBwLWRlYzhhN2ZmNzNlOWFkNGFhYjZmYTcwZmFkZjI3N2UxMjk2OTUxODAzMzcwMjM1MTY2MyJ9.IA7oxhe7M9bM2wDRG1nSpmVbL7Y8RjckvuP-ceLbkrTGFmWKBdSb9VyvNpMEp6hyShS7WmXcX5PhyAD2nfaVLQAn362LNtjHqlAW8PulrF9jmkM9M7ImLdKauRIyhU65Tak7bw4KqI5fdE8QJzzW4_8rJq6pRPPMyTrAFpQ5390k_BpT4W1WCfzJjUBOlXT3UxWVAv8_4vwPFe8pxtLma25BiHkzkqMK8NDFZnRx9P2turaSPsG-UOQQyeq_hLp1-Bv51Essy1cRuSSSXlOvTJr7YniynXA3k14-s8Wb3LTC0rC05vPuqxjzYKRv8PxF2JN7HKcNn6WYQCRyn0W7Yw"
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