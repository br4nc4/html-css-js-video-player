const container = document.querySelector(".container"),
mainVideo = document.querySelector("video"),
videoTimeline = document.querySelector(".video-timeline"),
progressBar = document.querySelector(".progress-bar"),
volumeBtn = document.querySelector(".volume i"),
volumeSlider = document.querySelector(".left input"),
currentVidTime = document.querySelector(".current-time"),
videoDuration = document.querySelector(".video-duration"),
skipBackward = document.querySelector(".skip-backward i"),
skipForward = document.querySelector(".skip-forward i"),
playPauseBtn = document.querySelector(".play-pause i"),
speedBtn = document.querySelector(".playback-speed span"),
speedOptions = document.querySelector(".speed-options"),
picInPicBtn = document.querySelector(".pic-in-pic span"),
fullscreenBtn = document.querySelector(".fullscreen i");
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
};
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
})

const formatTime = time => {
    //otteniamo i secondi, minuti e ore
    let seconds = Math.floor(time % 60),
    minutes  = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    //aggiungiamo zero all'inizio se il valore è minore di 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0){
        return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
};

mainVideo.addEventListener("timeupdate", e => {
    let { currentTime, duration} = e.target; //otteniamo il tempo corrente e la durata

    let percent = (currentTime / duration) * 100; //otteniamo la percentuale

    progressBar.style.width = `${percent}%`; //passiamo il valore di percent alla width della progressbar

    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", e =>{
    videoDuration.innerText = formatTime(e.target.duration);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; //e.offsetX restituisce la posizione in orizzonatale del mouse
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
} 

videoTimeline.addEventListener("mousedown", () => {
    videoTimeline.addEventListener("mousemove", draggableProgressBar)
});

document.addEventListener("mouseup", () =>{
    videoTimeline.removeEventListener("mousemove", draggableProgressBar)
});

videoTimeline.addEventListener("mousemove", e => {
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX; //otteniamo la posizione del mouse
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeline.clientWidth;
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);
})

volumeBtn.addEventListener("click", () => {
    if (!volumeBtn.classList.contains("fa-volume-high")){ // se l'icona del volume non ha la classe fa-volume-high
        mainVideo.volume = 0.5; //passiamo un valore di 0.5 al volume del video
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0; //passiamo un valore di 0.0 al volume del video, il video sarà muto
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume; // aggiorniamo il valore dello slider asseconda del volume del video
});

volumeSlider.addEventListener("input", e =>{
    mainVideo.volume = e.target.value; // passiamo il valore dello slider al volume del video
    if(e.target.value == 0){
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
});

speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("show"); //aggiunge e rimuove la classe show
})

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => { //aggiunge il click event al tutte le opzioni di velocità di riproduzione
        mainVideo.playbackRate = option.dataset.speed; //passa il valore di option dataset al valore del video playback
        speedOptions.querySelector(".active").classList.remove("active"); //rimuovendo la classe active
        option.classList.add("active") //aggiungendo la classe active
    })
});

document.addEventListener("click", e =>{ //nasconde le opzioni di velocità al click del document
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded"){
        speedOptions.classList.remove("show");
    }
});

picInPicBtn.addEventListener("click", () =>{
    mainVideo.requestPictureInPicture(); //cambia la modalità video in picture in picture
});

fullscreenBtn.addEventListener("click", () =>{
    /* mainVideo.requestFullscreen(); //cambia la risoluzione del video a schermo intero */
    container.classList.toggle("fullscreen"); //cambia la risoluzione del video a schermo intero
    if(document.fullscreenElement){ // se il video è già a schermo intero
        fullscreenBtn.classList.replace("fa-compress", "fa-expand")
        return document.exitFullscreen();
    }

    fullscreenBtn.classList.replace("fa-expand", "fa-compress")
    container.requestFullscreen();
});

skipBackward.addEventListener("click", () => {
    mainVideo.currentTime -= 5; // sottrae 5 secondi dal tempo corrente del video
});

skipForward.addEventListener("click", () => {
    mainVideo.currentTime += 5; // aggiunge 5 secondi dal tempo corrente del video
});

playPauseBtn.addEventListener("click", () => {
    //se il video è in pausa, avvia il video altrimenti metti in pausa il video
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () => {
    // se il video è avviato sostituisce l'icona play con l'icona pause
    playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", () => {
    // se il video è in pausa sostituisce l'icona pause con l'cona play
    playPauseBtn.classList.replace("fa-pause", "fa-play");
});