const fs = require("fs");


const writeJSON = (tasks) => {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
};



const readJSON = () => {
  try {
    const fileData = fs.readFileSync("tasks.json", "utf8");

    return JSON.parse(fileData);
  } catch (error) {
    console.log(
      "⚠️ Could not read tasks.json. Starting with an empty task list.",
    );
      writeJSON([]);
    return [];
  }
};


module.exports = {
  readJSON,
  writeJSON,
};
