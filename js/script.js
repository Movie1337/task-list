let tasks = [
  {
    id: 34765,
    name: "Call Sam For payments",
    description: "Позвоните Сэму для оплаты",
    dateOfCreation: "11.04.2023",
    dateOfChange: "11.04.2023",
    status: false,
  },
  {
    id: 12678,
    name: "Make payment to Bluedart",
    description: "Оплатить Bluedart",
    dateOfCreation: "11.04.2023",
    dateOfChange: "11.04.2023",
    status: false,
  },
  {
    id: 45096,
    name: "Office rent",
    description: "Аренда офиса",
    dateOfCreation: "11.04.2023",
    dateOfChange: "11.04.2023",
    status: false,
  },
  {
    id: 43098,
    name: "Office grocery shopping",
    description: "Покупка продуктов в офисе",
    dateOfCreation: "11.04.2023",
    dateOfChange: "11.04.2023",
    status: false,
  },
  {
    id: 23047,
    name: "Ask for Lunch to Clients",
    description: "Попросите обед у клиентов",
    dateOfCreation: "11.04.2023",
    dateOfChange: "11.04.2023",
    status: false,
  },
];

tasks.forEach((obj) => Object.freeze(obj));

const createTask = function (newTask) {
  tasks.push(newTask);
};

const deleteTask = function (id) {
  const taskId = tasks.findIndex((element) => element.id === id);

  if (taskId !== -1) {
    tasks.splice(taskId, 1);
  }
};

const updateTask = function (task) {
  const taskIndex = tasks.findIndex((element) => {
    return element.id === task.id;
  });

  let date = new Date();
  if (taskIndex !== -1) {
    const newTask = {
      ...tasks[taskIndex],
      ...task,
      dateOfChange: date.toLocaleDateString(),
    };
    tasks.splice(taskIndex, 1, newTask);
  }
};

const taskContainer = document.querySelector(".tasks");

tasks.forEach((task) => {
  taskContainer.innerHTML += `
        <div class="task__number">
            <div class="task__checkbox">
                <label>
                    <input data-task-id="${task.id}" class="task__checkbox-input" type="checkbox" value="${task.status}">
                </label>
            </div>
            <div class="task">
                <div class="task__name">${task.name}</div>
                <div class="task__autor">${task.description}, <br>Дата создания: ${task.dateOfCreation}, <br>Дата изменения: ${task.dateOfChange}</div>
            </div>
            <div class="icons">
                        <i class="fa-sharp fa-solid fa-check check__mark"></i>
                        <i class="fa-sharp fa-solid fa-trash-can trash__can"></i>
                    </div>
            </div>
        </div>
    `;
});

function rerender(task) {
  taskContainer.innerHTML = "";
  tasks.forEach((task) => {
    taskContainer.innerHTML += `
                <div class="task__number">
                    <div class="task__checkbox">
                        <label>
                            <input data-task-id="${task.id}" class="task__checkbox-input" type="checkbox" value="${task.status}">
                        </label>
                    </div>
                    <div class="task">
                        <div class="task__name">${task.name}</div>
                        <div class="task__autor">${task.description}, <br>Дата создания: ${task.dateOfCreation}, <br>Дата изменения: ${task.dateOfChange}</div>
                    </div>
                    <div class="icons">
                        <i class="fa-sharp fa-solid fa-check check__mark"></i>
                        <i class="fa-sharp fa-solid fa-trash-can trash__can"></i>
                    </div>
                </div>
            `;
  });
}

const popup = document.querySelector(".popup");
const buttonShow = document.querySelector(".button-show");
const buttonClose = document.querySelector(".button-close");

buttonShow.addEventListener("click", function () {
  popup.classList.add("popup__open");
});

buttonClose.addEventListener("click", function () {
  popup.classList.remove("popup__open");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popup.classList.remove("popup__open");
  }
});

const newForm = document.querySelector(".add-form");

newForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let date = new Date();
  const nameValue = document.querySelector("#add-form-name").value;
  const descriptionValue = document.querySelector(
    "#add-form-description"
  ).value;
  createTask({
    name: nameValue,
    description: descriptionValue,
    dateOfCreation: date.toLocaleDateString(),
    dateOfChange: date.toLocaleDateString(),
  });
  rerender();
  document.querySelector("#add-form-name").value = "";
  document.querySelector("#add-form-description").value = "";
  popup.classList.remove("popup__open");
});

const checkboxes = document.querySelectorAll(".task__checkbox-input");

checkboxes.forEach((checkbox) => {
  const { taskId } = checkbox.dataset;
  checkbox.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    updateTask({ id: Number(taskId), status: isChecked });
  });
});
