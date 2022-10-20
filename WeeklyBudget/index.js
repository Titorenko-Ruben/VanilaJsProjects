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
const lowBalance = document.querySelector('#low-balance__text');
const buttonTheme = document.querySelector('#button-theme');
let array = [];

budgetInput.focus();

if (window.location.pathname == '/WeeklyBudget/') {
    if (localStorage.getItem('Items') !== null) {
        expenseUpdate()
    }
}

if (localStorage.getItem('darkTheme') == 'false') {
    enableDarkTheme()
} else if (localStorage.getItem('darkTheme') == 'true') {
    enableDarkTheme()
}

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
        return;
    } else {
        userName = inputName.value;
        inputName.value = '';
    }
    
    if (isNaN(inputPrice.value) || !inputPrice.value) {
        alert('Please write the price of product.');
        return;
    } else {
        userPrice = inputPrice.value;
        userBudgetLeft = userBudgetLeft - userPrice
        expenseLeft.innerHTML = ('Left: $' + userBudgetLeft);
        inputPrice.value = '';
    };
    
    if (userBudgetLeft < 0) {
        expenseLeft.style.color = 'red';
        lowBalance.style.display = 'block';
    };
    
    let item = {
        name: userName,
        price: userPrice
    };
    
    array.push(item)
    localStorage.setItem('Items', JSON.stringify(array))
    expenseUpdate()
});

function createCustomElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    
    return elem;
};

buttonTheme.addEventListener('click', function () {
    if (localStorage.getItem('darkTheme') == 'false') {
        localStorage.setItem('darkTheme', true)
        enableDarkTheme()
    } else if (localStorage.getItem('darkTheme') == 'true') {
        localStorage.setItem('darkTheme', false)
        enableDarkTheme()
    }else if(localStorage.getItem('darkTheme') == null){
        localStorage.setItem('darkTheme', true)
        enableDarkTheme()
    }
})

    function expenseUpdate() {
        let localExpenseData = localStorage.getItem('Items');
        if (localExpenseData.length > 0) array = JSON.parse(localExpenseData)
        
        expenseList.innerHTML = ''
        
        array.forEach(function (item) {
            const expense = createCustomElement('div', 'expense');
            expense.innerHTML = `
            <div class='expense__text'>${item.name}: ${item.price}$</div>   
            `
            expenseList.appendChild(expense);
        })
    }

function enableDarkTheme() {
    const body = document.querySelector('#body');
    const logoText = document.querySelector('.logo-txt');
    const mainText = document.querySelector('.main__text');
    const commonText = document.querySelector('.common__text');
    const commonTextSecond = document.querySelector('.common__text--color');
    const budgetWrapper = document.querySelector('.budget__wrapper');
    const leftWrapper = document.querySelector('.left__wrapper');
    const expenseListText = document.querySelector('.expenses-list__txt');

    if (localStorage.getItem('darkTheme') == 'false') {
        body.classList.remove('body--dark');
        logoText.classList.remove('logo-txt--dark');
        buttonTheme.classList.remove('button-theme--dark');
        budgetInput.classList.remove('weekly-budget__input--dark');
        budgetButton.classList.remove('weekly-budget__button--dark');
        mainText.classList.remove('main__text--dark');
        commonText.classList.remove('common__text--dark');
        commonTextSecond.classList.remove('common__text--dark');
        inputName.classList.remove('daily-expense__input--name--dark');
        inputPrice.classList.remove('daily-expense__input--price--dark');
        expenseButton.classList.remove('daily-expense__btn--dark');
        budgetWrapper.classList.remove('budget__wrapper--dark');
        leftWrapper.classList.remove('left__wrapper--dark');
        expenseListText.classList.remove('expenses-list__txt--dark');

    } else if(localStorage.getItem('darkTheme') == 'true'){
        body.classList.add('body--dark');
        logoText.classList.add('logo-txt--dark');
        buttonTheme.classList.add('button-theme--dark');
        budgetInput.classList.add('weekly-budget__input--dark');
        budgetButton.classList.add('weekly-budget__button--dark');
        mainText.classList.add('main__text--dark');
        commonText.classList.add('common__text--dark');
        commonTextSecond.classList.add('common__text--dark');
        inputName.classList.add('daily-expense__input--name--dark');
        inputPrice.classList.add('daily-expense__input--price--dark');
        expenseButton.classList.add('daily-expense__btn--dark');
        budgetWrapper.classList.add('budget__wrapper--dark');
        leftWrapper.classList.add('left__wrapper--dark');
        expenseListText.classList.add('expenses-list__txt--dark');
    }
}