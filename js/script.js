/* =========================================================
   MOBILE MENU
========================================================= */

const menu = document.querySelector(".nav-menu");
const menuBtn = document.querySelector(".menu-toggle");
if (menuBtn && menu) {menuBtn.onclick = function () {menu.classList.toggle("active");};}

/* =========================================================
   HOME SLIDESHOW
========================================================= */

if (document.querySelector(".featured-swiper")) {new Swiper(".featured-swiper", {loop: true,autoplay: {delay: 4000},pagination: {el: ".swiper-pagination"},navigation: {nextEl: ".swiper-button-next",prevEl: ".swiper-button-prev"}});}

/* DISCOUNT POPUP */

const modal = document.getElementById("discount-modal");
const closeModal = document.getElementById("modal-close");
const discountForm = document.getElementById("discount-form");
if (modal && !localStorage.getItem("discount")) {setTimeout(function () {modal.classList.add("active");}, 1000);}
if (closeModal && modal) {closeModal.onclick = function () {modal.classList.remove("active");};}

/* DISCOUNT FORM */
if (discountForm) {discountForm.onsubmit = function (e) {e.preventDefault();
const email = document.getElementById("discount-email").value;
if (!email.includes("@") || !email.includes(".")) {alert("Please enter a valid email.");return;}localStorage.setItem("discount", "yes");alert("Your discount code is BEAN15!");modal.classList.remove("active");};}

/* ========================================================
   COFFEE SEARCH
========================================================= */

const coffeeSearch =document.getElementById("coffee-search");

