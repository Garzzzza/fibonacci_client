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
function localCalculator(n) {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}
function serverCalculator() {
  fetch(config.API_ENDPOINT + "fibonacci/" + grabInput.value)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          grabOutput.textContent = data.result;
          hideError();
        });
      } else {
        response.text().then(function (errorText) {
          showError(errorText);
        });
      }
    })
    .catch((error) => {
      console.log("ERROR " + error);
    })
    .finally(() => {
      hideSpinner();
    });
}
function fibList() {
  fetch(config.API_ENDPOINT + "getFibonacciResults")
    .then(function (response) {
      if (response.ok) {
        showSpinny();
        response.json().then(function (data) {
          let list = data.results;
          let html = "";
          for (let i = list.length - 6; i < list.length; i++) {
            html +=
              ` <p class="my-2  border-dark border-bottom">
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
        });
      }
    })
    .finally(() => {
      hideSpinny();
    });
}
addEventListener("load", fibList);
function calculate() {
  if (grabInput.value <= 50 && grabInput.value > -1) {
    showSpinner();
    hideAlert();
    if (checkBox.checked == true) {
      serverCalculator();
      hideAlert();
    } else {
      grabOutput.textContent = localCalculator(grabInput.value);
      hideSpinner();
    }
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
function dropdown1() {
  fetch(config.API_ENDPOINT + "getFibonacciResults").then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let list = data.results.sort(numberAsc);
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
      });
    }
  });
}
dropDown1.addEventListener("click", dropdown1);
function numberDesc(a, b) {
  if (a.number > b.number) {
    return -1;
  } else {
    return 1;
  }
}
function dropdown2() {
  fetch(config.API_ENDPOINT + "getFibonacciResults").then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let list = data.results.sort(numberDesc);
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
      });
    }
  });
}
dropDown2.addEventListener("click", dropdown2);
function dateAsc(a, b) {
  if (a.createdDate > b.createdDate) {
    return 1;
  } else {
    return -1;
  }
}
function dropdown3() {
  fetch(config.API_ENDPOINT + "getFibonacciResults").then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let list = data.results.sort(dateAsc);
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
      });
    }
  });
}
dropDown3.addEventListener("click", dropdown3);
function dateDesc(a, b) {
  if (a.createdDate > b.createdDate) {
    return -1;
  } else {
    return 1;
  }
}
function dropdown4() {
  fetch(config.API_ENDPOINT + "getFibonacciResults").then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let list = data.results.sort(dateDesc);
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
      });
    }
  });
}
dropDown4.addEventListener("click", dropdown4);
