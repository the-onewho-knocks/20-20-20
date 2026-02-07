const INTERVAL_MINUTES = 20;
let isPaused = false;

// On install
chrome.runtime.onInstalled.addListener(() => {
  scheduleNextAlarm();
});

// Detect fullscreen (movies, games, presentations)
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
    chrome.alarms.clear("eyeBreak");
    chrome.storage.local.set({ paused: true });
  }
}

function resumeReminders() {
  if (isPaused) {
    isPaused = false;
    chrome.storage.local.set({ paused: false });
    scheduleNextAlarm();
  }
}

function scheduleNextAlarm() {
  const nextTime = Date.now() + INTERVAL_MINUTES * 60 * 1000;

  chrome.storage.local.set({ nextBreak: nextTime });

  chrome.alarms.create("eyeBreak", {
    when: nextTime
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "eyeBreak" && !isPaused) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "20-20-20 Rule",
      message: "Look at something 20 feet away for 20 seconds 👀",
      priority: 2
    });

    playGentleSound();
    scheduleNextAlarm();
  }
});

// ---- Audio playback via offscreen document ----
async function playGentleSound() {
  const exists = await chrome.offscreen.hasDocument();

  if (!exists) {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play gentle eye-care reminder sound"
    });
  }

  chrome.runtime.sendMessage({ playSound: true });
}