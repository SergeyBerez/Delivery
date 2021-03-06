"use street";

//document.addEventListener("DOMContentLoaded", function (e) {
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

//======================day2 autoruzation ============
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");

const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const labelAuthSpan = document.querySelector(".label-auth > span");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");

const cardsMenu = document.querySelector(".cards-menu");
//------ elements section heading title hide menu
const restaurantTitle = document.querySelector(".restaurant-title");
const rating = document.querySelector(".rating");
const priceHead = document.querySelector(".price");
const category = document.querySelector(".category");
//-----elements cart
const modalBody = document.querySelector(".modal-body");
const modalPriceTotal = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");
//------elements for order
const btnOrder = document.querySelector(".button-order");
const modalOrder = document.querySelector(".modal-order");
const closeOrder = document.querySelector(".close-order");
// find
const inputSearch = document.querySelector(".input-search");
const restoutransLink = document.querySelector("[href='#Restaurants']");
//elemnts for animation
const logo = document.querySelector(".logo");
const links = document.querySelectorAll(".footer-link");
const headerNav = document.querySelector(".header-nav");
// our forms   auth and seng order
const loginForm = document.querySelector("#logInForm");
const formOrder = document.querySelector(".form-order");
let LOGIN = localStorage.getItem("gloDelivery");

const cart = [];
function getCartToLocal() {
  if (localStorage.getItem(LOGIN)) {
    console.log(localStorage.getItem(LOGIN));
    JSON.parse(localStorage.getItem(LOGIN)).forEach((item) => {
      cart.push(item);
    });
    // cart.push(...JSON.parse(localStorage.getItem(LOGIN)));
  }
}

function saveCartToLocal() {
  if (LOGIN) {
    localStorage.setItem(LOGIN, JSON.stringify(cart));
  }
}

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`error ${url} , status${response.status}`);
  }
  const data = await response.json();
  return data;
};

function toggleModal() {
  modal.classList.add("is-open");
  modal.firstElementChild.classList.add("fadeInDown");
  modal.firstElementChild.classList.remove("fadeOutUp");
}
function toggleModalClose() {
  modal.firstElementChild.classList.remove("fadeInDown");
  modal.firstElementChild.classList.add("fadeOutUp");
  setTimeout(function () {
    modal.classList.remove("is-open");
  }, 1000);

  // modal.firstElementChild.classList.toggle("fadeOutDown");
}

function toogleModalOrder() {
  modalOrder.classList.add("is-open");

  modalOrder.firstElementChild.classList.add("fadeInDown");
  modalOrder.firstElementChild.classList.remove("fadeOutUp");
}

function toogleModalOrderClose() {
  setTimeout(function () {
    modalOrder.classList.remove("is-open");
  }, 1000);
  modalOrder.firstElementChild.classList.remove("fadeInDown");
  modalOrder.firstElementChild.classList.add("fadeOutUp");

  // body
}
function toogleModalAuth() {
  modalAuth.classList.toggle("is-open");
  modalAuth.firstElementChild.classList.toggle("fadeInDown");

  // modalAuth.firstElementChild.classList.toggle(`wow fadeInUp`);
  labelAuthSpan.style.color = "";
  labelAuthSpan.textContent = "login";
}
//  =======when user exit from auth toggle page on home
function returnMain() {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
  ERROR = true;
}

function authorized() {
  //function for exit from autirization page
  function logOut() {
    LOGIN = null;
    cart.length = 0;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    cartButton.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
    //  when user exit from auth toggle page on home
    returnMain();
  }
  console.log("User autirizated");
  userName.textContent = LOGIN;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "flex";
  cartButton.style.display = "flex";
  buttonOut.addEventListener("click", logOut);
  getCartToLocal();
}

//====my function formValidate ======
const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,10}$/;
  return nameReg.test(str);
};
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
  loginInput.addEventListener("input", formValidate);
  function logIn(e) {
    e.preventDefault();

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
  console.log("User Not autirizated");
  buttonAuth.addEventListener("click", toogleModalAuth);
  closeAuth.addEventListener("click", toogleModalAuth);
  loginForm.addEventListener("submit", logIn);
}
//=========end fn function notAuthorized
function checkAuth() {
  console.log('checkauth');
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
  	<a class="card wow fadeInUp card-restaurant" data-wow-delay="0.9s"  data-info="${[
      name,
      stars,
      price,
      kitchen,
    ]}"  data-products="${products}">
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

