$(document).ready(function() {
	module("cards.js");

	test("constructor", function() {
		$card = $("<span>");
		var card = new Card($card, false);
		expect(0) ;
	});
	test("constructor : debug is optional", function() {
		$card = $("<span>");
		var card = new Card($card);
		expect(0) ;
	});
	test("illegal constructor args", function() {
		  raises(function() {
			  new Card(null, false);
		  }, "jQuery card element is mandatory");
		  raises(function() {
			  new Card("", false);
		  }, "jQuery card element is mandatory");
	});
	
	test("Compute points : number", function() {
		equal(new Card(mockCardElt("lorem ipsum (0)")).computePoints(), 0) ;
		equal(new Card(mockCardElt("lorem ipsum(2)")).computePoints(), 2) ;
	});
	test("Compute points : unknown", function() {
		equal(new Card(mockCardElt("lorem ipsum (?)")).computePoints(), "?") ;
	});
	
	test("Contains badge : yes ", function() {
		var $elt = mockCardElt("lorem ipsum (?)").append($("<span>").attr("class", "badge-points"));
		equal(new Card($elt).containsBadge(), true) ;
	});
	test("Contains badge : no ", function() {
		equal(new Card(mockCardElt("lorem ipsum (?)")).containsBadge(), false) ;
	});
	
	test("Remove badge", function() {
		var $elt = mockCardElt("lorem ipsum (?)").append($("<span>").attr("class", "badge-points"));
		var card = new Card($elt);
		equal(card.containsBadge(), true) ;
		card.removeBadge();
		equal(card.containsBadge(), false) ;
	});
	
	test("Define badge", function() {
		var $elt = mockCardElt("lorem ipsum (?)");
		var $cardContainer = $("<span>").append($elt);
		var card = new Card($elt);
		equal(card.containsBadge(), false) ;
		card.updateBadge(5);
		equal(card.containsBadge(), true) ;
	});
	test("Not matched", function() {
		var $elt = mockCardElt("lorem ipsum (?)");
		var $cardContainer = $("<span>").append($elt);
		var card = new Card($elt);
		equal(card.isMatched(), false) ;
	});
	test("Matched", function() {
		var $elt = mockCardElt("lorem ipsum (?)");
		$elt.attr("class", "matched-card");
		var $cardContainer = $("<span>").append($elt);
		var card = new Card($elt);
		equal(card.isMatched(), true) ;
	});
	
	test("Always visible when no filter", function() {
		var $elt = mockCardElt("lorem ipsum (?)");
		
		var $cardContainer = $("<span>").append($elt);
		var card = new Card($elt);

		equal(card.isMatched(), false) ;
		equal(card.isVisible(mockInactiveFilter), true);
		
		$elt.attr("class", "matched-card");
		equal(card.isMatched(), true) ;
		equal(card.isVisible(mockInactiveFilter), true);
	});
	test("When a filter is active, card is visible if matched", function() {
		var $elt = mockCardElt("lorem ipsum (?)");
		$elt.attr("class", "matched-card");
		
		var $cardContainer = $("<span>").append($elt);
		var card = new Card($elt);

		equal(card.isMatched(), true) ;
		equal(card.isVisible(mockActiveFilter), true);
	});
	test("When a filter is active,card is not visible if not matched", function() {
		var $elt = mockCardElt("lorem ipsum (?)");
		
		var $cardContainer = $("<span>").append($elt);
		var card = new Card($elt);

		equal(card.isMatched(), false) ;
		equal(card.isVisible(mockActiveFilter), false);
	});
});
