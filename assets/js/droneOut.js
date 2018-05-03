var xhr = new XMLHttpRequest();

$("#goBtn").click(function() {
  $('html,body').animate({
    scrollTop: $("#controlPg").offset().top},
      'slow');
});

function call(name) {

  xhr.open('GET', name, true);
  xhr.send();
}

var arc = 0;

$(document).on('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$(document).keyup(function(e) {
  call('hover');
  command = "hover";
  console.log("hover");
});

$(document).on('keydown', function(event) {
  var x = event.which;
  var command = "none";
  switch (x) {
    case 38:
      call('up');
      command = "up";
      break;
    case 40:
      call('down');
      command = "down";
      break;
    case 37:
      call('counterClockwise');
      command = "counterClockwise";
      break;
    case 39:
      call('clockwise');
      command = "clockwise";
      break;
    case 87:
      call('front');
      command = "forward";
      break;
    case 83:
      call('back');
      command = "backward";
      break;
    case 65:
      call('left');
      command = "left";
      break;
    case 68:
      call('right');
      command = "right";
      break;
    case 84:
      call('takeoff');
      command = "takeoff";
      break;
    case 76:
      call('land');
      command = "land";
      break;
    default:
      call('hover');
      command = "hover";
  }


  document.getElementById("demo").innerHTML = "Unicode value: " + x + "Command: " + command;
})

function releaseKey(event) {
  call('hover');
  document.getElementById("demo").innerHTML = "HOVER";
}

window.setInterval("reloadIFrame();", 10000);

 function reloadIFrame() {
   //document.getElementById("iframe_drone_image").src = "http://localhost:3000/drone_image.html";
 }
