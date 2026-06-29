function render(){
    let contentRef = document.getElementById("menu-content");
    contentRef.innerHTML = "";
    for (let category of menu.categories){
        contentRef.innerHTML += getCategoryThemplate(category, getDishesHTML(category));
    }
}

function getDishesHTML(category) {
    let dishesHTML = "";
    for (let item of category.items) {
        dishesHTML += getDishThemplate(item);
    }
    return dishesHTML;
}

function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}