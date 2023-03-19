document.getElementById("openLink").addEventListener("click", () => {
    const parameter = document.getElementById("parameter").value;
    if (parameter) {
      const url = `https://example.com?param=${encodeURIComponent(parameter)}`;
      chrome.tabs.create({ url });
      saveLink(url);
    }
  });
  
  function saveLink(url) {
    chrome.storage.sync.get("previousLinks", (result) => {
      const previousLinks = result.previousLinks || [];
      previousLinks.push(url);
      chrome.storage.sync.set({ previousLinks }, () => {
        displayPreviousLinks();
      });
    });
  }
  
  function displayPreviousLinks() {
    chrome.storage.sync.get("previousLinks", (result) => {
      const previousLinks = result.previousLinks || [];
      const previousLinksList = document.getElementById("previousLinks");
      previousLinksList.innerHTML = "";
      previousLinks.forEach((link) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.target = "_blank";
        anchor.textContent = link;
        listItem.appendChild(anchor);
        previousLinksList.appendChild(listItem);
      });
    });
  }
  
  displayPreviousLinks();
  