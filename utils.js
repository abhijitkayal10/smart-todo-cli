const fs = require("fs");

const FILE_NAME = "tasks.json";
const writeJSON = (tasks) => {
  fs.writeFileSync(FILE_NAME, JSON.stringify(tasks, null, 2));
};



const readJSON = () => {
  try {
    const fileData = fs.readFileSync(FILE_NAME, "utf8");

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
