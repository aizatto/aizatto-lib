"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var node_fetch_1 = require("node-fetch");
function fetchHTMLFromDevServer(devServer) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(devServer)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, response.text()];
            }
        });
    });
}
function scrapeHTML(html) {
    var scripts = html.match(/<script.*<\/script>/g);
    return {
        scripts: scripts,
        links: [],
    };
}
exports.scrapeHTML = scrapeHTML;
/**
 * We don't use an `if` condition so tha we can test this function in isolation
 */
function scrapeProduction(html) {
    var scripts = html.match(/<script.*<\/script>/g);
    var links = html.match(/<link\s+href="[^"]*"\s+rel="stylesheet">/g);
    return {
        scripts: scripts,
        links: links,
    };
}
exports.scrapeProduction = scrapeProduction;
function fetchAssets(devServer, buildFile) {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, html, assets, html, assets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.env.NODE_ENV === "production")) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs_extra_1.readFile(buildFile)];
                case 1:
                    buffer = _a.sent();
                    html = buffer.toString();
                    assets = scrapeProduction(html);
                    return [2 /*return*/, {
                            scripts: assets.scripts.join(''),
                            links: assets.links.join(''),
                        }];
                case 2: return [4 /*yield*/, fetchHTMLFromDevServer(devServer)];
                case 3:
                    html = _a.sent();
                    assets = scrapeHTML(html);
                    return [2 /*return*/, {
                            scripts: assets.scripts.join(''),
                            links: assets.links.join(''),
                        }];
            }
        });
    });
}
exports.fetchAssets = fetchAssets;
//# sourceMappingURL=assets.js.map