window.onload = function(){
    initBuyButtons();
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
    let prod = getProduct();

    saveProductToCart(prod);
}

/**
 * Get the Product object for the currently selected product.
 */
function getProduct() {
    let currBuyBtn = <HTMLElement>this;
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
    
}