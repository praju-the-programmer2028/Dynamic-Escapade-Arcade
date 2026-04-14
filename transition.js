/*
========================================================
SPIRALOGRAM PORTAL TRANSITION
DIGITAL PORTAL (CLICK-TO-ENTER + MUSIC SYNCED FALL)
========================================================

SYSTEM DESIGN INTENT:
This system simulates a “perceptual engine” rather than animation:

- spatial tunneling → fake 3D depth using 2D scaling + repetition
- gravitational collapse → controlled zoom increase after event
- temporal decay → time-based transition from order → void

FLOW:
1. Click → unlocks browser audio + starts simulation (required gesture)
2. Music plays → stable recursive tunnel (predictable world state)
3. Music ends → collapse trigger (physics regime shift)
4. +3 seconds → delayed void persistence (afterimage effect)
5. final → static singularity (no recovery state)
========================================================
*/


// ========================================================
// CANVAS INITIALIZATION (VIEWPORT OF THE SIMULATION)
// ========================================================

const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");

// Canvas is the "screen-space universe"
// Everything you see is drawn inside this 2D projection layer

function resizePortalCanvas() {

    // Always match window size so geometry fills entire perception field
    // Without this → tunnel would look cropped or offset incorrectly
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizePortalCanvas);
resizePortalCanvas();


// ========================================================
// AUDIO SYSTEM (TEMPORAL CONTROL SIGNAL)
// ========================================================

const music = new Audio("transition.mp3");
music.loop = false; // no looping because collapse depends on "end event"

let musicStarted = false;      // prevents autoplay blocking issues
let collapse = false;          // global switch: stable world → collapsing world
let zoom = 1;                  // camera scale (fake forward movement)
let endTimer = 0;              // counts frames after music ends

let collapseImpulseDone = false; // ensures collapse happens ONCE only
let impulseFrames = 0;           // reserved for future easing effects (unused)


// ========================================================
// USER INTERACTION (SYSTEM ACTIVATION GATE)
// ========================================================

window.addEventListener("click", () => {

    // Browser security rule:
    // audio cannot start unless user interacts first

    if (!musicStarted) {
        music.play();       // starts sound → starts perception engine
        musicStarted = true;
    }
});


// ========================================================
// AUDIO END EVENT (PHASE TRANSITION TRIGGER)
// ========================================================

music.addEventListener("ended", () => {

    // This is the "state flip point"
    // Music = stability signal
    // No music = system begins collapse behavior

    collapse = true;   // activates gravity/collapse logic
    endTimer = 0;      // resets post-event timeline counter
});


// ========================================================
// COLOR SYSTEM (ENERGY + DEPTH REPRESENTATION)
// ========================================================

const palette = [
    "#3A0CA3", // deep base field (background gravity tone)
    "#7209B7", // distortion energy layer
    "#F72585", // instability spikes (high energy zones)
    "#F77F00", // boundary heat / transition zones
    "#F9C74F"  // bright singularity emission color
];


// ========================================================
// LAYER SYSTEM (FAKE 3D STRUCTURE USING 2D OBJECTS)
// ========================================================

let layers = [];

function initLayers() {

    // We create many "slices" of space
    // Human brain interprets dense radial repetition as continuous depth

    for (let i = 0; i < 80; i++) {
        layers.push({
            depth: i / 80,                     // normalized position in tunnel (0 near, 1 far)
            angle: Math.random() * Math.PI * 2, // random rotation breaks symmetry (prevents flat look)
            scale: i * 0.015                   // increasing radius creates tunnel expansion illusion
        });
    }
}

initLayers();


// ========================================================
// MAIN LOOP (REAL-TIME PERCEPTION ENGINE)
// ========================================================

function animate() {
    requestAnimationFrame(animate); // sync with browser refresh rate (~60fps)
    draw();                         // continuously redraw universe state
}

animate();


// ========================================================
// MAIN RENDER FUNCTION (WORLD SIMULATION STEP)
// ========================================================

