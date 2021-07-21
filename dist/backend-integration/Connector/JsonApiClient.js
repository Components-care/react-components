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
/* eslint-disable no-console */
import ccI18n from "../../i18n";
import AuthMode from "./AuthMode";
import { addGetParams } from "../../utils";
/**
 * A helper class to connect to JSON REST apis
 */
var JsonApiClient = /** @class */ (function () {
    function JsonApiClient(authHandler, responseProcessor, preRequestHook, postRequestHook) {
        this.handleAuthentication = authHandler;
        this.handleResponse = responseProcessor;
        this.handlePreRequest = preRequestHook;
        this.handlePostRequest = postRequestHook;
    }
    /**
     * @see http
     */
    JsonApiClient.prototype.get = function (url, args, auth) {
        if (auth === void 0) { auth = AuthMode.On; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http("GET", url, args, null, auth)];
            });
        });
    };
    /**
     * @see http
     */
    JsonApiClient.prototype.post = function (url, args, body, auth) {
        if (auth === void 0) { auth = AuthMode.On; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http("POST", url, args, body, auth)];
            });
        });
    };
    /**
     * @see http
     */
    JsonApiClient.prototype.put = function (url, args, body, auth) {
        if (auth === void 0) { auth = AuthMode.On; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http("PUT", url, args, body, auth)];
            });
        });
    };
    /**
     * @see http
     */
    JsonApiClient.prototype.patch = function (url, args, body, auth) {
        if (auth === void 0) { auth = AuthMode.On; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http("PATCH", url, args, body, auth)];
            });
        });
    };
    /**
     * @see http
     */
    JsonApiClient.prototype.delete = function (url, args, auth) {
        if (auth === void 0) { auth = AuthMode.On; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http("DELETE", url, args, null, auth)];
            });
        });
    };
    /**
     * Performs an HTTP request with automatic authorization if desired
     * @param method The HTTP Verb
     * @param url The url of the request
     * @param args The query parameters to pass
     * @param body The JSON body to pass
     * @param auth The authentication mode to use
     */
    JsonApiClient.prototype.http = function (method, url, args, body, auth) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, response, e_1, responseData, e_2, text, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.handlePreRequest) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handlePreRequest(method, url, args, body, auth)];
                    case 1:
                        void (_b.sent());
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 18, 21]);
                        headers = {};
                        // Handle localization
                        headers["Accept-Language"] = ccI18n.language;
                        if (!(auth !== AuthMode.Off)) return [3 /*break*/, 4];
                        _a = headers;
                        return [4 /*yield*/, this.handleAuthentication(auth)];
                    case 3:
                        _a.Authorization = _b.sent();
                        _b.label = 4;
                    case 4:
                        // Handle URL GET arguments
                        url = addGetParams(url, args);
                        // Handle POST data
                        if (body) {
                            body = JSON.stringify(body);
                            headers["Content-Type"] = "application/json";
                        }
                        response = void 0;
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, fetch(url, {
                                body: body,
                                headers: headers,
                                method: method,
                            })];
                    case 6:
                        response = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        // Network error
                        console.error("Failed fetch", e_1);
                        throw new Error(ccI18n.t("backend-integration.connector.json-api-client.network-error"));
                    case 8:
                        responseData = void 0;
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 16]);
                        return [4 /*yield*/, response.json()];
                    case 10:
                        responseData = _b.sent();
                        return [3 /*break*/, 16];
                    case 11:
                        e_2 = _b.sent();
                        // JSON parse error
                        console.error("[JsonApiClient] Failed JSON parsing", e_2);
                        _b.label = 12;
                    case 12:
                        _b.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, response.text()];
                    case 13:
                        text = _b.sent();
                        console.error("[JsonApiClient] Response was", text);
                        return [3 /*break*/, 15];
                    case 14:
                        e_3 = _b.sent();
                        console.error("[JsonApiClient] Failed reading response as text", e_3);
                        return [3 /*break*/, 15];
                    case 15: throw new Error(ccI18n.t("backend-integration.connector.json-api-client.parse-error", {
                        STATUS_CODE: response.status,
                        STATUS_TEXT: response.statusText,
                    }));
                    case 16: return [4 /*yield*/, this.handleResponse(response, responseData, method, url, args, body, auth)];
                    case 17: return [2 /*return*/, (_b.sent())];
                    case 18:
                        if (!this.handlePostRequest) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.handlePostRequest(method, url, args, body, auth)];
                    case 19:
                        void (_b.sent());
                        _b.label = 20;
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    return JsonApiClient;
}());
export default JsonApiClient;
