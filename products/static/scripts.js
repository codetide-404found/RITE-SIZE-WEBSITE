
// =======================
// Initialize EmailJS
// =======================
(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // replace with your EmailJS public key
})();

// =======================
// Booking Form Submit
// =======================
document.getElementById("bookingForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect form data
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let pet = document.getElementById("pet").value;
  let service = document.getElementById("service").value;
  let date = document.getElementById("date").value;
  let notes = document.getElementById("notes").value;

  // WhatsApp number
  let whatsappNumber = "233123456789";

  // Build WhatsApp message
  let message = `Hello Ritesize,%0A
I want to book a service:%0A
Name: ${name}%0A
Email: ${email}%0A
Phone: ${phone}%0A
Pet: ${pet}%0A
Service: ${service}%0A
Date: ${date}%0A
Notes: ${notes}`;

  // Open WhatsApp
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

  // Send email via EmailJS
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "#bookingForm")
    .then(function () {
      alert("Booking request sent via email successfully! ✅");
      document.getElementById("bookingForm").reset();
    }, function (error) {
      alert("Failed to send email ❌: " + JSON.stringify(error));
    });
});

// =======================
// Cart System
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

document.querySelectorAll(".addCart").forEach(btn => {
  btn.addEventListener("click", () => {
    let name = btn.dataset.name;
    let price = parseFloat(btn.dataset.price);

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification(`${name} added to cart 🛒`);
  });
});

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

// =======================
// Cart Modal
// =======================
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

cartBtn.addEventListener("click", () => {
  renderCart();
  cartModal.style.display = "flex";
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
});

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    let li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;

    // Remove button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

// =======================
// Checkout
// =======================
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // Build WhatsApp order
  let orderMessage = "Hello Ritesize, I want to order the following:%0A";
  cart.forEach(item => {
    orderMessage += `${item.name} - $${item.price}%0A`;
  });

  window.open(`https://wa.me/233123456789?text=${orderMessage}`, "_blank");

  // Send order email
  let tempForm = document.createElement("form");
  tempForm.innerHTML = `
    <input type="hidden" name="order" value="${cart.map(i => i.name + " - $" + i.price).join(", ")}">
    <input type="hidden" name="total" value="${cart.reduce((a, b) => a + b.price, 0)}">
  `;
  document.body.appendChild(tempForm);

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", tempForm)
    .then(function () {
      alert("Order sent via email successfully! ✅");
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
      document.body.removeChild(tempForm);
    }, function () {
      showNotification("Failed to send email ❌");
      document.body.removeChild(tempForm);
    });
});

// =======================
// Notification Toast
// =======================
function showNotification(message) {
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    document.body.appendChild(notification);
  }
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}









