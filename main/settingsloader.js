function SettingsLoader() {
	var tryToSendRequest=function(request, errCode, callback) {
		//console.log("SettingsLoader :: Sending request : "+request+", "+errCode);
		chrome.extension.sendRequest(request, function(response) {
			try{
				//console.log("SettingsLoader :: done "+request+" : "+response.data);
				callback.call(this, response.data);
			} catch (err) {
				utils.log(response);
				utils.log(err);
				utils.alertBrokenAPI("Unable load settings ("+errCode+")");
			};
		});
	};
	var tryToLoadSettings=function(key, errCode, callback) {
		tryToSendRequest({method: "getLocalStorage", key: key}, errCode, callback);
	};
	
	this.checkTrelloScrum = function() {
		tryToSendRequest("SettingsLoader :: trelloScrumInstalled", "OxO", function(data) {
			if (data==="true"|| data===true) {
				console.log("Trello Scrum extension seems to be installed (but is it active?)");
			}
		});
	};
	this.reloadSettings = function(settings, pointPicker) {
		//console.log("SettingsLoader :: !!Time to reload extension settings...");
		tryToLoadSettings("debug", "Ox5", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.debug;
			settings.debug=(data=="true");
			if (old != settings.debug) console.log("SettingsLoader :: Debug changed. Now: "+settings.debug);
		});
		if (settings.debug) console.log("Time to reload settings...");
		tryToLoadSettings("percent", "Ox1", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.percent;
			settings.percent=!(data=="false");
			if (old != settings.percent) console.log("SettingsLoader :: Percent changed. Now: "+settings.percent);
		});
		tryToLoadSettings("filter_and_global", "Ox2", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.filter_and_global;
			settings.filter_and_global=!(data=="false");
			if (old != settings.filter_and_global) console.log("SettingsLoader :: Filter & Global changed. Now: "+settings.filter_and_global);
		});
		tryToLoadSettings("pointsSequence", "Ox30", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.pointsSequence;
			settings.pointsSequence=data;
			if (old != settings.pointsSequence) console.log("SettingsLoader :: Point Sequence changed. Now: "+settings.pointsSequence);
		});		
		tryToLoadSettings("pointsSequence-values", "Ox31", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.pointsSequenceValues;
			settings.pointsSequenceValues=data;
			if (settings.pointsSequenceValues) {
				var numberArray = pointPicker.parsePointPickerFrom(modes.pointsSequenceValues);
				if (numberArray.length > 0) {
					pointPicker.setSequence(numberArray);
				}
			}
			if (old != settings.pointsSequenceValues) console.log("SettingsLoader :: Point sequence values changed. Now: "+settings.pointsSequenceValues);
		});
		tryToLoadSettings("refreshRate", "Ox4", function(data) {
			if(typeof(data) == "undefined")return;
			var old = settings.refreshRate;
			settings.refreshRate=Number(data);
			if (old != settings.refreshRate) console.log("SettingsLoader :: Refresh rate changed. Now: "+settings.refreshRate);
		});
	};
};
