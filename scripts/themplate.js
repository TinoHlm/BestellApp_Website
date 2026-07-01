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
    <h2>${category.name}</h2>
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
    </div>
  `;
}

function getRemoveConfirmationDialogTemplate(dialog) {
  return `
    <div class="remove-dialog-content" onclick="event.stopPropagation()" tabindex="-1">
      <h2>${dialog.title}</h2>
      <p>${dialog.text}</p>
      <div class="remove-dialog-actions">
        <button class="remove-dialog-cancel" onclick="${dialog.closeFunction}">${dialog.cancelButton}</button>
        <button class="remove-dialog-confirm" onclick="${dialog.confirmFunction}">${dialog.confirmButton}</button>
      </div>
    </div>
  `;
}