/* global chrome */
chrome.runtime.onInstalled.addListener(() => {
  // Set default value. Users with premium accounts should have this set to true.
  chrome.storage.sync.get("isPremium", (result) => {
    if (result.isPremium === undefined) {
      chrome.storage.sync.set({ isPremium: false });
    }
  });
});
