// Obtener carrito guardado o crear uno nuevo
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Agregar producto al carrito
function addToCart(name,price){

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart.push({name:name,price:price})

localStorage.setItem("cart",JSON.stringify(cart))

updateCartCount()

showNotification(name + " agregado al carrito")

updateMiniCart()

}


// Actualizar número del carrito
function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = cart.length;

let cartCount = document.getElementById("cart-count");

if(cartCount){
cartCount.innerText = count;
}

}


// Cargar productos en la página del carrito
function loadCartPage(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart-items");

let totalContainer = document.getElementById("cart-total");

if(!container) return;

container.innerHTML = "";

if(cart.length === 0){

container.innerHTML = "<p>Tu carrito está vacío.</p>";

if(totalContainer){
totalContainer.innerText = "";
}

return;

}

let total = 0;

cart.forEach((item, index)=>{

total += item.price;

container.innerHTML += `

<div class="product">

<h3>${item.name}</h3>

<p>$${item.price}</p>

<button onclick="removeFromCart(${index})">Eliminar</button>

</div>

`;

});

if(totalContainer){
totalContainer.innerText = "Total: $" + total;
}

}


// Eliminar producto
function removeFromCart(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

loadCartPage();

updateCartCount();

}


// Vaciar carrito
function clearCart(){

localStorage.removeItem("cart");

loadCartPage();

updateCartCount();

}

function showNotification(message){

let notification = document.getElementById("notification")

if(!notification) return

notification.innerText = message

notification.classList.add("show")

setTimeout(()=>{
notification.classList.remove("show")
},2000)

}

function updateMiniCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || []

let miniCart = document.getElementById("mini-cart")

if(!miniCart) return

miniCart.innerHTML=""

if(cart.length === 0){

miniCart.innerHTML = "<p>Tu carrito está vacío</p>"

return

}

cart.slice(-3).forEach(item=>{

miniCart.innerHTML += `
<p>${item.name} - $${item.price}</p>
`

})

}

// Ejecutar al cargar la página
window.onload=function(){

updateCartCount()

loadCartPage()

updateMiniCart()

}