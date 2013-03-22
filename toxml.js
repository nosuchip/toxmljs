function toXml(dict) {
    var enumerate = function(o, tag, callbackOpen, callbackClose, callbackContent) {
        for (var key in o) {
            if (o[key] instanceof Array) {
                callbackOpen(key + "s", o[key]);
                enumerate(o[key], key, callbackOpen, callbackClose, callbackContent);
                callbackClose(key + "s", o[key]);
            }
            else if (typeof(o[key]) == 'object') {
                callbackOpen(tag === '' ? key : tag, o[key]);
                enumerate(o[key], '', callbackOpen, callbackClose, callbackContent);
                callbackClose(tag === '' ? key : tag, o[key]);
            }
            else {
                callbackOpen(key, o[key]);
                callbackContent(key, o[key]);
                callbackClose(key, o[key]);
            }
        }
    };

    var result = [];
    enumerate(dict, '',
        function(k, v) {
            result.push('<' + k + '>');
        },
        function(k, v) {
            result.push('</' + k + '>');
        },
        function(k, v) {
            result.push(v);
        });

    return result.join('');
}
