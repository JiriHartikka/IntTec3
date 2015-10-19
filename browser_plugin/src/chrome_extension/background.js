var port;

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	port = chrome.tabs.connect(tabs[0].id);
	port.onMessage()
});

if (port !== undefined) {
	var ws = new WebSocket('ws://localhost:8888')

	ws.onmessage = function (event) {
		if (event.data) {
			port.postMessage({
				gazeX: event.data.x,
				gazeY: event.data.y
			});
		} else {
			// TODO ERROR HANDLING
		}
	}
} else {
	// TODO ERROR HANDLING
}