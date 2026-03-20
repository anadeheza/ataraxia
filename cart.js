// 1. Obtener carrito una sola vez al inicio para mayor eficiencia
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- FUNCIONES DE CARRITO ---

function addToCart(name, price, image) {
    let itemExistente = cart.find(item => item.name === name);

    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        cart.push({ 
            name: name, 
            price: price, 
            image: image, 
            quantity: 1 
        });
    }
    
    saveCart();
    updateUI();
    showNotification(name + " agregado al carrito");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateUI() {
    updateCartCount();
    updateMiniCart();
    if (document.getElementById("cart-items")) {
        loadCartPage();
    }
}

function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalQuantity;
    }
}

function updateMiniCart() {
    let miniCart = document.getElementById("mini-cart");
    if (!miniCart) return;

    if (cart.length === 0) {
        miniCart.innerHTML = "<p>Tu carrito está vacío</p>";
        return;
    }

    miniCart.innerHTML = "";
    cart.slice(-3).forEach(item => {
        miniCart.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });
}

function loadCartPage() {
    
    let container = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");
    if (!container) return;

    container.innerHTML = `<h2 class="cart-title">Tu carrito</h2>`;

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-cart-msg'>Tu carrito está vacío.</p>";
        if (totalContainer) totalContainer.innerHTML = ""; 
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
                <div class="cart-quantity">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <p class="subtotal">$${subtotal}</p>
                <button class="delete-btn" onclick="removeFromCart(${index})">✕</button>
            </div>
        `;
    });

    if (totalContainer) {
    totalContainer.innerHTML = `
        <div class="cart-summary">
            <h3>Total: $${total}</h3>
            <button id="clear-cart-btn" onclick="clearCart()">Vaciar Carrito</button>
        </div>
    `;
}
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const isCartPage = document.body.classList.contains('cart-page');
    
    if (!isCartPage) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateUI();
}

function clearCart() {
    cart = [];
    saveCart();
    updateUI();
}

// --- NOTIFICACIONES ---

function showNotification(message) {
    let notification = document.getElementById("notification");
    if (!notification) return;
    notification.innerText = message;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show")
    }, 2000);
}

function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    nav.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateMiniCart();
    if (document.getElementById("cart-items")) {
        loadCartPage();
    }
});

function changeQuantity(index, delta) {
    cart[index].quantity += delta;

    if (cart[index].quantity < 1) {
        removeFromCart(index);
    } else {
        saveCart();
        updateUI();
    }
}