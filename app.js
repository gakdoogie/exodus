const canvas = document.getElementById('orbitalCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// This variable will act as our timeline. It starts at 0.
let timeAngle = 0; 

function animateDashboard() {
    // 1. WIPE THE BOARD CLEAN EVERY FRAME
    // If you don't do this, the Earth will smear across the screen like a paint brush!
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 2. DRAW THE SUN
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#FFCC00'; // Sun Yellow
    ctx.fill();

    // 3. CALCULATE EARTH'S ORBIT
    const earthOrbitRadius = 250; // How far the Earth is from the Sun
    
    // Trigonometry: Cosine calculates the X position, Sine calculates the Y position
    const earthX = centerX + Math.cos(timeAngle) * earthOrbitRadius;
    const earthY = centerY + Math.sin(timeAngle) * earthOrbitRadius;

    // 4. DRAW THE EARTH
    ctx.beginPath();
    ctx.arc(earthX, earthY, 15, 0, Math.PI * 2); // Earth is smaller (radius 15)
    ctx.fillStyle = '#0077BE'; // Ocean Blue
    ctx.fill();

    // 5. MOVE TIME FORWARD
    // Increase the angle slightly for the next frame. 
    // Make this number bigger to speed up the orbit, smaller to slow it down.
    timeAngle += 0.01;

    // 6. THE INFINITE LOOP
    // This built-in browser function tells the screen to run this exact function 
    // again right before the monitor refreshes (usually 60 times a second).
    requestAnimationFrame(animateDashboard);
}

// Kickstart the infinite loop
animateDashboard();