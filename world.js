const worlds = {
    beach: {
        name: "Beach",
        backgroundImage: "background/beach.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        songs: [
        {
            title: "Happy Ending",
            artist: "Kep1er",
            file: "audio/beach happy.mp3",
            cover: "album/beach happy.png"
        },
        {
            title: "Phoenix",
            artist: "Straykids",
            file: "audio/beach phoenix.mp3",
            cover: "album phoenix.png"
        }
        ],
        targetLocation: {
        x: 0.72,
        y: 0.48
        },
        completionDistance: 90
    },

    candyland: {
    name: "Candyland",
    backgroundImage: "background/candyland.png",
    tintColor: "rgba(255, 100, 185, 0.35)",
    songs: [
      {
        title: "Candy",
        artist: "Baekhyun",
        file: "audio/candyland candy.mp3",
        cover: "images/candyland candy.png"
      },
      {
        title: "Juice",
        artist: "Mirae",
        file: "audio/candyland juice.mp3",
        cover: "images/candyland juice.png"
      }
    ],
    targetLocation: {
      x: 0.72,
      y: 0.48
    },
    completionDistance: 90
  },

  carnival: {
        name: "Carnival",
        backgroundImage: "background/carnival.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        songs: [
        {
            title: "Popping",
            artist: "ONF",
            file: "audio/carnival popping.mp3",
            cover: "album/carnival popping.png"
        },
        {
            title: "Rock With You",
            artist: "Seventeen",
            file: "audio/carnival rock.mp3",
            cover: "album/carnival rock.png"
        }
        ],
        targetLocation: {
        x: 0.72,
        y: 0.48
        },
        completionDistance: 90
    },

    concert: {
        name: "Concert",
        backgroundImage: "background/concert.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        songs: [
        {
            title: "It's Alright",
            artist: "P1Harmony",
            file: "audio/concert alright.mp3",
            cover: "album/concert alright.png"
        },
        {
            title: "Mic Drop",
            artist: "BTS",
            file: "audio/concert mic.mp3",
            cover: "album/concert mic.png"
        }
        ],
        targetLocation: {
        x: 0.72,
        y: 0.48
        },
        completionDistance: 90
    },

    mansion: {
        name: "Mansion",
        backgroundImage: "background/mansion.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        songs: [
        {
            title: "Make Love",
            artist: "2PM",
            file: "audio/mansion love.mp3",
            cover: "album/mansion love.png"
        },
        {
            title: "Save Me, Save You",
            artist: "WJSN",
            file: "audio/mansion save.mp3",
            cover: "album/mansion save.png"
        }
        ],
        targetLocation: {
        x: 0.72,
        y: 0.48
        },
        completionDistance: 90
    },

    paradise: {
        name: "Paradise",
        backgroundImage: "background/paradise.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        songs: [
        {
            title: "Your Breath",
            artist: "GB9",
            file: "audio/paradise breath.mp3",
            cover: "album/paradise breath.png"
        },
        {
            title: "Please",
            artist: "BTS",
            file: "audio/paradise please.mp3",
            cover: "album/paradise please.png"
        }
        ],
        targetLocation: {
        x: 0.72,
        y: 0.48
        },
        completionDistance: 90
    }

};

const worldParams = new URLSearchParams(window.location.search);
let currentWorldKey = worldParams.get("world");
let currentWorld = worlds[currentWorldKey];
let backgroundImg;

let gameStarted = false;
let gameFrozen = true;
let worldCompleted = false;

let selectedSongIndex = null;
let currentSongIndex = null;
let previewAudio = null;
let musicAudio = null;
let previewStopTimer = null;

let character;
let activeDrag = null;
let limbMoved = false;

let uiPadding = {
  top: 92,
  right: 86,
  bottom: 92,
  left: 86
};

function preload() {
  backgroundImg = loadImage(currentWorld.backgroundImage);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupCharacter();
  setupUiEvents();
  buildSongCards();
  openSongOverlay(true);
  updateClosenessMeter(0);
}

function draw() {
  drawBackground();

  if (gameStarted) {
    character.draw();
    updateCloseness();

    if (!worldCompleted && checkWorldComplete()) {
      completeWorld();
    }
  }
}

function drawBackground() {
  if (backgroundImg) {
    image(backgroundImg, 0, 0, width, height);
  } else {
    background(35, 15, 45);
  }

  fill(0, 0, 0, 35);
  noStroke();
  rect(0, 0, width, height);
}

