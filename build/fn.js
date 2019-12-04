"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
function setMath(a, b) {
    return {
        remove: __spread(a).filter(function (x) { return !b.has(x); }),
        add: __spread(b).filter(function (x) { return !a.has(x); }),
    };
}
exports.setMath = setMath;
function setEqual(a, b) {
    var e_1, _a;
    if (a.size !== b.size) {
        return false;
    }
    try {
        for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
            var value = a_1_1.value;
            if (!b.has(value)) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
exports.setEqual = setEqual;
function isValidDateString(date) {
    var match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!match) {
        throw new Error("Invalid date: " + date);
    }
    var year = parseInt(match[1]);
    var month = parseInt(match[2]);
    var day = parseInt(match[3]);
    if (month > 12) {
        throw new Error("Invalid date: " + date);
    }
    if (day > 31) {
        throw new Error("Invalid date: " + date);
    }
    if (isNaN(Date.parse(year + "-" + month + "-" + day))) {
        throw new Error("Invalid date: " + date);
    }
    return date;
}
exports.isValidDateString = isValidDateString;
/**
 * Scenarios:
 * * urlA has hostname, urlB does not have hostname
 *
 * TODO: replace this logic, it is really basic
 */
function compareURL(stringA, stringB) {
    var urlA = url.parse(stringA);
    var urlB = url.parse(stringB);
    new Set([
        'protocol',
        'host',
        'hostname',
        'path',
        'port',
    ]).forEach(function (key) {
        var aValue = urlA[key];
        var bValue = urlB[key];
        if (key === 'port') {
            if (aValue === null && urlA.protocol) {
                aValue = getDefaultPort(urlA.protocol);
            }
            if (bValue === null && urlB.protocol) {
                bValue = getDefaultPort(urlB.protocol);
            }
        }
        if (aValue && !bValue) {
            urlB[key] = aValue;
        }
        else if (!aValue && bValue) {
            urlA[key] = bValue;
        }
    });
    return url.format(urlA) === url.format(urlB);
}
exports.compareURL = compareURL;
function getDefaultPort(protocol) {
    switch (protocol) {
        case 'http:':
            return 80;
        case 'https:':
            return 443;
        default:
            return null;
    }
}
//# sourceMappingURL=fn.js.map