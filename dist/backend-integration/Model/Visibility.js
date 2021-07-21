export var getVisibility = function (cb, values) {
    if (typeof cb === "function") {
        return cb(values);
    }
    return cb;
};
