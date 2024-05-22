chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("bandcamp.com")) {
      chrome.cookies.getAll({domain: "bandcamp.com"},(cookies) => {
        for (let cookie of cookies) {
          // Removes cookies that throw errors because we don't have access
          if(!cookie.domain.includes(".bandcamp.com")){
            chrome.cookies.remove({
              url: `https://${cookie.domain}${cookie.path}`,
              name: cookie.name
            }, (details) => {
              if (chrome.runtime.lastError) {
                console.error(`Error deleting cookie ${cookie.name}:`, chrome.runtime.lastError);
              } else if (details) {
                console.log(`Deleted cookie: ${cookie.name}`);
              } else {
                console.log(`Failed to delete cookie: ${cookie.name}`);      
              }
            });
          }
        }
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          alert("All Bandcamp cookies have been deleted.");
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
  