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
  themeClass: "theme-beach",
  previewClass: "beach-preview",
  page: "transition.html?next=world.html?world=beach",
  dialogue: "BEACH calls from beneath the tide.",
  floats: [
  { image: "object/shell.png", left: "8%", top: "14%", size: "58px", delay: "0s", rotate: "-8deg" },
  { image: "object/shell.png", left: "28%", top: "24%", size: "38px", delay: "0.3s", rotate: "10deg" },
  { image: "object/shell.png", left: "72%", top: "16%", size: "52px", delay: "0.6s", rotate: "6deg" },
  { image: "object/shell.png", left: "88%", top: "42%", size: "42px", delay: "0.9s", rotate: "-12deg" },
  { image: "object/shell.png", left: "16%", top: "70%", size: "48px", delay: "1.2s", rotate: "14deg" },
  { image: "object/shell.png", left: "78%", top: "76%", size: "64px", delay: "1.5s", rotate: "-5deg" }
]
},
  {
    key: "candyland",
    name: "CANDYLAND",
    themeClass: "theme-candyland",
    previewClass: "candyland-preview",
    page: "transition.html?next=world.html?world=candyland",
    dialogue: "CANDYLAND waits beyond the sugar haze.",
    floats: [
  { image: "object/lollipop.png", left: "9%", top: "18%", size: "62px", delay: "0s", rotate: "-10deg" },
  { image: "object/lollipop.png", left: "31%", top: "12%", size: "42px", delay: "0.3s", rotate: "8deg" },
  { image: "object/lollipop.png", left: "70%", top: "20%", size: "56px", delay: "0.6s", rotate: "12deg" },
  { image: "object/lollipop.png", left: "88%", top: "58%", size: "46px", delay: "0.9s", rotate: "-14deg" },
  { image: "object/lollipop.png", left: "14%", top: "76%", size: "52px", delay: "1.2s", rotate: "10deg" },
  { image: "object/lollipop.png", left: "66%", top: "82%", size: "68px", delay: "1.5s", rotate: "-7deg" }
]
  },
  {
    key: "carnival",
    name: "CARNIVAL",
    themeClass: "theme-carnival",
    previewClass: "carnival-preview",
    page: "transition.html?next=world.html?world=carnival",
    dialogue: "CARNIVAL stirs from striped tents.",
    floats: [
  { image: "object/balloon.png", left: "10%", top: "16%", size: "66px", delay: "0s", rotate: "-6deg" },
  { image: "object/balloon.png", left: "34%", top: "22%", size: "44px", delay: "0.3s", rotate: "8deg" },
  { image: "object/balloon.png", left: "76%", top: "12%", size: "58px", delay: "0.6s", rotate: "5deg" },
  { image: "object/balloon.png", left: "90%", top: "50%", size: "48px", delay: "0.9s", rotate: "-10deg" },
  { image: "object/balloon.png", left: "18%", top: "78%", size: "54px", delay: "1.2s", rotate: "12deg" },
  { image: "object/balloon.png", left: "72%", top: "74%", size: "70px", delay: "1.5s", rotate: "-4deg" }
]
  },
  {
    key: "concert",
    name: "CONCERT",
    themeClass: "theme-concert",
    previewClass: "concert-preview",
    page: "transition.html?next=world.html?world=concert",
    dialogue: "CONCERT echoes under neon lights.",
    floats: [
  { image: "object/microphone.png", left: "8%", top: "20%", size: "62px", delay: "0s", rotate: "-55deg" },
  { image: "object/microphone.png", left: "30%", top: "14%", size: "42px", delay: "0s", rotate: "-35deg" },
  { image: "object/microphone.png", left: "73%", top: "18%", size: "56px", delay: "0s", rotate: "-65deg" },
  { image: "object/microphone.png", left: "88%", top: "64%", size: "46px", delay: "0s", rotate: "-30deg" },
  { image: "object/microphone.png", left: "14%", top: "72%", size: "50px", delay: "0s", rotate: "-70deg" },
  { image: "object/microphone.png", left: "68%", top: "82%", size: "66px", delay: "0s", rotate: "-45deg" }
]
  },
  {
    key: "mansion",
    name: "MANSION",
    themeClass: "theme-mansion",
    previewClass: "mansion-preview",
    page: "transition.html?next=world.html?world=mansion",
    dialogue: "MANSION lingers in velvet shadows.",
    floats: [
  { image: "object/diamond.png", left: "9%", top: "15%", size: "58px", delay: "0s", rotate: "-8deg" },
  { image: "object/diamond.png", left: "29%", top: "25%", size: "38px", delay: "0.3s", rotate: "8deg" },
  { image: "object/diamond.png", left: "72%", top: "13%", size: "52px", delay: "0.6s", rotate: "12deg" },
  { image: "object/diamond.png", left: "87%", top: "55%", size: "44px", delay: "0.9s", rotate: "-10deg" },
  { image: "object/diamond.png", left: "17%", top: "77%", size: "48px", delay: "1.2s", rotate: "14deg" },
  { image: "object/diamond.png", left: "76%", top: "78%", size: "64px", delay: "1.5s", rotate: "-6deg" }
]
  },
  {
    key: "paradise",
    name: "PARADISE",
    themeClass: "theme-paradise",
    previewClass: "paradise-preview",
    page: "transition.html?next=world.html?world=paradise",
    dialogue: "PARADISE whispers through the mist.",
    floats: [
  { image: "object/flower.png", left: "8%", top: "18%", size: "60px", delay: "0s", rotate: "-10deg" },
  { image: "object/flower.png", left: "32%", top: "13%", size: "40px", delay: "0.3s", rotate: "9deg" },
  { image: "object/flower.png", left: "74%", top: "20%", size: "54px", delay: "0.6s", rotate: "12deg" },
  { image: "object/flower.png", left: "89%", top: "56%", size: "46px", delay: "0.9s", rotate: "-12deg" },
  { image: "object/flower.png", left: "15%", top: "74%", size: "50px", delay: "1.2s", rotate: "10deg" },
  { image: "object/flower.png", left: "70%", top: "82%", size: "66px", delay: "1.5s", rotate: "-7deg" }
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

const exploredWorlds = JSON.parse(sessionStorage.getItem("dynamicEscapadeExplored")) || [];

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
    sessionStorage.setItem("dynamicEscapadeExplored", JSON.stringify(exploredWorlds));
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
  portal.classList.remove("is-explored");

  portalWorldName.textContent = world.name;
  portalPreview.className = `portal-preview ${world.previewClass}`;

  clearThemeClasses();
  body.classList.remove("world-tinted");
  body.classList.remove("portal-hover");

  if (exploredWorlds.includes(world.key)) {
    portal.classList.add("is-explored");
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
    const object = document.createElement("img");

    object.classList.add("float-object");
    object.src = item.image;
    object.alt = "";
    object.style.left = item.left;
    object.style.top = item.top;
    object.style.width = item.size;
    object.style.animationDelay = item.delay || "0s";
    object.style.setProperty("--start-rotate", item.rotate || "0deg");

    floatingLayer.appendChild(object);
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