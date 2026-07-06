// Make the DIV element draggable:
dragElement(document.getElementById("aboutwindow"));
dragElement(document.getElementById("musicwindow"));
dragElement(document.getElementById("thoughtswindow"));
dragElement(document.getElementById("ultrakillthoughts"));

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
document.getElementById("thoughtswindow").style.visibility = "hidden";
document.getElementById("ultrakillthoughts").style.visibility = "hidden";

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
// make the music player deets load
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
  btnimg.src="images/playbtn.png";
  isPlaying = false;
}

// functionality for custom audio controls
let progbar = document.getElementById("progressbar");
let audio = document.getElementById("audiocontrols");
let btnimg = document.getElementById("btnimg");
let currTime = document.getElementById('time');
let totalTime = document.getElementById('totaltime');

let isPlaying = false;

function togglePlay() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  audio.play();
  isPlaying = true;
  btnimg.src="images/pausebtn.png";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  btnimg.src="images/playbtn.png";
}

function updateProgBar() {
  let seekPosition = 0;
  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);
    progbar.value = seekPosition;

    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime - minutes * 60);
    let totalMins = Math.floor(audio.duration / 60);
    let totalSecs = Math.floor(audio.duration - totalMins * 60);

    if(seconds < 10) {seconds = "0" + seconds; }
    if(minutes < 10) {minutes = "0" + minutes; }
    if(totalSecs < 10) {totalSecs = "0" + totalSecs; }
    if(totalMins < 10) {totalMins = "0" + totalMins; }

    currTime.textContent = minutes + ":" + seconds;
    totalTime.textContent = totalMins + ":" + totalSecs;
  }
}

audio.addEventListener("timeupdate", updateProgBar);
// when current time in audio updates, update progress bar
// update progress bar value itself (where the slider is) with current time value

//
//
//
// I AI GENERATED THIS SNIPPET USING CHATGPT BECAUSE I COULD NOT FIND A SOLUTION ONLINE
// the problem was that when seeking using the progress bar, the audio would "fight back" and result in prog bar changes 
// that weren't what the user wanted (skip to 1 min, it actually goes to like 45 sec)
audio.addEventListener("loadedmetadata", () => {
    progbar.max = audio.duration;
    // sets progress bar maximum to the song's maximum time upon loading song metadata
});

audio.addEventListener("timeupdate", () => {
    progbar.value = audio.currentTime;
    // current time in audio updates with every change in progress bar, so the fighting doesnt happen, as the updates simultaneously happen
});

progbar.addEventListener("input", () => {
    audio.currentTime = progbar.value;
    // the input event activates with every change in the slider, allowing for users to change the time
});
// END OF AI GENERATED SEGMENT
//
//

function toggleLoop() {
  if (document.getElementById('loopbox').checked) {
    audio.loop = true;
  }
  else {
    audio.loop = false;
  }
}
// toggles loop switch

const musicInfo = [["music/clair.mp3", "images/bach.png", "Claude Debussy - Clair de Lune"], ["bach"], ["kaine(vocals)"], ["nierr"]]

let autoplay = false;
function toggleAutoplay() {
  if (document.getElementById('autobox').checked) {
    autoplay = true;
  }
  else {
    autoplay = false;
  }
}

/*/
function autoplaySongs(currentSongPath) {
  if (autoplay = true) {
    console.log(musicInfo.indexOf(currentSongPath))
    let currentIndex = musicInfo.indexOf(currentSongPath)
    let currentSong = musicInfo[currentIndex]
    musicPlayer(musicInfo[currentSong + 1][0], musicInfo[currentSong + 1][1], musicInfo[currentSong + 1][2])
    currentSong++
  }
}

audio.addEventListener("ended", autoplaySongs([document.getElementById("musiccontrols").src.replace("http://127.0.0.1:5500/", ""), 
  document.getElementById("albumcoverimg").src.replace("http://127.0.0.1:5500/", ""), document.getElementById("songname").innerText]))
/*/


// oh god i forgot to bring windows to the front when clicked!!! using the z direction for this
let newz = 10
function raiseWindowZ(id) {
  let window = document.getElementById(id);
  window.style.zIndex = ++ newz;
}