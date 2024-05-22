chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("bandcamp.com")) {
      chrome.cookies.getAll({domain: "bandcamp.com"},(cookies) => {
        for (let cookie of cookies) {
          console.log(`${cookie.name} at ${cookie.domain}${cookie.path}`)
          try{
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
          } catch (error){
            console.error(`Error deleting cookie ${cookie.name}:`, error);
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
  