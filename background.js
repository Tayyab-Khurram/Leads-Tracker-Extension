chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    // Get existing leads from chrome.storage
    chrome.storage.local.get(["myLeads"], (result) => {
      let myLeads = result.myLeads || [];
      myLeads.push(tab.url);
      chrome.storage.local.set({ myLeads: [...new Set(myLeads)] });
    });
  }
});
