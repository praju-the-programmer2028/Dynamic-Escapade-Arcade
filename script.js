const intro = "DYNAMIC ESCAPADE";

const body = document.body;
const introScreen = document.getElementById("introScreen");
const worldSelectScreen = document.getElementById("worldSelectScreen");

const title = document.getElementById("title");
const exploreBtn = document.getElementById("exploreBtn");
const customCursor = document.getElementById("customCursor");
const bgMusic = document.getElementById("bgMusic");

const portal = document.getElementById("portal");
const portalWorldName = document.getElementById("portalWorldName");
const portalPreview = document.getElementById("portalPreview");
const dialogueText = document.getElementById("dialogueText");
const floatingLayer = document.getElementById("floatingLayer");
const progressCounter = document.getElementById("progressCounter");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

const worlds = [
  {
  key: "beach",
  name: "BEACH",
  themeClass: "theme-paradise",
  previewClass: "paradise-preview",
  page: "transition.html?next=world.html?world=beach",
  dialogue: "BEACH glows with sun and ocean air.",
  floats: [
    { type: "circle", left: "18%", top: "18%", color: "#a8f4d0", delay: "0s" },
    { type: "diamond", left: "80%", top: "24%", color: "#c0ffe7", delay: "0.2s" },
    { type: "circle", left: "24%", top: "72%", color: "#79d8b5", delay: "0.4s" },
    { type: "diamond", left: "76%", top: "68%", color: "#b7ffdf", delay: "0.6s" }
  ]
},
  {
    key: "candyland",
    name: "CANDYLAND",
    themeClass: "theme-candyland",
    previewClass: "candyland-preview",
    page: "transition.html?next=world.html?world=candyland",
    dialogue: "CANDYLAND glows with sugar-sweet color.",
    floats: [
      { type: "circle", left: "18%", top: "22%", color: "#ffd0e8", delay: "0s" },
      { type: "circle", left: "80%", top: "26%", color: "#ff94b8", delay: "0.15s" },
      { type: "circle", left: "26%", top: "72%", color: "#fff0b8", delay: "0.35s" },
      { type: "circle", left: "74%", top: "68%", color: "#ffbfd3", delay: "0.55s" }
    ]
  },
  {
    key: "carnival",
    name: "CARNIVAL",
    themeClass: "theme-carnival",
    previewClass: "carnival-preview",
    page: "transition.html?next=world.html?world=carnival",
    dialogue: "CARNIVAL sparkles just beyond the curtain.",
    floats: [
      { type: "circle", left: "14%", top: "24%", color: "#ffcc5a", delay: "0s" },
      { type: "diamond", left: "82%", top: "20%", color: "#ff5c6c", delay: "0.2s" },
      { type: "circle", left: "23%", top: "74%", color: "#ffe5a3", delay: "0.4s" },
      { type: "diamond", left: "79%", top: "70%", color: "#ffd463", delay: "0.6s" }
    ]
  },
  {
    key: "concert",
    name: "CONCERT",
    themeClass: "theme-concert",
    previewClass: "concert-preview",
    page: "transition.html?next=world.html?world=concert",
    dialogue: "CONCERT calls with lights and thunder.",
    floats: [
      { type: "bar", left: "18%", top: "16%", color: "#ffffff", delay: "0s" },
      { type: "bar", left: "78%", top: "18%", color: "#ffbddf", delay: "0.2s" },
      { type: "circle", left: "25%", top: "74%", color: "#ff95ba", delay: "0.4s" },
      { type: "circle", left: "76%", top: "69%", color: "#ffe3f0", delay: "0.6s" }
    ]
  },
  {
    key: "mansion",
    name: "MANSION",
    themeClass: "theme-mansion",
    previewClass: "mansion-preview",
    page: "transition.html?next=world.html?world=mansion",
    dialogue: "MANSION waits in velvet gold.",
    floats: [
      { type: "diamond", left: "19%", top: "20%", color: "#ffd58e", delay: "0s" },
      { type: "diamond", left: "79%", top: "24%", color: "#ffe7b8", delay: "0.2s" },
      { type: "diamond", left: "25%", top: "72%", color: "#d7b36f", delay: "0.4s" },
      { type: "diamond", left: "75%", top: "68%", color: "#ffdb9a", delay: "0.6s" }
    ]
  },
  {
    key: "paradise",
    name: "PARADISE",
    themeClass: "theme-paradise",
    previewClass: "paradise-preview",
    page: "transition.html?next=world.html?world=paradise",
    dialogue: "PARADISE breathes in green and waterlight.",
    floats: [
      { type: "circle", left: "18%", top: "18%", color: "#a8f4d0", delay: "0s" },
      { type: "diamond", left: "80%", top: "24%", color: "#c0ffe7", delay: "0.2s" },
      { type: "circle", left: "24%", top: "72%", color: "#79d8b5", delay: "0.4s" },
      { type: "diamond", left: "76%", top: "68%", color: "#b7ffdf", delay: "0.6s" }
    ]
  }
];

