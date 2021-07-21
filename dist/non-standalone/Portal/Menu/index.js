var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useState } from "react";
import { MenuBase } from "../../..";
import { FrameworkHistory } from "../../../framework";
import { useLocation } from "react-router-dom";
/**
 * Converts the routed menu item definitions to normal menu item definitions
 * @param definition The routeed menu item definition
 * @param path The current location.pathname
 * @param depth The depth of the menu item
 * @return a normal menu item definition
 */
var convertDefinition = function (definition, path, depth) {
    var _a;
    return (__assign(__assign({}, definition), { forceExpand: definition.children &&
            !!resolveLocation(definition.children, path, depth + 1, null), children: (_a = definition.children) === null || _a === void 0 ? void 0 : _a.map(function (entry) {
            return convertDefinition(entry, path, depth + 1);
        }), onClick: function (evt) {
            if (definition.onClick) {
                definition.onClick(evt);
            }
            if (definition.route) {
                if (evt.ctrlKey || evt.metaKey || evt.shiftKey)
                    window.open(definition.route, "_blank");
                else
                    FrameworkHistory.push(definition.route);
            }
        }, onAuxClick: function (evt) {
            if (definition.onAuxClick) {
                definition.onAuxClick(evt);
            }
            if (definition.route) {
                window.open(definition.route);
            }
        } }));
};
/**
 * Returns the internal name used by the menu to set the active state based off the given path
 * @param definitions The menu item definitions
 * @param path The current location.pathname
 * @param depth The depth of the menu item
 * @param itemId The menu item id
 * @return The menu item "identifier" used to set the menu item active or undefined if no match has been found
 */
var resolveLocation = function (definitions, path, depth, itemId) {
    // first recurse to find the deepest matching link
    for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
        var def = definitions_1[_i];
        if (def.children) {
            var nextLevel = resolveLocation(def.children, path, depth + 1, itemId ? itemId + "@" + def.title : def.title);
            if (nextLevel)
                return nextLevel;
        }
    }
    // then try this level
    for (var _a = 0, definitions_2 = definitions; _a < definitions_2.length; _a++) {
        var def = definitions_2[_a];
        if (def.route && path.startsWith(def.route)) {
            return itemId ? itemId + "@" + def.title : def.title;
        }
    }
    // and if nothing found
    return null;
};
var RoutedMenu = function (props) {
    var controlledState = useState("");
    var activeMenuItem = controlledState[0], setActiveMenuItem = controlledState[1];
    var location = useLocation();
    var path = location.pathname;
    // set the currently active item based off location
    useEffect(function () {
        var menuEntry = resolveLocation(props.definition, path, 0, null);
        if (menuEntry && activeMenuItem !== menuEntry) {
            setActiveMenuItem(menuEntry);
        }
    }, [activeMenuItem, path, props.definition, setActiveMenuItem]);
    // convert routed menu definitions to normal menu definitions
    var rawDef = props.definition;
    var definition = React.useMemo(function () {
        return rawDef.map(function (entry) { return convertDefinition(entry, path, 0); });
    }, [rawDef, path]);
    return (React.createElement(MenuBase, __assign({}, props, { definition: definition, customState: controlledState })));
};
export default React.memo(RoutedMenu);
