$(document).ready(function() {
  $('#retake-pic').hide();
  // $('#camera-pic').hide();
  $('select').material_select();
  $('#take-pic').click(function(){
  		$(this).hide();
  		$('#camera-stream').hide();
  		$('#canvasID').show();
  		$('#retake-pic').show();
  });
  $('#retake-pic').click(function(){
  		$(this).hide();
  		$('#camera-stream').show();
  		$('#canvasID').hide();
  		$('#take-pic').show();
  });
});


