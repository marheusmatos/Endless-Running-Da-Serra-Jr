let character;
let obstacles = [];
let groundLevel;

function setup() {
  createCanvas(800, 400);
  character = new Character();
  groundLevel = height - 50;
}

function draw() {
  background(220);
  character.update();
  character.show();

  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  for (let obs of obstacles) {
    obs.update();
    obs.show();
  }

  obstacles = obstacles.filter((obs) => !obs.offscreen());

  fill(0);
  rect(0, groundLevel, width, 10);
}

class Character {
  constructor() {
    this.r = 50;
    this.x = 50;
    this.y = groundLevel - this.r;
    this.gravity = 1;
    this.lift = -20;
    this.velocity = 0;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > groundLevel - this.r) {
      this.y = groundLevel - this.r;
      this.velocity = 0;
    }
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.r, this.r);

    // Add an arc to indicate jumping motion
    if (this.velocity !== 0) {
      stroke(0, 0, 255); // Blue color for arc
      strokeWeight(2);
      noFill();
      arc(this.x + this.r / 2, this.y + this.r / 2, this.r, this.r, PI, TWO_PI);
    }
  }

  jump() {
    if (this.y == groundLevel - this.r) {
      this.velocity += this.lift;
    }
  }
}

class Obstacle {
  constructor() {
    this.r = 50;
    this.x = width;
    this.y = groundLevel - this.r;
    this.speed = 6;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.r, this.r);
  }

  offscreen() {
    return this.x < -this.r;
  }
}

function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    character.jump();
  }
}
