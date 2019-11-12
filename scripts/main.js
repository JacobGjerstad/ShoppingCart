window.onload = function () {
    initBuyButtons();
};
/**
 * Wire up all the "Buy" buttons
 */
function initBuyButtons() {
    var buyBtns = document.querySelectorAll("div.buy");
    for (var i = 0; i < buyBtns.length; i++) {
        var currBtn = buyBtns[i];
        currBtn.onclick = buyProduct;
    }
}
function buyProduct() {
    var currBuyBtn = this;
    console.log("The buy button that was clicked");
    console.log(currBuyBtn);
    var currProdDiv = currBuyBtn.parentElement;
    console.log("The parent product div");
    console.log(currProdDiv);
    var prod = new Product();
    prod.title = currProdDiv.querySelector("div.title").innerHTML;
    prod.price = parseFloat((currProdDiv.querySelector("div.price").innerHTML).replace("$", ""));
    //let price = currProdDiv.querySelector("div.price").innerHTML;
    //price = price.replace("$", "");
    //prod.price = parseFloat(price);
    prod.description = currProdDiv.querySelector("div.description").innerHTML;
    console.log(prod);
}
/**
 * Represents a single shopping cart item
 */
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
// Test Code
/*
let prod = new Product();
prod.title = "something";
prod.description = "something else";
prod.price = 4.99;
*/ 
