$(document).ready(function(){
	var surfaceDimensions = Number($('#surface').css('height').slice(0,-2));
	var firstSquareDims = 16;
	var drawSquares = function(dimensions) {
		for (var j = 0; j < dimensions; j++) {
			for (var i = 0; i < dimensions; i++) {
				$('#surface').append($("<div class='square'></div>"));
			};
		};
	};

	drawSquares(firstSquareDims);
	$(document).on('mouseenter','.square',function(){
		$(this).css({'background-color':'#000000'});
	});
	$(document).find('#refresh').on('click','a',function(){
		$('#surface').children('.square').css({'background-color':''});
	});
});