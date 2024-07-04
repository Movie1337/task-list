let tasks = [
  {
    id: 34765,
    name: "Call Sam For payments",
    description: "По оплате",
    dateOfCreation: "11.04.2023",
    dateOfChange: "11.04.2023",
    status: false,
  },
];

// Замораживаем объекты, чтобы избежать случайного изменения
tasks.forEach((obj) => Object.freeze(obj));

// Функция для создания новой задачи
const createTask = (newTask) => {
  if (newTask.id !== 34765) {
    // Проверяем ID
    tasks.push(newTask);
  }
};

// Функция для удаления задачи
const deleteTask = (id) => {
  const taskId = tasks.findIndex((element) => element.id === id);

  if (taskId !== -1) {
    tasks.splice(taskId, 1);
  }
};

// Функция для обновления задачи
const updateTask = (task) => {
  const taskIndex = tasks.findIndex((element) => element.id === task.id);

  if (taskIndex !== -1) {
    let date = new Date(); // Обновляем дату изменения
    const newTask = {
      ...tasks[taskIndex],
      ...task,
      dateOfChange: date.toLocaleDateString(),
    };
    tasks.splice(taskIndex, 1, newTask);
  }
};

let selectedTaskIds = []; // Список ID выбранных задач

// Функция для получения ID задачи из элемента
const getTaskIdFromElement = (element) => {
  return Number(
    element.closest(".task__number").querySelector(".task__checkbox-input")
      .dataset.taskId
  );
};

// Функция для удаления задачи из списка
const deleteTaskFromList = (element) => {
  if (selectedTaskIds.length > 0) {
    selectedTaskIds.forEach((taskId) => {
      deleteTask(taskId);
    });
    selectedTaskIds = []; // Очищаем список выбранных задач
  } else {
    const taskId = getTaskIdFromElement(element);
    deleteTask(taskId);
  }
  renderTasks();
};

// Функция для отрисовки списка задач
const renderTasks = () => {
  const taskContainer = document.querySelector(".tasks");
  taskContainer.innerHTML = ""; // Очищаем контейнер

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskContainer.appendChild(taskElement);
  });
};

// Функция для создания HTML элемента задачи
const createTaskElement = (task) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task__number");
  taskElement.innerHTML = `
        <div class="task__checkbox">
            <label>
                <input data-task-id="${
                  task.id
                }" class="task__checkbox-input" type="checkbox" value="${
    task.status
  }" ${task.status ? "checked" : ""}>
            </label>
        </div>
        <div class="task">
            <div class="task__name">${task.name}</div>
            <div class="task__autor">${task.description}, <br>Дата создания: ${
    task.dateOfCreation
  }, <br>Дата изменения: ${task.dateOfChange}</div>
        </div>
        <div class="task__icons">
            <div class="task__icons-button"><i class="fa-sharp fa-solid fa-check check__mark"></i></div>
            <div class="task__icons-button"><i class="fa-sharp fa-solid fa-trash-can trash__can"></i></div>
        </div>
    `;

  return taskElement;
};

// Обработчик событий для taskContainer
const taskContainer = document.querySelector(".tasks");
taskContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("check__mark")) {
    // Изменение статуса задачи
    const taskId = getTaskIdFromElement(event.target);
    const checkbox = event.target
      .closest(".task__number")
      .querySelector(".task__checkbox-input");
    checkbox.checked = !checkbox.checked; // Переключаем состояние чекбокса
    updateTask({ id: taskId, status: checkbox.checked }); // Обновляем статус
    renderTasks(); // Перерисовываем список

    if (checkbox.checked) {
      selectedTaskIds.push(taskId); // Добавляем ID в список выбранных задач
    } else {
      const index = selectedTaskIds.indexOf(taskId);
      if (index > -1) {
        selectedTaskIds.splice(index, 1); // Удаляем ID из списка выбранных задач
      }
    }
  } else if (event.target.classList.contains("trash__can")) {
    // Удаление задачи
    deleteTaskFromList(event.target);
  }
});

// Форма добавления новой задачи
const popup = document.querySelector(".popup");
const buttonShow = document.querySelector(".button-show");
const buttonClose = document.querySelector(".button-close");
const newForm = document.querySelector(".popup__add-form");

buttonShow.addEventListener("click", () => {
  popup.classList.add("popup__open");
});

buttonClose.addEventListener("click", () => {
  popup.classList.remove("popup__open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    popup.classList.remove("popup__open");
  }
});

newForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let date = new Date();
  const nameValue = document.querySelector("#popup__add-form-name").value;
  const descriptionValue = document.querySelector(
    "#popup__add-form-description"
  ).value;

  // Генерация уникального ID (можно использовать более надежный метод)
  const newId = Date.now();

  createTask({
    id: newId, // Используем сгенерированный ID
    name: nameValue,
    description: descriptionValue,
    dateOfCreation: date.toLocaleDateString(),
    dateOfChange: date.toLocaleDateString(),
    status: false,
  });

  renderTasks();
  document.querySelector("#popup__add-form-name").value = "";
  document.querySelector("#popup__add-form-description").value = "";
  popup.classList.remove("popup__open");
});

// Инициализация списка задач при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
