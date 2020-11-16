chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    
    if(message.id == 'notify'){
        
        chrome.notifications.create(message.id, message.params, function(response){
            sendResponse(response);
        });
    
        chrome.notifications.onClicked.addListener(function(response){
            chrome.tabs.create({url: message.link});
        });
        
    }
    
    return true;
});