function mockCardElt(points) {
		return $("<span>").attr("class", "list-card ").append($("<a>").attr("class", "list-card-title").text(points).append($("<span>").attr("class", "badges")));
}
function mockListElt() {
	return $("<span>")
		.append(
			$("<span>")
				.attr("class", "list")
				.append($("<span>").addClass("list-title").append("hello this is a list"))
		);
}

var mockActiveFilter = new Object();
mockActiveFilter.isCurrentlyFiltered= function() {return true;};

var mockInactiveFilter = new Object();
mockInactiveFilter.isCurrentlyFiltered= function() {return false;};

