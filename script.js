let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("task-list");

    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        completedTasks++;
      } else {
        completedTasks--;
      }
      updateProgress();
    });

    const taskTextNode = document.createElement("span");
    taskTextNode.classList.add("task-text");
    taskTextNode.innerText = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      if (checkbox.checked) completedTasks--;
      totalTasks--;
      taskList.removeChild(taskItem);
      updateProgress();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextNode);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    totalTasks++;
    updateProgress();

    taskInput.value = "";
  }
}

// Update the progress bar and animate wave elements
function updateProgress() {
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  document.getElementById("progress-text").innerText = `${Math.round(progressPercent)}%`;

  // Show waves only if there's progress
  const waveElements = document.querySelectorAll(".wave");
  waveElements.forEach(wave => {
    wave.style.opacity = progressPercent > 0 ? "1" : "0";
  });

  // Animate waves based on completion percentage
  gsap.to("#wave1", { duration: 1.5, x: `${progressPercent - 100}%`, ease: "power1.out" });
  gsap.to("#wave2", { duration: 1.8, x: `${progressPercent - 100}%`, ease: "power1.out" });
}
