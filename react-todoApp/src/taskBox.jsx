export default function TaskBox (task_text) {
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
          editedTask.remove();
          confirmBtn.remove();
          rejectBtn.remove();
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