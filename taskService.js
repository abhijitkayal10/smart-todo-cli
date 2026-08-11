const { writeJSON } = require("./utils");

const addTasks = (task, tasks) => {
  if (!task || task.trim() === "") {
    console.log("❌ Please provide a task title.");
    return;
  }
  const allTitle = tasks.map((e) => {
    return e.title;
  });
  const cleanTask = task.trim();
  const repeat = allTitle.find((title) => {
    return title.trim().toLowerCase() == cleanTask.toLowerCase();
  });
  if (repeat == undefined) {
    tasks.push({
      title: cleanTask,
      complete: false,
    });
    writeJSON(tasks);
    console.log(`The ${cleanTask} is Updated Successfully`);
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
  const pending = total - completed;
  console.log(
    `\nTotal: ${total} ||  Completed: ${completed}  ||  Pending:   ${pending}`,
  );
};
const deleteTask = (index, tasks) => {
  if (Number.isNaN(index)) {
    console.log("❌ Please provide a task number.");
    return;
  }
  if (tasks.length == 0) {
    console.log("📋 No tasks to delete.");
    return;
  }
  if (index < 1 || index > tasks.length) {
    console.log("❌ Task not found.");
    return;
  }
  const deletedTask = tasks[index - 1].title;
  tasks.splice(index - 1, 1);
  writeJSON(tasks);
  console.log(`${deletedTask} Task Deleted Successfully`);
};
const doneTask = (tasks, index) => {
  if (tasks.length === 0) {
    console.log("📋 No tasks to complete.");
    return;
  }
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
  console.log(`✅ "${tasks[index - 1].title}" completed successfully!`);
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
  const deletedCount = tasks.length;
  tasks.length = 0;
  writeJSON(tasks);
  console.log(`All ${deletedCount} tasks deleted successfully!`);
};
// Pending Task
const pendingTask = (tasks) => {
  if (tasks.length === 0) {
    console.log("📋 No Pending tasks found.");
    return;
  }
  const pending = tasks.filter((task) => {
    return task.complete === false;
  });
  console.log("\n📌 Pending Tasks\n");
  pending.forEach((task) => {
    const index = tasks.indexOf(task);
    console.log(`${index + 1}. [ ] ${task.title}`);
  });
  console.log(`\nPending: ${pending.length}`);

};
// Completed Task
const completedTask = (tasks) => {
  if (tasks.length === 0) {
    console.log("📋 No Completed tasks found.");
    return;
  }
  const completed = tasks.filter((task) => {
    return task.complete === true;
  });
  console.log("\n📌 Completed Tasks\n");
  completed.forEach((task) => {
    const index = tasks.indexOf(task);
    console.log(`${index + 1}. [✓] ${task.title}`);
  });
  console.log(`\nCompleted: ${completed.length}`);
};
const editTask = (index, newTitle, tasks) => {
  if (Number.isNaN(index)) {
    console.log("❌ Please Provide a task Number");
  }
  if (index < 1 || index > tasks.length) {
    console.log("❌ Task not found.");
    return;
  }
  const cleanTask = newTitle.trim();
  if (!newTitle || cleanTask === "") {
    console.log("❌ Please provide a new task title.");
    return;
  }
  const allTitle = tasks.map((e) => {
    return e.title;
  });

  const repeat = allTitle.find((title, i) => {
    return (
      i !== index - 1 && title.trim().toLowerCase() == cleanTask.toLowerCase()
    );
  });
  if (repeat == undefined) {
    tasks[index - 1].title = cleanTask;
    writeJSON(tasks);
    console.log(`✓ Task updated successfully!`);
  } else {
    console.log("This task already exist");
  }
};
const statsTask = (tasks) => {

  const total = tasks.length;
  if (total == 0){
    console.log(`📊 No tasks available.`)
    return;
  }
  const completed = tasks.filter((task) => {
    return task.complete == true;
  }).length;
  const pending = tasks.filter((task) => {
    return task.complete == false;
  }).length;
  const progress = Math.round((completed/total)*100)
  console.log(`
    \n📊 Task Statistics\n
      Total:     ${total}
      Completed: ${completed}
      Pending:   ${pending}
      Progress:  ${progress}%
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
