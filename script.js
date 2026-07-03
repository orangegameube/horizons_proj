// Make the DIV element draggable:
dragElement(document.getElementById("mywindow"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // check to verify if present
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}








document.getElementById("mywindow").style.visibility = "hidden";

function openTab() {
  document.getElementById("mywindow").style.visibility = "visible";
}

function exitTab() {
  document.getElementById("mywindow").style.visibility = "hidden";
}

let maximized = false;
let pos = [];

function resizeTab(id) {
  let element = document.getElementById(id);
  if (maximized == false) {
    var offsets = element.getBoundingClientRect();
    pos.push(offsets.left)
    pos.push(offsets.top)
    // append x and y coordinates to coordinates list
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.resize = "none";
    maximized = true;
  }
  else {
    element.style.width = "40vh";
    element.style.height = "40vh";
    element.style.resize = "both";
    pos.splice(0,A.length)
    maximized = false;
  }
}