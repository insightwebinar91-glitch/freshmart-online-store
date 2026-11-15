
// ======================================
// FRESHMART ONLINE STORE - JAVASCRIPT
// ======================================


// 1. PRODUCT DATABASE

const products = [
    {
        id: 1,
        name: "Fresh Apples",
        category: "fruits",
        price: 250,
        description: "Crisp and delicious fresh apples.",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Fresh Bananas",
        category: "fruits",
        price: 120,
        description: "Sweet bananas for everyday enjoyment.",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Fresh Oranges",
        category: "fruits",
        price: 180,
        description: "Juicy oranges full of flavour.",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Fresh Strawberries",
        category: "fruits",
        price: 350,
        description: "Sweet strawberries for your meals.",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Fresh Broccoli",
        category: "vegetables",
        price: 150,
        description: "Fresh green broccoli for healthy meals.",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 100,
        description: "Ripe tomatoes for everyday cooking.",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Fresh Carrots",
        category: "vegetables",
        price: 90,
        description: "Crunchy carrots for meals and salads.",
        image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Fresh Spinach",
        category: "vegetables",
        price: 80,
        description: "Fresh leafy greens for your kitchen.",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Fresh Milk",
        category: "dairy",
        price: 70,
        description: "A sample dairy product listing.",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Cheese",
        category: "dairy",
        price: 280,
        description: "A sample cheese product listing.",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Rice",
        category: "pantry",
        price: 220,
        description: "A sample pantry staple product.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Cooking Oil",
        category: "pantry",
        price: 350,
        description: "A sample cooking oil product listing.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
    }
];


// 2. SELECT PAGE ELEMENTS

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const emptyMessage = document.getElementById("emptyMessage");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");
const cartMessage = document.getElementById("cartMessage");


// 3. YOUR RECEIVING EMAIL ADDRESS

const recipient = "insightwebinar91@gmail.com";


// 4. LOAD SAVED CART

let cart = [];

try {

    const savedCart = JSON.parse(
        localStorage.getItem("freshmart_cart")
    );

    if (Array.isArray(savedCart)) {

        cart = savedCart.filter(function(item) {

            return products.some(function(product) {
                return product.id === item.id;
            }) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0;

        });

    }

} catch (error) {

    cart = [];

}


// 5. FORMAT CURRENCY

function formatPrice(amount) {

    return "KSh " + amount.toLocaleString("en-KE");

}


// 6. DISPLAY PRODUCTS

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        emptyMessage.hidden = false;
        return;

    }

    emptyMessage.hidden = true;

    productList.forEach(function(product) {

        const productCard = document.createElement("article");
        productCard.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.addEventListener("error", function() {

            image.alt = product.name + " image unavailable";
            image.style.backgroundColor = "#e8f4e9";

        });

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const button = document.createElement("button");
        button.className = "add-cart";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function() {

            addToCart(product.id);

        });

        info.appendChild(category);
        info.appendChild(name);
        info.appendChild(description);
        info.appendChild(price);
        info.appendChild(button);

        productCard.appendChild(image);
        productCard.appendChild(info);

        productGrid.appendChild(productCard);

    });

}


// 7. SEARCH AND FILTER PRODUCTS

function filterProducts() {

    const searchTerm = productSearch.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);


// 8. SAVE CART

function saveCart() {

    localStorage.setItem(
        "freshmart_cart",
        JSON.stringify(cart)
    );

}


// 9. ADD PRODUCT TO CART

