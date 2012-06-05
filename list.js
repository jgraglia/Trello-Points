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
			if (tp.utils.isNumber(cardPoints)) {
				if (globalScore==null) globalScore = 0;
				globalScore += Number(cardPoints);
				if (card.isVisible(filter)) {
					if (debug) log("Card is visible! incrementing filtered score of "+cardPoints);
					if (filteredScore==null) filteredScore = 0;
					filteredScore += Number(cardPoints);
				}
			};
		});
		if (debug) log("scores: "+filteredScore+"/"+globalScore);
		return roundScores({global: globalScore, filtered: filteredScore});
	};
	var roundScores = function(scores) {
		var filteredScoreTruncated = Math.floor(scores.filtered * 100) / 100;
		var globalScoreTruncated = Math.floor(scores.global * 100) / 100;
		return {global: globalScoreTruncated, filtered: filteredScoreTruncated};
	};
	var computePercentage = function(scores) {
		return Math.floor(scores.filtered*100/scores.global*100)/100;
	};
	var computeNotFilteredText = function(globalScore) {
		if (debug) console.log("Computing not filtered score with global score: "+globalScore);	
		return globalScore!=0?""+globalScore:'';
	};
	var computeFilteredText = function(scores, modes) {
		if (debug) console.log("computing filtered text with "+modes.filter_and_global+" and "+modes.percent);
		var text;
		if (modes && modes.filter_and_global==true) {
			text=(scores.filtered!=0?scores.filtered:'')+"/"+(scores.global!=0?scores.global:'');
		} else {
			text=scores.filtered;
		}
		if (modes && modes.percent==true && tp.utils.sameSign(scores.filtered, scores.global)) {
			text+=" ["+computePercentage(scores)+"%]";
		}
		return text;
	};
	this.computeTotalText = function(scores, modes) {
		if (scores.filtered == scores.global) {
			return computeNotFilteredText(scores.global);
		} else {
			return computeFilteredText(scores, modes);
		}
	};
	this.insertScoresInTitle = function(scores, modes) {
		var $total;
		if ($list.find('.list-total')[0]) {
			if (debug) log("list scores found");
			$total=$list.find('.list-total');
		} else {
			var parent = $list.find('.list-header h2');
			if (debug) log("inserting list scores element on: "+parent);
			$total = $('<span class="list-total">').appendTo(parent);
		}
		var text = this.computeTotalText(scores, modes);
		if (debug) console.log("Computed total text is: '"+text+"' with "+scores);
		$total.text(text);
		return $total;
	};

	this.removeScoresFromTitle = function() {
		if (debug) {
			log("Has to remove scores from list.");
		}
		if ($list.find('.list-total')[0]) {
			$list.find('.list-total').remove();
		}else {
			if (debug) log("Can't remove scores from list element : element not found in DOM");
		}
	};
}
