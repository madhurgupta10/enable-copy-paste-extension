document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const hostname = new URL(tab.url).hostname;

  chrome.storage.local.get(["disabledSites"], ({ disabledSites = [] }) => {
    const isEnabled = disabledSites.includes(hostname);
    document.getElementById("status").textContent = isEnabled
      ? `Enabled on ${hostname}`
      : `Disabled on ${hostname}`;

    toggleBtn.textContent = isEnabled
      ? "Disable on this site"
      : "Enable on this site";

    toggleBtn.addEventListener("click", () => {
      const updatedList = isEnabled
        ? disabledSites.filter((site) => site !== hostname)
        : [...disabledSites, hostname];

      chrome.storage.local.set({ disabledSites: updatedList }, () => {
        chrome.tabs.reload(tab.id);
        window.close();
      });
    });
  });
});
