function showCategory() {
  const parent = document.querySelector("#categories");
  for (let category of data) {
    const element = document.createElement("div");
    element.textContent = category.name;
    element.classList.add("category");
    parent.appendChild(element);
  }
  clickCategory();
}

showCategory();

function clickCategory() {
  const arrayCategory = Array.from(document.querySelectorAll(".category"));
  arrayCategory.forEach((category) => {
    category.addEventListener("click", (e) => {
      data.forEach((el) => {
        if (el.name === e.target.innerText) {
          showListCategory(el.products);
        }
      });
    });
  });
}

function showListCategory(products) {
  const parent = document.querySelector("#products");
  products.forEach((product) => {
    const element = document.createElement("div");
    element.textContent = product.name;
    element.classList.add("product");
    parent.appendChild(element);
  });
  clickProduct(products);
}

function clickProduct(products) {
  const arrayProduct = Array.from(document.querySelectorAll(".product"));
  arrayProduct.forEach((product) => {
    products.forEach((el) => {
      product.addEventListener("click", (e) => {
        if (el.name === e.currentTarget.innerText) {
          showInfoProduct(el.information, el.name, el.price);
        }
      });
    });
  });
}

function showInfoProduct(info, name, price) {
  const parent = document.querySelector("#info");
  const element = document.createElement("div");
  element.textContent = info;
  element.classList.add("info");
  parent.appendChild(element);
  const btn = document.createElement("button");
  btn.textContent = "купить";
  parent.appendChild(btn);
  btn.addEventListener("click", () => btnClick(name, price));
}

function btnClick(name, price) {
  const getOrder = JSON.parse(localStorage.getItem("order")) || [];
  getOrder.push({ name, price });
  const order = JSON.stringify(getOrder);
  localStorage.setItem("order", order);
  showForm();
}

function showForm() {
  const parent = document.querySelector("form");

  const inputName = document.createElement("input");
  inputName.placeholder = "Имя";
  inputName.setAttribute("name", "name");

  const inputCity = document.createElement("input");
  inputCity.placeholder = "город";
  inputCity.setAttribute("name", "city");

  const inputOfficePost = document.createElement("input");
  inputOfficePost.placeholder = "отделение почты";
  inputOfficePost.setAttribute("name", "office_post");

  const inputNumbersOrder = document.createElement("input");
  inputNumbersOrder.placeholder = "количество товара";
  inputNumbersOrder.setAttribute("name", "numbers_order");

  const arrayInput = [inputName, inputCity, inputOfficePost, inputNumbersOrder];
  arrayInput.forEach((input) => {
    input.setAttribute("type", "text");
    parent.appendChild(input);
  });
  const btnForm = document.createElement("input");
  btnForm.value = "оформить";
  btnForm.setAttribute("type", "button");
  parent.appendChild(btnForm);
  btnForm.addEventListener("click", sendForm);
}

function sendForm() {
  const name = document.querySelector('[name="name"]');
  const city = document.querySelector('[name="city"]');
  const officePost = document.querySelector('[name="office_post"]');
  const numbersOrder = document.querySelector('[name="numbers_order"]');
  const res = validation(name, city, officePost, numbersOrder);

  if (res === false) {
    return;
  }

  console.log({
    name: name.value,
    city: city.value,
    office_post: officePost.value,
    numbers_order: numbersOrder.value,
  });

  const main = document.querySelector("#main");
  main.innerHTML = "Заказ оформлен";
}

function validation(name, city, officePost, numbersOrder) {
  const validationName = /[А-Яа-я][a-я]+/;
  const validationCity = /^[А-Яа-я]{3,}$/;
  const validationNumbersOrder = /^[1-9][0-9]*$/;
  const validationOfficePost = /^[1-9][0-9]*$/;
  let statusValidation = null;

  if (validationName.test(name.value)) {
    statusValidation = true;
  } else {
    return false;
  }

  if (validationCity.test(city.value)) {
    statusValidation = true;
  } else {
    return false;
  }

  if (validationOfficePost.test(officePost.value)) {
    statusValidation = true;
  } else {
    return false;
  }

  if (validationNumbersOrder.test(numbersOrder.value)) {
    statusValidation = true;
  } else {
    return false;
  }

  if (statusValidation === true) {
    return true;
  }
}

function clickBtnMyOrder() {
  const btnMyOrder = document.querySelector(".my-order");
  btnMyOrder.addEventListener("click", () => {
    const getOrder = JSON.parse(localStorage.getItem("order"));
    showListOrders(getOrder);
  });
}

clickBtnMyOrder()

function showListOrders(orders) {
  const parent = document.querySelector("#main");
  parent.textContent = ''
  orders.forEach((el) => {
    const element = document.createElement("div");
    element.textContent = `Товар:${el.name} 
    Цена:${el.price}`;
    parent.appendChild(element);
  });
}
