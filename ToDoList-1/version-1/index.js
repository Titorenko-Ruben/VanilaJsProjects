const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const listEl = document.querySelector('#tasks');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const task = input.value;

    if (!task) {
        alert('Please fill out the task');
        return;
    }

    const taskEl = createCustomElement('div', 'task');
    const taskContentEl = createCustomElement('div', 'content');

    taskEl.appendChild(taskContentEl);

    const taskInputEl = createCustomElement('input', 'text');
    taskInputEl.type = 'text';
    taskInputEl.value = task;
    taskInputEl.setAttribute('readonly', true);

    taskContentEl.appendChild(taskInputEl);

    const taskActionsEl = createCustomElement('div', 'actions');

    const task_edit_el = createCustomElement('button', 'edit');
    task_edit_el.innerHTML = 'Edit';

    const task_delete_el = createCustomElement('button', 'delete');
    task_delete_el.innerHTML = 'Delete';

    taskActionsEl.appendChild(task_edit_el);
    taskActionsEl.appendChild(task_delete_el);

    taskEl.appendChild(taskActionsEl);

    listEl.appendChild(taskEl);

    input.value = '';

    task_edit_el.addEventListener('click', function () {
        if (task_edit_el.innerText.toLowerCase() == 'edit') {
            taskInputEl.removeAttribute('readonly');
            taskInputEl.focus();
            task_edit_el.innerText = 'Save';
        } else {
            taskInputEl.setAttribute('readonly', true);
            task_edit_el.innerText = 'Edit';
        }
    });

    task_delete_el.addEventListener('click', function () {
        listEl.removeChild(taskEl);
    });

});

function createCustomElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);

    return elem
}