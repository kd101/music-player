const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progressContainer');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');



//Music array 

const songs = [
{
    name:'Desree',
    displayName:'Life',
    artist:'Desree',
},

{
    name:'Tevin',
    displayName:'Tevin Campbell',
    artist:'Tevin',
},

{
    name:'Sade',
    displayName:'Your Love Is King',
    artist:'Sade',



    
}
]


//Check if playing 
let isPlaying = false;

 
//play
function playSong() {
    isPlaying =true;
    playBtn.classList.replace('fa-play', "fa-pause");
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong(){
    isPlaying = false; 
    playBtn.classList.replace('fa-pause', 'fa-play' )
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Event listener Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong() ) );

//update the DOM 

function loadSong(song){
title.textContent = song.displayName;
artist.textContent = song.artist;
music.src = `music/${song.name}.MP3`;
image.src = `img/${song.name}.jpg`;

}

function prevSong(){
    songIndex--;
    if(songIndex<0) {
songIndex = songs.length -1;

    }
    loadSong(songs[songIndex]);
    playSong();
    }



function nextSong(){
songIndex++;
if(songIndex > songs.length - 1) {
    songIndex = 0; 
        }
loadSong(songs[songIndex]);
playSong();
}

//current song 

let songIndex = 0;


//update progress bar and Time

function updateProgressBar(e){
if (isPlaying){
  const {duration , currentTime} = e.srcElement;
  //Update progress bar with 
  const progressPercent = (currentTime/ duration) * 100; 
  progress.style.width = `${progressPercent}%`;
//calculate duration display

const durationMinutes = Math.floor(duration / 60);
let durationSeconds = Math.floor(duration % 60);
if(durationSeconds<10){
    durationSeconds = `0${durationSeconds}`;
}
//delay switching duration element to avoid NaN
if(durationSeconds) {
    durationEL.textContent = `${durationMinutes}:${durationSeconds}`;

}
//calculate duration current time
const currentMinutes = Math.floor(currentTime/ 60);
let currentSeconds = Math.floor(currentTime % 60);
if(currentSeconds<10){
    currentSeconds = `0${currentSeconds}`;
}
currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;

}

}

//On load select first song 
loadSong(songs[songIndex]);

//EVENT LISTENER

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);