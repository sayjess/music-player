const albumImage = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector("audio");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeOfSong = document.getElementById('current-time');
const durationOfSong = document.getElementById('duration');

// Music Container
const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: 'Jacinto Design',
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: 'Jacinto Design',
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight Disco Queen",
        artist: 'Jacinto Design',
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: 'Metric/Jacinto Design',
    }
]

//Check if Playing
let isPlaying = false;

//Play
function playSong(){
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong(){
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listener
playButton.addEventListener('click', 
() => (isPlaying ? pauseSong() : playSong()))


//Update DOM
function loadSong (song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    albumImage.src = `img/${song.name}.jpg`;
}

//Current Song
let i = 0;
//On Load - First Song
loadSong(songs[i]);

//Load Next Song
function nextButtonClick(){
    if (i < songs.length - 1){
        i++;
    }
    else{
        i = 1;
    }
    loadSong(songs[i]);
    playSong();  
}

//Load Previous Song
function prevButtonClick(){
    if (i > 0){
        i--;
    }
    else{
        i = songs.length - 1;
    }
    loadSong(songs[i]);
    playSong();  
}

//Update Progress Bar and Time
function updateProgressBar(e){
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        //update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        //delay switching of duration to avoid NaN
        if (durationSeconds){ //if durationseconds have a value, or you can use durationminutes
            durationOfSong.innerText = `${durationMinutes}:${durationSeconds}`
        }
        //calculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        //delay switching of duration to avoid NaN
        if (currentTimeSeconds){
            currentTimeOfSong.innerText = `${currentTimeMinutes}:${currentTimeSeconds}`
        }
    }
}
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    const progressClick = (clickX/width) * duration;
    progress.style.width = `${progressClick}%`;
    music.currentTime = progressClick;

}

nextButton.addEventListener('click', nextButtonClick)
prevButton.addEventListener('click', prevButtonClick)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextButtonClick);