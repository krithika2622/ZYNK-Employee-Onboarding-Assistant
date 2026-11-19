
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const errorMessage = document.getElementById("errorMessage");
const forgotPassword = document.getElementById("forgotPassword");

// Show or hide password
togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "Show";
  }
});

// Demo login validation
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  errorMessage.textContent = "";

  if (!email || !password) {
    errorMessage.textContent = "Please enter your email and password.";
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = "Password must contain at least 6 characters.";
    return;
  }

  // Remember email only, never store the password
  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("zynkEmail", email);
  } else {
    localStorage.removeItem("zynkEmail");
  }

  // Open the existing dashboard
  window.location.href = "dashboard.html";
});

// Fill saved email if Remember Me was selected
const savedEmail = localStorage.getItem("zynkEmail");

if (savedEmail) {
  emailInput.value = savedEmail;
  document.getElementById("rememberMe").checked = true;
}

// Forgot password demo message
forgotPassword.addEventListener("click", function (event) {
  event.preventDefault();
  alert("Please contact your HR team to reset your password.");
});
