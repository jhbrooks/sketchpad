$(document).ready(function(){
	var surfaceDimensions = Number($('#surface').css('height').slice(0,-2));
	var firstSquareDims = 60;
	var rainbowOn = false;
	var trailOn = false;
	var currentColor = '#000000';
	var colorValid = true;
	

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

	var colorSquare = function() {
		if (rainbowOn === true) {
			var rRed = Math.ceil(Math.random()*255);
			var rGreen = Math.ceil(Math.random()*255);
			var rBlue = Math.ceil(Math.random()*255);
			var randomColor = "rgb("+rRed+","+rGreen+","+rBlue+")";
			currentColor = randomColor;
		};
		if ((colorValid === true) || (rainbowOn === true)) {
			$(this).finish();
			$(this).css({'opacity':1});
			$(this).css({'background-color':currentColor});
		};
	};

	var fadeSquare = function() {
		if (trailOn === true) {
			$(this).animate({'opacity':0},600);
		};
	};

	var refreshSurface = function() {
		var newDims = prompt("Refresh with how many squares in each row?");
		if (newDims !== null) {
			if (isNaN(newDims)) {
				alert("Not a number! Please try again.");
				refreshSurface();	
			} else if (Number(newDims) > 120) {
				alert("Number too high! Please try again with a number less than 121.");
				refreshSurface();
			} else if (Number(newDims) <= 0){
				alert("Number too low! Please try again with a number greater than 0.");
				refreshSurface();
			} else {
				$('#surface').children('.square').remove();
				drawSquares(Math.floor(Number(newDims)));
			};
		};
	};

	var rainbowToggle = function() {
		$('#rainbow').toggleClass('active');
		if (rainbowOn === false) {
			rainbowOn = true;
		} else {
			rainbowOn = false;
			updateCurrentColor();
		};
	};

	var trailToggle = function() {
		$('#trail').toggleClass('active');
		if (trailOn === false) {
			trailOn = true;
		} else {
			trailOn = false;
		};
	};

	var updateCurrentColor = function() {
		currentColor = $('#setColor').children('input').val();
		if (currentColor === '') {
			currentColor = '#000000'
		};
	};

	var isColorValid = function(inputColor) {
		var $testDiv = $("<div></div>");
		var noColor = $testDiv.css('background-color');
		$testDiv.css({'background-color':inputColor});
		var withColor = $testDiv.css('background-color');
		return (noColor !== withColor);
	};

	var updateColorStars = function() {
		if (colorValid === true) {
			$('.colorStar').css({'display':'inline'})
			$('.colorStar').css({'color':newColor});
		} else {
			$('.colorStar').css({'display':'none'});
		};
	};

	drawSquares(firstSquareDims);
	updateCurrentColor();

	$(document).on('mouseenter','.square',colorSquare);
	$(document).on('mouseleave','.square',fadeSquare);

	$('#refresh').on('click',refreshSurface);
	$('#rainbow').on('click',rainbowToggle);
	$('#trail').on('click',trailToggle);

	$('#setColor').on('keyup','input',function(){
		updateCurrentColor();
		colorValid = isColorValid(currentColor);
		updateColorStars();
	});
});