


//Check if TrelloScrum is installed
// id as of v. 0.53
var trelloScrumExtensionId = "jdbcdblgjdpmfninkoogcfpnkjmndgje";
var trelloScrumInstalled=false;
chrome.extension.sendRequest(trelloScrumExtensionId, {getTargetData: true},
  function(response) {
  console.log("response: "+response);
  trelloScrumInstalled = true;
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage") {
		//console.log("Received request: " + request.method + " from " + sender);
		sendResponse({
			data : localStorage[request.key]
		});
	}else if (request.method == "trelloScrumInstalled") {
		sendResponse({
			data : trelloScrumInstalled
		});
	} else {
		sendResponse({}); // snub them.
	}
});