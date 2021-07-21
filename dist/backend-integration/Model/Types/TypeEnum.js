var TypeEnum = /** @class */ (function () {
    function TypeEnum(values) {
        // handle null/undefined values
        this.deserialize = function (value) {
            if (value === null || value === undefined)
                return "";
            if (typeof value === "string")
                return value;
            throw new Error("Unsupported data");
        };
        this.serialize = function (value) { return (value === "" ? null : value); };
        this.values = values;
    }
    TypeEnum.prototype.validate = function (value) {
        if (value === "")
            return null;
        return this.values.find(function (entry) { return entry.value === value; })
            ? null
            : "Invalid Enum Value detected!"; // Developer warning
    };
    TypeEnum.prototype.getFilterType = function () {
        return "string";
    };
    TypeEnum.prototype.getDefaultValue = function () {
        return "";
    };
    TypeEnum.prototype.stringify = function (value) {
        var _a;
        if (!value)
            return "";
        return (((_a = this.values.find(function (entry) { return entry.value === value; })) === null || _a === void 0 ? void 0 : _a.getLabel()) ||
            "Invalid Enum Value detected!");
    };
    return TypeEnum;
}());
export default TypeEnum;
