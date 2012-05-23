function List($elt, filter, debug) {
	var $list=$elt;
	if ($list == undefined || !$list.jquery) throw new Error("JQuery element required");
	if (filter == undefined ) throw new Error("Filter is mandatory");

	var that = this;
	var log = function(message) {
		tp.utils.log("List", message);
	};
	this.computeScores= function() {
		var filteredScore = null;
		var globalScore = null;
		if (debug)log("Iterating over cards...");
		$list.find('.list-card').each(function(){
			var card = new Card($(this));
			var cardPoints = card.computePoints();
			if (debug)log("Found a card with "+cardPoints+" points");
			if(tp.utils.isNumber(cardPoints)) {
				if(globalScore==null) globalScore = 0;
				globalScore += Number(cardPoints);
				if (card.isVisible(filter)) {
					if(debug) log("Card is visible! incrementing filtered score of "+cardPoints);
					if(filteredScore==null) filteredScore = 0;
					filteredScore += Number(cardPoints);
				}
			};
		});
		if(debug) log("scores: "+filteredScore+"/"+globalScore);
		return roundScores({global: globalScore, filtered: filteredScore});
	};
	var roundScores = function(scores) {
		var filteredScoreTruncated = Math.floor(scores.filtered * 100) / 100;
		var globalScoreTruncated = Math.floor(scores.global * 100) / 100;
		return {global: globalScoreTruncated, filtered: filteredScoreTruncated};
	};
	this.insertScoresInTitle = function(scores, modes) {
		var $total;
		if($list.find('.list-total')[0]) {
			if (debug) log("list scores found");
			$total=$list.find('.list-total');
		}else {
			if (debug) log("inserting list scores element");
			$total = $('<span class="list-total">').appendTo($list.find('.list-header h2'));
		}
		if (scores.filtered != scores.global) {
			var text;
			if (modes && modes.filter_and_global==true) {
				text=(scores.filtered!=0?scores.filtered:'')+"/"+(scores.global!=0?scores.global:'');
			} else {
				text=scores.filtered;
			}
			if (modes && modes.percent==true) {
				var percent = Math.floor(scores.filtered*100/scores.global*100)/100;
				text+=" ["+percent+"%]";
			}
			$total.text(text);
		} else {
			$total.text(scores.filtered!=0?scores.filtered:'');
		}
	};
	this.removeScoresFromTitle = function() {
		if (debug) {
			log("Has to remove list scores.");
		}
		if ($list.find('.list-total')[0]) {
			$list.find('.list-total').remove();
		}else {
			if (debug) log("Can't remove list scores");
		}
	};
}
