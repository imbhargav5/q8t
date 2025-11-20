"use strict";
// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram API OpenAPI specifications
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientApi = exports.ClientTypes = exports.GatewayApi = exports.GatewayTypes = exports.BotApi = exports.BotTypes = void 0;
// Bot API
exports.BotTypes = __importStar(require("./bot-types"));
var bot_api_1 = require("./bot-api");
Object.defineProperty(exports, "BotApi", { enumerable: true, get: function () { return bot_api_1.BotApi; } });
// Gateway API
exports.GatewayTypes = __importStar(require("./gateway-types"));
var gateway_api_1 = require("./gateway-api");
Object.defineProperty(exports, "GatewayApi", { enumerable: true, get: function () { return gateway_api_1.GatewayApi; } });
// Client API
exports.ClientTypes = __importStar(require("./client-types"));
var client_api_1 = require("./client-api");
Object.defineProperty(exports, "ClientApi", { enumerable: true, get: function () { return client_api_1.ClientApi; } });
//# sourceMappingURL=index.js.map