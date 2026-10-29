// Expense Tracker - plain JavaScript, data saved in localStorage

var STORAGE_KEY = "expenses";

// Page elements
var form = document.getElementById("expenseForm");
var nameInput = document.getElementById("name");
var amountInput = document.getElementById("amount");
var categoryInput = document.getElementById("category");
var dateInput = document.getElementById("date");
var expenseList = document.getElementById("expenseList");
var totalAmount = document.getElementById("totalAmount");
var totalCount = document.getElementById("totalCount");
var message = document.getElementById("message");

var expenses = loadExpenses();
var messageTimer;

// Read saved expenses (empty list if nothing saved or data is damaged)
function loadExpenses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// Show a success or error message for 3 seconds
function showMessage(text, type) {
  message.textContent = text;
  message.className = "message show " + type;
  clearTimeout(messageTimer);
  messageTimer = setTimeout(function () {
    message.textContent = "";
    message.className = "message";
  }, 3000);
}

function todayString() {
  var now = new Date();
  var month = String(now.getMonth() + 1).padStart(2, "0");
  var day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}

// Returns an error text, or "" if everything is valid
function validateInputs(name, amount, category, date) {
  if (name === "") return "Please enter the expense name.";
  if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
    return "Amount must be a number greater than 0.";
  }
  if (category === "") return "Please choose a category.";
  if (date === "") return "Please choose a date.";
  return "";
}

function formatMoney(value) {
  return "₹" + value.toFixed(2);
}

// Draw the table, the total and the expense count
function showExpenses() {
  expenseList.innerHTML = "";
  var total = 0;

  if (expenses.length === 0) {
    var emptyRow = document.createElement("tr");
    var emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.className = "empty";
    emptyCell.textContent = "No expenses yet. Add your first one above.";
    emptyRow.appendChild(emptyCell);
    expenseList.appendChild(emptyRow);
  }

  // Newest date first (copy the list so the saved order is not changed)
  var sorted = expenses.slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  sorted.forEach(function (expense) {
    total += expense.amount;

    var row = document.createElement("tr");
    var values = [expense.date, expense.name, expense.category, formatMoney(expense.amount)];

    values.forEach(function (value, index) {
      var cell = document.createElement("td");
      cell.textContent = value; // textContent keeps user text safe
      if (index === 3) cell.className = "num";
      row.appendChild(cell);
    });

    var actionCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteExpense(expense.id);
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    expenseList.appendChild(row);
  });

  totalAmount.textContent = formatMoney(total);
  totalCount.textContent = expenses.length + (expenses.length === 1 ? " expense" : " expenses");
}

function addExpense(event) {
  event.preventDefault();

  var name = nameInput.value.trim();
  var amount = amountInput.value.trim();
  var category = categoryInput.value;
  var date = dateInput.value;

  var error = validateInputs(name, amount, category, date);
  if (error !== "") {
    showMessage(error, "error");
    return;
  }

  expenses.push({
    id: Date.now(),
    name: name,
    amount: Math.round(Number(amount) * 100) / 100,
    category: category,
    date: date
  });

  saveExpenses();
  showExpenses();
  form.reset();
  dateInput.value = todayString();
  showMessage("Expense added.", "success");
}

function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;

  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  saveExpenses();
  showExpenses();
  showMessage("Expense deleted.", "success");
}

form.addEventListener("submit", addExpense);
dateInput.value = todayString();
showExpenses();
