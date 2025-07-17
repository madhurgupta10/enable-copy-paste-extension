document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const hostname = new URL(tab.url).hostname;

  chrome.storage.local.get(['disabledSites'], ({ disabledSites = [] }) => {
    const isDisabled = disabledSites.includes(hostname);
    document.getElementById('status').textContent = isDisabled
      ? `Disabled on ${hostname}`
      : `Enabled on ${hostname}`;

    const toggleBtn = document.getElementById('toggleBtn');
    toggleBtn.textContent = isDisabled ? 'Enable on this site' : 'Disable on this site';

    toggleBtn.addEventListener('click', () => {
      const updatedList = isDisabled
        ? disabledSites.filter(site => site !== hostname)
        : [...disabledSites, hostname];

      chrome.storage.local.set({ disabledSites: updatedList }, () => {
        chrome.tabs.reload(tab.id);
        window.close(); // Close popup after toggle
      });
    });
  });
});