let typed = "";
let introIndex = 0;
const typingSpeed = 140;

let currentIndex = 0;
let hovered = false;
let musicStarted = false;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
const ease = 0.35;

const exploredWorlds = JSON.parse(localStorage.getItem("dynamicEscapadeExplored")) || [];

const params = new URLSearchParams(window.location.search);
const shouldSkipIntro =
  params.get("screen") === "select" ||
  sessionStorage.getItem("dynamicEscapadeReturnToSelect") === "true";

function typeTitle() {
  if (introIndex < intro.length) {
    typed += intro[introIndex];
    title.textContent = typed;
    introIndex++;
    setTimeout(typeTitle, typingSpeed);
  } else {
    exploreBtn.style.display = "inline-flex";
  }
}

function animateCursor() {
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;
  customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}

function startMusic() {
  if (musicStarted) {
    return Promise.resolve();
  }

  musicStarted = true;
  bgMusic.volume = 0.45;

  return bgMusic.play().catch((error) => {
    console.log("Background music could not play:", error);
    musicStarted = false;
  });
}

function showWorldSelect() {
  introScreen.classList.add("hidden");
  worldSelectScreen.classList.remove("hidden");
  renderWorld();
}

function saveExploredWorld(worldKey) {
  if (!exploredWorlds.includes(worldKey)) {
    exploredWorlds.push(worldKey);
    localStorage.setItem("dynamicEscapadeExplored", JSON.stringify(exploredWorlds));
  }
}

function saveCurrentWorldIndex() {
  sessionStorage.setItem("dynamicEscapadeCurrentIndex", String(currentIndex));
}

function updateProgress() {
  progressCounter.textContent = `★ ${exploredWorlds.length} / ${worlds.length}`;
}

function clearThemeClasses() {
  worlds.forEach((world) => {
    body.classList.remove(world.themeClass);
  });
}

function renderWorld() {
  const world = worlds[currentIndex];

  portal.classList.remove("entering");
  portal.classList.remove("is-hovered");

  portalWorldName.textContent = world.name;
  portalPreview.className = `portal-preview ${world.previewClass}`;

  clearThemeClasses();
  body.classList.remove("world-tinted");
  body.classList.remove("portal-hover");

  if (exploredWorlds.includes(world.key)) {
    body.classList.add(world.themeClass);
    body.classList.add("world-tinted");
    renderFloatingElements(world);
    dialogueText.textContent = `${world.name} has been explored. Enter again?`;
  } else {
    clearFloatingElements();
    dialogueText.textContent = "A NEW WORLD AWAITS...";
  }

  updateProgress();
}

