let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid(10, 10);
}

function draw() {
  background(0);
  grid.draw();
}

function mousePressed() {
  grid.setPanStart(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  grid.setScale(event.delta);
}