function setupCharacter() {
  character = {
    x: width / 2,
    y: height / 2,
    scale: 1,
    headRadius: 28,
    torsoLength: 95,
    armLength: 72,
    legLength: 82,
    leftArmAngle: radians(210),
    rightArmAngle: radians(-30),
    leftLegAngle: radians(115),
    rightLegAngle: radians(65),

    getJoints() {
      const shoulder = {
        x: this.x,
        y: this.y - 34
      };

      const hip = {
        x: this.x,
        y: this.y + 46
      };

      return {
        head: {
          x: this.x,
          y: this.y - 82
        },
        shoulder,
        hip,
        leftHand: pointFromAngle(shoulder, this.leftArmAngle, this.armLength),
        rightHand: pointFromAngle(shoulder, this.rightArmAngle, this.armLength),
        leftFoot: pointFromAngle(hip, this.leftLegAngle, this.legLength),
        rightFoot: pointFromAngle(hip, this.rightLegAngle, this.legLength)
      };
    },

    draw() {
      const joints = this.getJoints();

      push();

      drawingContext.shadowBlur = 18;
      drawingContext.shadowColor = "rgba(0, 0, 0, 0.45)";

      stroke(255, 245, 255);
      strokeWeight(10);
      strokeCap(ROUND);

      line(joints.shoulder.x, joints.shoulder.y, joints.hip.x, joints.hip.y);
      line(joints.shoulder.x, joints.shoulder.y, joints.leftHand.x, joints.leftHand.y);
      line(joints.shoulder.x, joints.shoulder.y, joints.rightHand.x, joints.rightHand.y);
      line(joints.hip.x, joints.hip.y, joints.leftFoot.x, joints.leftFoot.y);
      line(joints.hip.x, joints.hip.y, joints.rightFoot.x, joints.rightFoot.y);

      noStroke();
      fill(255, 245, 255);
      circle(joints.head.x, joints.head.y, this.headRadius * 2);

      fill(255, 220, 250);
      circle(joints.leftHand.x, joints.leftHand.y, 18);
      circle(joints.rightHand.x, joints.rightHand.y, 18);
      circle(joints.leftFoot.x, joints.leftFoot.y, 20);
      circle(joints.rightFoot.x, joints.rightFoot.y, 20);

      pop();
    },

    reset() {
      this.x = width / 2;
      this.y = height / 2;
      this.leftArmAngle = radians(210);
      this.rightArmAngle = radians(-30);
      this.leftLegAngle = radians(115);
      this.rightLegAngle = radians(65);
      limbMoved = false;
      worldCompleted = false;
      gameFrozen = false;
      hideModal("completeModal");
    }
  };
}

function pointFromAngle(origin, angle, distance) {
  return {
    x: origin.x + cos(angle) * distance,
    y: origin.y + sin(angle) * distance
  };
}

function mousePressed() {
  if (!gameStarted || gameFrozen || isAnyModalOpen()) {
    return;
  }

  const joints = character.getJoints();

  const handles = [
    {
      name: "leftArm",
      point: joints.leftHand
    },
    {
      name: "rightArm",
      point: joints.rightHand
    },
    {
      name: "leftLeg",
      point: joints.leftFoot
    },
    {
      name: "rightLeg",
      point: joints.rightFoot
    }
  ];

  for (const handle of handles) {
    if (dist(mouseX, mouseY, handle.point.x, handle.point.y) < 28) {
      activeDrag = handle.name;
      return;
    }
  }

  if (dist(mouseX, mouseY, character.x, character.y) < 95) {
    activeDrag = "body";
  }
}

function mouseDragged() {
  if (!activeDrag || gameFrozen || isAnyModalOpen()) {
    return;
  }

  if (activeDrag === "body") {
    character.x = mouseX;
    character.y = mouseY;
    keepCharacterInsideBounds();
    return;
  }

  const joints = character.getJoints();

  if (activeDrag === "leftArm") {
    character.leftArmAngle = atan2(mouseY - joints.shoulder.y, mouseX - joints.shoulder.x);
    limbMoved = true;
  }

  if (activeDrag === "rightArm") {
    character.rightArmAngle = atan2(mouseY - joints.shoulder.y, mouseX - joints.shoulder.x);
    limbMoved = true;
  }

  if (activeDrag === "leftLeg") {
    character.leftLegAngle = atan2(mouseY - joints.hip.y, mouseX - joints.hip.x);
    limbMoved = true;
  }

  if (activeDrag === "rightLeg") {
    character.rightLegAngle = atan2(mouseY - joints.hip.y, mouseX - joints.hip.x);
    limbMoved = true;
  }

  keepCharacterInsideBounds();
}

function mouseReleased() {
  activeDrag = null;
}

function keepCharacterInsideBounds() {
  const bodyRadius = 125;

  character.x = constrain(
    character.x,
    uiPadding.left + bodyRadius,
    width - uiPadding.right - bodyRadius
  );

  character.y = constrain(
    character.y,
    uiPadding.top + bodyRadius,
    height - uiPadding.bottom - bodyRadius
  );
}

