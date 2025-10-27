// import "../css/options.css";

// options.js
const toggle = document.getElementById("dark-mode-toggle");

// Load saved setting
chrome.storage.sync.get(["isDarkMode"], (data) => {
  toggle.checked = data.isDarkMode ?? true;
});

// Save on change
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ isDarkMode: toggle.checked });
});
