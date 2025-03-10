// Make the input field move randomly
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('mouseover', (e) => {
  const x = Math.random() * (window.innerWidth - nameInput.offsetWidth);
  const y = Math.random() * (window.innerHeight - nameInput.offsetHeight);
  nameInput.style.position = 'fixed';
  nameInput.style.left = `${x}px`;
  nameInput.style.top = `${y}px`;
});

// Handle the CAPTCHA
const captchaInput = document.getElementById('captchaInput');
const captchaHint = document.getElementById('captchaHint');
let correctAnswer = Math.floor(Math.random() * 100);

captchaInput.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  if (value === correctAnswer) {
    captchaHint.textContent = "Wrong! The answer keeps changing!";
    correctAnswer = Math.floor(Math.random() * 100);
  } else if (value === 4) {
    captchaHint.textContent = "Ha!You thought it would be that easy? I spare YOU! Continue.";
  } else {
    const distance = Math.abs(value - correctAnswer);
    if (distance < 5) {
      captchaHint.textContent = "You're getting warmer... or colder?";
    } else {
      captchaHint.textContent = "Not even close! Or maybe it is?";
    }
  }
});

// Handle the precise slider
const slider = document.getElementById('progressSlider');
const sliderValue = document.getElementById('sliderValue');
const targetValue = 73.5;
const threshold = 0.2;

slider.addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);
  sliderValue.textContent = value.toFixed(1) + '%';
  
  if (Math.abs(value - targetValue) <= threshold && captchaInput.value.length > 0) {
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
  }
});

// Elusive button that moves away
const elusiveButton = document.getElementById('elusiveButton');
let clickAttempts = 0;
let hasClickedButton = false;

elusiveButton.addEventListener('mouseover', (e) => {
  if (clickAttempts < 5) {
    const x = Math.random() * (window.innerWidth - elusiveButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - elusiveButton.offsetHeight);
    elusiveButton.style.position = 'fixed';
    elusiveButton.style.left = `${x}px`;
    elusiveButton.style.top = `${y}px`;
    clickAttempts++;
  }
});

elusiveButton.addEventListener('click', () => {
  hasClickedButton = true;
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.remove('hidden');
  startFakeLoading();
});

// Cookie notice
const rejectButton = document.getElementById('rejectCookies');
let rejectHoverCount = 0;
const maxHoverCount = 10;

rejectButton.addEventListener('mouseover', (e) => {
  if (!hasClickedButton) {
    alert("You must click the 'Click me!' button first!");
    return;
  }
  
  rejectHoverCount++;
  if (rejectHoverCount <= maxHoverCount) {
    const x = Math.random() * (window.innerWidth - rejectButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - rejectButton.offsetHeight);
    rejectButton.style.position = 'fixed';
    rejectButton.style.left = `${x}px`;
    rejectButton.style.top = `${y}px`;
    
    if (rejectHoverCount === maxHoverCount) {
      setTimeout(() => {
        rejectButton.style.display = 'none';
      }, 1000);
    }
  }
});

document.getElementById('acceptCookies').addEventListener('click', () => {
  if (!hasClickedButton) {
    alert("You must click the 'Click me!' button first!");
    return;
  }
  document.querySelector('.cookie-notice').style.display = 'none';
});

// Cursor speed detection for loading
let lastMouseX = 0;
let lastMouseY = 0;
let lastMouseTime = Date.now();
let cursorSpeed = 0;

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  const timeElapsed = currentTime - lastMouseTime;
  
  if (timeElapsed > 0) {
    const distanceX = e.clientX - lastMouseX;
    const distanceY = e.clientY - lastMouseY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    cursorSpeed = distance / timeElapsed;
  }
  
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  lastMouseTime = currentTime;
});

// Fake loading progress
let progress = 0;
let loadingInterval;
let loadingSpeed = 1;

function startFakeLoading() {
  const progressBar = document.getElementById('fakeProgress');
  const loadingText = document.getElementById('loadingText');
  
  loadingInterval = setInterval(() => {
    // Use cursor speed to affect loading speed (inversely)
    const speedFactor = Math.max(0.1, 1 - (cursorSpeed * 0.1));
    
    if (progress >= 99) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step4').classList.remove('hidden');
      }, 1000);
    } else {
      progress += (Math.random() * loadingSpeed * speedFactor);
      if (progress > 99) progress = 99;
      progressBar.style.width = `${progress}%`;
      loadingText.textContent = `Loading... ${Math.floor(progress)}% (Try moving your cursor ${cursorSpeed < 5 ? 'faster!' : 'slower!'})`;
    }
  }, 100);
}

// Speed up button that actually slows down
document.getElementById('speedUpButton').addEventListener('click', () => {
  loadingSpeed *= 0.5;
});

// Reward button with trolling message
document.getElementById('shareButton').addEventListener('click', () => {
  const messages = [
    "🎉 Congratulations! You've won... absolutely nothing! 🎉",
    "Thanks for playing! Your reward is the friends we made along the way 😂",
    "Achievement Unlocked: Got Trolled! 🏆",
    "Your prize is in another castle... or maybe not! 🏰",
    "Error 418: I'm a teapot, and your reward is brewing... forever! ☕",
    "Loading reward.exe... Just kidding! 💾",
    "You've been pranked! But hey, at least you're persistent! 🎭"
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  alert(randomMessage);
});

// Restart button
document.getElementById('restartButton').addEventListener('click', () => {
  clickAttempts = 0;
  progress = 0;
  loadingSpeed = 1;
  hasClickedButton = false;
  rejectHoverCount = 0;
  if (loadingInterval) clearInterval(loadingInterval);
  
  document.getElementById('step4').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
  
  slider.value = 0;
  sliderValue.textContent = '0%';
  nameInput.style.position = 'static';
  elusiveButton.style.position = 'static';
  captchaInput.value = '';
  captchaHint.textContent = '';
  correctAnswer = Math.floor(Math.random() * 100);
  
  const rejectButton = document.getElementById('rejectCookies');
  rejectButton.style.display = 'inline-block';
  rejectButton.style.position = 'static';
  document.querySelector('.cookie-notice').style.display = 'block';
  document.getElementById('fakeProgress').style.width = '0%';
  document.getElementById('loadingText').textContent = 'Loading... 0%';
});

// Add random delays to all click events
document.addEventListener('click', (e) => {
  e.preventDefault();
  setTimeout(() => {
    e.target.click();
  }, Math.random() * 1000);
}, true);

// Reverse scroll direction
window.addEventListener('wheel', (e) => {
  window.scrollBy(0, -e.deltaY);
});

// Make the cursor follow the mouse with a delay
const cursor = document.createElement('div');
cursor.style.cssText = `
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(updateCursor);
}

updateCursor();