function updateCloseness() {
  const targetX = currentWorld.targetLocation.x * width;
  const targetY = currentWorld.targetLocation.y * height;

  const maxDistance = dist(
    uiPadding.left,
    uiPadding.top,
    width - uiPadding.right,
    height - uiPadding.bottom
  );

  const currentDistance = dist(character.x, character.y, targetX, targetY);
  const closeness = constrain(1 - currentDistance / maxDistance, 0, 1);

  updateClosenessMeter(closeness);
}

function updateClosenessMeter(closeness) {
  const fill = document.getElementById("closenessFill");
  fill.style.height = `${closeness * 100}%`;
}

function checkWorldComplete() {
  const targetX = currentWorld.targetLocation.x * width;
  const targetY = currentWorld.targetLocation.y * height;
  const currentDistance = dist(character.x, character.y, targetX, targetY);

  return currentDistance <= currentWorld.completionDistance && limbMoved;
}

function completeWorld() {
  worldCompleted = true;
  gameFrozen = true;
  saveWorldProgress();
  saveCompletedWorld();

  document.getElementById("completeText").textContent = `${currentWorld.name} Complete!`;
  showModal("completeModal");
}

function setupUiEvents() {
  document.getElementById("backButton").addEventListener("click", () => {
    if (gameStarted) {
      gameFrozen = true;
      showOverlayTint();
      showModal("leaveModal");
    }
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    if (gameStarted) {
      gameFrozen = true;
      showOverlayTint();
      showModal("resetModal");
    }
  });

  document.getElementById("musicButton").addEventListener("click", () => {
    if (gameStarted) {
      openSongOverlay(false);
    }
  });

  document.getElementById("helpButton").addEventListener("click", () => {
    if (gameStarted) {
      gameFrozen = true;
      showOverlayTint();
      showModal("instructionsModal");
    }
  });

  document.getElementById("saveExitButton").addEventListener("click", () => {
    saveWorldProgress();
    returnToWorldSelect();
  });

  document.getElementById("noSaveExitButton").addEventListener("click", () => {
    returnToWorldSelect();
  });

  document.getElementById("cancelLeaveButton").addEventListener("click", () => {
    hideModal("leaveModal");
    hideOverlayTint();
    gameFrozen = false;
  });

  document.getElementById("confirmResetButton").addEventListener("click", () => {
    character.reset();
    saveWorldProgress();
    hideModal("resetModal");
    hideOverlayTint();
    gameFrozen = false;
  });

  document.getElementById("cancelResetButton").addEventListener("click", () => {
    hideModal("resetModal");
    hideOverlayTint();
    gameFrozen = false;
  });

  document.getElementById("closeInstructionsButton").addEventListener("click", () => {
    hideModal("instructionsModal");
    hideOverlayTint();
    gameFrozen = false;
  });

  document.getElementById("enterWorldButton").addEventListener("click", () => {
    if (selectedSongIndex === null) {
      return;
    }

    currentSongIndex = selectedSongIndex;
    startFullSong(currentSongIndex);
    closeSongOverlay();

    if (!gameStarted) {
      gameStarted = true;
    }

    gameFrozen = false;
  });

  document.getElementById("returnWorldSelectButton").addEventListener("click", () => {
    saveWorldProgress();
    returnToWorldSelect();
  });
}

function buildSongCards() {
  const songCardsContainer = document.getElementById("songCards");
  songCardsContainer.innerHTML = "";

  currentWorld.songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.dataset.index = index;

    card.innerHTML = `
      <img class="song-cover" src="${song.cover}" alt="${song.title} cover" />
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
      <button class="preview-button" type="button">Preview</button>
    `;

    card.addEventListener("click", () => {
      selectSong(index);
      playPreview(index);
    });

    songCardsContainer.appendChild(card);
  });
}

function selectSong(index) {
  selectedSongIndex = index;

  document.querySelectorAll(".song-card").forEach((card) => {
    card.classList.remove("selected");
  });

  const selectedCard = document.querySelector(`.song-card[data-index="${index}"]`);
  if (selectedCard) {
    selectedCard.classList.add("selected");
  }

  const enterButton = document.getElementById("enterWorldButton");
  enterButton.disabled = false;
  enterButton.classList.remove("disabled");
}

function playPreview(index) {
  stopPreview();

  if (musicAudio) {
    musicAudio.pause();
  }

  previewAudio = new Audio(currentWorld.songs[index].file);
  previewAudio.currentTime = 0;
  previewAudio.volume = 0.8;
  previewAudio.play();

  previewStopTimer = setTimeout(() => {
    stopPreview();

    if (musicAudio && currentSongIndex !== null && gameStarted) {
      musicAudio.play();
    }
  }, 8000);
}

