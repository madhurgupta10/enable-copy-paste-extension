chrome.storage.local.get(["disabledSites"], ({ disabledSites }) => {
  const hostname = location.hostname;
  if (!disabledSites || !disabledSites.includes(hostname)) {
    return; // Do nothing unless site is enabled
  }

  const events = [
    "copy",
    "cut",
    "paste",
    "contextmenu",
    "selectstart",
    "mousedown",
    "mouseup",
  ];
  events.forEach((event) => {
    document.addEventListener(event, (e) => e.stopPropagation(), true);
  });

  const elements = [document, document.body, ...document.querySelectorAll("*")];
  elements.forEach((el) => {
    el.oncopy =
      el.oncut =
      el.onpaste =
      el.oncontextmenu =
      el.onselectstart =
      el.onmousedown =
      el.onmouseup =
        null;
  });

  document.oncontextmenu = null;
});
