/*
** Trello Points v? - https://github.com/jgraglia/Trello-Points
** Enhance Trello's cards with freely configurable points
**
** You can install the extension at:
**         https://chrome.google.com/webstore/detail/mkcpchladphoadhaclmnlphhijboljjk/details
** 
** Rework from Trello Scrum v.0.53 extension : 
**    Idea & Documentation:
**      Jasper Kaizer <https://github.com/jkaizer>
**    Orig:
**      Marcel Duin <https://github.com/marcelduin>
** Contribs:
**      Paul Lofte <https://github.com/paullofte>
**      Nic Pottier <https://github.com/nicpottier>
**      Bastiaan Terhorst <https://github.com/bastiaanterhorst>
**      Morgan Craft <https://github.com/mgan59>
*/

var iconUrl = chrome.extension.getURL('images/storypoints-icon.png');

var debug = {
	card: false,
	list:false,
	filter:false
};
var filter = new Filter(debug.filter);

var modes=new Object();
$(function(){
	chrome.extension.sendRequest({method: "trelloScrumInstalled"}, function(response) {
		if (response.data=="true"|| response.data==true) {
			console.log("Trello Scrum extension seems to be installed (but is it active?)");
		}
	});
	(function periodical() {
		$('.list-card').each(updateCard);
		$('.list').each(updateList);
		
		chrome.extension.sendRequest({method: "getLocalStorage", key: "percent"}, function(response) {
			modes.percent=!(response.data=="false");
		});
		chrome.extension.sendRequest({method: "getLocalStorage", key: "filter_and_global"}, function(response) {
			modes.filter_and_global=!(response.data=="false");
		});
		chrome.extension.sendRequest({method: "getLocalStorage", key: "pointsSequence-values"}, function(response) {
			modes.pointsSequenceValues=response.data;
			if (modes.pointsSequenceValues) {
				_pointSeq= modes.pointsSequenceValues.split(',');
			}
		});
		chrome.extension.sendRequest({method: "getLocalStorage", key: "refreshRate"}, function(response) {
			modes.refreshRate=Number(response.data);
		});
		nextRefreshIn = modes.refreshRate;
		if(!utils.isNumber(nextRefreshIn) || Number(nextRefreshIn)<1) nextRefreshIn=2;
		setTimeout(periodical,nextRefreshIn*1000);
	})();
});

var log = function(message) {
	utils.log("Main", message);
};
function updateCard(event) {
	var card = new Card($(this), debug.card);
	if (debug.card) {
		log("Listing card & event: ");
		log(card);
		log(event);
	}
	var cardPoints = card.computePoints();
	if (debug.card) {
		log("card points : >"+cardPoints+"<");
	}
	if (cardPoints) {
		if (debug.card) log("card has points.. updating badge");
		card.updateBadge(cardPoints);
	} else {
		if (debug.card) {
			log("card has no points.. removing badge");
		}
		card.removeBadge();
	}
};

function updateList(event) {
	var list = new List($(this), filter, debug.list);
	var scores= list.computeScores();
	if (scores.filtered) {
		list.insertScoresInTitle(scores, modes);
	}else {
		list.removeScoresFromTitle();
	}
}
