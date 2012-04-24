function SettingsLoader() {
	var debug = false;
	var log = function(message) {
		tp.utils.log("Settings", message);
	};
	
	var tryToSendRequest=function(request, errCode, callback) {
		if (debug) log("SettingsLoader :: Sending request : "+request+", "+errCode);
		chrome.extension.sendRequest(request, function(response) {
			try{
				if (debug) log("SettingsLoader :: done "+request+" : "+response.data);
				callback.call(this, response.data);
			} catch (err) {
				log("Response:");
				log(response);
				log("Err:");
				log(err);
				var myStackTrace = err.stack || err.stacktrace || "";
				log(myStackTrace);
				tp.utils.alertBrokenAPI("Unable load settings ("+errCode+")");
			};
		});
	};
	var tryToLoadSettings=function(key, errCode, callback) {
		tryToSendRequest({method: "getLocalStorage", key: key}, errCode, callback);
	};
	
	this.checkTrelloScrum = function() {
		tryToSendRequest("SettingsLoader :: trelloScrumInstalled", "OxO", function(data) {
			if (data==="true"|| data===true) {
				log("Trello Scrum extension seems to be installed (but is it active?)");
			}
		});
	};
	this.reloadSettings = function(settings, updatePointPickerCallback) {
		if (debug) log("SettingsLoader :: !!Time to reload extension settings...");
		tryToLoadSettings("debug", "Ox5", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.debug;
			settings.debug=(data=="true");
			if (old != settings.debug) log("SettingsLoader :: Debug changed. Now: "+settings.debug);
		});
		if (settings.debug) console.log("Time to reload settings...");
		tryToLoadSettings("percent", "Ox1", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.percent;
			settings.percent=!(data=="false");
			if (old != settings.percent) log("SettingsLoader :: Percent changed. Now: "+settings.percent);
		});
		tryToLoadSettings("filter_and_global", "Ox2", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.filter_and_global;
			settings.filter_and_global=!(data=="false");
			if (old != settings.filter_and_global) log("SettingsLoader :: Filter & Global changed. Now: "+settings.filter_and_global);
		});
		tryToLoadSettings("pointpicker", "Ox3", function(data) {
			if(typeof(data) == "undefined")return;
			var oldType = settings.pointsSequence;
			var oldValues = settings.pointsSequenceValues;
			settings.pointsSequence=data.type;
			settings.pointsSequenceValues=data.values;
			var changed=false;
			if (oldType != settings.pointsSequence) {
				changed=true;
				log("SettingsLoader :: Point Sequence changed. Now: "+settings.pointsSequence);
			}
			if (oldValues != settings.pointsSequenceValues) {
				changed=true;
				log("SettingsLoader :: Point Sequence values changed. Now: "+settings.pointsSequenceValues);
			}
			if (changed) updatePointPickerCallback.call(this);
		});		
		tryToLoadSettings("refreshRate", "Ox4", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.refreshRate;
			settings.refreshRate=Number(data);
			if (old != settings.refreshRate) log("SettingsLoader :: Refresh rate changed. Now: "+settings.refreshRate);
		});
	};
};
