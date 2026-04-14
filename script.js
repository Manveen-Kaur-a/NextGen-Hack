const loadBar = document.getElementById("load-bar");
const loadPct = document.getElementById("load-pct");
const loadStatus = document.getElementById("load-status");
const loadScreen = document.getElementById("loading-screen");

const statuses = [
  "Initializing arena...",
  "Loading game assets...",
  "Spawning boss enemies...",
  "Calibrating difficulty...",
  "Charging power-ups...",
  "Unlocking quests...",
  "Ready. Enter the arena."
];

let progress = 0;

const loadInterval = setInterval(() => {
  progress += Math.random() * 18;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);

    setTimeout(() => {
      loadScreen.style.opacity = "0";
      loadScreen.style.pointerEvents = "none";
      setTimeout(() => loadScreen.remove(), 500);
      setTimeout(showAchievement, 1200);
    }, 400);
  }

  loadBar.style.width = progress + "%";
  loadPct.textContent = Math.floor(progress) + "%";
  loadStatus.textContent =
    statuses[Math.floor(progress / 15)] || statuses[statuses.length - 1];
}, 120);

const cross = document.getElementById("cursor-cross");
const trail = document.getElementById("cursor-trail");

const pixelContainer = document.getElementById("pixel-container");

for (let i = 0; i < 20; i++) {
  const pixel = document.createElement("div");
  pixel.className = "pixel-float";
  pixel.style.left = Math.random() * 100 + "vw";
  pixel.style.bottom = "0";
  pixel.style.animationDuration = 4 + Math.random() * 6 + "s";
  pixel.style.animationDelay = Math.random() * 5 + "s";

  const colors = ["#00FF9F", "#00F0FF", "#9D00FF", "#FFD600"];
  pixel.style.background = colors[Math.floor(Math.random() * colors.length)];
  pixel.style.boxShadow = `0 0 8px ${pixel.style.background}`;

  pixelContainer.appendChild(pixel);
}

document.addEventListener("mousemove", event => {
  cross.style.left = event.clientX + "px";
  cross.style.top = event.clientY + "px";

  setTimeout(() => {
    trail.style.left = event.clientX + "px";
    trail.style.top = event.clientY + "px";
  }, 80);
});

const registerForm = document.getElementById("register-form");
if (registerForm) {
  const nameInput = document.getElementById("player-name");
  const emailInput = document.getElementById("player-email");
  const guildInput = document.getElementById("player-guild");
  const teamInput = document.getElementById("player-team");
  const trackInput = document.getElementById("player-track");

  const errors = {
    name: document.getElementById("name-error"),
    email: document.getElementById("email-error"),
    guild: document.getElementById("guild-error"),
    team: document.getElementById("team-error"),
    track: document.getElementById("track-error")
  };

  const patterns = {
    name: /^[A-Za-z][A-Za-z ]{1,49}$/,
    guild: /^[A-Za-z0-9 '&,-]{2,100}$/,
    team: /^[A-Za-z0-9 '&,-]{0,100}$/
  };

  const clearError = input => {
    const key = input.id.replace("player-", "");
    if (errors[key]) {
      errors[key].textContent = "";
    }
    input.classList.remove("input-invalid");
  };

  const showError = (input, message) => {
    const key = input.id.replace("player-", "");
    if (errors[key]) {
      errors[key].textContent = message;
    }
    input.classList.add("input-invalid");
  };

  registerForm.addEventListener("submit", event => {
    event.preventDefault();

    let valid = true;
    [nameInput, emailInput, guildInput, teamInput, trackInput].forEach(clearError);

    if (!patterns.name.test(nameInput.value.trim())) {
      valid = false;
      showError(nameInput, "Please enter a valid name (letters and spaces only).");
    }

    if (!emailInput.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
      valid = false;
      showError(emailInput, "Please enter a valid email address.");
    }

    if (!patterns.guild.test(guildInput.value.trim())) {
      valid = false;
      showError(guildInput, "Please enter your college name.");
    }

    if (teamInput.value.trim() && !patterns.team.test(teamInput.value.trim())) {
      valid = false;
      showError(teamInput, "Please enter a valid team name.");
    }

    if (!trackInput.value) {
      valid = false;
      showError(trackInput, "Please choose a quest track.");
    }

    if (!valid) {
      return;
    }

    alert("Registration submitted successfully. Prepare for the arena!");
    registerForm.reset();
  });
}

