export default function debouncePromise(func, timeout) {
    var debounceState = 0;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (debounceState !== 0) {
                window.clearTimeout(debounceState);
            }
            debounceState = window.setTimeout(function () {
                func.apply(void 0, args).then(resolve)
                    .catch(reject);
            }, timeout);
        });
    });
}
