const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pass");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  errors = getLoginPageErrors(emailInput.value, passwordInput.value);

  if (errors.length > 0) {
    e.preventDefault();
    errorMessage.innerText = errors.join(". ");
  }
});

function getLoginPageErrors(email, password) {
  let errors = [];

  if (email === "" || email === null) {
    errors.push("Email is required.");
    emailInput.parentElement.classList.add("incorrect");
  }

  if (password === "" || password === null) {
    errors.push("password is required.");
    passwordInput.parentElement.classList.add("incorrect");
  }
  return errors;
}
const allInputs = [emailInput, passwordInput];
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("incorrect");
    errorMessage.innerText = "";
  });
});
