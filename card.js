function Card($cardElement, debug) {
	var $card = $cardElement;
	if ($card == undefined || !$card.jquery) throw new Error("JQuery element required");
	var that = this;
	var log = function(message) {
		utils.log("Card", message);
	};
	
	function extractPoints(text) {
		var parsed = parser.parsePoints(text);
		if( $.isArray(parsed) && parsed.length==2)return parsed[1];
		else return null;
	};
	
	this.computePoints= function() {
		var $title=$card.find('a.list-card-title');
		if(!$title[0]) {
			// When you drag a card, she seems to lost her title..No need 
			// to broke extension, return null points is ok.
			//utils.alertBrokenAPI("Card has no title. Check Trello structure");
			return null;
		}
		var title=$title.html();
		if (debug)log("Title is: "+title);
		var points=extractPoints($title[0].otitle||title);
		if (debug)log("extractPoints returns: "+points);
		// from TrelloScrum.. seems to trig a bug or sth weird.. skip it!
// if(points != null){
// $title[0].otitle=title;
// }
		// $title.html($title.html().replace(reg,''));
		if (debug) log(points+":::"+title);
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
			$badge = $('<span class="badge badge-points point-count" style="background-image: url('+iconUrl+') !important;">');
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
		$badge.attr({title: 'This card has '+cardPoints+' storypoint(s).'});
	};
	
	this.isMatched = function() {
		return $card.hasClass("matched-card");
	};
	this.isVisible= function(filter) {
		if (filter.isCurrentlyFiltered()) return this.isMatched();
		else return true;
	};
}
