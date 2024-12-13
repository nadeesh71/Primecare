document.getElementById("payment-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  window.open("thankyou.html", "_blank"); // Open the Thank You Page in a new tab
});