// Create alarm when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("eyeBreak", {
    periodInMinutes: 2
  });
});

// Triggered every 20 minutes
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "eyeBreak") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "20-20-20 Rule",
      message: "Look at something 20 feet away for 20 seconds 👀",
      priority: 2
    });
  }
});