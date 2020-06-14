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
	var allAnimeCategoriesUrl = "json/allanimecategories.json";
	var allMovieCategoriesUrl = "json/allmoviecategories.json";
	var categoryHtml = "snippets/categoty-snippet.html";
	var categoriesTitleHtml = "snippets/category-title-snippet.html";

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

	// to insert property
	var insertProperty = function (string, propName, propValue){
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	};


	document.addEventListener("DOMContentLoaded", function (event) {

		// On first load, show home view
		//showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
		  homeHtml,
		  function (responseText) {
		    document.querySelector("#main-content")
		      .innerHTML = responseText;
		  }
		  false);
		});

	// TO load anime- categories
	dc.loadAnimeCategories = function(){
		$ajaxUtils.sendGetRequest(allAnimeCategoriesUrl,buildCategories);
	};

	// TO load movie-categories
	dc.loadMovieCategories = function(){
		$ajaxUtils.sendGetRequest(allMovieCategoriesUrl,buildCategories);
	};

	//builds html file for anime categories page

	function buildCategories (categories){
			$ajaxUtils.sendGetRequest(categoriesTitleHtml, function(categoriesTitleHtml){

				$ajaxUtils.sendGetRequest(categoryHtml, function(categoryHtml){
					switchMenuToActive();

					var categoriesViewHtml = buildCategoriesView(categories,
						categoriesTitleHtml,categoryHtml);
					insertHtml("#main-content", categoriesViewHtml);
				},false);

			},false);

	} 

	function buildCategoriesView(categories,categoriesTitleHtml, categoryHtml){

		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		for(var i=0;i<categories.length; i++){
			var html = categoryHtml;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "short_name", short_name);
			finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}

	global.$dc = dc;


})(window);