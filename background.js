
  var log = function(response){console.log(response)};

  //on addon installed behavior
  function onInstalledAction()
  {
    chrome.storage.sync.set({enable: true}, function() 
    {
      log('The color is green.');
      log("Enable functionality is on");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        log("Sending MEsage");
        chrome.tabs.sendMessage(tabs[0].id, {command: "init", message: "/roll 1d20 eat a turtle shit"});
      });
    });
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() 
    {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher
          (
          {pageUrl: {hostEquals: 'store.steampowered.com/account/registerkey'} }
          )
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  }


  function onMessageAction(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
                log(request.closeRequest);
    if (request.closeRequest == "close"){
      sendResponse({farewell: "goodbye"});
      log('close request');
      chrome.tabs.getSelected(null, function (tab){ closeTab(tab)});  
    }
    else{
      sendResponse({error: "not the droids you were looking for"});
    }
     
  }

//fires when first installed
  chrome.runtime.onInstalled.addListener(onInstalledAction);

  //onMessage?
  chrome.runtime.onMessage.addListener(onMessageAction);

 