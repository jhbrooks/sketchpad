$(document).ready(function(){
	var surfaceDimensions = Number($('#surface').css('height').slice(0,-2));
	var firstSquareDims = 60;
	var rainbowOn = false;
	var currentColor = '#000000';

	var drawSquares = function(dimensions) {
		for (var j = 0; j < dimensions; j++) {
			for (var i = 0; i < dimensions; i++) {
				$('#surface').append($("<div class='square'></div>"));
			};
		};
		var computedDims = Math.floor((surfaceDimensions / dimensions));
		var extraSpace = surfaceDimensions % dimensions;
		var extraPadding = Math.floor((extraSpace/2));
		var adjSurfaceDims = surfaceDimensions - (extraPadding * 2);
		$('#surface').css({'height':adjSurfaceDims,'width':adjSurfaceDims,'padding':extraPadding});
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
				drawSquares(Math.floor(Number(newDims)));
			};
		};
	};

	var rainbowToggle = function() {
		if (rainbowOn === false) {
			rainbowOn = true;
		} else {
			rainbowOn = false;
		};
	};

	drawSquares(firstSquareDims);
	$(document).on('mouseenter','.square',function(){
		if (rainbowOn === true) {
			var rRed = Math.ceil(Math.random()*255);
			var rGreen = Math.ceil(Math.random()*255);
			var rBlue = Math.ceil(Math.random()*255);
			var randomColor = "rgb("+rRed+","+rGreen+","+rBlue+")";
			currentColor = randomColor;
			console.log(currentColor);
		} else {
			if ($('#setColor').children('input').val() === '') {
				currentColor = '#000000'
			} else {
				currentColor = $('#setColor').children('input').val();
			};
		};
		$(this).css({'background-color':currentColor});
	});
	$('#refresh').on('click',refreshSurface);
	$('#rainbow').on('click',rainbowToggle);
});