chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage") {
		//console.log("Received request: " + request.method + " from " + sender);
		sendResponse({
			data : localStorage[request.key]
		});
	} else {
		sendResponse({}); // snub them.
	}
});
