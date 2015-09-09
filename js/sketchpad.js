$(document).ready(function(){
	var dimensions = 16;
	for (var j = 0; j < dimensions; j++) {
		for (var i = 0; i < dimensions; i++) {
			$('#surface').append($("<div class='square'></div>"));
		};
	};
	$(document).on('mouseenter','.square',function(){
		$(this).css({'background-color':'#000000'});
	});
	$(document).find('#refresh').on('click','a',function(){
		$('#surface').children('.square').css({'background-color':''});
	});
});