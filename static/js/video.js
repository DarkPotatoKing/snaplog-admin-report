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
				

				// var d = new Date();
    // 			var n = d.getTime();
				//var img = new Image();
				// Create an object URL for the video stream and use this 
				// to set the video source.
				vid.src = window.URL.createObjectURL(localMediaStream);
				// button1.addEventListener('click', function()) {
				// 	alert("HELLO");
				// }, false);
				// button.disabled = false; 
				button.onclick = function() {
					// document.getElementById("canvasID").style.display="inline";
					// document.getElementById("camera-stream").style.display="none";
					canvas.getContext("2d").drawImage(vid, 0, 0, canvas.width, canvas.height);
					
				   
					// alert(this);?
					// alert(filename);
					
					// var blobBin = atob(url.split(',')[1]);
					// var array = [];
					// for(var i = 0; i < blobBin.length; i++) {
					//     array.push(blobBin.charCodeAt(i));
					// }
					// var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
					// saveAs(file, 'file.png');
					// saveAs(file,"my.png");
					// var form = document.forms.namedItem("visitorForm");
					
					// form.addEventListener('submit', function(ev) {
						
					// 	var oData = new FormData(document.getElementById('visitorForm'));
					// 	// alert(oData);
					// 	oData.set("photo",file,"asdasd.png");
					// 	oData.set("first_name","JEYLORD");
					// 	// alert(oData);
					// 	var oReq = new XMLHttpRequest();
					// 	oReq.open("POST","/visitor/",true);
					// 	oReq.send(oData);
					// 	// alert(oReq.response);
					// 	// ev.preventDefault();
					// }, false);
					// document.getElementById("myPhoto").value = url;

					// var formdata = new FormData();
					// formdata.append("myNewFileName", file);
					// $.ajax({
					//    url: "",
					//    type: "POST",
					//    data: formdata,
					//    processData: false,
					//    contentType: false,
					// }).done(function(respond){
					//   alert(respond);
					// });
					// var fs = require('fs');
					// var ext = url.split(';')[0].match(/jpeg|png|gif/)[0];
					// var data = url.replace(/^data:image\/\w+;base64,/, "");
					// var buf = new Buffer(url, 'base64');
					// fs.writeFile('image.' + ext, buf);
					// alert(url);
					// document.getElementById("myPhoto").value = url;
					// alert(url);
					// this.download = "pic.png";
					// alert(typeof(img));
					// console.log(img);
					//window.alert(this.href);
					// this.download = img;
					//document.getElementById('canvasID').src=this.href;
					// canvasID.getContext("2d").drawImage(canvas, 0, 0, 600, 600, 0, 0, 600, 600);
					// alert("done");
					// alert(url);
				};

				// $( "#confirmButton" ).submit(function() {
				// 	this.href = url;
				// 	this.download = filename + ".png";
				// 	return false;
				// });

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
// var button1 = document.getElementById('confirmButton');

// button1.onclick = function() {
// 	var oData = new FormData(document.getElementById('visitorForm'));
// 	var oReq = new XMLHttpRequest();
// 	oReq.open("POST","/visitor/",true);
// 	oReq.send(oData);
// };
// function download(){
// 		var url = document.getElementById("canvasID").toDataURL();
// 	//	this.href = url;
// 		var filename = document.getElementById('date_time').innerHTML;
// 	//	this.download = filename + ".png";

// 	//	console.log(url);
// 		var pom = document.createElement('a');
// 		pom.setAttribute('href',url);
// 		pom.setAttribute('download',filename + ".png");
// 		pom.style.display = 'none';
// 		document.body.appendChild(pom);
// 		pom.click();
// 		document.body.removeChild(pom);
// };
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement)
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
  define("FileSaver.js", function() {
    return saveAs;
  });
}