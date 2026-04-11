let phase = "intro"; // Track which phase of the scene we are in (intro, menu, etc.)
let typed = ""; // Store the currently typed letters for typing effect
let intro = "DYNAMIC ESCAPADE"; // The game title to display
let introIndex = 0; // Tracks how many letters have been typed so far
let font; // Variable for custom font
let typingSpeed = 14; // Controls how slow or fast the title types on screen
let bgMusic;

// Button properties
let buttonX, buttonY, buttonW, buttonH; // Position and size of the "READY TO EXPLORE" button
let buttonPulse = 1; // Scale factor for button pulsing animation

// Custom cursor image
let cursorImg; // Hand image to replace system cursor

// Smooth cursor with inertia
let cursorX = 0; // Current x position of hand cursor
let cursorY = 0; // Current y position of hand cursor
let cursorSize = 50; // Base size of the hand cursor

function preload() {
  // Load assets before sketch starts
  font = loadFont('PressStart2P-Regular.ttf'); // Arcade-style pixel font
  cursorImg = loadImage('ourthumbCursor.webp'); // Custom hand thumb cursor
  bgMusic = loadSound('background.mp3'); // add your audio file
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  textAlign(CENTER, CENTER); // Center text both horizontally and vertically
  textFont(font); // Use custom arcade font

  buttonH = 70; // Set initial button height
  buttonX = width / 2; // Start button at horizontal center

  noCursor(); // Hide default system cursor so only hand shows
  cursorX = mouseX; // Start cursor at mouse position
  cursorY = mouseY;
  
}

function mouseMoved() {
  startMusic(); //Immediately start music when mouse slightly moves at start
}

function startMusic() {
  if (!bgMusic.isPlaying()) {
    userStartAudio();
    bgMusic.loop(); //Keeps playing the background music on loop during time spent on intro screen
    bgMusic.setVolume(1);
  }
}

function draw() {
  background('#240952'); // Dark purple background, gives arcade neon vibe

  drawIntro(); // Display game title with typing effect

  // Only show button after full title appears
  if (introIndex >= intro.length) {
    textSize(28); // Slightly smaller text for button
    let txtWidth = textWidth("READY TO EXPLORE") + 60; // Calculate width of text + padding
    buttonW = max(360, txtWidth); // Minimum button width 360px

    buttonY = height / 2 + 80; // Vertical position slightly below title
    buttonX = width / 2 + 10; // Shift slightly right for visual centering
    drawButton(); // Draw the interactive button
  }

  // Smoothly move cursor towards mouse with inertia
  // Creates a “magnetic” feel like arcade hand cursor
  let ease = 0.35; // 0 = no movement, 1 = snap to mouse instantly
  cursorX += (mouseX - cursorX) * ease; // Gradually move x
  cursorY += (mouseY - cursorY) * ease; // Gradually move y

  // Draw hand cursor on top
  imageMode(CENTER); // Draw image from center for easier positioning
  image(cursorImg, cursorX, cursorY, cursorSize, cursorSize);
}

function drawIntro() {
  textSize(48); // Large title text

  // Typing effect: adds one letter every few frames
  if (frameCount % typingSpeed === 0 && introIndex < intro.length) {
    typed += intro[introIndex]; // Add next letter
    introIndex++; // Move to next index
  }

  // Shadow behind title for depth
  fill('#5C3730'); // Dark brown shadow
  text(typed, width / 2 + 4, height / 2 - 60 + 4);

  // Main title text
  fill('#FFA500'); // Bright orange neon color for arcade feel
  text(typed, width / 2, height / 2 - 60);
}

function drawButton() {
  // Detect if mouse is over button
  let overButton = mouseX > buttonX - buttonW / 2 && mouseX < buttonX + buttonW / 2 &&
                   mouseY > buttonY - buttonH / 2 && mouseY < buttonY + buttonH / 2;

  // Hover pulse effect and cursor size
  if (overButton) {
    buttonPulse = 1 + 0.05 * sin(frameCount * 0.2); // Pulse button slightly when hovered
    cursorSize = 60; // Enlarge hand cursor on hover
  } else {
    buttonPulse = 1 + 0.02 * sin(frameCount * 0.1); // Subtle idle pulse
    cursorSize = 50; // Base hand size
  }

  push(); // Save current transformations
  translate(buttonX, buttonY); // Move origin to button center
  scale(buttonPulse); // Apply pulsing scale effect

  // Draw button rectangle
  fill('#FFA500'); // Same arcade neon orange for button
  rectMode(CENTER); // Draw rectangle from center
  rect(0, 0, buttonW, buttonH, 12); // Rounded corners

  // Draw button text
  fill('#240952'); // Dark text color to contrast with orange
  textSize(25); // Button font size
  text("READY TO EXPLORE", 0, 0); // Center text on button

  pop(); // Restore transformations
}

// Adjust canvas size if window resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
