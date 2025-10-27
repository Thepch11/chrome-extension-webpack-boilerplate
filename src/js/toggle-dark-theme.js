let isDarkModeActivated = true;
function setThemeMode(darkMode) {
  if (isDarkModeActivated === darkMode) return;

  isDarkModeActivated = darkMode;
  // Set document.documentElement.style.filter for dark mode while excluding "img, video" types
  // Invert the whole page
  document.documentElement.style.filter = darkMode
    ? "invert(1) hue-rotate(100deg)"
    : "none";

  // to decrease brightness -15% for images and videos when dark mode is on
  const media = document.querySelectorAll("img, video");
  media.forEach((el) => {
    el.style.filter = darkMode
      ? "invert(1) hue-rotate(100deg) brightness(85%)"
      : "none";
  });
}

function syncDarkModeSetting() {
  // get document.documentElement.classList.contains('dark-theme')
  if (document.documentElement.classList.contains("dark-theme")) {
    // get  'dark-theme' value
    isDarkModeActivated = document.documentElement.classList.get("dark-theme");
    // update dark-theme class based on isDarkModeActivated
    document.documentElement.classList.toggle(
      "dark-theme",
      isDarkModeActivated
    );
  } else {
    //  Apply user’s dark theme preference
    // add dark-theme preference
    isDarkModeActivated = true;
    document.documentElement.classList.add("dark-theme", isDarkModeActivated);
  }
}

// toggle-dark-theme.js
// Apply user’s dark theme preference
chrome.storage.sync.get(["isDarkMode"], (data) => {
  const darkMode = data.isDarkMode ?? true; // default: dark mode on
  if (darkMode) document.documentElement.classList.add("dark-theme");
  setThemeMode(darkMode);
});

// Optional: listen for sync updates
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.isDarkMode) {
    const newVal = changes.isDarkMode.newValue;
    document.documentElement.classList.toggle("dark-theme", newVal);
    setThemeMode(newVal);
  }
});

function universal_dark_mode() {
  // Create a universal dark mode
  document.body.style.backgroundColor = "#C9B59AFF";

  // Add toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙 Toggle Dark Mode";
  toggleBtn.id = "dark-mode-toggle";
  toggleBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 10px;
    background: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

  toggleBtn.onclick = () => {
    isDarkModeActivated = !isDarkModeActivated;
    setThemeMode(isDarkModeActivated);
    // Save preference
    chrome.storage.sync.set({ isDarkMode: isDarkModeActivated });
  };

  console.log("---- appendChild ------ ");
  document.body.appendChild(toggleBtn);
}

// initialize for sync updates
syncDarkModeSetting();
setThemeMode(isDarkModeActivated);
universal_dark_mode();
