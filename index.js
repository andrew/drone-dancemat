var DancematController = require('./dancemat')
var dancemat = new DancematController

var arDrone = require('ar-drone');

var client = arDrone.createClient();

dancemat.on("start:press", function(key) {
  console.log("start press (takeoff)");
  client.disableEmergency();
  client.animateLeds('snakeGreenRed', 5, 4*60)
  return client.takeoff();
});

dancemat.on("select:press", function(key) {
  console.log("select press (land)");
  return client.land();
});

var speed = 0.7

var sideflip = 0

dancemat.on("left:press", function(key) {
  if(sideflip > 0) {
    client.animate('flipLeft', 1500);
    console.log('flip')
  } else {
    sideflip = 1
    console.log("left press (left)");
    return client.left(speed);
  }
});

dancemat.on("right:press", function(key) {
  if(sideflip > 0) {
    client.animate('flipRight', 1500);
    console.log('flip')
  } else {
    sideflip = 1
    console.log("right press (right)");
    return client.right(speed);
  }
});

dancemat.on("right:release", function(key) {
  sideflip = 0
  console.log("right release (right)");
  return client.stop();
});

dancemat.on("left:release", function(key) {
  sideflip = 0
  console.log("left release (left)");
  return client.stop();
});

var frontflip = 0

dancemat.on("up:press", function(key) {
  if(frontflip > 0) {
    client.animate('flipAhead', 1500);
    console.log('flip')
  } else {
    frontflip = 1
    console.log("up press (up)");
    return client.front(speed);
  }

});

dancemat.on("down:press", function(key) {
  if(frontflip > 0) {
    client.animate('flipBehind', 1500);
    console.log('flip')
  } else {
    frontflip = 1
    console.log("down press (down)");
    return client.front(-speed);
  }
});

dancemat.on("up:release", function(key) {
  frontflip = 0
  console.log("up release (up)");
  return client.stop();
});

dancemat.on("down:release", function(key) {
  frontflip = 0
  console.log("down release (down)");
  return client.stop();
});

dancemat.on("circle:press", function(key) {
  console.log("circle press (circle)");
  return client.down(0.5);
});

dancemat.on("circle:release", function(key) {
  console.log("circle release (circle)");
  return client.stop();
});

dancemat.on("cross:press", function(key) {
  console.log("cross press (circle)");
  return client.up(0.5);
});

dancemat.on("cross:release", function(key) {
  console.log("cross release (cross)");
  return client.stop();
});

dancemat.on("triangle:press", function(key) {
  console.log("triangle press (circle)");
  return client.animate('turnaround', 1500);
});

dancemat.on("square:press", function(key) {
  console.log("square press (circle)");
  return client.animate('wave', 1500);
});


