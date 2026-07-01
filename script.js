let cart = [];
let isCartVisible = false;
let itemIdToRemove = null;

function renderDialogs() {
  let orderDialogRef = document.getElementById("order-confirmation-dialog");
  let removeDialogRef = document.getElementById("remove-confirmation-dialog");

  if (orderDialogRef.innerHTML === "") {
    orderDialogRef.innerHTML = getOrderConfirmationDialogTemplate(dialogDatabase.orderConfirmation);
  }
  if (removeDialogRef.innerHTML === "") {
    removeDialogRef.innerHTML = getRemoveConfirmationDialogTemplate(dialogDatabase.removeConfirmation);
  }
}
function render() {
  renderDialogs();
  let contentRef = document.getElementById("menu-content");
  contentRef.innerHTML = "";
  for (let category of menu.categories) {
    contentRef.innerHTML += getCategoryThemplate(
      category,
      getDishesHTML(category),
    );
  }
  renderCart();
}

function getDishesHTML(category) {
  let dishesHTML = "";
  for (let item of category.items) {
    dishesHTML += getDishThemplate(item);
  }
  return dishesHTML;
}

function getCartQuantityById(id) {
  let cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    return cartItem.quantity;
  }
  return 0;
}

function getAddButtonText(id) {
  let quantity = getCartQuantityById(id);

  if (quantity > 0) {
    return `Added ${quantity}`;
  }
  return "Add to basket";
}
function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

function addToCart(id) {
  let cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }
  isCartVisible = true;
  console.log(cart);
  render();
}

function getDishById(id) {
  for (let category of menu.categories) {
    for (let item of category.items) {
      if (item.id === id) {
        return item;
      }
    }
  }
}

function renderCart() {
  let cartHTML = "";
  let cartRef = document.getElementById("cart");
  cartRef.classList.toggle("cart-visible", isCartVisible);

  if (cart.length === 0) {
    cartHTML = `
    <div class="cart-empty">
      <div class="cart-empty-icon">&#128722;</div>
      <strong>Your basket is empty</strong>
      <span>Add something tasty from the menu.</span>
    </div>
    `;

    let cartContentRef = document.getElementById("cart-content");
    cartContentRef.innerHTML = cartHTML;
    return;
  }

  let cartItemsHTML = "";

  for (let cartItem of cart) {
    let dish = getDishById(cartItem.id);
    cartItemsHTML += getCartItemThemplate(cartItem, dish);
  }

  let scrollClass = cart.length > 3 ? "cart-items-scroll cart-items-scroll-active" : "cart-items-scroll";
  cartHTML += `<div class="${scrollClass}">${cartItemsHTML}</div>`;
  cartHTML += `
  <div class="cart-summary">
    <div class="cart-summary-row">
      <strong>Subtotal</strong>
      <span>${formatPrice(getCartSubTotal())}</span>
    </div>
    <div class="cart-summary-row">
      <strong>Delivery fee</strong>
      <span>${formatPrice(menu.deliveryFee)}</span>
    </div>
    <hr>
    <div class="cart-summary-row cart-summary-total">
      <strong>Total</strong>
      <span>${formatPrice(getCartTotal())}</span>
    </div>
  </div>

  <button class="cart-buy-button" onclick="showOrderConfirmation()">
  Buy now (${formatPrice(getCartTotal())})
</button>
`;

  let cartContentRef = document.getElementById("cart-content");
  cartContentRef.innerHTML = cartHTML;
}

function getCartItemThemplate(cartItem, dish) {
  let label = `<span>${cartItem.quantity} x ${dish.name}</span>`;
  let price = `<strong>${formatPrice(cartItem.quantity * dish.price)}</strong>`;

  if (cartItem.quantity === 1) {
    return `
    <div class="cart-item">
      <div class="cart-item-top">
        ${label}
      </div>
      <div class="cart-item-bottom">
        <div class="cart-item-controls">
          <button class="cart-item-delete" onclick="removeFromCart(${cartItem.id})">
            <img src="./assets/icons/delete.png" alt="Remove item">
          </button>
          <span>${cartItem.quantity}</span>
          <button class="cart-item-plus" onclick="addToCart(${cartItem.id})">+</button>
        </div>
        ${price}
      </div>
    </div>
    `;
  }

  return `
    <div class="cart-item">
      <div class="cart-item-top">
        ${label}
        <button class="cart-item-delete-corner" onclick="showRemoveConfirmation(${cartItem.id})">
          <img src="./assets/icons/delete.png" alt="Remove item">
        </button>
      </div>
      <div class="cart-item-bottom">
        <div class="cart-item-controls">
          <button class="cart-item-minus" onclick="removeFromCart(${cartItem.id})">&minus;</button>
          <span>${cartItem.quantity}</span>
          <button class="cart-item-plus" onclick="addToCart(${cartItem.id})">+</button>
        </div>
        ${price}
      </div>
    </div>
  `;
}
function getCartSubTotal() {
  let subTotalCartValue = 0;

  for (let cartItem of cart) {
    let dish = getDishById(cartItem.id);
    subTotalCartValue += cartItem.quantity * dish.price;
  }
  return subTotalCartValue;
}

function getCartTotal() {
  return getCartSubTotal() + menu.deliveryFee;
}

function removeFromCart(id) {
  let cartItem = cart.find((item) => item.id === id);

  if (cartItem.quantity > 1) {
    cartItem.quantity--;
    render();
  } else {
    showRemoveConfirmation(id);
  }
}

function showRemoveConfirmation(id) {
  itemIdToRemove = id;
  let dialogRef = document.getElementById("remove-confirmation-dialog");
  document.body.classList.add("dialog-open");
  dialogRef.showModal();
}

function closeRemoveConfirmation() {
  let dialogRef = document.getElementById("remove-confirmation-dialog");
  document.body.classList.remove("dialog-open");
  itemIdToRemove = null;

  if (!dialogRef.open) {
    return;
  }
  dialogRef.close();
}

function confirmRemoveFromCart() {
  cart = cart.filter((item) => item.id !== itemIdToRemove);
  closeRemoveConfirmation();
  render();
}
function showCart() {
  isCartVisible = true;
  renderCart();
}

function hideCart() {
  isCartVisible = false;
  renderCart();
}

function showOrderConfirmation() {
  let dialogRef = document.getElementById("order-confirmation-dialog");
  document.body.classList.add("dialog-open");

  dialogRef.showModal();
  dialogRef.classList.add("opened");
  cart = [];
  isCartVisible = false;
  render();

  setTimeout(function () {
    closeOrderConfirmation();
  }, 3000);
}

function closeOrderConfirmation() {
  let dialogRef = document.getElementById("order-confirmation-dialog");
  document.body.classList.remove("dialog-open");

  if (!dialogRef.open) {
    return;
  }

  dialogRef.classList.remove("opened");
  dialogRef.close();
}
