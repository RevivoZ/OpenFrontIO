# OpenFront Premium Chrome Extension

This extension changes the game's primary theme color to purple for premium users.

## Installing

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this `premium-extension` folder.
4. Set the `isPremium` flag in extension storage to `true` using the extension options or via the developer console:
   ```js
   chrome.storage.sync.set({ isPremium: true });
   ```
5. Reload the OpenFront page and the theme color will switch to purple.

Only users with premium accounts should enable the extension.
