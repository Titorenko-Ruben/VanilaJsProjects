const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const submit = document.querySelector('#task-submit');
const listEl = document.querySelector('#tasks');
const buttonAdd = document.querySelector('#button-add');
const loginBtn = document.querySelector('#logout');
const login = document.querySelector('#login');
const tasksPending = document.querySelector('#tasks-pending')
let i = 0;



buttonAdd.addEventListener('click', function(e){
    e.preventDefault();
    buttonAdd.style.display = 'none';
    input.style.display = 'block';
    submit.style.display = 'block';
    
});
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    
    if (input.value === '') {
        alert('Please fill out the task');
        return;
    }
    
    const task = input.value;
    
    
    
    const taskEl = createCustomElement('div', 'task');
    
    const deleteBtn = createCustomElement('button','delete-btn');
    const deleteImg = createCustomElement('img', 'delete-img');
    deleteImg.src = '../../Images/ToDoList/Icons/delete.svg';
    
    deleteBtn.appendChild(deleteImg);
    
    const addBtnDisable = createCustomElement('button', 'add-btn-disable');
    const addImg = createCustomElement('img', 'add-img');
    addImg.src = '../../Images/ToDoList/Icons/add.svg';
    
    addBtnDisable.appendChild(addImg);
    
    const taskTxt = createCustomElement('input','task__text');
    taskTxt.value = task;
    taskTxt.setAttribute('readonly', true);
    
    taskEl.appendChild(deleteBtn);
    taskEl.appendChild(addBtnDisable);
    taskEl.appendChild(taskTxt);
    
    listEl.appendChild(taskEl);

    input.value = '';
    
    buttonAdd.style.display = 'flex';
    input.style.display = 'none';
    submit.style.display = 'none';
    
    i++
    
    deleteBtn.addEventListener('click', function(){
        listEl.removeChild(taskEl);
        i--
        tasksPending.innerHTML = (i+' tasks pending');
    });
    
    addBtnDisable.addEventListener('click', function(){
        addBtnDisable.classList.toggle('add-btn--style')
        taskTxt.classList.toggle('task__text--style')
    });

    tasksPending.innerHTML = (i+' tasks pending');
});

loginBtn.addEventListener('click', function(e){
    e.preventDefault();
    login.style.display = 'flex';

    const closeBtn = document.querySelector('.cancel-btn');
    const loginInput = document.querySelector('#input-login');
    const loginBtn = document.querySelector('.input-btn');
    const userText = document.querySelector('.user__text');

    loginBtn.addEventListener('click', function(e){
        e.preventDefault();
        const name = loginInput.value;
        const userName = ('Hi '+name+'!!');
        userText.innerHTML = userName;
        if(name === ''){
            alert('Please write your name.')
        }else{
            login.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', function(){
        login.style.display = 'none';
    });
});

function createCustomElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    
    return elem;
};

