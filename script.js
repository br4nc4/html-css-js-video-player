const container = document.querySelector("container"),
mainVideo = document.querySelector("video"),
playPauseBtn = document.querySelector(".play-pause i");

playPauseBtn.addEventListener("click", () => {
    //se il video è in pausa, avvia il video altrimenti metti in pausa il video
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});