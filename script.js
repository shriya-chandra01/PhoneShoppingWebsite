const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.querySelector(".cart-items");
const totalElement = document.getElementById("total");
let total = 0;
const cartItems = {};

function updateCart() {
  cartItemsList.innerHTML = "";
  total = 0;

  Object.keys(cartItems).forEach((item) => {
    const { name, price, quantity } = cartItems[item];
    const itemTotal = price * quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `${name} - $${price} x ${quantity} = $${itemTotal}`;
    cartItemsList.appendChild(li);
  });

  totalElement.textContent = total;
}

function addItemToCart(name, price) {
  if (cartItems[name]) {
    cartItems[name].quantity += 1;
  } else {
    cartItems[name] = {
      name: name,
      price: price,
      quantity: 1
    };
  }

  updateCart();
}

function removeItemFromCart(name) {
  if (cartItems[name]) {
    cartItems[name].quantity -= 1;
    if (cartItems[name].quantity === 0) {
      delete cartItems[name];
    }
  }

  updateCart();
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-name");
    const productPrice = parseInt(button.getAttribute("data-price"));

    addItemToCart(productName, productPrice);
  });
});

cartItemsList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const itemName = event.target.textContent.split(" - ")[0];
    removeItemFromCart(itemName);
  }
});