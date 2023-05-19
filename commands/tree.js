const fs = require("fs");
const path = require("path");

// Tree
function treefn(dirPath) {
  // console.log("Tree command implemented for", dirPath);
  if (dirPath === undefined) {
    // console.log("Kindly enter the path");
    treeHelper(process.cwd(), "");
    return;
  } else {
    const doesExist = fs.existsSync(dirPath);
    if (!doesExist) {
      console.log("Kindly enter a valid path");
      return;
    }
  }

  treeHelper(dirPath, "");
}

function treeHelper(dirPath, indent) {
  // is file or folder
  const isFile = fs.lstatSync(dirPath).isFile();
  if (isFile) {
    const fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
  } else {
    const fileName = path.basename(dirPath);
    console.log(indent + "└──" + fileName);
    const children = fs.readdirSync(dirPath);
    for (let i = 0; i < children.length; i++) {
      const childPath = path.join(dirPath, children[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}

module.exports = treefn;
