#!/usr/bin/env node
const input = process.argv.slice(2);
const fs = require("fs");
const path = require("path");
const helpfn = require("./commands/help");
const organizefn = require("./commands/organize");
const treefn = require("./commands/tree");
const types = require("./utils");
// console.log(input);
// node main.js tree 'directorpath'
// node main.js organize 'directorpath'
// node main.js help

let command = input[0];
switch (command) {
  case "tree":
    treefn(input[1]);
    break;
  case "organize":
    organizefn(input[1]);
    break;
  case "help":
    helpfn();
    break;
  default:
    console.log("Please input right command!");
    break;
}
