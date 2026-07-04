// Make the DIV element draggable:
dragElement(document.getElementById("aboutwindow"));
dragElement(document.getElementById("musicwindow"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "edge")) {
    // check to verify if present
    document.getElementById(elmnt.id + "edge").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (maximized) return;
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








document.getElementById("aboutwindow").style.visibility = "hidden";
document.getElementById("musicwindow").style.visibility = "hidden";

function openTab(id) {
  document.getElementById(id).style.visibility = "visible";
}

function exitTab(id) {
  document.getElementById(id).style.visibility = "hidden";
}

let maximized = false;
let pos = [];
let size = [];

function resizeTab(id) {
  let element = document.getElementById(id);
  // check if the tab is already maximized
  if (maximized == false) {
    var ogWindow = element.getBoundingClientRect();
    pos.push(ogWindow.left);
    pos.push(ogWindow.top);
    size.push(ogWindow.width);
    size.push(ogWindow.height);
    // saving the position and sizing of the original tiny window
    element.style.left = "0px";
    element.style.top = "0px";
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.resize = "none";
    maximized = true;
    // making the window big!
  }
  else {
    element.style.resize = "both";
    element.style.left = pos[0] + "px";
    element.style.top = pos[1] + "px";
    element.style.width = size[0] + "px";
    element.style.height = size[1] + "px";
    // make the window small again with its original sizing!
    pos.splice(0,pos.length)
    size.splice(0,size.length)
    // restore lists to original blank states
    maximized = false;
  }
}










// MUSIC PLAYER TIME!!!!!

function musicPlayer(id, img, title){
  let source = document.getElementById("musiccontrols");
  let audio = document.getElementById("audiocontrols");
  source.src=id;
  // replace source with new path to audio file
  audio.load();
  // load audio controls to be ready with new song
  let albumimg = document.getElementById("albumcoverimg");
  albumimg.src=img;
  document.getElementById("songname").textContent=title;
}