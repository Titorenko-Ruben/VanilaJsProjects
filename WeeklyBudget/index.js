const budgetWrapper = document.querySelector('#weekly-budget__wrapper');
const budgetInput = document.querySelector('#weekly-budget__input');
const budgetButton = document.querySelector('#weekly-budget__button');
const expenseForm = document.querySelector('#daily-expense');
const inputName = document.querySelector('#daily-expense__input--name');
const inputPrice = document.querySelector('#daily-expense__input--price');
const expenseButton = document.querySelector('#daily-expense__btn');
const expenseBudget = document.querySelector('#budget__text');
const expenseLeft = document.querySelector('#left__text');
const expenseList = document.querySelector('#expenses-list');
const lowBalance = document.querySelector('#low-balance__text')

budgetInput.focus();

budgetButton.addEventListener('click', function () {
    if (isNaN(budgetInput.value) || !budgetInput.value) {
        alert('Please write the amount.');
        budgetInput.value = '';
        return;
    } else {
        userBudget = budgetInput.value;
        userBudgetLeft = userBudget
        budgetWrapper.style.display = 'none';
        inputName.removeAttribute('readonly');
        inputPrice.removeAttribute('readonly');
        expenseBudget.innerHTML = ('Budget: $' + userBudget);
        expenseLeft.innerHTML = ('Left: $' + userBudget);
    };
});
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!inputName.value) {
        alert('Please write the name of product.');
    } else {
        userName = inputName.value;
        inputName.value = '';
    }
    
    if (isNaN(inputPrice.value) || !inputPrice.value) {
        alert('Please write the price of product.');
    } else {
        userPrice = inputPrice.value;
        userBudgetLeft = userBudgetLeft - userPrice
        expenseLeft.innerHTML = ('Left: $' + userBudgetLeft);
        inputPrice.value = '';
    };

    if (userBudgetLeft < 0){
        expenseLeft.style.color = 'red';
        lowBalance.style.display = 'block';
    };

    const expense = createCustomElement('div', 'expense');
    const expenseText = createCustomElement('div', 'expense__text');
    expenseText.innerHTML= (userName+': $'+userPrice);

    expense.appendChild(expenseText);
    expenseList.appendChild(expense);
});

function createCustomElement(tagName, className){
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    
    return elem; 
};


