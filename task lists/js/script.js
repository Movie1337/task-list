let tasks = [
{
    id: 34765,
    name: 'Call Sam For payments',
    description: 'Позвоните Сэму для оплаты',
    dateOfCreation: '11.04.2023',
    dateOfChange: '11.04.2023',
    status: false,
},
{
    id: 12678,
    name: 'Make payment to Bluedart',
    description: 'Оплатить Bluedart',
    dateOfCreation: '11.04.2023',
    dateOfChange: '11.04.2023',
    status: false,
},
{
    id: 45096,
    name: 'Office rent',
    description: 'Аренда офиса',
    dateOfCreation: '11.04.2023',
    dateOfChange: '11.04.2023',
    status: false,
},
{
    id: 43098,
    name: 'Office grocery shopping',
    description: 'Покупка продуктов в офисе',
    dateOfCreation: '11.04.2023',
    dateOfChange: '11.04.2023',
    status: false,
},
{
    id: 23047,
    name: 'Ask for Lunch to Clients',
    description: 'Попросите обед у клиентов',
    dateOfCreation: '11.04.2023',
    dateOfChange: '11.04.2023',
    status: false,
}
];

const createTask = function (newTask) { 
    tasks.push(newTask);
};

const deleteTask = function (id) {
    const foundIndex = tasks.findIndex(element => element.id === id);

    if (foundIndex !== -1) {
        tasks.splice(foundIndex, 1);
    }
};

const updateTask = function (task) {   
   const findIndex = tasks.findIndex(element => element.id === task.id);
   
   if (findIndex !== -1) {
        tasks[findIndex] = task;
   }
};

let tasksContainer = document.querySelector('.tasks');

tasks.forEach(task => {
    tasksContainer.innerHTML += `
        <div class="task__number">
            <div class="task__checkbox">
                <label>
                    <input data-task-id="${task.id}" class="task__checkbox-input" type="checkbox">
                </label>
            </div>
            <div class="task">
                <div class="task__name">${task.name}</div>
                <div class="task__autor">${task.description}, Дата создания: ${task.dateOfCreation}, Дата изменения: ${task.dateOfChange}, Статус: ${task.status}</div>
            </div>
            <div class="icons">
                        <i class="fa-sharp fa-solid fa-check check__mark"></i>
                        <i class="fa-sharp fa-solid fa-trash-can trash__can"></i>
                    </div>
            </div>
        </div>
    `;
});

const checkboxInputs = document.querySelectorAll('.task__checkbox-input');

checkboxInputs.forEach(input => {
  input.addEventListener('change', event => {
    const taskId = parseInt(event.target.dataset.taskId);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].status = event.target.checked;
    console.log(tasks);
  });
});