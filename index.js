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

  //if statement stopper hvis der ikke er noget i inputfelt
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
    li.innerHTML =
      `<input type="checkbox" ${task.taskDone ? "checked" : ""}/><p>${task.taskTxt} </p>` +
      `<button class="tester"/> <p>${"X"} </p>`;

    const deleteBtn = li.querySelector("button");

    //function for at slette "tasks"
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let deletionNumber = taskArray.indexOf(task);
      console.log(deletionNumber);
      taskArray.splice(deletionNumber, 1);
      renderList();
    });

    const checkBox = li.querySelector('[type = "checkbox"]');

    //function for checkbox
    checkBox.addEventListener("click", (e) => {
      e.preventDefault();
      task.taskDone = !task.taskDone;
      taskListDone.innerHTML = "";
      renderList();
      console.log(task.taskDone);
    });

    //Tasks blilver sorteret i "taskList" og "taskListDone"
    if (task.taskDone === true) {
      taskListDone.appendChild(li);
    } else {
      taskList.appendChild(li);
    }

    taskInput.value = ""; //Sletter inputfelt tekst
  });
}

//Idk
// <button class="create-task"></button>
// <input type="text" class="task-text" />
// <ul class="tasks"></ul>

