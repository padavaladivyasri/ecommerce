const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 1500,
        image: "https://placehold.co/200x150?text=Smart+Watch"
    },
    {
        id: 2,
        name: "Headphones",
        price: 1000,
        image: "https://placehold.co/200x150?text=Headphones"
    },
    {
        id: 3,
        name: "Shoes",
        price: 2000,
        image: "https://placehold.co/200x150?text=Shoes"
    },
    {
        id: 4,
        name: "Backpack",
        price: 800,
        image: "https://placehold.co/200x150?text=Backpack"
    }
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} - ₹${item.price}</span>

            <span>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </span>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("total").textContent = total;

    document.getElementById("cart-count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            displayCart();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with ShopEasy!");
    cart = [];
    displayCart();
}

displayProducts();
displayCart();