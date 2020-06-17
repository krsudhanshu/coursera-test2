$(function(){
	$("#navbarToggle").blur(function(event){
		var screenwidth = window.innerWidth;
		if(screenwidth < 768){
			$("#navbarSupportedContent").collapse('hide');
		}
	});

	$("#navbarToggle").click(function(event){
		$(event.target).focus();
	});

});

(function (global) {

	var dc={};
	
	var homeHtml = "snippets/home-snippet.html";
	var allAnimeCategoriesUrl = "json/anime.json";
	var allMovieCategoriesUrl = "json/movie.json";
	var categoryHtml = "snippets/category-snippet.html";
	var categoriesTitleHtml = "snippets/category-title-snippet.html";

	var insertHtml = function(selector,html){
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML= html;
	};

	var switchMenuToActive = function(id){
		var classes = document.querySelector("#navHomeButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navHomeButton").className = classes;

		classes = document.querySelector("#navAnimeButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navAnimeButton").className = classes;

		classes = document.querySelector("#navMovieButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navMovieButton").className = classes;


		id ="#" + id;
		classes = document.querySelector(id).className;
		if(classes.indexOf("active")== -1){
			classes +=" active";
			document.querySelector(id).className = classes;
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
		  },
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
					id = categories[0].id;

					switchMenuToActive(id);

					var categoriesViewHtml = buildCategoriesView(categories,
						categoriesTitleHtml,categoryHtml);
					insertHtml("#main-content", categoriesViewHtml);
				},false);

			},false);

	} 

	function buildCategoriesView(categories,categoriesTitleHtml, categoryHtml){

		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		//console.log(categories.anime.length);

		for(var i=1;i<categories.length; i++){
			var html = '<div class="col-md-3 col-sm-4 col-xs-6">';
			html += categoryHtml;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty(html, "folder", categories[0].folder);
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "short_name", short_name);
			html = '<a href=" '+ categories[i].url + '" target = "_blank">'+ html +'</a>';
			html = html + '</div>';
			finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}

	// To go to the anime page

	// var sn;

	// dc.loadAnimeMenuItems = function(short_name){
	// 	//sn = short_name; 
	// 	$ajaxUtils.sendGetRequest(allAnimeCategoriesUrl, toTheUrl);
	// };

	// dc.loadMovieMenuItems = function(short_name){
	// 	//sn = short_name;
	// 	$ajaxUtils.sendGetRequest(allMovieCategoriesUrl, toTheUrl);
	// };

	// function toTheUrl(categories){

	// 	for(var i=1;i<categories.length;i++){
	// 		var sn= categories[i].short_name;
	// 		if(sn===short_name){

	// 		}
	// 	}
	// }


	global.$dc = dc;


})(window);