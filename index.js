let spinner = document.getElementById("spinn");
let spinny = document.getElementById("spinny");
let alerty = document.querySelector(".alert");
let checkBox = document.getElementById("checkBox");
let grabInput = document.querySelector(".inputfield");
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
function showAlert(errorText) {
  alerty.removeAttribute("class");
  alerty.setAttribute("class", "alert alert-danger");
  grabInput.removeAttribute("class");
  grabInput.setAttribute("class", "mx-2 inputfield  alert alert-danger");
  alerty.textContent = "Error:" + " " + errorText;
  grabOutput.textContent = "";
}
function hideAlert() {
  alerty.removeAttribute("class");
  alerty.setAttribute("class", "alert alert-danger  d-none");
  grabInput.removeAttribute("class");
  grabInput.setAttribute("class", "mx-2 inputfield ");
  grabOutput.textContent = "";
  alerty.textContent = "";
}

async function calculate() {
  hideAlert();
  showSpinner();
  try {
    const response = await axios.get(
      config.API_ENDPOINT + "fibonacci/" + grabInput.value
    );
    grabOutput.textContent = response.data.result;
  } catch (error) {
    console.log(error);
    showAlert(error.response.data);
  } finally {
    hideSpinner();
    fibList(dateDesc);
  }
}

async function fibList(sortFunc) {
  try {
    const response = await axios.get(
      config.API_ENDPOINT + "getFibonacciOutcomes"
    );
    showSpinny();
    let list = response.data.sort(sortFunc);
    let html = "";
    for (let i = 0; i < 6; i++) {
      html +=
        ` <p class="my-2"> The Fibonnaci Of <span class="fw-bold">` +
        list[i].number +
        `</span> is <span class="fw-bold">` +
        list[i].result +
        `</span>. Calculated at: ` +
        new Date(list[i].createdDate).toDateString() +
        `</p>`;
    }
    listFib.innerHTML = html;
  } catch (error) {
    console.log(error);
  } finally {
    hideSpinny();
  }
}

function numberAsc(a, b) {
  if (a.number > b.number) {
    return 1;
  } else {
    return -1;
  }
}

function numberDesc(a, b) {
  if (a.number > b.number) {
    return -1;
  } else {
    return 1;
  }
}

function dateAsc(a, b) {
  if (a.createdDate > b.createdDate) {
    return 1;
  } else {
    return -1;
  }
}

function dateDesc(a, b) {
  if (a.createdDate > b.createdDate) {
    return -1;
  } else {
    return 1;
  }
}

addEventListener("load", () => {
  grabInput.value = "";
  fibList(dateDesc);
});
grabButton.addEventListener("click", calculate);
dropDown1.addEventListener("click", () => fibList(numberAsc));
dropDown2.addEventListener("click", () => fibList(numberDesc));
dropDown3.addEventListener("click", () => fibList(dateAsc));
dropDown4.addEventListener("click", () => fibList(dateDesc));
