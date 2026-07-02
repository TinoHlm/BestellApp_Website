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
        <button class="add-btn ${getCartQuantityById(item.id) > 0 ? "add-btn-added" : ""}" onclick="addToCart(${item.id})">${getAddButtonText(item.id)}</button>
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
    <h2><span class="cat-full">${category.name}</span><span class="cat-short">${category.shortName}</span></h2>
  </div>
</div>
      <div class="dishes">${dishesHtml}</div>
    </div>
    `;
}

function getOrderConfirmationDialogTemplate(dialog) {
  return `
    <div class="order-dialog-content" onclick="event.stopPropagation()" tabindex="-1">
      <button class="order-dialog-close" onclick="${dialog.closeFunction}">&times;</button>
      <img class="order-dialog-icon" src="${dialog.icon}" alt="${dialog.iconAlt}">
      <h2>${dialog.title}</h2>
      <p>${dialog.text}</p>
      <div class="order-dialog-progress"><span></span></div>
    </div>
  `;
}

function getCartItemThemplate(cartItem, dish) {
  if (cartItem.quantity === 1) {
    return getCartItemSingleTemplate(cartItem, dish);
  }
  return getCartItemMultiTemplate(cartItem, dish);
}

function getCartItemSingleTemplate(cartItem, dish) {
  return `
    <div class="cart-item">
      <div class="cart-item-top"><span>${cartItem.quantity} x ${dish.name}</span></div>
      <div class="cart-item-bottom">
        <div class="cart-item-controls">
          <button class="cart-item-delete" onclick="removeFromCart(${cartItem.id})"><img src="./assets/icons/delete.png" alt="Remove item"></button>
          <span>${cartItem.quantity}</span>
          <button class="cart-item-plus" onclick="addToCart(${cartItem.id})">+</button>
        </div>
        <strong>${formatPrice(cartItem.quantity * dish.price)}</strong>
      </div>
    </div>
  `;
}

function getCartItemMultiTemplate(cartItem, dish) {
  return `
    <div class="cart-item">
      <div class="cart-item-top"><span>${cartItem.quantity} x ${dish.name}</span><button class="cart-item-delete-corner" onclick="deleteFromCart(${cartItem.id})"><img src="./assets/icons/delete.png" alt="Remove item"></button></div>
      <div class="cart-item-bottom">
        <div class="cart-item-controls">
          <button class="cart-item-minus" onclick="removeFromCart(${cartItem.id})">&minus;</button>
          <span>${cartItem.quantity}</span>
          <button class="cart-item-plus" onclick="addToCart(${cartItem.id})">+</button>
        </div>
        <strong>${formatPrice(cartItem.quantity * dish.price)}</strong>
      </div>
    </div>
  `;
}

function getCartEmptyTemplate() {
  return `
    <div class="cart-empty">
      <strong>Nothing here yet.</strong>
      <span>Go ahead and choose something delicious!</span>
      <img class="cart-empty-icon" src="./assets/imgs/shopping_cart.png" alt="Empty basket">
    </div>
  `;
}

function getCartSummaryTemplate() {
  return `
  <div class="cart-summary">
    <div class="cart-summary-row"><strong>Subtotal</strong><span>${formatPrice(getCartSubTotal())}</span></div>
    <div class="cart-summary-row"><strong>Delivery fee</strong><span>${formatPrice(menu.deliveryFee)}</span></div>
    <hr>
    <div class="cart-summary-row cart-summary-total"><strong>Total</strong><span>${formatPrice(getCartTotal())}</span></div>
  </div>
  <button class="cart-buy-button" onclick="showOrderConfirmation()">Buy now (${formatPrice(getCartTotal())})</button>
`;
}