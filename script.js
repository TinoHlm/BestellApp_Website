let cart = [];
let isCartVisible = false;

function init() {
  getFromLocalStorage();
  render();
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getFromLocalStorage() {
  let storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart !== null) {
    cart = storedCart;
  }
}

function renderDialogs() {
  let orderDialogRef = document.getElementById("order-confirmation-dialog");

  if (orderDialogRef.innerHTML === "") {
    orderDialogRef.innerHTML = getOrderConfirmationDialogTemplate(dialogDatabase.orderConfirmation);
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

function getCartCount() {
  let count = 0;
  for (let cartItem of cart) {
    count += cartItem.quantity;
  }
  return count;
}

function updateCartBadge() {
  let badgeRef = document.getElementById("cart-badge");
  let count = getCartCount();
  badgeRef.textContent = count;
  badgeRef.classList.toggle("cart-badge-hidden", count === 0);
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
  updateCart();
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

function updateCart() {
  saveToLocalStorage();
  updateDishButtons();
  renderCart();
}

function updateDishButtons() {
  for (let category of menu.categories) {
    for (let item of category.items) {
      let button = document.getElementById(`add-btn-${item.id}`);
      button.textContent = getAddButtonText(item.id);
      button.classList.toggle("add-btn-added", getCartQuantityById(item.id) > 0);
    }
  }
}

function renderCart() {
  let cartRef = document.getElementById("cart");
  let cartContentRef = document.getElementById("cart-content");
  cartRef.classList.toggle("cart-visible", isCartVisible);
  document.body.classList.toggle("cart-open", isCartVisible);
  updateCartBadge();

  if (cart.length === 0) {
    cartContentRef.innerHTML = getCartEmptyTemplate();
    return;
  }

  cartContentRef.innerHTML = getCartItemsHTML() + getCartSummaryTemplate();
}

function getCartItemsHTML() {
  let itemsHTML = "";

  for (let cartItem of cart) {
    let dish = getDishById(cartItem.id);
    itemsHTML += getCartItemThemplate(cartItem, dish);
  }

  let scrollClass = cart.length > 3 ? "cart-items-scroll cart-items-scroll-active" : "cart-items-scroll";
  return `<div class="${scrollClass}">${itemsHTML}</div>`;
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
  } else {
    cart = cart.filter((item) => item.id !== id);
  }
  updateCart();
}

function deleteFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
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
  updateCart();

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
