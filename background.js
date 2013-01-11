// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(null, {
		file : "style.css"
	});
	chrome.tabs.executeScript(null, {
		file : "content.js"
	});
});

chrome.browserAction.setBadgeBackgroundColor({
	color : [0, 200, 0, 100]
});
chrome.browserAction.setBadgeText({
	text : 'Untie'
});
