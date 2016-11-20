$(document).ready(function() {
  $('#retake-pic').hide();
  document.getElementById("submitButton").disabled = true;
  // $('#camera-shot').hide();
  // $('#camera-pic').hide();
  $('select').material_select();
  $("select[required]").css({display: "inline", height: 0, padding: 0, width: 0});
  $('#take-pic').click(function(){
  		$(this).hide();
      document.getElementById("submitButton").disabled = false;
  		$('#camera-stream').hide();
      // $('#camera-shot').show();
  		$('#canvasID').show();
  		$('#retake-pic').show();
  });
  $('#retake-pic').click(function(){
  		$(this).hide();
      document.getElementById("submitButton").disabled = true;
  		$('#camera-stream').show();
  		$('#canvasID').hide();
  		$('#take-pic').show();
  });
    $("#submitButton").click(function(){
      d = new Date;
      var myTime = document.getElementById('date_time').innerHTML;
      document.getElementById('timeIn').innerHTML = myTime;
      $("#myPicName").val(myTime);
      $("#myTimeIn").val(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" " +d.getHours()+":"+d.getMinutes());
      $('#modal1').openModal();
     
      // alert(url);
    });
    $("form").submit(function( event ) {
      var url = document.getElementById("canvasID").toDataURL();
      $("#myPic").val(url);
    
    });
     $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
        return false;
        }
    });
    // $("#confirmButton").submit(function(){
    //     var url = document.getElementById("canvasID").toDataURL();
    //     var filename = document.getElementById('timeIn').innerHTML;
    //      this.href = url;
    //      this.download = filename + ".png";
    // });
//   $('form').submit(function(e){
//     e.preventDefault();
//     $.ajax({
//         url:'/',
//         type:'post',
//         data:$('form').serialize(),
//         success:function(){
//             //whatever you wanna do after the form is successfully submitted
//         }
//     });
// });
  // $("#confirmButton").click(function(){
  //   $('form').submit(function(){
  //       alert('Form is submitting');
  //       return true;
  //   });
  //   // alert("ASDASD");
  //   $('form').submit();
  // });
  // $('#submitButton').click(function(){
  //   var myTime = document.getElementById('date_time').innerHTML;
  //   document.getElementById('timeIn').innerHTML = myTime;
  //   $('#modal1').openModal();
  //   // $('#submitButton').submit();
  // })
 // $('#submitButton').click(function(){
  		// $('.modal-trigger').leanModal({
		  //   dismissible: true, // Modal can be dismissed by clicking outside of the modal
		  //   opacity: .5, // Opacity of modal background
		  //    in_duration: 300, // Transition in duration
		  //    out_duration: 200, // Transition out duration
		  //    starting_top: '4%', // Starting top style attribute
		  //    ending_top: '10%', // Ending top style attribute
		  //    // ready: function() { alert('Ready'); }, // Callback for Modal open
		  //    // complete: function() { alert('Closed'); } // Callback for Modal close
    // 	});
  //});
  // $('form').submit(function(){
    // var myTime = document.getElementById('date_time').innerHTML;
    // document.getElementById('timeIn').innerHTML = myTime;
    // $('#modal1').openModal();
    // alert("HELLO");
  // });
  // $('#submitButton').click(function(){
  	 
  // });
  
});




