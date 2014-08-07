// JavaScript Document
$(document).ready(function() {	

	 $(function() {
    					$( "#icc-logo" ).draggable();
  					});

	var status = "chillin";
	var mouthOpen = false;
	var count = 0;


	// on mouse move

	$(document).mousemove(function(e){		


		var docW = $(window).width();
		var docH = $(window).height();

		var diffX = (docW/2) - e.clientX;
		var diffY = (docH/2)-100 - e.clientY;

		var dist = distance(docW/2,docH/2, e.clientX, e.clientY);
		var distM = distance(docW/2,(docH/2)+60, e.clientX, e.clientY);


		if (status == "chillin") {
				if(distM < 300) {
					$('#monster-friend').removeClass("chillin").addClass("excited");
					status = "excited";
					console.log(status);
					//playAudio("audio-ohh");
			}


		} else if (status == "excited") {

			// eye
			$('#monster-friend').removeClass("chillin").addClass("excited");

			var eye_background = Math.floor( diffX /-30 ) +'px '+ Math.floor( diffY /-30 ) +'px';		
			var eye_translate =	Math.floor(diffX/-50 )+'px, '+ Math.floor(diffY/-100 )+'px';	
			$(".monster-eye").css({"background-position":eye_background, "-webkit-transform":'translate3d('+eye_translate+',0)', 			"-moz-transform":'translate('+eye_translate+')' });
			$(".pupil").css({"background-position":eye_background, "-webkit-transform":'translate3d('+eye_translate+',0) scale(.8)', "-moz-transform":'translate('+eye_translate+') scale(.8)'});
			$("#eyebrow-wrapper").css({"background-position":eye_background, "-webkit-transform":'translate3d('+eye_translate+',0)', "-moz-transform":'translate('+eye_translate+')' });
			$(".left-eyebrow").css('-webkit-transform', 'rotate(25deg)' , '-moz-transform: rotate(25deg)');
			$(".right-eyebrow").css('-webkit-transform', 'rotate(-25deg)' , '-moz-transform: rotate(-25deg)');


			// mouth

			if (distM > 300) {
				if(mouthOpen) {
					mouthOpen = false;
					$('#monster-mouth').addClass("mouth-closed");
					$('#monster-mouth').removeClass("mouth-open");
					var mouth_height = "40px";
					count = 0;
				}
			} else {				
				var mouth_height = 200 - Math.floor(distM /3)+'px';
				if(!mouthOpen) {
					mouthOpen = true;
					$('#monster-mouth').removeClass("mouth-closed");
					$('#monster-mouth').addClass("mouth-open");
				}
			}
			var mouth_transform = Math.floor(diffX/-80 )+'px, '+ Math.floor(diffY/-80 )+'px';
			$("#monster-mouth").css({ "height":mouth_height, "-webkit-transform":'translate3d('+mouth_transform+', 0)', "-moz-transform":'translate('+mouth_transform+')' });


			// snap cursor

			if(distM < 30 && count > 50) {
				count = 0;
				$("#monster-mouth").css({ "height":"", "-webkit-transform":"", "-moz-transform":"" });
				//$("body").css({ "cursor":"none" });
				$('#icc-logo').removeClass("active").addClass("logo-eaten");
				$('#monster-mouth').removeClass("mouth-waiting , mouth-open").addClass("mouth-eat");
				$('#monster-friend').removeClass("excited").addClass("satisfied");
				document.getElementById("moving-box").innerHTML="<h1>Nom. Nom. Nom.</h1>"
				//playAudio("audio-snap");
				status = "eat";				
			} else {
				count++;			
			}


		} else if (status == "eat") {

			if(distM > 120) {
				console.log("now");
				$("body").css({ "cursor":"" });
				status = "eat";
				//playAudio("audio-ohh");
			}

		};


    });

});
// helpers

var distance = function(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};


