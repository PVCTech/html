const music = document.getElementById('music');    
const songs = [
    '1.mp3',
    '2.mp3',
    '3.mp3',
    '4.mp3',
    '5.mp3',
    '6.mp3',
    '7.mp3'
];

function playRandomMusic()
{
    const randomIndex = Math.floor(Math.random() * songs.length);    
    music.src = 'music/' + songs[randomIndex];
    music.play();
}

music.addEventListener('ended', playRandomMusic);    
playRandomMusic();