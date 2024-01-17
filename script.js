let button = document.querySelector("#submit");
let transactions = document.querySelector("#transactions");
let balance = document.querySelector("#balance");

let myArray = JSON.parse(localStorage.getItem("myArray")) || [];
// console.log(myArray);

button.addEventListener("click", (event) => {
  event.preventDefault();
  
  let description = document.querySelector("#text-value").value;
  let amount = document.querySelector("#amount-value").value;

  // adding data into transactions
  if (description.length && amount.length) {
    myArray.push({
      descriptionName: description,
      amountName: amount,
    });
    localStorage.setItem("myArray", JSON.stringify(myArray));

    let template = `
            <li class="items">
                <span class="left">${description}</span>
                <span class="right">${amount}</span>
                <span class="delete fa-solid fa-xmark"></span>
            </li>
    `;

    transactions.innerHTML = transactions.innerHTML + template;

    const total = myArray.reduce((accu, curr) => {
      return accu + parseInt(curr.amountName);
    }, 0);

    let templateSecond = `
         <span id="balance">₹ ${total}</span>
   `;
    balance.innerHTML = templateSecond;
  }

  // adding id in items
  let items = document.getElementsByClassName("items");
  let itemToArray = Array.from(items);
  itemToArray.forEach((value, index) => {
    value.setAttribute("id", index);
  });

  // reset button
  document.querySelector(".new-transaction").reset();
});

// working for local storage
myArray.forEach(function (list) {
  transactions.innerHTML =
    transactions.innerHTML +
    `<li class="items">
 <span class="left">${list.descriptionName}</span>
 <span class="right">${list.amountName}</span>                     
 <span class="delete fa-solid fa-xmark"></span> 
</li>`;
});

const total = myArray.reduce((accu, curr) => {
  return accu + parseInt(curr.amountName);
}, 0);

let templateSecond = `
     <span id="balance">₹ ${total}</span>       
`;
balance.innerHTML = templateSecond;

// click on transaction
transactions.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    let deletedValue = event.target.parentElement.id;
    myArray.splice(deletedValue, 1);

    // local storage
    localStorage.setItem("myArray", JSON.stringify(myArray));

    // adding id in items
    let items = document.getElementsByClassName("items");
    let itemToArray = Array.from(items);
    itemToArray.forEach((value, index) => {
      value.setAttribute("id", index);
    });

    // calculation of total
    const total = myArray.reduce((accu, curr) => {
      return accu + parseInt(curr.amountName);
    }, 0);

    let templateSecond = `
             <span id="balance">₹ ${total}</span>
        `;
    balance.innerHTML = templateSecond;
  }
});
