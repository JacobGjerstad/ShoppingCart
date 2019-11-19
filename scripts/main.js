window.onload = function () {
    initBuyButtons();
    displayNumberOfItems();
    var cartIcon = document.querySelector("#shopping-cart");
    cartIcon.onclick = showCartContents;
};
function showCartContents() {
    var displayDiv = document.querySelector("#display-cart");
    displayDiv.innerHTML = "";
    var allProds = ProductStorage.getAllProducts();
    for (var i = 0; i < allProds.length; i++) {
        var prod = allProds[i];
        /*
            <div class="display-product">
                <h2>Widget - $80.00</h2>
                <p>Widgets are really cool...</p>
            <div>
        */
        var prodDiv = document.createElement("div");
        prodDiv.classList.add("display-product");
        var h2 = document.createElement("h2");
        h2.innerHTML = prod.title + " - $" + prod.price;
        prodDiv.appendChild(h2);
        displayDiv.appendChild(prodDiv);
    }
}
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
    var currBtn = this; // The "Buy" button that was clicked
    var prod = getProduct(currBtn);
    saveProductToCart(prod);
    displayNumberOfItems();
}
function displayNumberOfItems() {
    var numItems = ProductStorage.getNumberOfProducts();
    var cartSpan = document.querySelector("div#shopping-cart > span");
    cartSpan.innerHTML = numItems.toString();
}
/**
 * Get the Product object for the currently selected product.
 */
function getProduct(currBuyBtn) {
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
    return prod;
}
function saveProductToCart(p) {
    ProductStorage.addProduct(p);
    return ProductStorage.getAllProducts();
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
var ProductStorage = /** @class */ (function () {
    function ProductStorage() {
    }
    ProductStorage.addProduct = function (p) {
        var prods = ProductStorage.getAllProducts();
        prods.push(p);
        var data = JSON.stringify(prods);
        localStorage.setItem("prods", data);
    };
    /**
     * Returns all products or an empty
     * array if no products are stored
     */
    ProductStorage.getAllProducts = function () {
        var data = localStorage.getItem("prods");
        if (data == null) {
            return new Array();
        }
        return JSON.parse(data);
    };
    ProductStorage.getNumberOfProducts = function () {
        var prods = ProductStorage.getAllProducts();
        return prods.length;
    };
    return ProductStorage;
}());
