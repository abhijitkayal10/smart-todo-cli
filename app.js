const { readJSON } = require("./utils");
const { addTasks, listTask, deleteTask, doneTask, clearTask, pendingTask, completedTask, editTask, statsTask} = require("./taskService");

const tasks = readJSON();

const command = process.argv[2];


const helpTask = () => {
 
    console.log(`
Smart TODO CLI

Commands:

  add <task>              Add a new task
  list                    Show all tasks
  edit <number> <task>    Edit a task
  done <number>           Mark a task as completed
  delete <number>         Delete a task
  pending                 Show pending tasks
  completed               Show completed tasks
  clear                   Delete all tasks
  help                    Show this help
  `);
};
if (!command) {
  console.log("❌ No command provided.");
  console.log("💡 Try: node app.js help");
  return;
}
if (command === "add") {
  addTasks(process.argv[3], tasks);
} else if (command == "list") {
  listTask(tasks);
} else if (command == "delete") {
  deleteTask(Number(process.argv[3]),tasks);
} else if (command == "done") {
  doneTask(tasks, Number(process.argv[3]));
} else if (command == "clear") {
  clearTask(tasks, process.argv[3]);
} else if (command == "pending") {
  pendingTask(tasks);
} else if (command == "completed") {
  completedTask(tasks);
} else if (command == "edit") {
  editTask(process.argv[3],process.argv[4], tasks);
} else if (command == "stats") {
  statsTask(tasks);
} else if (command == "help" || command == "--help" || command == "-h") {
  helpTask();
} else {console.log("Invalid Command"); helpTask()};
