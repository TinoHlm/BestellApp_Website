// HTML templates for the menu
function getDishThemplate(item) {
  return `
    <div class="dish">
      <img class="dish-img" src="${item.image}" alt="${item.name}">
      <div class="dish-info">
        <div class="dish-top">
          <h3>${item.name}</h3>
          <span class="dish-price">${formatPrice(item.price)}</span>
        </div>
        <p>${item.description}</p>
        <button class="add-btn" onclick="addToCart(${item.id})">Add to basket</button>
      </div>
    </div>
  `;
}

function getCategoryThemplate(category, dishesHtml) {
  return `
    <div class="category" id="${category.id}">
<div class="menu-header">
  <div class="menu-header-content">
    <img src="./assets/imgs/${category.id}.png" alt="${category.name}">
    <h2>${category.name}</h2>
  </div>
</div>
      <div class="dishes">${dishesHtml}</div>
    </div>
    `;
}