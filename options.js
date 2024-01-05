

var log = function(response){console.log(response)};
var enableTransmit = document.getElementById('enableTransmit'); 
var session = document.getElementById('session'); 
var playerName = document.getElementById('playerName'); 
//LOAD Values
chrome.storage.sync.get('enableTransmit', function(data) {
  enableTransmit.checked=data.enableTransmit;
});
chrome.storage.sync.get('session', function(data) {
  session.value=data.session;
}); 
chrome.storage.sync.get('playerName', function(data) {
  playerName.value=data.playerName;
});
 

//ATTACH Readers
playerName.onchange = function(element) { 
  
  let value = this.value; 
  chrome.storage.sync.set({'playerName': value}); 
  log("playerName:" + value);
};
session.onchange = function(element) 
{ 
  let value = this.value; 
  chrome.storage.sync.set({'session': parseInt(value)}); 
  log("session:" + value);
};
    
enableTransmit.onchange = function(element) {
   chrome.storage.sync.set({'enableTransmit': this.checked}); 
   let value = this.checked; 

  log("enableTransmit:" + value);
  //Pass init or remove message to content script 
  if(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "init", message: "onchange enabled"},log);
    });
  }else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "remove", message: "removed"},log);
    });
  }

};
