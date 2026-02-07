const timerEl = document.getElementById("timer");

function updateTimer() {
  chrome.storage.local.get(["nextBreak", "paused"], (data) => {
    if (data.paused) {
      timerEl.textContent = "⏸ Paused (Fullscreen)";
      return;
    }

    if (!data.nextBreak) {
      timerEl.textContent = "Not scheduled";
      return;
    }

    const diff = data.nextBreak - Date.now();

    if (diff <= 0) {
      timerEl.textContent = " Take a break!";
      return;
    }

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    timerEl.textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });
}

updateTimer();
setInterval(updateTimer, 1000);