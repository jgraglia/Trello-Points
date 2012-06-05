function Card($cardElement, debug) {
	var $card = $cardElement;
	if ($card == undefined || !$card.jquery) throw new Error("JQuery element required");
	var $title = $card.find('a.list-card-title');
	var that = this;
	var log = function(message) {
		tp.utils.log("Card", message);
	};
	
	function extractPoints(text) {
		var parsed = parser.parsePoints(text);
		if( $.isArray(parsed) && parsed.length==2)return parsed[1];
		else return null;
	};
	
	this.computePoints= function() {
		if(!$title[0]) {
			// When you drag a card, she seems to lost her title..No need 
			// to broke extension, return null points is ok.
			//utils.alertBrokenAPI("Card has no title. Check Trello structure");
			return null;
		}
		var title=$title[0].text;
		if (debug)log("Title is: "+title);
		var points=extractPoints($title[0].otitle||title);
		if (debug) log("extractPoints returns: "+points+" from "+title);
		return points;
	};
	

	this.removeBadge=function() {
		if (this.containsBadge()) {
			$card.find('.badge-points').remove();
		}
	};
	
	this.containsBadge = function(){
		if ($card.find('.badge-points').length==1) return true;
		else return false;
	};
	function lookupExistingBadge (){
		return $($card.find('.badge-points')[0]);
	};
	function ensureBadgeExists (){
		if (that.containsBadge()) {
			if (debug) log("previous badge found");
			return lookupExistingBadge();
		} else {
			$badge = $('<span class="badge badge-points point-count" style="background-image: url('+iconUrl+')">');
			if ($card.parent()[0]){
				if (debug) log("appending Trello Scrum badge");
				$badges = $card.find('.badges');
				if ($badges.length!=1){
					utils.alertBrokenAPI("Badges container missing in card structure");
				}
				$badge.prependTo($badges);
				return $badge;
			} else {
				utils.alertBrokenAPI("Cards container missing in Trello structure");
			}
		}
	};

	this.updateBadge=function (cardPoints) {
		var $badge = ensureBadgeExists();
		if (debug) log("updating badge  text");
		$badge.text(cardPoints);
		if (cardPoints >0 ) {
			$badge.addClass("positive-points");
			$badge.removeClass("negative-points");
		} else if (cardPoints <0 ) {
			$badge.removeClass("positive-points");
			$badge.addClass("negative-points");
		}
		$badge.attr({title: 'This card has '+cardPoints+' point' + (cardPoints == 1 ? '.' : 's.')});
	};
	
	this.removePointsFromTitle = function (cardPoints) {
		var title=$title[0].text;
		if (debug) log("Removing following text: '"+pointsAsTitlePattern(cardPoints)+"' from card title: "+ title);
		$title[0].textContent = title.replace(pointsAsTitlePattern(cardPoints),'');
		if (debug) log("After removal of points, title is: "+this.retrieveTitleText());
	};
	var pointsAsTitlePattern=function(cardPoints) {
		return "("+cardPoints+")";
	};
	this.retrieveTitleText = function() {
		return $title[0].text;
	};
	
	this.isMatched = function() {
		return $card.hasClass("matched-card");
	};
	this.isVisible= function(filter) {
		if (filter.isCurrentlyFiltered()) return this.isMatched();
		else return true;
	};
}
