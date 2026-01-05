const fs = require("fs");

const [, , command, fileName, content] = process.argv;

if (!command || !fileName) {
  console.log("Usage: node file.js <command> <fileName> [content]");
  console.log("Commands: read, write, delete");
  process.exit(1);
}

switch (command) {
  case "write":
    fs.writeFile(fileName, content || "", (err) => {
      if (err) throw err;
      console.log(`File Created: ${fileName}`);
    });
    break;

  case "read":
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    break;

  case "append":
    fs.appendFile(fileName, content || "", (err) => {
      if (err) throw err;
      console.log(`Content Appended to: ${fileName}`);
    });
    break;

  case "delete":
    fs.unlink(fileName, (err) => {
      if (err) throw err;
      console.log(`File Deleted: ${fileName}`);
    });
    break;

  default:
    console.log("Unknown command. Use read, write, append, or delete.");
}
