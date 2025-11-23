		var SPEEDslider;
		var SPEEDnum;
		document.body.onload = function() {
			SPEEDslider = document.getElementById("sliderInputSpeed");
			SPEEDnum = document.getElementById("SpeednumInput");

			ELEVATIONslider = document.getElementById("sliderInputElevation");
			ELEVATIONnum = document.getElementById("ElevationnumInput");
		};
		
		function sliderUpdate() {
			SPEEDnum.value = SPEEDslider.value;
		}
		
		function numberUpdate() {
			SPEEDslider.value = parseInt(SPEEDnum.value);
		}
		
		var ELEVATIONslider;
		var ELEVATIONnum;
		
		function sliderUpdateE() {
			ELEVATIONnum.value = ELEVATIONslider.value;

		}
		
		function numberUpdateE() {
			ELEVATIONslider.value = parseInt(ELEVATIONnum.value);
		}
