typeof console === 'object' && console && console.log('2. stub');
if (!window.__cmp || typeof window.__cmp !== 'function') {
    var faktorCmpStart = window.__cmp ? window.__cmp.start : {};

    window.__cmp = (function () {
        var listen = window.attachEvent || window.addEventListener;
        listen('message', function (event) {
            window.__cmp.receiveMessage(event);
        });

        function addLocatorFrame() {
            if (!window.frames['__cmpLocator']) {
                if (document.body) {
                    var frame = document.createElement('iframe');
                    frame.style.display = 'none';
                    frame.name = '__cmpLocator';
                    document.body.appendChild(frame);
                } else {
                    setTimeout(addLocatorFrame, 5);
                }
            }
        }

        addLocatorFrame();

        var commandQueue = [];
        var cmp = function (command, parameter, callback) {
            if (command === 'ping') {
                if (callback) {
                    callback({
                        gdprAppliesGlobally: !!(
                            window.__cmp &&
                            window.__cmp.config &&
                            window.__cmp.config.storeConsentGlobally
                        ),
                        cmpLoaded: false,
                    });
                }
            } else {
                commandQueue.push({
                    command: command,
                    parameter: parameter,
                    callback: callback,
                });
            }
        };
        cmp.commandQueue = commandQueue;
        cmp.receiveMessage = function (event) {
            var data = event && event.data && event.data.__cmpCall;
            if (data) {
                commandQueue.push({
                    callId: data.callId,
                    command: data.command,
                    parameter: data.parameter,
                    event: event,
                });
            }
        };

        return cmp;
    })();

    window.__cmp.start = faktorCmpStart;
}
