/*
========================================================
SPIRALOGRAM PORTAL TRANSITION
DIGITAL PORTAL (CLICK-TO-ENTER + MUSIC SYNCED FALL)
========================================================

FLOW:
1. Click → start music + portal
2. Music plays → stable infinite tunnel
3. Near music end → pre-collapse anticipation begins
4. Music ends → collapse begins (slowed onset)
5. +3 seconds → extended zoom into singularity
6. Final state → deep void
========================================================
*/

// -----------------------------
// CANVAS (RESPONSIVE SAFE SETUP)
// -----------------------------

const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");

// WHY: ensures full-screen rendering on all devices
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// -----------------------------
// MUSIC SYSTEM (DRIVES TRANSITION)
// -----------------------------

const music = new Audio("transition.mp3");
music.loop = false;

// state tracking
let musicStarted = false;
let collapse = false;      // becomes true when music ends
let zoom = 1;              // camera zoom (portal fall effect)
let endTimer = 0;          // tracks time AFTER music ends (for 3s extension)

// -----------------------------
// CLICK TO START EXPERIENCE
// -----------------------------

window.addEventListener("click", () => {

    // WHY: browser requires user gesture to start audio
    if (!musicStarted) {
        music.play();
        musicStarted = true;
    }
});

// -----------------------------
// MUSIC END → COLLAPSE TRIGGER
// -----------------------------

music.addEventListener("ended", () => {

    collapse = true;

    // WHY: resets collapse timer so post-music phase is controlled
    endTimer = 0;
});

// -----------------------------
// COLOR SYSTEM (STRUCTURAL NOT DYNAMIC)
// -----------------------------

const palette = [
    "#3A0CA3", // indigo → depth
    "#7209B7", // purple → warp
    "#F72585", // magenta → instability
    "#F77F00", // orange → energy boundary
    "#F9C74F"  // gold → singularity core
];

// -----------------------------
// PORTAL LAYERS (GEOMETRIC DEPTH MODEL)
// -----------------------------

let layers = [];

function initLayers() {

    // WHY 80 layers:
    // enough density for continuous 3D illusion without performance issues
    for (let i = 0; i < 80; i++) {

        layers.push({
            depth: i / 80,

            // random angular orientation → breaks symmetry (natural vortex feel)
            angle: Math.random() * Math.PI * 2,

            // radial stacking (creates tunnel rings)
            scale: i * 0.015
        });
    }
}

initLayers();

// -----------------------------
// MAIN LOOP
// -----------------------------

function animate() {
    requestAnimationFrame(animate);
    draw();
}
animate();

// -----------------------------
// RENDER ENGINE
// -----------------------------

function draw() {

    // soft fade = motion persistence (prevents harsh frame cuts)
    ctx.fillStyle = "rgba(5, 0, 20, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // FIXED: replaced p5-style time conflict
    const t = Date.now() * 0.001;

    // =========================================================
    // COLLAPSE PHASE (AFTER MUSIC ENDS)
    // =========================================================

    if (collapse) {

        // WHY: gradual time accumulation gives cinematic delay feel
        endTimer += 1;

        const collapseStrength = endTimer * 0.01;

        // -----------------------------
        // SLOW ZOOM INTO PORTAL
        // -----------------------------
        // WHY:
        // avoids instant teleport feeling → creates “falling inward”

        zoom *= 1 + (collapseStrength * 0.003);

        // -----------------------------
        // EARLY ANTICIPATION WINDOW (starts slightly before void)
        // WHY:
        // brain perceives "pull-in" BEFORE final collapse

        if (endTimer > 120) {
            zoom *= 1.0008; // subtle acceleration phase
        }
    }

    // =========================================================
    // CAMERA TRANSFORM (PORTAL PERSPECTIVE)
    // =========================================================

    ctx.save();
    ctx.translate(cx, cy);

    // zoom = depth travel illusion (central vortex pull)
    ctx.scale(zoom, zoom);

    // =========================================================
    // WIREFRAME PORTAL SYSTEM
    // =========================================================

    layers.forEach((l, i) => {

        // wobble = spacetime distortion field
        const wobble = Math.sin(t + i * 0.1) * 0.4;

        const angle = l.angle + wobble;
        const radius = l.scale * 300;

        ctx.strokeStyle = palette[i % palette.length];

        // WHY alpha matters:
        // simulates depth attenuation (far rings fade out naturally)
        ctx.globalAlpha =
            Math.min(l.scale * 2, 1) * (2.2 - l.scale);

        // -----------------------------
        // RADIAL GRID LINES
        // -----------------------------
        // WHY:
        // gives “digital tunnel scaffold” perception

        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {

            const x2 = Math.cos(a + wobble) * radius;
            const y2 = Math.sin(a + wobble) * radius;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // -----------------------------
        // CONCENTRIC RINGS
        // -----------------------------
        // WHY:
        // reinforces vortex + wormhole geometry

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // -----------------------------
        // FORWARD MOTION SIMULATION
        // -----------------------------
        // collapse increases perceived velocity inward

        l.scale += collapse ? 0.02 : 0.008;

        // infinite loop reset (portal recursion illusion)
        if (l.scale > 3) {
            l.scale = 0.01;
            l.angle = Math.random() * Math.PI * 2;
        }
    });

    ctx.restore();

    // =========================================================
    // FINAL VOID STATE (3 SECOND EXTENSION AFTER MUSIC)
    // =========================================================

    if (collapse && endTimer > 180) {

        // WHY 180 frames:
        // ~3 seconds delay at 60fps → post-music void breathing room

        const fade = Math.min((endTimer - 180) * 0.01, 1);

        // deep void overlay (space collapse aftermath)
        ctx.fillStyle = `rgba(0, 0, 15, ${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // subtle singularity pulse (keeps scene alive, not dead frame)
        const pulse = 1.5 + Math.sin(t * 2) * 0.6;

        ctx.fillStyle = "rgba(200, 160, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();

        // final text cue (minimal UI residue)
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "18px Arial";
        ctx.fillText("entering singularity...", 40, 100);
    }
}
