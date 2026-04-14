/*
========================================================
SPIRALOGRAM PORTAL TRANSITION
DIGITAL PORTAL (CLICK-TO-ENTER + MUSIC SYNCED FALL)
========================================================

SYSTEM DESIGN INTENT:
This is not just animation — it is a *perceptual simulation* of:
- spatial tunneling (forward motion illusion)
- gravitational collapse (zoom convergence)
- temporal decay (music → void transition)

FLOW:
1. Click → initializes audio + perception system
2. Music plays → stable recursive geometry (infinite tunnel illusion)
3. Music ends → collapse state begins (single controlled event)
4. +3 seconds → void persistence (post-audio hallucination window)
5. Final → singularity lock state (no motion escape)
========================================================
*/

// ========================================================
// CANVAS INITIALIZATION (WORLD RENDER SURFACE)
// ========================================================

const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");

// WHY THIS EXISTS:
// Canvas acts as a “viewport into simulated spacetime”
// All transformations (zoom, rotation, warp) operate relative to this surface

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ========================================================
// AUDIO SYSTEM (TEMPORAL DRIVER OF VISUAL STATE)
// ========================================================

const music = new Audio("transition.mp3");
music.loop = false;

// STATE FLAGS:
// musicStarted → ensures user gesture compliance (browser audio policy)
// collapse → global transition trigger (music → void)
// zoom → camera projection scaling (simulated fall velocity)
// endTimer → post-audio temporal accumulator (controls 3s extension)

let musicStarted = false;
let collapse = false;
let zoom = 1;
let endTimer = 0;

// ========================================================
// USER INTERACTION (SEED EVENT OF EXPERIENCE)
// ========================================================

window.addEventListener("click", () => {

    // WHY CLICK MATTERS:
    // This is the "activation event" — without it, no auditory or visual runtime begins
    if (!musicStarted) {
        music.play();
        musicStarted = true;
    }
});

// ========================================================
// AUDIO END EVENT (TRANSITION TRIGGER POINT)
// ========================================================

music.addEventListener("ended", () => {

    // THIS IS THE SYSTEM "PHASE SHIFT":
    // audio domain ends → visual physics begins collapse
    collapse = true;

    // reset ensures deterministic post-music timing window
    endTimer = 0;
});

// ========================================================
// GEOMETRIC PALETTE (STRUCTURAL COLOR LANGUAGE)
// ========================================================

const palette = [
    "#3A0CA3", // deep gravity field (base spacetime)
    "#7209B7", // warp energy
    "#F72585", // instability / distortion peaks
    "#F77F00", // energetic boundary
    "#F9C74F"  // singularity emission
];

// ========================================================
// LAYER SYSTEM (3D TUNNEL RECONSTRUCTION MODEL)
// ========================================================

let layers = [];

function initLayers() {

    // WHY 80 LAYERS:
    // Human perception interprets dense radial sampling as continuous depth
    // This creates illusion of infinite tunnel without real 3D engine

    for (let i = 0; i < 80; i++) {
        layers.push({
            depth: i / 80,                       // normalized depth slice (0 → 1)
            angle: Math.random() * Math.PI * 2,  // angular randomness breaks symmetry
            scale: i * 0.015                     // radial expansion mapping
        });
    }
}

initLayers();

// ========================================================
// RENDER LOOP (REAL-TIME PERCEPTION ENGINE)
// ========================================================

function animate() {
    requestAnimationFrame(animate);
    draw();
}
animate();

// ========================================================
// MAIN RENDER FUNCTION (SPACETIME SIMULATION CORE)
// ========================================================

function draw() {

    // ----------------------------------------------------
    // MOTION TRAIL BUFFER (TEMPORAL BLENDING LAYER)
    // ----------------------------------------------------
    // WHY THIS EXISTS:
    // Instead of clearing frame → we fade it slightly
    // This simulates persistence of vision (motion continuity illusion)

    ctx.fillStyle = "rgba(5, 0, 20, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // SAFE TIME VARIABLE (NO p5 CONFLICT)
    const t = Date.now() * 0.001;

    // =====================================================
    // COLLAPSE PHASE (POST-AUDIO GRAVITATIONAL SHIFT)
    // =====================================================

    if (collapse) {

        // temporal accumulator increases each frame
        // WHY:
        // creates slow onset collapse instead of instant snap
        endTimer++;

        // camera projection scaling (falling into singularity)
        zoom *= 1.002 + endTimer * 0.00002;
    }

    // =====================================================
    // CAMERA TRANSFORM (PORTAL PERSPECTIVE PROJECTION)
    // =====================================================

    ctx.save();
    ctx.translate(cx, cy);

    // WHY ZOOM MATTERS:
    // scaling canvas = simulated depth traversal toward center
    ctx.scale(zoom, zoom);

    // =====================================================
    // WIREFRAME PORTAL GEOMETRY (SPATIAL STRUCTURE SYSTEM)
    // =====================================================

    layers.forEach((l, i) => {

        // wobble = spacetime distortion function
        // WHY SIN WAVE:
        // introduces natural oscillation instead of rigid geometry
        const wobble = Math.sin(t + i * 0.1) * 0.4;

        const angle = l.angle + wobble;
        const radius = l.scale * 300;

        ctx.strokeStyle = palette[i % palette.length];

        // depth-based opacity mapping
        // WHY:
        // simulates atmospheric attenuation in 3D space
        ctx.globalAlpha =
            Math.min(l.scale * 2, 1) * (2.2 - l.scale);

        // -------------------------------------------------
        // RADIAL GRID STRUCTURE (SPATIAL WIREFRAME FIELD)
        // -------------------------------------------------
        // WHY THIS EXISTS:
        // These radial lines simulate a "space lattice"
        // The brain interprets this as tunnel curvature

        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {

            const x2 = Math.cos(a + wobble) * radius;
            const y2 = Math.sin(a + wobble) * radius;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // -------------------------------------------------
        // CONCENTRIC RING SYSTEM (TUNNEL DEPTH ANCHORING)
        // -------------------------------------------------
        // WHY:
        // reinforces circular symmetry of wormhole structure

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // -------------------------------------------------
        // FORWARD MOTION MODEL (INFINITE TUNNEL LOOP)
        // -------------------------------------------------
        // WHY:
        // increasing scale simulates forward movement through space

        l.scale += collapse ? 0.02 : 0.008;

        // infinite recursion reset (prevents termination)
        if (l.scale > 3) {
            l.scale = 0.01;
            l.angle = Math.random() * Math.PI * 2;
        }
    });

    ctx.restore();

    // =====================================================
    // FINAL VOID STATE (POST-AUDIO 3 SECOND EXTENSION)
    // =====================================================

    // WHY THIS EXISTS:
    // This prevents abrupt emotional cut-off after music ends
    // It creates "after-silence perception space"

    if (collapse && endTimer > 180) {

        const fade = Math.min((endTimer - 180) * 0.01, 1);

        // deep void overlay (loss of structure phase)
        ctx.fillStyle = `rgba(0, 0, 15, ${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // singularity residue pulse (minimal energy remnant)
        const pulse = 1.5 + Math.sin(t * 2) * 0.6;

        ctx.fillStyle = "rgba(200, 160, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();

        // final semantic anchor (optional cognition cue)
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "18px Arial";
        ctx.fillText("entering singularity...", 40, 100);
    }
}
