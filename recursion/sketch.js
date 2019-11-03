function setup() {
  createCanvas(1280, 1280);

  noLoop();
}

function draw() {
  background(255);

  stroke(0);
  noFill();
  drawCircle(640, 640, 600);
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  var factor = 0.5;
  if (d > 10) {
    drawCircle(x + d * factor, y, d * factor);
    drawCircle(x - d * factor, y, d * factor);
    drawCircle(x, y + d * factor, d * factor);
  }
}
