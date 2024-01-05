var textboxId = "#textchat-input";
function sendMessage(msg){
    log("In sendMessage..." + msg); 
    
    var box = $("#textchat-input .ui-autocomplete-input")[0]; 
    box.value = msg;

    var send = $("#textchat-input .btn");
    send.click();    
}
function log(msg){ console.log(msg); }  

 

 
var removeListeners = function(){
    log("removeListener");
} 



//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    
{
    log("Command:" + request.command);
    if(request.command === 'init'){
        console.log("init");
        setTimeout(() => {  
            chrome.runtime.tabs.getCurrent((tab)=>sendMessage(request.message));      
     }, 1000);
        
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

//on init perform based on chrome stroage value

window.onload=function(){  
    log("load");
    chrome.storage.sync.get(['enableTransmit','session','playerName'], function(data) {
        var enableTransmit = data.enableTransmit;

        if(enableTransmit)
        {
            start(data.session,data.playerName);
            //sendMessage("/roll 1d20 for load");
        }
        else
        {
            removeListeners();
        } 
    });
}

async function start(s,p) {
    try {
        await connection.start();
        var identity = {session:s,
            playerName:p};
            console.log("identity" + identity);   
        connection.invoke("RegisterAsync", identity).then((res) =>
        { 
            identity = res;
        })
        .catch(err => alert(err));
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};
 const connection = new signalR.HubConnectionBuilder()
 .withUrl("https://polyhydragames.azurewebsites.net/rollhub")
 .configureLogging(signalR.LogLevel.Information)
 .build();
 connection.on("OnMessageReceived", (message) => {
    //const encodedMsg = message.identity.name + " says " + message.text;
    console.log(message); 
    sendMessage(message.text);
   });
   connection.on("OnUsersChanged", (message) => { 
    console.log(message);  
   });


connection.onclose(start);

