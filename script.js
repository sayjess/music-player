const albumImage = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector("audio");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

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
    title.textContent = song.displayName;
    artist.textContent = song.artist;
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

nextButton.addEventListener('click', nextButtonClick)
prevButton.addEventListener('click', prevButtonClick)