const WORK_MINUTES = 20;
const BREAK_SECONDS = 20;

let isPaused = false;

// On install
chrome.runtime.onInstalled.addListener(() => {
  startWorkCycle();
});

// Pause during fullscreen
chrome.windows.onBoundsChanged.addListener((window) => {
  if (window.state === "fullscreen") {
    pauseReminders();
  } else {
    resumeReminders();
  }
});

function pauseReminders() {
  if (!isPaused) {
    isPaused = true;
    chrome.alarms.clearAll();
    chrome.storage.local.set({ paused: true });
  }
}

function resumeReminders() {
  if (isPaused) {
    isPaused = false;
    chrome.storage.local.set({ paused: false });
    startWorkCycle();
  }
}

/* ---------- WORK CYCLE ---------- */
function startWorkCycle() {
  const nextTime = Date.now() + WORK_MINUTES * 60 * 1000;

  chrome.storage.local.set({
    nextTime,
    mode: "work"
  });

  chrome.alarms.create("workAlarm", { when: nextTime });
}

/* ---------- BREAK CYCLE ---------- */
function startBreakCycle() {
  const endTime = Date.now() + BREAK_SECONDS * 1000;

  chrome.storage.local.set({
    nextTime: endTime,
    mode: "break"
  });

  chrome.alarms.create("breakAlarm", { when: endTime });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (isPaused) return;

  // End of 20-minute work cycle
  if (alarm.name === "workAlarm") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "20-20-20 Rule",
      message: "Look 20 feet away for 20 seconds 👀",
      priority: 2
    });

    playGentleSound();
    startBreakCycle();
  }

  // End of 20-second break
  if (alarm.name === "breakAlarm") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Break complete",
      message: "You can continue working now 💻",
      priority: 1
    });

    playGentleSound(); // optional but recommended
    startWorkCycle();
  }
});
/* ---------- AUDIO ---------- */
async function playGentleSound() {
  const exists = await chrome.offscreen.hasDocument();

  if (!exists) {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play gentle reminder sound"
    });
  }

  chrome.runtime.sendMessage({ playSound: true });
}