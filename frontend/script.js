document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const productTotalElement = document.getElementById('product-total');
    const deliveryElement = document.getElementById('delivery');
    const taxElement = document.getElementById('tax');
    const cartTotalElement = document.getElementById('cart-total');

    const MEDIA_URL = 'http://127.0.0.1:8000';
    let cart = [];

    async function fetchProducts() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/products-list/');
            const products = await response.json();

            productsContainer.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image ? MEDIA_URL + product.image : ''}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <div class="quantity-controls">
                        <button onclick="decreaseProductQuantity(${product.id})">-</button>
                        <span id="quantity-${product.id}">1</span>
                        <button onclick="increaseProductQuantity(${product.id})">+</button>
                    </div>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image || ''}', 1)">Add to Cart</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    window.addToCart = (id, name, price, image, quantity) => {
        const item = { id, name, price, image, quantity };
        const existingItem = cart.find(i => i.id === id);
        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            cart.push(item);
        }
        displayCart();
        updateCartSummary();
        updateProductQuantity(id, quantity);
    };

    window.increaseProductQuantity = (id) => {
        const quantityElement = document.getElementById(`quantity-${id}`);
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
    };

    window.decreaseProductQuantity = (id) => {
        const quantityElement = document.getElementById(`quantity-${id}`);
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    };

    window.increaseQuantity = (index) => {
        cart[index].quantity++;
        displayCart();
        updateCartSummary();
        updateProductQuantity(cart[index].id, cart[index].quantity);
    };

    window.decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            displayCart();
            updateCartSummary();
            updateProductQuantity(cart[index].id, cart[index].quantity);
        } else {
            removeFromCart(index);
        }
    };

    window.removeFromCart = (index) => {
        const removedItem = cart.splice(index, 1)[0];
        updateProductQuantity(removedItem.id, 1);
        displayCart();
        updateCartSummary();
    };

    function updateProductQuantity(id, quantity) {
        const quantityElement = document.getElementById(`quantity-${id}`);
        if (quantityElement) {
            quantityElement.textContent = quantity;
        }
    }

    function displayCart() {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <img src="${item.image ? MEDIA_URL + item.image : ''}" alt="${item.name}">
                    <span>${item.name} - $${item.price} x ${item.quantity}</span>
                </div>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
    }

    function updateCartSummary() {
        const productTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        const deliveryFee = productTotal < 700 ? 10 : 0;
        const tax = 10;
        const cartTotal = (parseFloat(productTotal) + deliveryFee + tax).toFixed(2);

        productTotalElement.textContent = productTotal;
        deliveryElement.textContent = deliveryFee.toFixed(2);
        taxElement.textContent = tax.toFixed(2);
        cartTotalElement.textContent = cartTotal;
    }

    fetchProducts();
});