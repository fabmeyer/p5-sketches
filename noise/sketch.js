function setup() {
  width = 2400;
  height = 1000;
  createCanvas(width, height);
}

let rand = Math.floor(Math.random() * Math.floor(10000));

function draw() {
  let r = 255;
  let g = 192;
  let b = 0;
  let times = 255;

  background(r, g, b);
  stroke(0);

  for (let i = rand - times; i < rand; i++) {
    beginShape();
    noiseSeed(i);

    let c = color(r, g, b);
    fill(c);

    for (let x = 0; x < width; x++) {
      let nx = map(x, 0, width, 0, Math.sqrt(times));
      let y = (height * noise(nx) + times / height) % height;
      alpha(i % times);
      stroke(i % times);
      strokeWeight(i % times);
      point(x, y + (i % times));
      alpha(1);
      stroke(0);
      strokeWeight(0.5);
      vertex(x, y);
    }
    r = (r - times / 255) % 255;
    endShape(CLOSE);
  }
  save();
  save("mountains.png");
}