function addToCart(productId) {

    const existingItem = cart.find(function(item) {

        return item.id === productId;

    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    saveCart();
    updateCart();

    cartMessage.textContent = "Product added to your cart.";

}


// 10. UPDATE CART DISPLAY

function updateCart() {

    cartItems.innerHTML = "";

    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {

        const emptyText = document.createElement("p");
        emptyText.className = "empty-cart";
        emptyText.textContent = "Your cart is empty.";

        cartItems.appendChild(emptyText);

    }

    cart.forEach(function(item) {

        const product = products.find(function(product) {

            return product.id === item.id;

        });

        if (!product) return;

        totalQuantity += item.quantity;
        totalPrice += product.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const details = document.createElement("div");

        const name = document.createElement("h4");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = formatPrice(
            product.price * item.quantity
        );

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";

        decreaseButton.addEventListener("click", function() {

            changeQuantity(product.id, -1);

        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";

        increaseButton.addEventListener("click", function() {

            changeQuantity(product.id, 1);

        });

        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {

            removeFromCart(product.id);

        });

        controls.appendChild(decreaseButton);
        controls.appendChild(quantity);
        controls.appendChild(increaseButton);
        controls.appendChild(removeButton);

        details.appendChild(name);
        details.appendChild(price);
        details.appendChild(controls);

        cartItem.appendChild(image);
        cartItem.appendChild(details);

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    saveCart();

}


// 11. CHANGE PRODUCT QUANTITY

function changeQuantity(productId, amount) {

    const item = cart.find(function(item) {

        return item.id === productId;

    });

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(function(item) {

            return item.id !== productId;

        });

    }

    updateCart();

}


// 12. REMOVE PRODUCT FROM CART

function removeFromCart(productId) {

    cart = cart.filter(function(item) {

        return item.id !== productId;

    });

    updateCart();

    cartMessage.textContent = "Product removed from cart.";

}


// 13. OPEN CART

function openCart() {

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

    cartMessage.textContent = "";

}


// 14. CLOSE CART

function hideCart() {

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);


// Close cart using Escape key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        hideCart();

    }

});


// 15. PREPARE SHOPPING ORDER ENQUIRY

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        cartMessage.textContent =
            "Please add products before preparing an order.";

        return;

    }

    let orderDetails = "FRESHMART SAMPLE ORDER ENQUIRY\n\n";

    let total = 0;

    cart.forEach(function(item) {

        const product = products.find(function(product) {

            return product.id === item.id;

        });

        if (!product) return;

        const itemTotal = product.price * item.quantity;

        total += itemTotal;

        orderDetails +=
            product.name +
            " - Quantity: " + item.quantity +
            " - " + formatPrice(itemTotal) + "\n";

    });

    orderDetails +=
        "\nEstimated Total: " + formatPrice(total);

    orderDetails +=
        "\n\nThis is a demonstration order enquiry, not a confirmed purchase.";

    const subject = encodeURIComponent(
        "FreshMart Shopping Enquiry"
    );

    const body = encodeURIComponent(orderDetails);

    const emailLink =
        "mailto:" + recipient +
        "?subject=" + subject +
        "&body=" + body;

    cartMessage.textContent =
        "Your email application is opening. Please review and send the enquiry.";

    window.location.href = emailLink;

});


// 16. CONTACT FORM

const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();

    const email = document.getElementById("customerEmail").value.trim();

    const message = document.getElementById("customerMessage").value.trim();

    if (!name || !email || !message) {

        contactMessage.textContent =
            "Please complete all fields.";

        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        contactMessage.textContent =
            "Please enter a valid email address.";

        return;

    }

    const subject = encodeURIComponent(
        "FreshMart Website Enquiry"
    );

    const body = encodeURIComponent(

        "NEW FRESHMART ENQUIRY\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message

    );

    const emailLink =
        "mailto:" + recipient +
        "?subject=" + subject +
        "&body=" + body;

    contactMessage.textContent =
        "Your email application is opening. Please send your message.";

    window.location.href = emailLink;

});


// 17. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function() {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


// Close mobile menu after selecting a link

document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function() {

        navbar.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// 18. AUTOMATIC FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// 19. SMOOTH NAVIGATION

document.querySelectorAll('a[href^="#"]').forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// 20. INITIALIZE STORE

displayProducts(products);
updateCart();

console.log("FreshMart Online Store loaded successfully.");
console.log("Receiving email: " + recipient);


// ======================================
// END OF FRESHMART JAVASCRIPT
// ======================================
