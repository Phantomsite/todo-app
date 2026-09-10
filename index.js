const taskInput = document.querySelector(".task-text");
const btnCreateTask = document.querySelector(".create-task");
const taskList = document.querySelector(".tasks");
const taskListDone = document.querySelector(".tasks-complete");
const outdoorTask = document.getElementById("outdoorCheecker");
const datePicked = document.getElementById("datePicker");
const taskArray = [];
let outdoorValue = "inside activity";
const weatherDescription = document.getElementById("weatherDescription");

//Weather overlay const
const overlay = document.querySelector(".overlay");
const closeOverlayBtn = document.getElementById("closeOverlay");

//updates if task is outside
outdoorTask.addEventListener("click", function () {
  if (outdoorValue === "inside activity") {
    outdoorValue = "outside activity";
  } else {
    outdoorValue = "inside activity";
  }
  console.log(outdoorValue);
  return outdoorValue;
});

// starts function to add input text to todo list
btnCreateTask.addEventListener("click", createTask);

//"createTask" can also start by pressing the enter key
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createTask();
  }
});

//input becomes object in "Taskarray" and calls function "renderList"
function createTask() {
  console.log("creating task");

  const taskObj = {
    taskTxt: taskInput.value,
    taskDone: false,
    id: self.crypto.randomUUID(),
    outdoor: outdoorValue,
    date: datePicked.value,
  };

  //cancels function if nothing has been written in input
  if (taskInput.value === "") {
    alert("You must write something");
  } else {
    taskArray.push(taskObj);
    console.log("taskArray", taskArray);
    renderList();
  }
}

//each element in arrray becomes li in ul
function renderList() {
  taskList.innerHTML = ""; // empties ul

  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML =
      `<input type="checkbox" ${task.taskDone ? "checked" : ""}/><p>${task.taskTxt}  </p>` +
      `<p class="tester"> ${" \xa0(" + task.outdoor + ") \xa0" + "task set for " + task.date} </p>` +
      `<button class="delete-btn-styles"/> <p>${"X"} </p>`;

    const testing = li.querySelector("p.tester");

    //Checks if task is "outside"
    if (task.outdoor === "outside activity") {
      testing.classList.add("outside");
      li.innerHTML += `<button class="weatherBtn"/> <p>${"check weather data"} </p>`;

      //opens weather overlay on-click
      li.querySelector("button.weatherBtn").addEventListener("click", () => {
        overlay.classList.add("show");
        weatherDescription.innerHTML = "Look outside";
      });
    } else {
      console.log("inside task");
    }

    const deleteBtn = li.querySelector("button");

    //deletes "tasks"
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let deletionNumber = taskArray.indexOf(task);
      console.log(deletionNumber);
      taskArray.splice(deletionNumber, 1);
      renderList();
    });

    const checkBox = li.querySelector('[type = "checkbox"]');

    //updates when task is checked "done"
    checkBox.addEventListener("click", (e) => {
      e.preventDefault();
      task.taskDone = !task.taskDone;
      taskListDone.innerHTML = "";
      renderList();
      console.log(task.taskDone);
    });

    //Tasks gets sorted into "taskList" and "taskListDone"
    if (task.taskDone === true) {
      taskListDone.appendChild(li);
    } else {
      taskList.appendChild(li);
    }

    //resets input elements
    taskInput.value = "";
    outdoorTask.checked = false;
    outdoorValue = "inside activity";
  });
}

//Closes weather overlay
closeOverlayBtn.addEventListener("click", function () {
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function (closing) {
  if (event.target === overlay) {
    overlay.classList.remove("show");
  }
});

//Idk
// <button class="create-task"></button>
// <input type="text" class="task-text" />
// <ul class="tasks"></ul>

