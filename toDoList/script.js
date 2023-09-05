const myForm = document.querySelector("#task-form");
const input_text = document.querySelector("#input-task");
const task_list_box = document.querySelector(".task-list");
const removeButton = document.querySelector("#remove-task");
const markButton = document.querySelector("#mark-task");

// Call the load_task_list function when the page loads
load_task_list();
function create_task_element(task_text) {
  if (task_text === "") return;
  else {
    //create checkbox
    const task = document.createElement("input");
    task.type = "checkbox";
    task.id = task_text;
    //create label for the checkbox
    const task_label = document.createElement("label");
    task_label.htmlFor = task.id;
    task_label.textContent = task_text;
    //make function to edit task
    task_label.addEventListener("click", (event) => {
      event.preventDefault();
      // Create an input element
      const editedTask = document.createElement("input");
      editedTask.type = "text";
      editedTask.className = "task-being-edited";
      editedTask.value = task_label.textContent;
      let beta_label_text = task_label.textContent;

      // Replace the label's text content with the input element
      const confirmBtn = document.createElement("button");
      const confirmBtn_image = document.createElement("img");
      confirmBtn_image.src = "image/confirm symbol.png";
      confirmBtn_image.className = "confirm-btn";
      confirmBtn.appendChild(confirmBtn_image);
      confirmBtn.addEventListener("click", () => {
        task_label.textContent = editedTask.value;
        task.id = editedTask.value;
        task_container.id = "Div of " + editedTask.value;
        task_label.htmlFor = editedTask.value;
        editedTask.remove();
        confirmBtn.remove();
        rejectBtn.remove();
        save_task_list();
      });

      const rejectBtn = document.createElement("button");
      const rejectBtn_image = document.createElement("img");
      rejectBtn_image.src = "image/reject symbol.png";
      rejectBtn_image.className = "reject-btn";
      rejectBtn.appendChild(rejectBtn_image);
      rejectBtn.addEventListener("click", () => {
        task_label.textContent = beta_label_text;
        editedTask.remove();
        confirmBtn.remove();
        rejectBtn.remove();
        beta_label_text = "";
      });
      if (
        task_container.querySelector(".confirm-btn") &&
        task_container.querySelector(".reject-btn")
      )
        return;

      task_label.textContent = "";
      task_label.appendChild(editedTask);
      task_container.appendChild(confirmBtn);
      task_container.appendChild(rejectBtn);
      // Focus the input element
      editedTask.focus();
    });

    document.createElement("br");
    const task_container = document.createElement("div");
    task_container.id = "Div of " + task_text;
    task_container.className = "uncompleted-task";
    task_container.appendChild(task);
    task_container.appendChild(task_label);
    return task_container;
  }
}
// Update the submit_form function to call the save_task_list function
function submit_form() {
  const inputValue = input_text.value; // get the value of the text input
  task_list_box.appendChild(create_task_element(inputValue));
  input_text.value = ""; // clear the text in the input field
  save_task_list(); // save the task list to localStorage
}

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input_text.value === "") return;
  submit_form();
});
markButton.addEventListener("click", () => {
  const eachContainer = task_list_box.querySelectorAll(
    ".uncompleted-task, .marked-as-completed"
  );
  eachContainer.forEach((checkboxDiv) => {
    const checkboxes = checkboxDiv.querySelector('input[type="checkbox"]');
    if (checkboxes.checked) {
      checkboxDiv.classList.remove("uncompleted-task");
      checkboxDiv.classList.add("marked-as-completed");
    } else if (checkboxDiv.classList.contains("marked-as-completed")) {
      checkboxDiv.classList.add("uncompleted-task");
      checkboxDiv.classList.remove("marked-as-completed");
    }
  });
});
// Update the removeButton event listener to call the save_task_list function
removeButton.addEventListener("click", () => {
  const toDoList = task_list_box.querySelectorAll("input[type='checkbox']");
  toDoList.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentElement.remove();
    }
  });
  save_task_list(); // save the task list to localStorage
});

// Save the task list to localStorage
function save_task_list() {
  const tasks = [];
  const toDoList = task_list_box.querySelectorAll("input[type='checkbox']");
  toDoList.forEach((checkbox) => {
    tasks.push(checkbox.id);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load the task list from localStorage
function load_task_list() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task_text) => {
      task_list_box.appendChild(create_task_element(task_text));
    });
  }
}
