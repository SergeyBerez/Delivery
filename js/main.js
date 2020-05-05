const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}
//======================day1 autoruzation ============
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const labelAuthSpan = document.querySelector(".label-auth > span");

let login = localStorage.getItem("gloDelivery");

function toogleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function authorized() {
  console.log("autirization");
  function logOut() {
    login = null;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }

  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}
function formValidate(e) {
  if (e.target.value === "") {
    labelAuthSpan.style.color = "red";
    labelAuthSpan.textContent = "enter login";
  } else {
    labelAuthSpan.style.color = "";
    labelAuthSpan.textContent = "login";
  }
  return login;
}
function notAuthorized() {
  console.log("Notautirization");
  loginInput.addEventListener("input", formValidate);

  function logIn(e) {
    e.preventDefault();

    login = loginInput.value;

    if (login == "") {
      labelAuthSpan.style.color = "red";
      labelAuthSpan.textContent = "enter login";
    } else {
      localStorage.setItem("gloDelivery", login);
      toogleModalAuth();
    }

    buttonAuth.removeEventListener("click", toogleModalAuth);
    closeAuth.removeEventListener("click", toogleModalAuth);
    loginForm.removeEventListener("submit", logIn);
    loginForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener("click", toogleModalAuth);
  closeAuth.addEventListener("click", toogleModalAuth);
  loginForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();
