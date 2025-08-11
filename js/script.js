console.log("Let's Write java script.");
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }


  //Show all the songs in the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of songs) {
    // Replace %20 with space and split by " - "
    const decodedSong = song.replaceAll("%20", " ").replace(".mp3", "");
    const [title, artist] = decodedSong.split(" - ");

    // Add to songUL
    songUL.innerHTML += `
        <li data-src="${song}"> <img class="invert" src="Image_Assets/music.svg" alt="music" width="18">
            <div class="info">
                <div>Song Name: ${title}</div>
                <div>Artist: ${artist || "Unknown Artist"}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="Image_Assets/play.svg" alt="Play" width="18">
            </div> </li>`;
  }

  //     //Play the First Song
  //     var audio = new Audio(songs[0]);
  //     audio.play();

  //     audio.addEventListener("loadeddata",()=>{
  //         console.log(audio.duration, audio.currentSrc, audio.currentTime);
  //     });

  //      Attach an event listener to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((element) => {
    element.addEventListener("click", (e) => {
      const songFile = element.getAttribute("data-src").replace(".mp3","");
      playMusic(songFile+".mp3");
    });
  });

  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track;

  if (!pause) {
    currentSong.play();
    play.src = "Image_Assets/pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track).replace(".mp3", "");
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

  // 🔥 Highlight the currently playing song in the list
  const allSongs = document.querySelectorAll(".songList li");
  allSongs.forEach(li => {
    li.classList.remove("playing");
    const playIcon = li.querySelector(".playnow img");
    if (playIcon) {
      playIcon.src = "Image_Assets/play.svg"; // reset others to play
    }
  });

  const currentLi = Array.from(allSongs).find(li =>
    li.getAttribute("data-src") === track
  );

  if (currentLi) {
    currentLi.classList.add("playing");
    const playIcon = currentLi.querySelector(".playnow img");
    if (playIcon) {
      playIcon.src = "Image_Assets/pause.svg";
    }

    currentLi.scrollIntoView({ behavior: "smooth", block: "center" });
  }

};


async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:5500/songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index]; 
        if (e.href.includes("/songs/")){
            let folder = e.href.split("/").slice(-1)[0];
            // Get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json(); 
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
            <div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <img src="/songs/${folder}/cover.jpg" alt="">
            <h3>${response.title}</h3>
            <p style="font-size: 14px">${response.description}</p>
        </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)  
            playMusic(songs[0])
        })
    })
}

async function main() {

    //Get the list of all Songs
    await getSongs("songs/romantic");
    playMusic(songs[0],true)

    //Display all the albums on the page
    await displayAlbums();

  
  play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play();
        play.src = "Image_Assets/pause.svg";
    }else{
        currentSong.pause();
        play.src = "Image_Assets/play.svg";
    }
  })
  currentSong.volume = 1; // full volume
  document.querySelector(".range input").value = 100;


  //Listen for Time Update Event
  currentSong.addEventListener("timeupdate",()=>{
    // console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
  })

  //Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left = percent +"%";
    currentSong.currentTime = (currentSong.duration*percent)/100;
  })
  
  //Add and event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left = 0;
  });
  
  //Add and event listener for close button
  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-110%";
  });

  //Add and event listener to previous and next
  previous.addEventListener("click",()=>{
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if((index-1)>=0){
        playMusic(songs[index-1]);
    }
  })
  next.addEventListener("click",()=>{
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if((index+1)<songs.length){
        playMusic(songs[index+1]);
    }
  })

  //Add an event to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    currentSong.volume = parseInt(e.target.value)/100;
    if(currentSong.volume==0){
      document.querySelector(".volume img").src = document.querySelector(".volume img").src.replace("Image_Assets/volume.svg","Image_Assets/mute.svg");
    }else{
      document.querySelector(".volume img").src = document.querySelector(".volume img").src.replace("Image_Assets/mute.svg","Image_Assets/volume.svg");
    }
  })

  //Add event listener to mute the track
  document.querySelector(".volume img").addEventListener("click",e=>{
    if(e.target.src.includes("Image_Assets/volume.svg")){
      e.target.src = e.target.src.replace("Image_Assets/volume.svg","Image_Assets/mute.svg");
      currentSong.volume = 0;
      document.querySelector(".range input").value = 0;
    }else{
      e.target.src = e.target.src.replace("Image_Assets/mute.svg","Image_Assets/volume.svg");
      currentSong.volume = 1;
      document.querySelector(".range input").value = 100;
    }
  })

    //To update mute
    document.querySelector(".range input").addEventListener("input", (e) => {
    const volumeValue = parseInt(e.target.value);
    currentSong.volume = volumeValue / 100;

    const icon = document.querySelector(".volume img");
    if (volumeValue === 0) {
      icon.src = "Image_Assets/mute.svg";
    } else {
      icon.src = "Image_Assets/volume.svg";
    }
});


  //KeyBoard Shortcuts
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "Space":
        e.preventDefault();
        if (currentSong.paused) {
          currentSong.play();
          play.src = "Image_Assets/pause.svg";
        } else {
          currentSong.pause();
          play.src = "Image_Assets/play.svg";
        }
        break;

      case "ArrowRight": // Next song
        next.click();
        break;

      case "ArrowLeft": // Previous song
        previous.click();
        break;

      case "ArrowUp":
      currentSong.volume = Math.min(currentSong.volume + 0.1, 1);
      document.querySelector(".range input").value = currentSong.volume * 100;
      break;

      case "ArrowDown":
        currentSong.volume = Math.max(currentSong.volume - 0.1, 0);
        document.querySelector(".range input").value = currentSong.volume * 100;
        break;

    }
  });


  // Handle drag-based seeking
  let isSeeking = false;

  const seekbar = document.querySelector(".seekbar");

  seekbar.addEventListener("mousedown", () => {
    isSeeking = true;
  });

  seekbar.addEventListener("mousemove", (e) => {
    if (isSeeking) {
      const percent = (e.offsetX / seekbar.getBoundingClientRect().width) * 100;
      document.querySelector(".circle").style.left = percent + "%";
      currentSong.currentTime = (currentSong.duration * percent) / 100;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isSeeking) {
      isSeeking = false;
    }
  });

  // Autoplay next song when current ends
  currentSong.addEventListener("ended", () => {
    let index = songs.indexOf(currentSong.src.split("/").pop());
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });


}

main();
