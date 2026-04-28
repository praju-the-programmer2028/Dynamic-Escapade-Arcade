const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
const startOverlay = document.getElementById("startOverlay");

function resizePortalCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizePortalCanvas);
resizePortalCanvas();

const music = new Audio("audio/transition.mp3");
music.loop = false;

let musicStarted = false;
let collapse = false;
let zoom = 1;
let collapseImpulseDone = false;
let redirecting = false;

const palette = [
  "#3A0CA3",
  "#7209B7",
  "#F72585",
  "#F77F00",
  "#F9C74F"
];

let layers = [];

function initLayers() {
  layers = [];
  for (let i = 0; i < 80; i++) {
    layers.push({
      depth: i / 80,
      angle: Math.random() * Math.PI * 2,
      scale: i * 0.015
    });
  }
}

initLayers();

function startTransition() {
  if (musicStarted) {
    return;
  }

  music.play().then(() => {
    musicStarted = true;
    startOverlay.classList.add("hidden");
  }).catch((error) => {
    console.log("Transition music could not play:", error);
  });
}

window.addEventListener("click", startTransition);

music.addEventListener("ended", () => {
  if (!redirecting) {
    redirecting = true;
    window.location.href = "index.html?screen=select";
  }
});

function animate() {
  requestAnimationFrame(animate);
  draw();
}

animate();

function draw() {
  ctx.fillStyle = musicStarted ? "rgba(5, 0, 20, 0.25)" : "rgba(5, 0, 20, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!musicStarted) {
    return;
  }

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const t = Date.now() * 0.001;

  if (collapse && !collapseImpulseDone) {
    zoom *= 1.4;
    collapseImpulseDone = true;
  }

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(zoom, zoom);

  layers.forEach((l, i) => {
    const wobble = Math.sin(t + i * 0.1) * 0.4;
    const radius = l.scale * 300;

    ctx.strokeStyle = palette[i % palette.length];
    ctx.globalAlpha = Math.min(l.scale * 2, 1) * (2.2 - l.scale);

    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
      const x2 = Math.cos(a + wobble) * radius;
      const y2 = Math.sin(a + wobble) * radius;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    l.scale += 0.008;

    if (l.scale > 3) {
      l.scale = 0.01;
      l.angle = Math.random() * Math.PI * 2;
    }
  });

  ctx.restore();
  ctx.globalAlpha = 1;
}