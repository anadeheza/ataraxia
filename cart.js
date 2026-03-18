// 1. Obtener carrito una sola vez al inicio para mayor eficiencia
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- FUNCIONES DE CARRITO ---

function addToCart(name, price) {
    cart.push({ name: name, price: price });
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
        cartCount.innerText = cart.length;
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

    container.innerHTML = "";
    
    if (cart.length === 0) {
        container.innerHTML = "<p>Tu carrito está vacío.</p>";
        if (totalContainer) totalContainer.innerHTML = "";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
    });

    if (totalContainer) {
        totalContainer.innerHTML = `
            <div class="cart-summary">
                <h3 style="font-size: 18px; margin-bottom: 10px;">Total: $${total}</h3>
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
    const menuIcon = document.getElementById('menu-icon'); // Necesitas este ID en tu HTML
    
    nav.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateMiniCart();
    if (document.getElementById("cart-items")) {
        loadCartPage();
    }
});