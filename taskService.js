const { writeJSON } = require("./utils");

const addTasks = (task, tasks) => {
  if (!task || task.trim() === "") {
    console.log("❌ Please provide a task title.");
    return;
  }
  const allTitle = tasks.map((e) => {
    return e.title;
  });
  const repeat = allTitle.find((title) => {
    return title.trim().toLowerCase() == task.trim().toLowerCase();
  });
  if (repeat == undefined) {
    tasks.push({
      title: task,
      complete: false,
    });
    writeJSON(tasks);
    console.log(`The ${task} is Updated Successfully`);
  } else {
    console.log("This task already exist");
  }
};
const listTask = (tasks) => {
  if (tasks.length === 0) {
    console.log("📋 No tasks found.");
    return;
  }
  console.log("\n📋 Your Tasks\n");
  tasks.forEach((e, i) => {
    const status = e.complete ? "[✓]" : "[ ]";
    console.log(`${i + 1}. ${status} ${e.title}`);
  });
  const total = tasks.length;
  const completed = tasks.filter((task) => {
    return task.complete == true;
  }).length;
  const pending = total-completed;
  console.log(`\nTotal: ${total} ||  Completed: ${completed}  ||  Pending:   ${pending}`);
};
const deleteTask = (index, tasks) => {
  if (Number.isNaN(index)) {
    console.log("❌ Please provide a task number.");
    return;
  }
  if ( index < 1 || index > tasks.length) {
    console.log("❌ Task not found.");
    return;
  }
  const deletedTask = tasks[index - 1].title;
  tasks.splice(index - 1, 1);
  console.log(`${deletedTask} Task Deleted Successfully`);
  writeJSON(tasks);
};
const doneTask = (tasks, index) => {
   if (Number.isNaN(index)) {
    console.log("❌ Please provide a task number.");
    return;
  }
  if (index < 1 || index > tasks.length) {
    console.log("❌ Task not found.");
    return;
  }
  tasks[index - 1].complete = true;
  writeJSON(tasks);
  
};
const clearTask = (tasks, option) => {
  if (tasks.length === 0) {
    console.log("📋 No tasks to clear.");
    return;
  }
  if (option !== "--yes") {
    console.log("⚠️ This will delete ALL tasks.");
    console.log("Use: node app.js clear --yes");
    return;
  }
  tasks.length = 0;
  writeJSON(tasks);
  console.log("All tasks deleted successfully!");
};
const pendingTask = (tasks) => {
  if (tasks.length === 0) {
    console.log("📋 No tasks found.");
    return;
  }
  const pending = tasks.filter((task) => {
    return task.complete === false;
  });
  pending.forEach((task) => {
    const index = tasks.indexOf(task);
    console.log(`${index + 1}. [ ] ${task.title}`);
  });
};
const completedTask = (tasks) => {
  if (tasks.length === 0) {
    console.log("📋 No tasks found.");
    return;
  }
  const completed = tasks.filter((task) => {
    return task.complete === true;
  });
  completed.forEach((task) => {
    const index = tasks.indexOf(task);
    console.log(`${index + 1}. [✓] ${task.title}`);
  });
};
const editTask = (index,newTitle, tasks) => {
  if (Number.isNaN(index)){
    console.log("❌ Please Provide a task Number")
  }
  if (index < 1 || index > tasks.length) {
    console.log("❌ Task not found.");
    return;
  }
  if (!newTitle || newTitle.trim() === "") {
    console.log("❌ Please provide a new task title.");
    return;
  }
  const allTitle = tasks.map((e) => {
    return e.title;
  });
  const repeat = allTitle.find((title, i) => {
    return i !== index - 1 && title.trim().toLowerCase() == newTitle.trim().toLowerCase();
  });
  if (repeat == undefined) {
    tasks[index - 1].title = newTitle;
    writeJSON(tasks);
    console.log(`✓ Task updated successfully!`);
  } else {
    console.log("This task already exist");
  }
};
const statsTask = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => {
    return task.complete == true;
  }).length;
  const pending = tasks.filter((task) => {
    return task.complete == false;
  }).length;
  console.log(`
      Total:     ${total}
      Completed: ${completed}
      Pending:   ${pending}
  `);
};
module.exports = {
  addTasks,
  listTask,
  deleteTask,
  doneTask,
  clearTask,
  pendingTask,
  completedTask,
  editTask,
  statsTask,
};
