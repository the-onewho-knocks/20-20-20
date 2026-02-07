const timerEl = document.getElementById("timer");

function updateTimer() {
  chrome.storage.local.get(
    ["nextTime", "paused", "mode"],
    (data) => {
      if (data.paused) {
        timerEl.textContent = "⏸ Paused (Fullscreen)";
        return;
      }

      if (!data.nextTime || !data.mode) {
        timerEl.textContent = "Not running";
        return;
      }

      const diff = data.nextTime - Date.now();

      if (diff <= 0) {
        timerEl.textContent =
          data.mode === "break"
            ? "Look away!"
            : "Loading…";
        return;
      }

      if (data.mode === "break") {
        const seconds = Math.ceil(diff / 1000);
        timerEl.textContent = ` ${seconds}s`;
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        timerEl.textContent =
          `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
    }
  );
}

updateTimer();
setInterval(updateTimer, 500);