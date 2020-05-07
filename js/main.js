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
const restaurantTitle = document.querySelector(".restaurant-title");

let LOGIN = localStorage.getItem("gloDelivery");

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`error ${url} , status${response.status}`);
  }
  const data = await response.json();
  return data;
};

const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,10}$/;
  return nameReg.test(str);
};

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth() {
  modalAuth.classList.toggle("is-open");
  labelAuthSpan.style.color = "";
  labelAuthSpan.textContent = "login";
}

function returnMain() {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
  ERROR = true;
}

function authorized() {
  console.log("autirization");
  function logOut() {
    LOGIN = null;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
    //  when user exit from auth toggle page on home
    returnMain();
  }

  userName.textContent = LOGIN;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}

//====my function formValidate ======

let ERROR = true;
function formValidate(e) {
  if (valid(e.target.value)) {
    ERROR = false;
    labelAuthSpan.style.color = "";
    labelAuthSpan.textContent = "login";
  } else {
    labelAuthSpan.style.color = "red";
    labelAuthSpan.textContent = "enter login";
    ERROR = true;
  }
}
//==== end my function ======

//========= function     notAuthorized
function notAuthorized() {
  console.log("Notautirization");
  loginInput.addEventListener("input", formValidate);
  function logIn(e) {
    e.preventDefault();
    console.log(ERROR);
    if (ERROR) {
      labelAuthSpan.style.color = "red";
      labelAuthSpan.textContent = "enter login";
    } else {
      LOGIN = loginInput.value;
      localStorage.setItem("gloDelivery", LOGIN);
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
//=========end fn function notAuthorized
function checkAuth() {
  if (LOGIN) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();

function createCardRestaurant(restaurant) {
  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery: timeOfDelivery,
  } = restaurant;

  const card = `
  	<a class="card card-restaurant" data-name = "${name}"  data-products="${products}">
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${timeOfDelivery}</span>
							</div>
						<div class="card-info">
								<div class="rating">
								${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen} </div>
							</div>
							</div>
					</a>
  `;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCartGood(cards, e) {
  console.log(e.target);

  console.log(cards);
  const { id, name, description, image, price } = cards;
  // restaurantTitle.textContent = e.target.dataset.name;
  const card = document.createElement("section");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    ` 	<img src=${image} alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
						
							<div class="card-info">
								<div class="ingredients">${description}</div>
							</div>
						
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price}</strong>
							</div>
						</div>
					`
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(e) {
  const target = e.target;
  if (LOGIN) {
    const restaurant = target.closest(".card-restaurant");

    if (restaurant) {
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      cardsMenu.textContent = "";
      let url = `./db/${restaurant.dataset.products}`;
      getData(url).then(function (data) {
        data.forEach((data) => {
          createCartGood(data, e);
        });
      });
    }
  } else {
    toogleModalAuth();
  }
}

function init() {
  getData("./db/partners.json").then(function (data) {
    data.forEach(createCardRestaurant);
  });

  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);

  restaurants.addEventListener("click", openGoods);

  logo.addEventListener("click", function (e) {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  let mySwiper = new Swiper(".swiper-container", {
    speed: 400,
    spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 2000,
    },
  });
}
init();
