chrome.storage.local.get(["css_adopter_enable"], (items) => {
  if (items["css_adopter_enable"]) {
    let changed_enable = items["css_adopter_enable"];
    chrome.action.setIcon({
      path: (changed_enable ? "enabled" : "disabled") + ".png",
    });
  }
});