if (coffeeSearch) {coffeeSearch.oninput = function () {const searchText =coffeeSearch.value.toLowerCase();document.querySelectorAll(".coffee-card").forEach(function (card) {const coffeeName =card.textContent.toLowerCase();
if (coffeeName.includes(searchText)) {card.style.display = "";} else {card.style.display = "none";}});};

document.addEventListener("DOMContentLoaded", function () {
/* =========================
    COFFEE FILTER
========================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const coffeeCards = document.querySelectorAll(".coffee-card");filterButtons.forEach(function (button) {button.addEventListener("click", function () {
const filter = button.getAttribute("data-filter");filterButtons.forEach(function (btn) {btn.classList.remove("active");});button.classList.add("active");coffeeCards.forEach(function (card) {const category = card.getAttribute("data-category");if (filter === "all" || category === filter) {card.style.display = "";} else {card.style.display = "none";}});});});});}

/* =========================================================
   CART
========================================================= */
function getCart() {return JSON.parse(localStorage.getItem("beanCart")) || [];}
function saveCart(cart) {localStorage.setItem("beanCart",JSON.stringify(cart));}
/* =========================================================
   UPDATE CART NUMBER
========================================================= */

function updateCart() {const cart = getCart();let number = 0;cart.forEach(function (item) {number += item.quantity;});
const count =document.getElementById("cart-count");if (count) {count.textContent = number;}}

/* =========================================================
   ADD TO CART
========================================================= */

document.querySelectorAll(".add-coffee, .add-equipment") .forEach(function (button) {button.onclick = function () {
const cart = getCart();
const id = button.dataset.id;
const name = button.dataset.name;
const price =Number(button.dataset.price);
const item =cart.find(function (x) {return x.id === id;});if (item) {item.quantity++;} else {cart.push({id: id,name: name,price: price,quantity: 1});}saveCart(cart);updateCart();alert("Added to cart.");};});updateCart();

/* =========================================================
   COFFEE DETAILS
========================================================= */

const coffeeModal =document.getElementById("coffee-modal");
const closeCoffee =document.getElementById("close-coffee");document.querySelectorAll(".view-coffee").forEach(function (button) {button.onclick = function () {document.getElementById("detail-name").textContent =button.dataset.name;document.getElementById("detail-price").textContent ="$" + button.dataset.price;document.getElementById("detail-image").src =button.dataset.image;document.getElementById("detail-description").textContent =button.dataset.description;coffeeModal.classList.add("active");};});
if (closeCoffee) {closeCoffee.onclick = function () {coffeeModal.classList.remove("active");};}

/* =========================================================
   OPTION BUTTONS
========================================================= */

document.querySelectorAll(".option-btn").forEach(function (button) {button.onclick = function () {button.parentElement.querySelectorAll(".option-btn").forEach(function (btn) {btn.classList.remove("active");});button.classList.add("active");};});

/* =========================================================
   QUANTITY IN COFFEE DETAIL
========================================================= */

let coffeeQuantity = 1;
const quantityText =document.getElementById("coffee-quantity");
const minusQuantity =document.getElementById("minus-quantity");
const plusQuantity =document.getElementById("plus-quantity");
if (plusQuantity) {plusQuantity.onclick = function () {coffeeQuantity++;quantityText.textContent =coffeeQuantity;};}
if (minusQuantity) {minusQuantity.onclick = function () {if (coffeeQuantity > 1) {coffeeQuantity--;}quantityText.textContent =coffeeQuantity;};}

/* =========================================================
   CART PAGE
========================================================= */

const cartItems =document.getElementById("cart-items");
if (cartItems) {displayCart();}

/* =========================================================
   DISPLAY CART
========================================================= */

function displayCart() {
    const cart = getCart();
    const cartItems =document.getElementById("cart-items");
    const emptyCart =document.getElementById("empty-cart");
    const subtotal =document.getElementById("cart-subtotal");
    const total =document.getElementById("cart-total");
    const summaryItems =document.getElementById("summary-items");
    if (!cartItems) {return;}
    cartItems.innerHTML = "";if (cart.length === 0) {
        if (emptyCart) {emptyCart.style.display = "block";}
        if (subtotal) {subtotal.textContent = "$0.00";}
        if (total) {total.textContent = "$0.00";}
        if (summaryItems) {summaryItems.textContent = "0";}return;}
    if (emptyCart) {emptyCart.style.display = "none";}
    let totalPrice = 0;
    let totalItems = 0;
    cart.forEach(function (item, index) {const itemTotal =item.price * item.quantity;totalPrice += itemTotal;
        totalItems += item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="cart-quantity">
                        <button class="quantity-btn minus-btn"data-index="${index}">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus-btn"data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item-right">
    <strong>$${itemTotal.toFixed(2)}</strong>
    <button class="remove-item"data-index="${index}">Remove</button></div></div>`;});
    if (subtotal) {subtotal.textContent ="$" + totalPrice.toFixed(2);}
    if (total) {total.textContent ="$" + totalPrice.toFixed(2);}
    if (summaryItems) {summaryItems.textContent =totalItems;}

    /* PLUS */

    document
        .querySelectorAll(".plus-btn")
        .forEach(function (button) {button.onclick = function () {const index =Number(button.dataset.index);cart[index].quantity++;saveCart(cart);displayCart();updateCart();};});

    /* MINUS */

    document.querySelectorAll(".minus-btn").forEach(function (button) {button.onclick = function () {const index =Number(button.dataset.index); if (cart[index].quantity > 1) {cart[index].quantity--;} else {cart.splice(index, 1);}saveCart(cart);displayCart();updateCart();};});

    /* REMOVE */

    document.querySelectorAll(".remove-item").forEach(function (button) {button.onclick = function () {const index =Number(button.dataset.index);cart.splice(index, 1);saveCart(cart);displayCart();updateCart();};});}

/* =========================================================
   CLEAR CART
========================================================= */
const clearCart =document.getElementById("clear-cart");
if (clearCart) {clearCart.onclick = function () {localStorage.removeItem("beanCart");displayCart();updateCart();};}
/* CHECKOUT */
const checkoutButton = document.getElementById("checkout-btn");
if (checkoutButton) {checkoutButton.onclick = function () {
const cart = JSON.parse(localStorage.getItem("beanCart")) || [];if (cart.length === 0) {alert("Your cart is empty.");return;}alert("Order completed successfully! Thank you for your order.");localStorage.removeItem("beanCart");updateCart();location.reload();};}

// Event Register Buttons
const registerButtons = document.querySelectorAll(".event-register-btn");
registerButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const eventName = button.getAttribute("data-event");
        Toastify({text: "Registration successful for " + eventName + "!",duration: 3000,gravity: "top",position: "center"}).showToast();});});