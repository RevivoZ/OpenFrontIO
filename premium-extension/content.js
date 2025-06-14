/* global chrome */
chrome.storage.sync.get("isPremium", ({ isPremium }) => {
  if (isPremium) {
    document.documentElement.style.setProperty("--primaryColor", "#7e22ce");
    document.documentElement.style.setProperty(
      "--primaryColorHover",
      "#6b21a8",
    );
  }
});
