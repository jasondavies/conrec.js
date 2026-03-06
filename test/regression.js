const assert = require("assert");
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
  const source = fs.readFileSync(path.join(__dirname, "..", "example", "data.js"), "utf8");
  vm.runInNewContext(source, sandbox);
  return sandbox.data.map(function(row) {
    return row.slice();
  });
}

function addCliffEdge(data, cliff) {
  data.push(new Array(data[0].length).fill(cliff));
  data.unshift(new Array(data[0].length).fill(cliff));
  data.forEach(function(row) {
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

function assertClosed(levels) {
  const data = loadExampleData();
  const contour = new Conrec();

  addCliffEdge(data, -1000);

  const xs = Array.from({ length: data.length }, function(_, i) { return i; });
  const ys = Array.from({ length: data[0].length }, function(_, i) { return i; });

  contour.contour(data, 0, xs.length - 1, 0, ys.length - 1, xs, ys, levels.length, levels);

  const contours = contour.contourList();
  const openContours = contours.filter(function(points) {
    return !isClosed(points);
  });

  assert.strictEqual(openContours.length, 0, JSON.stringify({
    levels: levels,
    openContours: openContours
  }, null, 2));
}

const Conrec = loadConrec();

assertClosed([0]);
assertClosed(Array.from({ length: 16 }, function(_, i) {
  return -5 + (i * 0.5);
}));
