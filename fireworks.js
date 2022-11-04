console.log("this is my fireworks simulation");

const ctx = document.getElementById("myCanvas").getContext("2d");
console.log(ctx);
// the GRAVITY is much less than the actual gravity on Earth to let the fireworks to move slower.
const GRAVITY = -9.81 / 50;

// creating a particle class
class Particle {

  // the particle objects with all their properties
  constructor(x, y, x_v, y_v, x_a, y_a, size, color, haventExploded) {
    this.x = x;
    this.y = y;
    this.x_v = x_v;
    this.y_v = y_v;
    this.x_a = x_a;
    this.y_a = y_a;
    this.size = size;
    this.color = color;
    this.haventExploded = true;

  }

  // draw the particle on the screen
  draw() {

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();

  }

  // moves the particle
  move() {
    this.x = this.x + this.x_v;
    this.y = this.y + this.y_v;

    this.x_v = this.x_v + this.x_a;
    this.y_v = this.y_v + this.y_a;

    // stops the particle if it is outside the canvas
    if (this.y < -10) {

      this.x_v = 0;
      this.y_v = 0;
      this.x_a = 0;
      this.y_a = 0;

    }
  }

  // allows the firework explode if conditions are met
  explode() {

    if (this.y < 150) {

      // this line prevents particles that are not the inital fireworks (particles that are not red) to explode
      if (this.haventExploded == true) {

        console.log("EXPLODE!!");
        this.haventExploded = false;

        // changing the size to 0 can make the particle "disappear"
        this.size = 0;
        console.log(this.haventExploded);

        // when the firework explodes, new particles are created
        // this is stored in another array called part2
        part2.push(new Particle(this.x - 1, this.y - 6, 1.3, -4, 0.01, GRAVITY, 5, "blue", false));
        part2.push(new Particle(this.x + 6, this.y + 3, 1, -1.5, 0.02, GRAVITY, 5, "yellow", false));
        part2.push(new Particle(this.x + 7, this.y - 2, 2, -3, 0.02, GRAVITY, 5, "green", false));
        part2.push(new Particle(this.x - 7, this.y - 4, -2, -3, -0.02, GRAVITY, 5, "purple", false));
        part2.push(new Particle(this.x - 4, this.y + 3, -2, -1.5, -0.02, GRAVITY, 5, "black", false));
        part2.push(new Particle(this.x + 1, this.y - 3, -2, -4, -0.01, GRAVITY, 5, "orange", false))

      }
    }
  }
} // end of class


// this is the cloud object
class Cloud {

  constructor(x, y, x_v, size) {
    this.x = x;
    this.y = y;
    this.x_v = x_v;
    this.size = size;

  }

  // draw the cloud
  draw() {

    ctx.beginPath();
    let cloudColor = "#A9A9A9";
    ctx.fillStyle = cloudColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // we need to fill it everytime to let the code know I am drawing a separate circle every time
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + 30, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x - 20, this.y + 30, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 30, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + 50, this.y + 30, this.size, 0, 2 * Math.PI);
    ctx.fill();

  }

  // the cloud moves
  move() {

    if (myCloud.x > 500) {
      myCloud.x = 0;
    }

    myCloud.x = myCloud.x + myCloud.x_v;

  }
}

// creates a new cloud (new instance)
let myCloud = new Cloud(150, 100, 1, 30);
console.log(myCloud);


let myPart = [];
// when the window reloads, this is the initial firework (new instance)
myPart[0] = new Particle(200, 500, 0.25, -1.2, 0, GRAVITY, 5, "red");
let part2 = [];


// when the user presses the "Press me" button, this function will run and add a firework
function addFireworks() {

  console.log("running function");


  // the x value is determined randomly
  myPart.push(new Particle(Math.random() * 500, 500, 0.25, -1.2, 0, GRAVITY, 5, "red", true));

  console.log(myPart);
  console.log(myCloud);

}

// if the firework is under the cloud, the firework is going to fall to the ground until the cloud is gone
// this is done by changing the velocity into a positive number as the top of the canvas is y=0 and the bottom is y=500
function rain() {

  for (let i in myPart) {

    if (myPart[i].x > myCloud.x && myPart[i].x < myCloud.x + 60 && myPart[i].y < 200) {

      myPart[i].y_v = 15;
    }

  }

}

//function triggered by loading page
function setup() {

  for (i = 0; i < myPart.length; i++) {

    console.log(myPart[i]);
    console.log(myPart[i].size);

    myPart[i].draw();
  }

  // activating an animation (runs over and over)
  window.requestAnimationFrame(draw);
}


let counter = 0;

// down all the components on the myCanvas
function draw() {

  // clear the canvas every time
  ctx.clearRect(0, 0, 500, 500);

  counter++;

  //for (i = 0; i < myPart.length; i++) {
  // draw the red dots (inital fireworks before they explode)
  for (let i in myPart) {

    myPart[i].draw();
    myPart[i].move();
    myPart[i].explode();
    rain();
  }

  // draw the fireworks after they explode
  for (let j in part2) {
    part2[j].draw();
    part2[j].move();

  }

  // draw the cloud and let it move
  myCloud.draw();
  myCloud.move();

//  rain();

  window.requestAnimationFrame(draw);

}
