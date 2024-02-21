let spinner = document.getElementById("spinn");
let spinny = document.getElementById("spinny");
let alerty = document.getElementById("alerty");
let checkBox = document.getElementById("checkBox");
const grabInput = document.getElementById("fib-input");
const grabOutput = document.getElementById("display-result");
const grabButton = document.getElementById("mybutton");
let listFib = document.getElementById("list-fib");
let dropDown1 = document.getElementById("dropdown-1");
let dropDown2 = document.getElementById("dropdown-2");
let dropDown3 = document.getElementById("dropdown-3");
let dropDown4 = document.getElementById("dropdown-4");

function showSpinner() {
  spinner.removeAttribute("class");
  spinner.setAttribute("class", "spinner-border");
}
function hideSpinner() {
  spinner.removeAttribute("class");
  spinner.setAttribute("class", "spinner-border d-none");
}
function showSpinny() {
  spinny.removeAttribute("class");
  spinny.setAttribute("class", "spinner-border");
}
function hideSpinny() {
  spinny.removeAttribute("class");
  spinny.setAttribute("class", "spinner-border d-none");
}
function showAlert() {
  alerty.removeAttribute("class");
  alerty.setAttribute("class", "alert alert-danger align-self-end");
  grabInput.removeAttribute("class");
  grabInput.setAttribute(
    "class",
    "mx-2 inputfield align-self-start alert alert-danger"
  );
}
function hideAlert() {
  alerty.removeAttribute("class");
  alerty.setAttribute("class", "alert alert-danger align-self-end d-none");
  grabInput.removeAttribute("class");
  grabInput.setAttribute("class", "mx-2 inputfield align-self-start");
}
function showError(errorText) {
  grabOutput.removeAttribute("class");
  grabOutput.setAttribute("class", "border-bottom fibonacciNumber text-danger");
  grabOutput.textContent = "Server Error: " + errorText;
}
function hideError() {
  grabOutput.removeAttribute("class");
  grabOutput.setAttribute("class", "border-bottom fibonacciNumber");
}

async function serverCalculator() {
  try {
    const response = await axios.get(
      config.API_ENDPOINT + "fibonacci/" + grabInput.value
    );
    grabOutput.textContent = response.data.result;
    hideError();
  } catch (error) {
    console.log(error);
    showError(error);
  } finally {
    hideSpinner();
  }
}

async function fibList() {
  try {
    const response = await axios.get(
      config.API_ENDPOINT + "getFibonacciOutcomes"
    );
    showSpinny();
    console.log(response.data);
    let list = response.data;
    let html = "";
    for (let i = list.length - 6; i < list.length; i++) {
      html +=
        ` <p class="my-2  border-dark border-bottom"> The Fibonnaci Of <span class="fw-bold">` +
        list[i].number +
        `</span> is <span class="fw-bold">` +
        list[i].result +
        `</span>. Calculated at: ` +
        new Date(list[i].createdDate) +
        `</p>`;
    }
    listFib.innerHTML = html;
  } catch (error) {
    console.log(error);
  } finally {
    hideSpinny();
  }
}

addEventListener("load", fibList);

async function calculate() {
  if (grabInput.value <= 50 && grabInput.value > -1) {
    showSpinner();
    serverCalculator();
    hideAlert();
  } else {
    showAlert();
  }
  fibList();
}
grabButton.addEventListener("click", calculate);

function numberAsc(a, b) {
  if (a.number > b.number) {
    return 1;
  } else {
    return -1;
  }
}

async function dropdown1() {
  try {
    const response = await axios.get(
      config.API_ENDPOINT + "getFibonacciOutcomes"
    );
    let list = response.data.sort(numberAsc);
    let html = "";
    for (let i = 0; i < 6; i++) {
      html +=
        ` <p class="my-2">
The Fibonnaci Of <span class="fw-bold">` +
        list[i].number +
        `</span> is <span class="fw-bold">` +
        list[i].result +
        `</span>. Calculated at: ` +
        new Date(list[i].createdDate) +
        `
</p>`;
    }
    listFib.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
dropDown1.addEventListener("click", dropdown1);
function numberDesc(a, b) {
  if (a.number > b.number) {
    return -1;
  } else {
    return 1;
  }
}
async function dropdown2() {
  const response = await axios.get(
    config.API_ENDPOINT + "getFibonacciOutcomes"
  );

  let list = response.data.sort(numberDesc);
  let html = "";
  for (let i = 0; i < 6; i++) {
    html +=
      ` <p class="my-2"> The Fibonnaci Of <span class="fw-bold">` +
      list[i].number +
      `</span> is <span class="fw-bold">` +
      list[i].result +
      `</span>. Calculated at: ` +
      new Date(list[i].createdDate) +
      `</p>`;
  }
  listFib.innerHTML = html;
}
dropDown2.addEventListener("click", dropdown2);
function dateAsc(a, b) {
  if (a.createdDate > b.createdDate) {
    return 1;
  } else {
    return -1;
  }
}
async function dropdown3() {
  const response = await axios.get(
    config.API_ENDPOINT + "getFibonacciOutcomes"
  );

  let list = response.data.sort(dateAsc);
  let html = "";
  for (let i = 0; i < 6; i++) {
    html =
      html +
      ` <p class="my-2"> The Fibonnaci Of <span class="fw-bold">` +
      list[i].number +
      `</span> is <span class="fw-bold">` +
      list[i].result +
      `</span>. Calculated at: ` +
      new Date(list[i].createdDate) +
      `</p>`;
  }
  listFib.innerHTML = html;
}
dropDown3.addEventListener("click", dropdown3);
function dateDesc(a, b) {
  if (a.createdDate > b.createdDate) {
    return -1;
  } else {
    return 1;
  }
}
async function dropdown4() {
  const response = await axios.get(
    config.API_ENDPOINT + "getFibonacciOutcomes"
  );

  let list = response.data.sort(dateDesc);
  let html = "";
  for (let i = 0; i < 6; i++) {
    html =
      html +
      ` <p class="my-2">
The Fibonnaci Of <span class="fw-bold">` +
      list[i].number +
      `</span> is <span class="fw-bold">` +
      list[i].result +
      `</span>. Calculated at: ` +
      new Date(list[i].createdDate) +
      `
</p>`;
  }
  listFib.innerHTML = html;
}
dropDown4.addEventListener("click", dropdown4);
