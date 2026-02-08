# 20-20-20 Eye Care – Chrome & Microsoft Edge Extension

A smart, lightweight Chrome and Microsoft Edge extension that helps reduce eye strain by enforcing the **20-20-20 rule**:

> Every 20 minutes, look at something 20 feet away for 20 seconds.

The extension intelligently pauses during fullscreen activities (movies, games, presentations), guides users through a timed eye break, and clearly notifies when it’s time to resume work.

---

##  Features

-  **20-minute work timer**
-  **Guided 20-second eye break**
-  **Gentle sound alerts** (non-intrusive)
-  **Explicit resume notification** after break
-  **Automatically pauses during fullscreen**
-  **Lightweight & battery-friendly**

---

##  How It Works

The extension operates as a **two-phase state machine**:

### 1. Work Phase (20 minutes)
- Countdown visible in popup
- Notification + gentle sound when time is up

### 2. Break Phase (20 seconds)
- Popup shows live break countdown
- User looks away from the screen
- Notification signals when to resume work

If the browser enters fullscreen mode at any point, the extension pauses automatically and resumes cleanly afterward.

---

##  Screenshots

  <img src="https://github.com/user-attachments/assets/36060982-f006-42ca-93de-d5a78fd947eb" width="700" alt="Work timer popup" />
  <br>
  <br>
  <img src="https://github.com/user-attachments/assets/c4faeab9-0e7c-4402-8caf-27d703bf7c9f" width="500" alt="Break countdown" />
  <br>
  <br>
  <img width="447" height="159" alt="image" src="https://github.com/user-attachments/assets/26c47eab-436a-4824-ae5b-3be2d473b232" />
  <br>
  
---

##  Project Structure

```text
20-20-20-extension/
│
├── manifest.json        # Extension configuration (Manifest V3)
├── background.js        # Core logic, alarms, state machine
├── popup.html           # Popup UI
├── popup.js             # Popup countdown logic
├── popup.css            # Popup styling
├── offscreen.html       # Audio playback (MV3 compliant)
├── gentle.mp3           # Soft notification sound
└── icon.png             # Extension icon (128×128)
```
##  Getting Started
### Prerequisites
- Google Chrome or Microsoft Edge
- Git
- Desktop OS (Windows / macOS / Linux)
- No additional dependencies or backend services are required.

### Clone the Repository
```text
git clone https://github.com/the-onewho-knocks/20-20-20-extension.git
cd 20-20-20-extension
```

### Load the Extension (Developer Mode)
#### Chrome
- Open Chrome and go to:
```text
chrome://extensions
```
- Enable Developer mode
- Click Load unpacked
- Select the project folder

#### Microsoft Edge
- Open Edge and go to:
```text
edge://extensions
```
- Enable Developer mode
- Click Load unpacked
- Select the project folder

The extension starts running immediately after loading.

##  Author
**Hardik Borse** | [LinkedIn](https://www.linkedin.com/in/hardik-borse-aa7729324/) | [Email](mailto:borsehardik@gmail.com)

### License
This project is licensed under the **Apache License 2.0**.