function createCartGood(cards) {
  const { id, name, description, image, price } = cards;

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
								<button class="button button-primary button-add-cart" id = ${id} >
									<span class="button-card-text" >В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price card-price-bold">${price}</strong>
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
      let [name, stars, price, kitchen] = restaurant.dataset.info.split(",");
      restaurantTitle.textContent = name;
      rating.textContent = stars;
      priceHead.textContent = price;
      category.textContent = kitchen;

      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      cardsMenu.textContent = "";
      let url = `./db/${restaurant.dataset.products}`;
      getData(url).then(function (data) {
        data.forEach(createCartGood);
      });
    }
  } else {
    toogleModalAuth();
  }
}
// =========function work with cart and goods ===
function addToCart(e) {
  console.log(1112);
  const target = e.target;
  const buttonAddtoCart = target.closest(".button-add-cart");

  if (buttonAddtoCart) {
    const card = buttonAddtoCart.closest(".card");
    const title = card.querySelector(".card-title-reg").textContent;
    const cost = card.querySelector(".card-price").textContent;
    const id = buttonAddtoCart.id;
    const food = cart.find((item) => {
      return item.id === id;
    });

    if (food) {
      food.count++;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1,
      });
      saveCartToLocal();
    }
  }
}
function renderCart() {
  modalBody.textContent = "";
  cart.sort((a, b) => {
    return a.cost - b.cost;
  });
  cart.forEach(({ id, title, cost, count }) => {
    const itemCart = `	<div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${cost} ₽</strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id=${id}>-</button>
						<span class="counter">${count}</span>
						<button class="counter-button counter-plus" data-id=${id}>+</button>
					</div>
        </div>`;

    modalBody.insertAdjacentHTML("afterbegin", itemCart);
  });

  const totalPrice = cart.reduce((sum, item) => {
    return sum + parseFloat(item.cost) * item.count;
  }, 0);
  modalPriceTotal.textContent = totalPrice + "$";
}

function changeCount(e) {
  const target = e.target;
  if (target.classList.contains("counter-button")) {
    if (target.classList.contains("counter-minus")) {
      const food = cart.find(function (item) {
        return item.id === target.dataset.id;
      });
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    }

    if (target.classList.contains("counter-plus")) {
      const food = cart.find(function (item) {
        return item.id === target.dataset.id;
      });

      food.count++;
    }
    saveCartToLocal();
    renderCart();
  }
}

function findElement(e) {
  let code = e.keyCode;
  let value = e.target.value.trim();
  let regexp = new RegExp(`${value}`, "i");

  let goods = [];
  if (code === 13) {
    getData("./db/partners.json").then(function (restoutrans) {
      let restaurant = restoutrans.map((item) => {
        return item.products;
      });

      restaurant.forEach((item) => {
        getData(`./db/${item}`).then(function (data) {
          goods.push(...data);
          const searchGoods = goods.filter((item) => {
            return item.name.search(regexp) !== -1;
          });
          restaurantTitle.textContent = "";
          rating.textContent = "";
          priceHead.textContent = "";
          category.textContent = "";

          containerPromo.classList.add("hide");
          restaurants.classList.add("hide");
          menu.classList.remove("hide");
          cardsMenu.textContent = "";
          // return searchGoods;

          if (searchGoods.length !== 0) {
            searchGoods.forEach((item) => {
              // console.log("----render---");
              createCartGood(item);
            });
          } else {
            restaurantTitle.textContent = "такого товара нет";
          }
        });
        // .then((data) => {
        //  data.forEach((card) => {
        //    createCartGood(card);
        //  });
        // });
      });
    });
  }
}

// ======function init() / render all page / send ajax request/ initial slider /========
function init() {
  getData("./db/partners.json")
    .then((data) => {
      return data;

      // src.addEventListener("load", function (e) {
      //   src.src = "js/wow.min.js";
      //   console.log(11111);
      //   document.body.append(src);
      // });
    })
    .then(function (data) {
      data.forEach(createCardRestaurant);
      let count = 0.1;
      [...document.querySelectorAll(".card")].forEach((item) => {
        item.dataset.wowDelay = count + "s";
        count += 0.2;
      });
    });

  cartButton.addEventListener("click", function () {
    renderCart();
    toggleModal();
  });
  btnOrder.addEventListener("click", toogleModalOrder);
  closeOrder.addEventListener("click", toogleModalOrderClose);
  buttonClearCart.addEventListener("click", function (e) {
    cart.length = 0;
    // saveCarToLocal();
    renderCart();
  });
  inputSearch.addEventListener("keydown", findElement);

  modalBody.addEventListener("click", changeCount);

  close.addEventListener("click", toggleModalClose);

  cardsMenu.addEventListener("click", addToCart);

  restaurants.addEventListener("click", openGoods);

  logo.addEventListener("click", function (e) {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });
  restoutransLink.addEventListener("click", function (e) {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  logo.addEventListener("mouseenter", function (e) {
    logo.firstElementChild.classList.add("bounce");
  });
  logo.addEventListener("mouseleave", function (e) {
    logo.firstElementChild.classList.remove("bounce");
  });
  // animation for menu
  headerNav.addEventListener("mouseover", function (e) {
    if (e.target.tagName == "A") {
      e.target.classList.add("bounce");
    }
  });

  headerNav.addEventListener("mouseout", function (e) {
    if (e.target.tagName == "A") {
      e.target.classList.remove("bounce");
    }
  });
}

init();
new WOW().init();
//=============mySwipe===========================
let mySwiper = new Swiper(".swiper-container", {
  speed: 400,
  spaceBetween: 100,
  loop: true,
  autoplay: {
    delay: 2000, 
  },
});

// console.log("ppploadage load".search(/load/i));
// console.log("ppploadage ".includes('load'));
// console.log(/load/gi.exec("ppploadage load"));
//});
