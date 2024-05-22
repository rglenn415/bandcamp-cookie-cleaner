chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("bandcamp.com")) {
    chrome.permissions.contains({
      origins: ["https://bandcamp.com/"]
    }, (result) => {
      if (result) {
        chrome.cookies.getAll({ domain: "bandcamp.com" }, (cookies) => {
          for (let cookie of cookies) {
            chrome.cookies.remove({
              url: `https://${cookie.domain}${cookie.path}`,
              name: cookie.name
            }, (details) => {
              if (details) {
                console.log(`Deleted cookie: ${cookie.name}`);
              } else {
                console.log(`Failed to delete cookie: ${cookie.name}`);
              }
            });
          }
        });

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: () => {
            alert("All Bandcamp cookies have been deleted.");
          }
        });
      } else {
        console.log("Permission not granted for https://bandcamp.com/");
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: () => {
            alert("Permission not granted to delete Bandcamp cookies.");
          }
        });
      }
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        alert("This extension only works on bandcamp.com.");
      }
    });
  }
});
