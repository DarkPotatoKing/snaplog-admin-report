window.onload = function() {

  // Normalize the various vendor prefixed versions of getUserMedia.
  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || 
                            navigator.msGetUserMedia);

	// Check that the browser supports getUserMedia.
	// If it doesn't show an alert, otherwise continue.
	if (navigator.getUserMedia) {
	  // Request the camera.
	  navigator.getUserMedia(
	    // Constraints
	    {
	      video: true,
	      audio: false
	    },

	    // Success Callback
	    function(localMediaStream) {
				// Get a reference to the video element on the page.
				var vid = document.getElementById('camera-stream');
				var canvas = document.getElementById('canvasID');
				var button = document.getElementById('take-pic');
				var d = new Date();
    			var n = d.getTime();
				//var img = new Image();
				// Create an object URL for the video stream and use this 
				// to set the video source.
				vid.src = window.URL.createObjectURL(localMediaStream);

				// button.disabled = false;
				button.onclick = function() {
					document.getElementById("canvasID").style.display="inline";
					// document.getElementById("camera-stream").style.display="none";
					canvas.getContext("2d").drawImage(vid, 0, 0, canvas.width, canvas.height);
					// this.href = document.getElementById("canvasID").toDataURL();
					// this.download = "pic.png";
					// alert(typeof(img));
					// console.log(img);
					//window.alert(this.href);
					// this.download = img;
					//document.getElementById('canvasID').src=this.href;
					// canvasID.getContext("2d").drawImage(canvas, 0, 0, 600, 600, 0, 0, 600, 600);
					// alert("done");
				};
	    },

	    // Error Callback
	    function(err) {
	      // Log the error to the console.
	      console.log('The following error occurred when trying to use getUserMedia: ' + err);
	    }
	  );

	} else {
	  alert('Sorry, your browser does not support getUserMedia');
	}
}