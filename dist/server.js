"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var showdown_1 = __importDefault(require("showdown"));
var serve_favicon_1 = __importDefault(require("serve-favicon"));
var app = express_1.default();
var converter = new showdown_1.default.Converter();
converter.setOption('noHeaderId', true);
// load favicon
app.use(serve_favicon_1.default(path_1.default.join(__dirname, '../src/utils', 'favicon.ico')));
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path_1.default.join(__dirname, '../views') });
});
app.get('/:slug', function (req, res) {
    var slug = req.params.slug;
    var dataPath = "../posts/" + slug + ".md";
    if (!fs_1.default.existsSync(path_1.default.join(__dirname, dataPath)))
        res.redirect('/');
    var postMessageData = fs_1.default.readFileSync(path_1.default.join(__dirname, dataPath), 'utf-8');
    var postMessageHTML = converter.makeHtml(postMessageData);
    res.send(postMessageHTML);
});
app.listen(8090);