function stopPreview() {
  if (previewStopTimer) {
    clearTimeout(previewStopTimer);
    previewStopTimer = null;
  }

  if (previewAudio) {
    previewAudio.pause();
    previewAudio.currentTime = 0;
    previewAudio = null;
  }
}

function startFullSong(index) {
  stopPreview();

  if (musicAudio) {
    musicAudio.pause();
    musicAudio.currentTime = 0;
  }

  musicAudio = new Audio(currentWorld.songs[index].file);
  musicAudio.loop = true;
  musicAudio.volume = 0.75;
  musicAudio.play();
}

function openSongOverlay(isFirstEntry) {
  gameFrozen = true;
  showOverlayTint();
  showModal("songOverlay");

  if (currentSongIndex !== null) {
    selectSong(currentSongIndex);
  } else {
    selectedSongIndex = null;
    document.querySelectorAll(".song-card").forEach((card) => {
      card.classList.remove("selected");
    });

    const enterButton = document.getElementById("enterWorldButton");
    enterButton.disabled = true;
    enterButton.classList.add("disabled");
  }
}

function closeSongOverlay() {
  hideModal("songOverlay");
  hideOverlayTint();
}

function saveWorldProgress() {
  const progress = {
    worldKey: currentWorldKey,
    characterPosition: {
      x: character.x / width,
      y: character.y / height
    },
    characterPose: {
      leftArmAngle: character.leftArmAngle,
      rightArmAngle: character.rightArmAngle,
      leftLegAngle: character.leftLegAngle,
      rightLegAngle: character.rightLegAngle
    },
    selectedSongIndex: currentSongIndex,
    limbMoved,
    completed: worldCompleted
  };

  localStorage.setItem(`worldProgress_${currentWorldKey}`, JSON.stringify(progress));
}

function saveCompletedWorld() {
  const exploredWorlds =
    JSON.parse(localStorage.getItem("dynamicEscapadeExplored")) || [];

  if (!exploredWorlds.includes(currentWorldKey)) {
    exploredWorlds.push(currentWorldKey);
    localStorage.setItem("dynamicEscapadeExplored", JSON.stringify(exploredWorlds));
  }
}

function loadWorldProgress() {
  const saved = localStorage.getItem(`worldProgress_${currentWorldKey}`);

  if (!saved) {
    return;
  }

  const progress = JSON.parse(saved);

  character.x = progress.characterPosition.x * width;
  character.y = progress.characterPosition.y * height;

  character.leftArmAngle = progress.characterPose.leftArmAngle;
  character.rightArmAngle = progress.characterPose.rightArmAngle;
  character.leftLegAngle = progress.characterPose.leftLegAngle;
  character.rightLegAngle = progress.characterPose.rightLegAngle;

  currentSongIndex = progress.selectedSongIndex;
  selectedSongIndex = progress.selectedSongIndex;
  limbMoved = progress.limbMoved;
  worldCompleted = progress.completed;
}

function returnToWorldSelect() {
  stopPreview();

  if (musicAudio) {
    musicAudio.pause();
  }

  sessionStorage.setItem("dynamicEscapadeReturnToSelect", "true");
  window.location.href = "transition.html?next=index.html?screen=select";
}

function showOverlayTint() {
  document.getElementById("overlayTint").classList.remove("hidden");
}

function hideOverlayTint() {
  if (!isAnyModalOpenExceptTint()) {
    document.getElementById("overlayTint").classList.add("hidden");
  }
}

function showModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function hideModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function isAnyModalOpen() {
  const modalIds = [
    "songOverlay",
    "leaveModal",
    "resetModal",
    "instructionsModal",
    "completeModal"
  ];

  return modalIds.some((id) => !document.getElementById(id).classList.contains("hidden"));
}

function isAnyModalOpenExceptTint() {
  return isAnyModalOpen();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  keepCharacterInsideBounds();
}

const customCursor = document.getElementById("customCursor");

let customMouseX = window.innerWidth / 2;
let customMouseY = window.innerHeight / 2;
let cursorX = customMouseX;
let cursorY = customMouseY;
const cursorEase = 0.35;

window.addEventListener("mousemove", (event) => {
  customMouseX = event.clientX;
  customMouseY = event.clientY;
});

function animateCustomCursor() {
  cursorX += (customMouseX - cursorX) * cursorEase;
  cursorY += (customMouseY - cursorY) * cursorEase;

  if (customCursor) {
    customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  }

  requestAnimationFrame(animateCustomCursor);
}

animateCustomCursor();