function draw() {

    // ----------------------------------------------------
    // TRAIL BUFFER (TEMPORAL PERSISTENCE EFFECT)
    // ----------------------------------------------------
    // Instead of clearing screen completely,
    // we fade previous frame slightly → creates motion "memory"

    ctx.fillStyle = "rgba(5, 0, 20, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2; // center X of portal
    const cy = canvas.height / 2; // center Y of portal

    const t = Date.now() * 0.001; // global time (drives oscillation)

    
    // =====================================================
    // COLLAPSE PHASE (ONLY ONE IMPULSE ALLOWED)
    // =====================================================

    if (collapse) {

        endTimer++; // tracks how long we are in collapse state

        // This block ensures ONLY ONE sudden jump occurs
        // Without this guard → repeated zoom spikes would destabilize visuals

        if (!collapseImpulseDone) {
            zoom *= 1.4;               // instant "fall into portal"
            collapseImpulseDone = true; // lock so it never repeats
        }

        // IMPORTANT:
        // No continuous zoom here anymore → prevents runaway scaling
    }


    // =====================================================
    // CAMERA TRANSFORM (SIMULATED FORWARD MOTION)
    // =====================================================

    ctx.save();             // save current drawing state (important for isolation)
    ctx.translate(cx, cy);  // move origin to center (portal becomes focal point)
    ctx.scale(zoom, zoom);  // zoom simulates forward travel into depth


    // =====================================================
    // WIREFRAME TUNNEL FIELD (SPATIAL STRUCTURE RENDERING)
// =====================================================

    layers.forEach((l, i) => {

        // wobble = subtle oscillation to avoid static geometry
        // gives impression of living / unstable spacetime
        const wobble = Math.sin(t + i * 0.1) * 0.4;

        const radius = l.scale * 300; // converts abstract scale → visible ring size

        ctx.strokeStyle = palette[i % palette.length];

        // opacity decreases with depth → mimics atmospheric fading
        ctx.globalAlpha =
            Math.min(l.scale * 2, 1) * (2.2 - l.scale);


        // -------------------------------------------------
        // RADIAL WIREFRAMES (SPACIAL CONNECTION LINES)
        // -------------------------------------------------
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {

            const x2 = Math.cos(a + wobble) * radius;
            const y2 = Math.sin(a + wobble) * radius;

            ctx.beginPath();
            ctx.moveTo(0, 0); // center anchor point
            ctx.lineTo(x2, y2); // outward projection
            ctx.stroke();
        }


        // -------------------------------------------------
        // CONCENTRIC RING (DEPTH MARKER STRUCTURE)
        // -------------------------------------------------

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();


        // -------------------------------------------------
        // MOTION MODEL (FORWARD TUNNEL FLOW)
        // -------------------------------------------------

        // layers slowly expand → creates illusion of moving forward
        l.scale += collapse ? 0.02 : 0.008;

        // recycle layer when it exits visual range
        // prevents memory buildup + keeps infinite tunnel loop
        if (l.scale > 3) {
            l.scale = 0.01;
            l.angle = Math.random() * Math.PI * 2;
        }
    });

    ctx.restore(); // restore original drawing state (undo zoom/translate)

    
    // =====================================================
    // VOID STATE (POST-COLLAPSE AFTERIMAGE PHASE)
    // =====================================================

    if (collapse && endTimer > 180) {

        // fade increases slowly → simulates reality dissolving
        const fade = Math.min((endTimer - 180) * 0.01, 1);

        ctx.fillStyle = `rgba(0, 0, 15, ${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // pulse = residual energy of collapsing system
        const pulse = 1.5 + Math.sin(t * 2) * 0.6;

        ctx.fillStyle = "rgba(200, 160, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();

        // final hallucination text layer (lingering cognition effect)
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "18px Arial";
        ctx.fillText("entering singularity...", 40, 100);
    }
}