function renderFloatingElements(world) {
  floatingLayer.innerHTML = "";

  world.floats.forEach((item) => {
    const shape = document.createElement("div");
    shape.classList.add("float-shape");
    shape.style.left = item.left;
    shape.style.top = item.top;
    shape.style.animationDelay = item.delay || "0s";

    if (item.type === "circle") {
      shape.classList.add("float-circle");
      shape.style.background = item.color;
    } else if (item.type === "square") {
      shape.classList.add("float-square");
      shape.style.background = item.color;
    } else if (item.type === "diamond") {
      shape.classList.add("float-diamond");
      shape.style.background = item.color;
    } else if (item.type === "bar") {
      shape.classList.add("float-bar");
      shape.style.background = item.color;
    } else if (item.type === "snow") {
      shape.classList.add("float-snow");
      shape.textContent = item.content || "❄";
    }

    floatingLayer.appendChild(shape);
  });
}

function clearFloatingElements() {
  floatingLayer.innerHTML = "";
}

function startHoverState() {
  const world = worlds[currentIndex];
  hovered = true;

  portal.classList.add("is-hovered");
  body.classList.add("portal-hover");
  clearThemeClasses();
  body.classList.add(world.themeClass);
  body.classList.add("world-tinted");
  dialogueText.textContent = world.dialogue;
  renderFloatingElements(world);
}

function endHoverState() {
  const world = worlds[currentIndex];
  hovered = false;

  portal.classList.remove("is-hovered");
  body.classList.remove("portal-hover");

  if (exploredWorlds.includes(world.key)) {
    clearThemeClasses();
    body.classList.add(world.themeClass);
    body.classList.add("world-tinted");
    dialogueText.textContent = `${world.name} has been explored. Enter again?`;
    renderFloatingElements(world);
  } else {
    clearThemeClasses();
    body.classList.remove("world-tinted");
    dialogueText.textContent = "A NEW WORLD AWAITS...";
    clearFloatingElements();
  }
}

function goLeft() {
  currentIndex = (currentIndex - 1 + worlds.length) % worlds.length;
  saveCurrentWorldIndex();
  renderWorld();
  if (hovered) {
    startHoverState();
  }
}

function goRight() {
  currentIndex = (currentIndex + 1) % worlds.length;
  saveCurrentWorldIndex();
  renderWorld();
  if (hovered) {
    startHoverState();
  }
}

function enterWorld() {
  const world = worlds[currentIndex];

  saveCurrentWorldIndex();
  sessionStorage.setItem("dynamicEscapadeReturnToSelect", "true");
  updateProgress();

  window.location.href = world.page;
}

function initializeScreen() {
  const savedIndex = sessionStorage.getItem("dynamicEscapadeCurrentIndex");

  if (savedIndex !== null) {
    const parsedIndex = Number(savedIndex);
    if (!Number.isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < worlds.length) {
      currentIndex = parsedIndex;
    }
  }

  if (shouldSkipIntro) {
    introScreen.classList.add("hidden");
    worldSelectScreen.classList.remove("hidden");
    sessionStorage.removeItem("dynamicEscapadeReturnToSelect");
    renderWorld();
  } else {
    typeTitle();
  }
}

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

exploreBtn.addEventListener("mouseenter", () => {
  body.classList.add("button-hover");
});

exploreBtn.addEventListener("mouseleave", () => {
  body.classList.remove("button-hover");
});

exploreBtn.addEventListener("click", async () => {
  await startMusic();
  showWorldSelect();
});

[leftArrow, rightArrow].forEach((button) => {
  button.addEventListener("mouseenter", () => {
    body.classList.add("arrow-hover");
  });

  button.addEventListener("mouseleave", () => {
    body.classList.remove("arrow-hover");
  });
});

leftArrow.addEventListener("click", goLeft);
rightArrow.addEventListener("click", goRight);

portal.addEventListener("mouseenter", startHoverState);
portal.addEventListener("mouseleave", endHoverState);
portal.addEventListener("click", enterWorld);

window.addEventListener("keydown", (event) => {
  if (!worldSelectScreen.classList.contains("hidden")) {
    if (event.key === "ArrowLeft") {
      goLeft();
    } else if (event.key === "ArrowRight") {
      goRight();
    } else if (event.key === "Enter") {
      enterWorld();
    }
  }
});

initializeScreen();
animateCursor();