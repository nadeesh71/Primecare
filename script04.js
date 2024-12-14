
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage

// Function to add items to the cart
function addToCart(productName, price, quantityId) {

    const quantityInput = document.getElementById(quantityId);
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        const existingProduct = cart.find((item) => item.name === productName);
        
        if (existingProduct) {
            // Update existing product in the cart
            existingProduct.quantity += quantity;
            existingProduct.totalPrice = existingProduct.quantity * price;

        } else {
            cart == ""
            // Add new product to the cart
            cart.push({
                name: productName,
                price: price,
                quantity: quantity,
                totalPrice: price * quantity,
            });
        }
  
        showMessage(`${productName} added to cart!`);
        updateCartTable();
 
    } else {
        showMessage("Please enter a valid quantity.");
    }


}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart table
function updateCartTable() {
    const cartBody = document.getElementById("cart-body");
    const payNowButton = document.getElementById("pay-now");

    // Clear previous cart table content
    cartBody.innerHTML = "";

    if (cart.length > 0) {
        cartBody.innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
        payNowButton.style.display = "none"; // Hide "Pay Now" button if cart is empty
    }

    let totalCost = 0;
    
    cart.forEach((item) => {

        totalCost += item.totalPrice;
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.name}</td>
                <td>Rs ${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                
            `;
        cartBody.appendChild(row);
    });

    // Add total cost row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
            <td colspan="3"><strong>Total Cost</strong></td>
            <td><strong>Rs ${totalCost.toFixed(2)}</strong></td>
        `;
    cartBody.appendChild(totalRow);

    // Show "Pay Now" button when there are items in the cart
    payNowButton.style.display = "block";
}

// Function to handle the "Pay Now" button click
function handlePayNow() {
    const totalCost = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    if (totalCost > 0) {
        const paymentUrl = `payment.html?total=${totalCost.toFixed(2)}`;
        window.location.href = paymentUrl;
    } else {
        alert("Your cart is empty. Please add items to the cart before proceeding.");
    }
}

// Function to show a temporary message
function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = message;
    messageDiv.style.display = "block";

    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 2000);
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
        const productElement = event.target.closest(".product");
        if (productElement) {
            const productName = productElement.getAttribute("data-name");
            const productPrice = parseFloat(productElement.getAttribute("data-price"));
            const quantityId = productElement.getAttribute("data-quantity-id");
            addToCart(productName, productPrice, quantityId);
        }
    });
});

// Attach event listener to "Pay Now" button
document.getElementById("pay-now").addEventListener("click", handlePayNow);

// Load cart table on page load
updateCartTable();

function addToFavourite(){
    alert("Add to favourite")
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(cart));
}