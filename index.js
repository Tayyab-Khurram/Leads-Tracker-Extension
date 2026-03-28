let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

chrome.storage.local.get(["myLeads"], (result) => {
  if (result.myLeads) {
    myLeads = result.myLeads;
    render(myLeads);
  }
});

// tabs = [{ url: "https://www.linkedin.com/in/tayyabkhurram" }];

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    chrome.storage.local.set({ myLeads: [...new Set(myLeads)] });
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  chrome.storage.local.set({ myLeads: [] });
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  chrome.storage.local.set({ myLeads: [...new Set(myLeads)] });
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
