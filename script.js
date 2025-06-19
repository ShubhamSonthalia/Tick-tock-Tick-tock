const targetDate = new Date("2025-07-16T09:00:00+05:30");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(timer);
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
    messageEl.classList.remove("hidden");
    confetti(); // trigger confetti
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

function confetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confettiLib({
      particleCount,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { y: 0.6 },
    });
  }, 250);
}

const confettiLib = window.confetti;
