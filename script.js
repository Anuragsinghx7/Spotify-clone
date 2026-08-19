//Take ALL required elements from the DOM
const tracks = document.querySelectorAll(".track");
const play = document.querySelector(".play");
const back = document.querySelector(".back");
const fore = document.querySelector(".fore");
const songInfo = document.querySelector(".song-info");
const songBanner = document.querySelector(".songBanner");
const range = document.querySelector(".range");

//Create an audio element and set the initial song index
let songIndex = 0;
let songs = [
  { name: "Nayaab-Intro", file: "audio/1.mp3" },
  { name: "Batti", file: "audio/2.mp3" },
  { name: "Chidiya-Udd", file: "audio/3.mp3" },
  { name: "Maina", file: "audio/4.mp3" },
  { name: "Teen-Dost", file: "audio/5.mp3" },
];
let audioEl = new Audio(songs[songIndex].file);
updateTrack();
//play/pause
play.addEventListener("click", () => {
  if (audioEl.paused || audioEl.currentTime <= 0) {
    audioEl.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  } else {
    audioEl.pause();
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  }
});

//Sync the progress bar with the audio playback
audioEl.addEventListener("timeupdate", () => {
  let progress = parseInt((audioEl.currentTime / audioEl.duration) * 100);
  range.value = progress;
});

//Let the progress bar control the audio playback
range.addEventListener("change", () => {
  audioEl.currentTime = (range.value * audioEl.duration) / 100;
});

//Nextrack
fore.addEventListener("click", () => {
  if (audioEl.played) {
    audioEl.pause();
  }
  range.value = 0;
  songIndex = (songIndex + 1) % songs.length;
  audioEl = new Audio(songs[songIndex].file);
  audioEl.play();
  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
  songInfo.textContent = songs[songIndex].name;
  updateTrack();
});

//previous
back.addEventListener("click", () => {
  if (audioEl.played) {
    audioEl.pause();
  }
  songIndex = songIndex - 1;
  if (songIndex <= 0) {
    songIndex = 0;
  }
  audioEl = new Audio(songs[songIndex].file);
  audioEl.play();
  range.value = 0;
  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
  songInfo.textContent = songs[songIndex].name;
  updateTrack();
});

tracks.forEach((div) => {
  div.addEventListener("click", () => {
    if (audioEl.played) {
      audioEl.pause();
    }
    songIndex = parseInt(div.id);
    audioEl = new Audio(songs[songIndex].file);
    audioEl.play();
    range.value = 0;
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    songInfo.textContent = songs[songIndex].name;
    updateTrack();
  });
});

function updateTrack() {
  tracks.forEach((div) => {
    div.classList.remove("thegreen");
  });
  tracks[songIndex].classList.add("thegreen");
}
