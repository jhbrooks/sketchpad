$(document).ready(function(){
	var surfaceDimensions = Number($('#surface').css('height').slice(0,-2));
	var firstSquareDims = 60;
	var rainbowOn = false;
	var trailOn = false;
	var colorValid = true;
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

	var trailToggle = function() {
		if (trailOn === false) {
			trailOn = true;
		} else {
			trailOn = false;
		};
	};

	var isColorValid = function(inputColor) {
		var $testDiv = $("<div></div>");
		var noColor = $testDiv.css('background-color');
		$testDiv.css({'background-color':inputColor});
		var withColor = $testDiv.css('background-color');
		return (noColor !== withColor);
	};

	drawSquares(firstSquareDims);
	$(document).on('mouseenter','.square',function(){
		if (rainbowOn === true) {
			var rRed = Math.ceil(Math.random()*255);
			var rGreen = Math.ceil(Math.random()*255);
			var rBlue = Math.ceil(Math.random()*255);
			var randomColor = "rgb("+rRed+","+rGreen+","+rBlue+")";
			currentColor = randomColor;
		} else {
			if ($('#setColor').children('input').val() === '') {
				currentColor = '#000000'
			} else {
				currentColor = $('#setColor').children('input').val();
			};
		};
		if ((colorValid === true) || (rainbowOn === true)) {
			$(this).finish();
			$(this).css({'opacity':1});
			$(this).css({'background-color':currentColor});
		};
	});
	$(document).on('mouseleave','.square',function(){
		if (trailOn === true) {
			$(this).animate({'opacity':0},600);
		};
	});

	$('#setColor').on('keyup','input',function(){
		var newColor = $(this).val();
		if (newColor === '') {
			newColor = '#000000'
		};
		colorValid = isColorValid(newColor);
		if (colorValid === true) {
			$('.colorStar').css({'display':'inline'})
			$('.colorStar').css({'color':newColor});
		} else {
			$('.colorStar').css({'display':'none'});
		};
	});

	$('#refresh').on('click',refreshSurface);
	$('#rainbow').on('click',rainbowToggle);
	$('#trail').on('click',trailToggle)
});