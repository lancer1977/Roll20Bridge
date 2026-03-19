var log = function(response){console.log(response)};

//on addon installed behavior
function onInstalledAction()
{
  chrome.storage.sync.set({enable: true}, function() 
  {
    log('The color is green.');
    log("Enable functionality is on");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        log("Sending Message");
        chrome.tabs.sendMessage(tabs[0].id, {command: "init", message: "/roll 1d20 eat a turtle shit"});
      }
    });
  });
  
  // Note: declarativeContent API removed - not supported in Manifest V3
  // If needed, declarativeNetRequest can be used for similar functionality
}


function onMessageAction(request, sender, sendResponse) {
  console.log(sender.tab ?
              "from a content script:" + sender.tab.url :
              "from the extension");
              log(request.closeRequest);
  if (request.closeRequest == "close"){
    sendResponse({farewell: "goodbye"});
    log('close request');
    // Fixed: use chrome.tabs.query instead of deprecated chrome.tabs.getSelected
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.remove(tabs[0].id);
      }
    });  
  }
  else{
    sendResponse({error: "not the droids you are looking for"});
  }
     
}

//fires when first installed
chrome.runtime.onInstalled.addListener(onInstalledAction);

//onMessage?
chrome.runtime.onMessage.addListener(onMessageAction);
