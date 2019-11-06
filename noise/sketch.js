let rand = getRand();
let mic;
let r = rand % 255;
let g = 192;
let b = 127;

function setup() {
  frameRate(24);
  width = 720;
  height = 540;
  createCanvas(width, height);
  let myDiv = createDiv("click to start mic input");
  myDiv.position(0, 0);
  // Start the audio context on a click/touch event
  userStartAudio().then(function() {
    myDiv.remove();
  });
  mic = new p5.AudioIn();
  mic.start();
}

function getRand() {
  return Math.floor(Math.random() * Math.floor(1080));
}

function draw() {
  micLevel = Math.floor(Math.sqrt(mic.getLevel() * 100)) + 1;
  console.log(micLevel);

  rand++;

  background(0, 0, 0);
  stroke(0);

  for (let i = rand - micLevel; i < rand; i++) {
    beginShape();
    if (micLevel >= 2) {
      noiseSeed(i / 10);
      rand = getRand();
    }

    let c = color(r, g, b);
    fill(c);

    for (let x = 0; x < width; x++) {
      let nx = map(x, 0, width, 0, Math.floor(micLevel) ** 3);
      let y = height * noise(nx);
      strokeWeight(Math.floor(micLevel));
      stroke(r, 255, 255);
      point(x, (y + i) % height);
      strokeWeight(1);
      stroke(0);
      vertex(x, y % height);
    }

    r = Math.floor(r + micLevel) % 255;
    endShape(CLOSE);
  }
  // save();
  // save("mountains.png");
}
