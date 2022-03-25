window.addEventListener("load", () => {
  chrome.storage.local.get(["css_adopter_enable"], (item_enable) => {
    if (item_enable["css_adopter_enable"]) {
      chrome.storage.local.get(["css_adopter"], function (items) {
        if (items["css_adopter"]) {
          let css_set = items["css_adopter"];
          css_set.map((item) => {
            if (item.enable) {
              item.urls.map((url) => {
                if (window.location.href.match(url.pattern)) {
                  var newStyle = document.createElement("style");
                  newStyle.type = "text/css";
                  newStyle.innerText = item.css;
                  document
                    .getElementsByTagName("HEAD")
                    .item(0)
                    .appendChild(newStyle);
                }
              });
            }
          });
        }
      });
    }
  });
});
