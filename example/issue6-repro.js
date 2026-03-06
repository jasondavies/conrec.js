const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadConrec() {
  const sandbox = { window: {} };
  const source = fs.readFileSync(path.join(__dirname, "..", "conrec.js"), "utf8");
  vm.runInNewContext(source, sandbox);
  return sandbox.window.Conrec;
}

function loadExampleData() {
  const sandbox = {};
  const source = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
  vm.runInNewContext(source, sandbox);
  return sandbox.data.map(row => row.slice());
}

function addCliffEdge(data, cliff) {
  data.push(new Array(data[0].length).fill(cliff));
  data.unshift(new Array(data[0].length).fill(cliff));
  data.forEach(row => {
    row.push(cliff);
    row.unshift(cliff);
  });
}

function isClosed(contour) {
  const first = contour[0];
  const last = contour[contour.length - 1];
  const dx = first.x - last.x;
  const dy = first.y - last.y;
  return dx * dx + dy * dy < 1e-16;
}

const Conrec = loadConrec();
const data = loadExampleData();
const cliff = -1000;

addCliffEdge(data, cliff);

const contour = new Conrec();
const xs = Array.from({ length: data.length }, (_, i) => i);
const ys = Array.from({ length: data[0].length }, (_, i) => i);
const levels = [0];

contour.contour(data, 0, xs.length - 1, 0, ys.length - 1, xs, ys, levels.length, levels);

const contours = contour.contourList();
const openContours = contours.filter(points => !isClosed(points));

console.log("Cliff-edge contour repro");
console.log("Dataset: example/data.js");
console.log("Contour levels:", JSON.stringify(levels));
console.log("Total contours:", contours.length);
console.log("Open contours after padding:", openContours.length);

openContours.forEach((points, index) => {
  console.log(JSON.stringify({
    contour: index,
    level: points.level,
    length: points.length,
    start: points[0],
    end: points[points.length - 1]
  }, null, 2));
});

if (openContours.length) {
  process.exitCode = 1;
}
