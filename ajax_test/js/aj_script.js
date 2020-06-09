(function (global){

	var ajaxutils= {};

	function getRequestObject(){
		if(global.XMLHttpRequest){
			return (new XMLHttpRequest());
		}
		else if(global.ActiveXObject){
			return (new ActiveXObject("Microsoft.XMLHTTP"));
		}
		else{
			global.alert("Ajax not supported");
			return (null);
		}
	}

	ajaxutils.sendGetRequest = function(requestUrl, responseHandler){
		var request= getRequestObject();
		request.onreadystatechange= function(){
			handleresponse(request,responseHandler);
		};
		request.open("GET", requestUrl, true);
		request.send(null);
	};

	function handleresponse (request, responseHandler){
		if((request.readyState==4) && (request.status==200)){
			responseHandler(request);
		}
	};

	global.$ajaxutils=ajaxutils;

})(window);