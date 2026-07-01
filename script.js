const cart = [];

function render() {
  let contentRef = document.getElementById("menu-content");
  contentRef.innerHTML = "";
  for (let category of menu.categories) {
    contentRef.innerHTML += getCategoryThemplate(
      category,
      getDishesHTML(category),
    );
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
  console.log(cart);
  renderCart();
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

  for (let cartItem of cart) {
    let dish = getDishById(cartItem.id);
    cartHTML += getCartItemThemplate(cartItem, dish);
  }
  cartHTML += `
  <div>
    <strong>Subtotal</strong>
    <span>${formatPrice(getCartSubTotal())}</span>
  </div>
  <div>
    <strong>Delivery:</strong>
    <span>${formatPrice(menu.deliveryFee)}</span>
  </div>
  <div>
    <strong>Total</strong>
    <span>${formatPrice(getCartTotal())}</span>
  </div>
`;

  let cartContentRef = document.getElementById("cart-content");
  cartContentRef.innerHTML = cartHTML;
}

function getCartItemThemplate(cartItem, dish) {
  return `
    <div>
      <span>${cartItem.quantity}x</span>
      <span>${dish.name}</span>
      <span>${formatPrice(cartItem.quantity * dish.price)}</span>
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
