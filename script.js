console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/song-1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Let Me Love You - Justin Bieber, DJ Snake", filePath:"songs/song-1.mp3", coverPath: "covers/cover-1.jpg" },
    {songName: "Memories - Maroon 5 ", filePath:"songs/song-2.mp3", coverPath: "covers/cover-2.jpg" },
    {songName: "I'll Be Waiting - Cian Ducrot", filePath:"songs/song-3.mp3", coverPath: "covers/cover-3.jpg" },
    {songName: "Attention - Charlie Puth", filePath:"songs/song-4.mp3", coverPath: "covers/cover-4.jpg" },
    {songName: "Love Me Like You Do - Ellie Goulding", filePath:"songs/song-5.mp3", coverPath: "covers/cover-5.jpg" },
    {songName: "Senorita - Shawn Mendes ", filePath:"songs/song-6.mp3", coverPath: "covers/cover-6.jpg" },
    {songName: "FRIENDS - DJ Marshmello, Anne-Marie", filePath:"songs/song-7.mp3", coverPath: "covers/cover-7.jpg" },
    {songName: "Stay With Me - Chanyeol and Punch ", filePath:"songs/song-8.mp3", coverPath: "covers/cover-8.jpg" },
    {songName: "Lily - Alan Walker", filePath:"songs/song-9.mp3", coverPath: "covers/cover-9.jpg" },
    {songName: "Into Your Arms - Ava Max, Witt Lowry", filePath:"songs/song-10.mp3", coverPath: "covers/cover-10.jpg" },
]

songItems.forEach((element,i) => {
    // console.log(element ,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
}
)

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/song-${songIndex+1}.mp3`;

        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})


document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
    songIndex -= 1;
    }
    audioElement.src = `songs/song-${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 9){
        songIndex=0
    }
    else{
    songIndex += 1;
    }
    audioElement.src = `songs/song-${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

