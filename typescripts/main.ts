window.onload = function(){
    initBuyButtons();
    displayNumberOfItems();

    let cartIcon = <HTMLElement>document.querySelector("#shopping-cart");
    cartIcon.onclick = showCartContents;
}

function showCartContents(){
    let displayDiv = document.querySelector("#display-cart");
    displayDiv.innerHTML = "";

    let allProds = ProductStorage.getAllProducts();

    for(let i = 0; i < allProds.length; i++){
        const prod = allProds[i];

        /*
            <div class="display-product">
                <h2>Widget - $80.00</h2>
                <p>Widgets are really cool...</p>
            <div>
        */

        let prodDiv = document.createElement("div");
        prodDiv.classList.add("display-product");
        let h2 = document.createElement("h2");
        h2.innerHTML = prod.title + " - $" + prod.price;
        prodDiv.appendChild(h2);
        displayDiv.appendChild(prodDiv);
    }
}

/**
 * Wire up all the "Buy" buttons
 */
function initBuyButtons() {
    let buyBtns = document.querySelectorAll("div.buy");
    for (let i = 0; i < buyBtns.length; i++) {
        let currBtn = <HTMLElement>buyBtns[i];
        currBtn.onclick = buyProduct;
    }
}

function buyProduct(){
    let currBtn = this; // The "Buy" button that was clicked
    let prod = getProduct(currBtn);

    saveProductToCart(prod);

    displayNumberOfItems();
}

function displayNumberOfItems(){
    let numItems = ProductStorage.getNumberOfProducts();
    let cartSpan = document.querySelector("div#shopping-cart > span");
    cartSpan.innerHTML = numItems.toString();
}

/**
 * Get the Product object for the currently selected product.
 */
function getProduct(currBuyBtn:HTMLElement) {
    console.log("The buy button that was clicked");
    console.log(currBuyBtn);

    let currProdDiv = currBuyBtn.parentElement;
    console.log("The parent product div");
    console.log(currProdDiv);

    let prod = new Product();

    prod.title = currProdDiv.querySelector("div.title").innerHTML;

    prod.price = parseFloat((currProdDiv.querySelector("div.price").innerHTML).replace("$", ""));
    //let price = currProdDiv.querySelector("div.price").innerHTML;
    //price = price.replace("$", "");
    //prod.price = parseFloat(price);

    prod.description = currProdDiv.querySelector("div.description").innerHTML;

    console.log(prod);

    return prod;
}

function saveProductToCart(p:Product):Product[]{
    ProductStorage.addProduct(p);
    return ProductStorage.getAllProducts();
}