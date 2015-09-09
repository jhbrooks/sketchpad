$(document).ready(function(){
	var surfaceDimensions = Number($('#surface').css('height').slice(0,-2));
	var firstSquareDims = 60;

	var drawSquares = function(dimensions) {
		for (var j = 0; j < dimensions; j++) {
			for (var i = 0; i < dimensions; i++) {
				$('#surface').append($("<div class='square'></div>"));
			};
		};
		var computedDims = surfaceDimensions / dimensions;
		$('.square').css({'height':computedDims,'width':computedDims});
	};

	var refreshSurface = function() {
		var newDims = prompt("Refresh with how many squares in each row?");
		if (newDims !== null) {
			if (isNaN(newDims)) {
				alert("Not a number! Please try again.");
				refreshSurface();	
			} else if (Number(newDims) > 120) {
				alert("Number too high! Please try again with a lower number.");
				refreshSurface();
			} else {
				$('#surface').children('.square').remove();
				drawSquares(Number(newDims));
			};
		};
	};

	drawSquares(firstSquareDims);
	$(document).on('mouseenter','.square',function(){
		$(this).css({'background-color':'#000000'});
	});
	$('#refresh').on('click','a',refreshSurface);
});