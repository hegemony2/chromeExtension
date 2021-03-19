// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the active tab
	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		var activeTab = tabs[0];
		var url = activeTab.url;
		// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		// url = tabs[0].url;
		// // use `url` here inside the callback because it's asynchronous!
		// });
		chrome.tabs.sendMessage(activeTab.id, {
			"message" : url
		});
	});
});

chrome.contextMenus.create({
	title : "Aggregate Image...",
	contexts : [ "image" ],
	onclick : onClickHandler
});

function onClickHandler(info, tab) {
	// console.log("url: " + info.srcUrl);

	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		var activeTab = tabs[0];
		var url = activeTab.url;
		// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		// url = tabs[0].url;
		// // use `url` here inside the callback because it's asynchronous!
		// });

		var queryString = /^[^#?]*(\?[^#]+|)/.exec(activeTab.url)[1];

		chrome.tabs.sendMessage(activeTab.id, {
			"mediaType" : info.mediaType,
			"linkUrl" : info.linkUrl,			
			"srcUrl" : info.srcUrl,
			"pageUrl" : info.pageUrl,
			"frameUrl" : info.pageUrl,
			"selectionText" : info.selectionText,			
			"category" : getParameterByName(queryString, "category"),
		});
	});

}

function getParameterByName(queryString, name) {
	// Escape special RegExp characters
	if (queryString.indexOf(name + "=") > -1) {
		name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
		// Create Regular expression
		var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
		// Attempt to get a match
		var results = regex.exec(queryString);
		return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
	}
}
