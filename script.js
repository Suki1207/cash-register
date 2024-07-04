let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const purchaseBtnElement = document.querySelector("#purchase-btn");
const cashElement = document.querySelector("#cash");
const changeDueElement = document.querySelector("#change-due");

function calculateCash() {
  const cash = parseFloat(cashElement.value);

  if (cash === price) {
    changeDueElement.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  const remainingCash = cash - price;

  let change = remainingCash;
  const result = [];
  const cidCopy = [...cid];

  const currencyValueMap = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  for (let i = cidCopy.length - 1; i >= 0; i--) {
    const [currency, value] = cidCopy[i];
    const denominationValue = currencyValueMap[currency];
    let count = 0;

    while (change >= denominationValue && cidCopy[i][1] > 0) {
      change -= denominationValue;
      cidCopy[i][1] -= denominationValue;
      count++;
      change = Math.round(change * 100) / 100;
    }

    if (count > 0) {
      result.push([currency, count * denominationValue]);
    }
  }

  const totalCashInDrawer = cidCopy.reduce((acc, cur) => acc + cur[1], 0);

  if (change > 0) {
    changeDueElement.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  } else if (totalCashInDrawer < remainingCash) {
    const closedChange = remainingCash - totalCashInDrawer;
    changeDueElement.innerHTML = `<p>Status: CLOSED PENNY: $${closedChange.toFixed(
      2
    )}</p>`;
  } else {
    changeDueElement.innerHTML = `<p>Status: OPEN ${result
      .map(([currency, value]) => `${currency}: $${value}`)
      .join(" ")}</p>`;
  }
}

purchaseBtnElement.addEventListener("click", calculateCash);
