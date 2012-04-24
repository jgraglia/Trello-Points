function Filter(debug) {
	var filteredState = false;
	
	this.isCurrentlyFiltered= function() {
		return filteredState;
	};

	var log = function(message) {
		tp.utils.log("Filter", message);
	};
	
	var retrieveCurrentFilterStatus= function() {
		return $('.js-filter-cards').hasClass('is-on');
	};
	
	var initialize= function() {
		$('.content,.clearfix').on('DOMSubtreeModified',function(event){
			var currentFilterState = retrieveCurrentFilterStatus();
			if (currentFilterState != filteredState) {
				if (debug) {
					log("Filter state changed! was: "+filteredState+", now is: "+currentFilterState+". Event is: ");
					log(event);
				}
				filteredState = currentFilterState;
			}
		});
		if (debug) {
			log("Filter state listener is now registered");
		}
	};
	if (debug) log("Initializing...");
	initialize();
}