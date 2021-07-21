import React, { useContext, useState } from "react";
/**
 * General information regarding permission format:
 * Each permission is specified as path using . (dot) as separation character, ex:
 * - module.submodule.function.sub-function
 * - module.submodule.function
 * - module.function
 * - module
 *
 * Permissions support the * (asterisk) character als wildcard matching character, ex:
 * - module.* => matches module.submodule.function.sub-function, module.submodule.function and module.function, but not module
 * - module.submodule.* => matches module.submodule.function.sub-function, module.submodule.function
 * - * => matches everything
 */
export var PermissionContext = React.createContext(undefined);
/**
 * Provides the current permission context, throwing an error if it's not set
 * @remarks This is a React hook
 */
export var usePermissionContext = function () {
    var ctx = useContext(PermissionContext);
    if (!ctx)
        throw new Error("PermissionContext is not set");
    return ctx;
};
/**
 * Pattern matching permission checking
 * @param perms A list of permissions, usually taken from PermissionContext (usePermissionContext)
 * @param perm Permission(s) to check
 */
export var hasPermission = function (perms, perm) {
    if (perm === null)
        return true;
    if (perm === false)
        return false;
    if (typeof perm !== "string") {
        for (var _i = 0, perm_1 = perm; _i < perm_1.length; _i++) {
            var canDo = perm_1[_i];
            if (hasPermission(perms, canDo)) {
                return true;
            }
        }
        return false;
    }
    var checkParts = perm.split(".");
    for (var _a = 0, perms_1 = perms; _a < perms_1.length; _a++) {
        var presentPermission = perms_1[_a];
        var presentParts = presentPermission.split(".");
        var okay = false;
        for (var i = 0; i < checkParts.length; ++i) {
            okay = false;
            if (presentParts[i] === undefined)
                break;
            if (presentParts[i] !== "*" && presentParts[i] !== checkParts[i])
                break;
            okay = true;
            if (presentParts[i] === "*")
                break;
        }
        if (okay)
            return true;
    }
    return false;
};
var PermissionContextProvider = function (props) {
    var state = useState([]);
    return (React.createElement(PermissionContext.Provider, { value: state }, props.children));
};
export default React.memo(PermissionContextProvider);
