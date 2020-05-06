"use street";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

//======================day2 autoruzation ============
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const labelAuthSpan = document.querySelector(".label-auth > span");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("gloDelivery");

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth() {
  modalAuth.classList.toggle("is-open");
  labelAuthSpan.style.color = "";
  labelAuthSpan.textContent = "login";
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

//====my function formValidate ======

let error = true;
function formValidate(e) {
  console.log(e.target.value);
  if (e.target.value.length <= 3) {
    labelAuthSpan.style.color = "red";
    labelAuthSpan.textContent = "enter login";
    error = true;
  } else {
    error = false;
    labelAuthSpan.style.color = "";
    labelAuthSpan.textContent = "login";
  }
}
//==== end my function ======

//========= function     notAuthorized
function notAuthorized() {
  console.log("Notautirization");
  loginInput.addEventListener("input", formValidate);
  function logIn(e) {
    e.preventDefault();

    if (error) {
      labelAuthSpan.style.color = "red";
      labelAuthSpan.textContent = "enter login";
    } else {
      login = loginInput.value;
      localStorage.setItem("gloDelivery", login);
      toogleModalAuth();
      buttonAuth.removeEventListener("click", toogleModalAuth);
      closeAuth.removeEventListener("click", toogleModalAuth);
      loginForm.removeEventListener("submit", logIn);
      loginForm.reset();
      checkAuth();
    }
  }

  buttonAuth.addEventListener("click", toogleModalAuth);
  closeAuth.addEventListener("click", toogleModalAuth);
  loginForm.addEventListener("submit", logIn);
}
//=========end fn  notAuthorized
function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();

function createCardRestaurant() {
  const card = `
  	<a class="card card-restaurant">
						<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Пиццаплюс</h3>
								<span class="card-tag tag">50 мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 900 ₽</div>
								<div class="category">Пицца</div>
							</div>
							</div>
					</a>
  `;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

function createCartGood() {
  const card = document.createElement("section");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    ` 
  		<img src="img/pizza-plus/pizza-hawaiian.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Гавайская</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, ананасы</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">440 ₽</strong>
							</div>
						</div>
					
					
				
  `
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(e) {
  const target = e.target;
  const restaurant = target.closest(".cards-restaurants");
  console.log(restaurant);
  if (restaurant) {
    containerPromo.classList.add("hide");
    restaurants.classList.add("hide");
    menu.classList.remove("hide");

    cardsMenu.textContent = "";
    createCartGood();
    createCartGood();
    createCartGood();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

document.addEventListener("click", openGoods);

logo.addEventListener("click", function (e) {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});
