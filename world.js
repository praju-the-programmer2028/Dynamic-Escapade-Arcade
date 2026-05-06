const worlds = {
    beach: {
        name: "Beach",
        backgroundImage: "background/beach.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        barColor: "linear-gradient(to top, #4ee7dc, #ffffff)",
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
            cover: "album/beach phoenix.png"
        }
        ],
        targetLocation: {
        x: 0.72,
        y: 0.48
        },
        completionDistance: 55
    },

    candyland: {
    name: "Candyland",
    backgroundImage: "background/candyland.png",
    tintColor: "rgba(255, 100, 185, 0.35)",
    barColor: "linear-gradient(to top, #ff7bd8, #ffffff)",
    songs: [
      {
        title: "Candy",
        artist: "Baekhyun",
        file: "audio/candyland candy.mp3",
        cover: "album/candyland candy.png"
      },
      {
        title: "Juice",
        artist: "Mirae",
        file: "audio/candyland juice.mp3",
        cover: "album/candyland juice.png"
      }
    ],
    targetLocation: {
      x: 0.72,
      y: 0.48
    },
    completionDistance: 55
  },

  carnival: {
        name: "Carnival",
        backgroundImage: "background/carnival.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        barColor: "linear-gradient(to top, #e45b68, #fff1d8)",
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
        completionDistance: 55
    },

    concert: {
        name: "Concert",
        backgroundImage: "background/concert.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        barColor: "linear-gradient(to top, #f04bc3, #8beaff)",
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
        completionDistance: 55
    },

    mansion: {
        name: "Mansion",
        backgroundImage: "background/mansion.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        barColor: "linear-gradient(to top, #9f163d, #ffd4e3)",
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
        completionDistance: 55
    },

    paradise: {
        name: "Paradise",
        backgroundImage: "background/paradise.png",
        tintColor: "rgba(255, 100, 185, 0.35)",
        barColor: "linear-gradient(to top, #61d99b, #dcfff0)",
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
        completionDistance: 55
    }

};

const worldParams = new URLSearchParams(window.location.search);
let currentWorldKey = worldParams.get("world");
let currentWorld = worlds[currentWorldKey];
let backgroundImg;
let accessoryImages = {};

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

let bodyMoved = false;
let targetLocation = {
  x: 0,
  y: 0
};

const requiredLimbMovement = Math.PI / 6;

let uiPadding = {
  top: 92,
  right: 86,
  bottom: 92,
  left: 86
};

function preload() {
  backgroundImg = loadImage(currentWorld.backgroundImage);

  accessoryImages = {
    beach: loadImage("accessory/sunglasses.webp"),
    candyland: loadImage("accessory/icecream.webp"),
    carnival: loadImage("accessory/cottoncandy.webp"),
    concert: loadImage("accessory/lightstick.png"),
    mansion: loadImage("accessory/crown.png"),
    paradise: loadImage("accessory/flowercrown.png")
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupCharacter();
  randomizeTargetLocation();
  applyWorldBarColor();
  setupUiEvents();
  buildSongCards();
  openSongOverlay(true);
  updateClosenessMeter(0);
}

function randomizeTargetLocation() {
  const bodyRadius = 125;

  const minX = uiPadding.left + bodyRadius;
  const maxX = width - uiPadding.right - bodyRadius;
  const minY = uiPadding.top + bodyRadius;
  const maxY = height - uiPadding.bottom - bodyRadius;

  targetLocation = {
    x: random(minX, maxX),
    y: random(minY, maxY)
  };
}

function applyWorldBarColor() {
  const fill = document.getElementById("closenessFill");

  if (fill && currentWorld.barColor) {
    fill.style.background = currentWorld.barColor;
  }
}

function angleDifference(a, b) {
  return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
}

function updateLimbMoved() {
  const movedEnough =
    angleDifference(character.leftArmAngle, character.startingPose.leftArmAngle) >= requiredLimbMovement ||
    angleDifference(character.rightArmAngle, character.startingPose.rightArmAngle) >= requiredLimbMovement ||
    angleDifference(character.leftLegAngle, character.startingPose.leftLegAngle) >= requiredLimbMovement ||
    angleDifference(character.rightLegAngle, character.startingPose.rightLegAngle) >= requiredLimbMovement;

  limbMoved = movedEnough;
}

function draw() {
  drawBackground();

  if (gameStarted) {
  character.draw();

  if (bodyMoved) {
    updateCloseness();
  } else {
    updateClosenessMeter(0);
  }

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

    startingPose: {
  leftArmAngle: radians(210),
  rightArmAngle: radians(-30),
  leftLegAngle: radians(115),
  rightLegAngle: radians(65)
},

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

      drawWorldAccessory(joints);
    },

    reset() {
  this.x = width / 2;
  this.y = height / 2;
  this.leftArmAngle = this.startingPose.leftArmAngle;
  this.rightArmAngle = this.startingPose.rightArmAngle;
  this.leftLegAngle = this.startingPose.leftLegAngle;
  this.rightLegAngle = this.startingPose.rightLegAngle;

  limbMoved = false;
  bodyMoved = false;
  worldCompleted = false;
  gameFrozen = false;

  randomizeTargetLocation();
  updateClosenessMeter(0);
  hideModal("completeModal");
}
  };
}

function drawWorldAccessory(joints) {
  const accessory = accessoryImages[currentWorldKey];

  if (!accessory) {
    return;
  }

  if (currentWorldKey === "beach") {
    drawHeadAccessory(accessory, joints.head.x, joints.head.y - 5, 75, 0);
  }

  if (currentWorldKey === "candyland") {
    drawHandAccessory(accessory, joints.rightHand.x + 5, joints.rightHand.y - 5, 75, -40);
  }

  if (currentWorldKey === "carnival") {
    drawHandAccessory(accessory, joints.leftHand.x + 8, joints.leftHand.y - 25, 75, 0);
  }

  if (currentWorldKey === "concert") {
    drawHandAccessory(accessory, joints.rightHand.x + 5, joints.rightHand.y - 15, 200, 20);
  }

  if (currentWorldKey === "mansion") {
    drawHeadAccessory(accessory, joints.head.x, joints.head.y - 35, 72, 0);
  }

  if (currentWorldKey === "paradise") {
    drawHeadAccessory(accessory, joints.head.x, joints.head.y - 20, 82, 0);
  }
}

function drawHeadAccessory(img, x, y, accessoryWidth, rotationDegrees) {
  push();
  imageMode(CENTER);
  translate(x, y);
  rotate(radians(rotationDegrees));

  const accessoryHeight = accessoryWidth * (img.height / img.width);
  image(img, 0, 0, accessoryWidth, accessoryHeight);

  pop();
}

function drawHandAccessory(img, x, y, accessoryWidth, rotationDegrees) {
  push();
  imageMode(CENTER);
  translate(x, y);
  rotate(radians(rotationDegrees));

  const accessoryHeight = accessoryWidth * (img.height / img.width);
  image(img, 0, 0, accessoryWidth, accessoryHeight);

  pop();
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
  bodyMoved = true;
  keepCharacterInsideBounds();
  updateCloseness();
  return;
}

  const joints = character.getJoints();

  if (activeDrag === "leftArm") {
    character.leftArmAngle = atan2(mouseY - joints.shoulder.y, mouseX - joints.shoulder.x);
    updateLimbMoved();
  }

  if (activeDrag === "rightArm") {
    character.rightArmAngle = atan2(mouseY - joints.shoulder.y, mouseX - joints.shoulder.x);
    updateLimbMoved();
  }

  if (activeDrag === "leftLeg") {
    character.leftLegAngle = atan2(mouseY - joints.hip.y, mouseX - joints.hip.x);
    updateLimbMoved();
  }

  if (activeDrag === "rightLeg") {
    character.rightLegAngle = atan2(mouseY - joints.hip.y, mouseX - joints.hip.x);
    updateLimbMoved();
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
  if (!bodyMoved) {
    updateClosenessMeter(0);
    return;
  }

  const maxDistance = dist(
    uiPadding.left,
    uiPadding.top,
    width - uiPadding.right,
    height - uiPadding.bottom
  );

  const currentDistance = dist(character.x, character.y, targetLocation.x, targetLocation.y);
  const closeness = constrain(1 - currentDistance / maxDistance, 0, 1);

  updateClosenessMeter(closeness);
}

function updateClosenessMeter(closeness) {
  const fill = document.getElementById("closenessFill");
  fill.style.height = `${closeness * 100}%`;
}

function checkWorldComplete() {
  if (!bodyMoved || !limbMoved) {
    return false;
  }

  const currentDistance = dist(character.x, character.y, targetLocation.x, targetLocation.y);

  return currentDistance <= currentWorld.completionDistance;
}

function completeWorld() {
  worldCompleted = true;
  gameFrozen = true;
  saveCompletedWorld();
  updateClosenessMeter(1);

  document.getElementById("completeText").textContent = `${currentWorld.name} Complete!`;
  showOverlayTint();
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

  document.getElementById("exitWorldButton").addEventListener("click", () => {
  returnToWorldSelect();
});

  document.getElementById("cancelLeaveButton").addEventListener("click", () => {
    hideModal("leaveModal");
    hideOverlayTint();
    gameFrozen = false;
  });

  document.getElementById("confirmResetButton").addEventListener("click", () => {
    character.reset();
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
  JSON.parse(sessionStorage.getItem("dynamicEscapadeExplored")) || [];

    if (!exploredWorlds.includes(currentWorldKey)) {
    exploredWorlds.push(currentWorldKey);
    sessionStorage.setItem("dynamicEscapadeExplored", JSON.stringify(exploredWorlds));
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