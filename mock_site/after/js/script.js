$(function(){
	$("navbarToggle").blur(function(event){
		var screenwidth= window.innerWidth;
		if(screenwidth<768){
			$("#collapsable-nav").collapse('hide');
		}
	});

	$("navbarToggle").click(function(event){
		$(event.target).focus();
	});

});

(function (global) {

	var dc={};
	var homeHtml = "snippets/home-snippet.html";

	var insertHtml = function(selector,html){
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML= html;
	};

	var switchMenuToActive = function(){
		var classes = document.querySelector("#navMenuButton").className;
		if(classes.indexOf("active")== -1){
			classes +=" active";
			document.querySelector("#navMenuButton").className = classes;
		}
	};

	document.addEventListener("DOMContentLoaded", function (event) {

		// On first load, show home view
		//showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
		  homeHtml,
		  function (responseText) {
		    document.querySelector("#main-content")
		      .innerHTML = responseText;
		  },
		  false);
		});


})(window);