const fs = require("fs");
const path = require("path");
const types = require("../utils");

// Organize
function organizefn(dirPath) {
  // console.log("Organize command implemented for", dirPath);
  // 1. input -> dir path given
  if (dirPath === undefined) {
    console.log("Kindly enter the path");

    return;
  } else {
    const doesExist = fs.existsSync(dirPath);
    if (!doesExist) {
      console.log("Kindly enter a valid path");
      return;
    }
  }

  // 2. create -> organized_file -> dir
  const destinationPath = path.join(dirPath, "organized_file");
  if (!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);

  // 3. identify category of all files in imput dir
  organizeHelperCategory(dirPath, destinationPath);
}

function organizeHelperCategory(dirPath, destPath) {
  // 3. identify category of all files in imput dir
  const childName = fs.readdirSync(dirPath);
  // console.log(childName);
  for (let i = 0; i < childName.length; i++) {
    const childAdd = path.join(dirPath, childName[i]);
    const isFile = fs.lstatSync(childAdd).isFile();
    if (isFile) {
      const category = getCategory(childName[i]);
      // console.log(`${childName[i]} belongs to ${category} category.`);
      // 4. copy /cut files to that organized dir inside of any of category
      sendFiles(childAdd, destPath, category);
    }
  }
}

function getCategory(name) {
  const ext = path.extname(name).slice(1);
  // console.log(ext);
  for (let type in types) {
    const cTypeArr = types[type];
    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext === cTypeArr[i]) {
        return type;
      }
    }
  }
  return other;
}

function sendFiles(childAdd, destPath, category) {
  const categoryPath = path.join(destPath, category);
  if (!fs.existsSync(categoryPath)) fs.mkdirSync(categoryPath);
  const fileName = path.basename(childAdd);
  const destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(childAdd, destFilePath);
  // fs.unlinkSync(childAdd);
  // console.log(fileName, " Copied to ", category);
}

module.exports = organizefn;
