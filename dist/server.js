"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var showdown_1 = __importDefault(require("showdown"));
var app = express_1.default();
var converter = new showdown_1.default.Converter();
converter.setOption('noHeaderId', true);
var testMessage = fs_1.default.readFileSync(path_1.default.join(__dirname, '../posts/test.md'), 'utf-8');
var convertedMsg = converter.makeHtml(testMessage);
console.log(convertedMsg);
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path_1.default.join(__dirname, '../views') });
});
app.get('/post', function (req, res) {
    res.send(convertedMsg);
});
app.listen(8090);
