const container = document.querySelector("container"),
mainVideo = document.querySelector("video"),
playPauseBtn = document.querySelector(".play-pause i");

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