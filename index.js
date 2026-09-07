const taskInput = document.querySelector(".task-text");
const btnCreateTask = document.querySelector(".create-task");
const taskList = document.querySelector(".tasks");
const taskListDone = document.querySelector(".tasks-complete");
const taskArray = [];

// Eventlister der starter funktion så input tekst kommer i liste
btnCreateTask.addEventListener("click", createTask);

// Gør at funktionen "createTask" også virker når man klikker på "Enter" i keyboard
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createTask();
  }
});

// Laver input til object i "Taskarray" og sender videre til function renderlist
function createTask() {
  console.log("creating task");

  const taskObj = {
    taskTxt: taskInput.value,
    taskDone: false,
    id: self.crypto.randomUUID(),
  };

  if (taskInput.value === "") {
    alert("You must write something!");
  } else {
    taskArray.push(taskObj);
    console.log("taskArray", taskArray);
    renderList();
  }
}

// Laver array til punkter i ul liste "tasks"
function renderList() {
  taskList.innerHTML = ""; // tømmer ul listen

  // looper  model (MVC) som er arrayet med tasks
  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" ${task.taskDone ? "checked" : ""}/><p>${task.taskTxt} </p>`;
    const checkBox = li.querySelector('[type = "checkbox"]');
    //Updater og husker om "tasks" er afkryset eller ej

    checkBox.addEventListener("click", (e) => {
      e.preventDefault();
      task.taskDone = !task.taskDone;

      if (task.taskDone === true) {
        taskListDone.appendChild(li);

        console.log("task complete");
      } else {
        console.log("task not complete");
      }

      renderList();
      console.log(task.taskDone);
    });
    taskList.appendChild(li);

    taskInput.value = ""; //Sletter inputfelt tekst
  });
}

function checkingCheckBox() {
  if (task.taskDone === true) {
    console.log("task complete");
  } else {
    console.log("task not complete");
  }
}

//Idk
// <button class="create-task"></button>
// <input type="text" class="task-text" />
// <ul class="tasks"></ul>

