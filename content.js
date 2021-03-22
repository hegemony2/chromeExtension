//alert("Hello from your Chrome extension!");



// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// if( request.message === "clicked_browser_action" ) {
	// var firstHref = $("a[href^='http']").eq(0).attr("href");
	// var firstHref = tabs[0].url;
	// }
	console.log(request.imageUrl);
	console.log(request.pageUrl);
	console.log(request.category);
	console.log(request.linkUrl);
	
	var data = {
			mediaType:request.mediaType, 
			linkUrl:request.linkUrl,
			srcUrl:request.srcUrl,
			pageUrl:request.pageUrl,
			frameUrl:request.frameUrl,
			selectionText:request.selectionText,
			category:request.category
//			category:"123"
		}; //Array 

//	var data = $.toJSON(formData);

//	var xhr = new XMLHttpRequest();
//	xhr.open("POST", "http://localhost:8080/aggregation", true);
//	xhr.setRequestHeader("Content-type", "application/json");
//	xhr.onreadystatechange = function() {
//	  if (xhr.readyState == 4) {
//	      console.log('xhr response: '+ xhr.responseText);
//	  }
//	}
//	xhr.send(data);
	
	
	$.ajax({
	    url : "http://localhost:8080/aggregation", // Url of backend (can be python, php, etc..)
	    type: "POST", // data type (can be get, post, put, delete)
	    data : data, // data in json format
	  	async : true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
	    success: function(response, textStatus, jqXHR) {
	    	console.log(response);
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
	      	console.log(textStatus);
	      	console.log(errorThrown);
	    }
	});
	
	
});
