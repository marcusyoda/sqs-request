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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var squiss_ts_1 = require("squiss-ts");
var ts_print_1 = require("ts-print");
var onMessage_1 = require("./onMessage");
var _a = process.env, _b = _a.AWS_ENDPOINT, AWS_ENDPOINT = _b === void 0 ? '' : _b, _c = _a.AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_ID = _c === void 0 ? '' : _c, _d = _a.AWS_SECRET_ACCESS_KEY, AWS_SECRET_ACCESS_KEY = _d === void 0 ? '' : _d, _e = _a.SQUISS_BODY_FORMAT, SQUISS_BODY_FORMAT = _e === void 0 ? 'json' : _e, _f = _a.SQS_REGION, SQS_REGION = _f === void 0 ? '' : _f, _g = _a.QUEUE_NAME, QUEUE_NAME = _g === void 0 ? '' : _g, _h = _a.MAX_IN_FLIGHT, MAX_IN_FLIGHT = _h === void 0 ? '100' : _h, _j = _a.BATCH_SIZE, BATCH_SIZE = _j === void 0 ? '10' : _j, _k = _a.POOL_INTERVAL_MS, POOL_INTERVAL_MS = _k === void 0 ? '0' : _k;
var awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: SQS_REGION,
};
if (AWS_ENDPOINT !== '') {
    awsConfig.endpoint = new aws_sdk_1.default.Endpoint(AWS_ENDPOINT);
    aws_sdk_1.default.config.update(awsConfig);
}
var SquissOptions = {
    awsConfig: awsConfig,
    queueName: QUEUE_NAME,
    maxInFlight: +MAX_IN_FLIGHT,
    receiveBatchSize: +BATCH_SIZE,
    activePollIntervalMs: +POOL_INTERVAL_MS,
};
var bodyFormat = SQUISS_BODY_FORMAT;
if (bodyFormat === 'json' || bodyFormat === 'plain') {
    SquissOptions.bodyFormat = bodyFormat;
}
var poller = new squiss_ts_1.Squiss(SquissOptions);
poller.start()
    .then(function () { return (0, ts_print_1.Print)('POLLER-START (INICIADO)').ok(); })
    .catch(function (err) {
    (0, ts_print_1.Print)("POLLER-START - ".concat(err.message, ", Falha iniciando pooler.")).err();
});
poller.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var req, Bucket_1, Key_1, s3_1;
    var _a, _b;
    return __generator(this, function (_c) {
        req = msg.body;
        if (req.s3Request) {
        }
        else {
            Bucket_1 = (_a = req === null || req === void 0 ? void 0 : req.s3Request) === null || _a === void 0 ? void 0 : _a.bucket;
            Key_1 = (_b = req === null || req === void 0 ? void 0 : req.s3Request) === null || _b === void 0 ? void 0 : _b.key;
            if (Bucket_1 && Key_1) {
                s3_1 = new aws_sdk_1.default.S3();
                s3_1.getObject({
                    Bucket: Bucket_1,
                    Key: Key_1,
                }, function (err, data) {
                    if (err) {
                        (0, ts_print_1.Print)("S3-REQUEST-GET ".concat(err.message)).err();
                    }
                    else {
                        var jsonString = data.Body ? data.Body.toString('utf-8') : '';
                        msg.body = {
                            data: JSON.parse(jsonString),
                            headers: req.headers,
                            path: req.path,
                        };
                        (0, onMessage_1.onMessage)(msg);
                        s3_1.deleteObject({
                            Bucket: Bucket_1,
                            Key: Key_1,
                        }, function (errDeleteS3) {
                            if (errDeleteS3) {
                                (0, ts_print_1.Print)("S3-REQUEST-DELETE ".concat(errDeleteS3.message)).err();
                            }
                        });
                    }
                });
            }
        }
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=index.js.map