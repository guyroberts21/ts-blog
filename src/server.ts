import express from 'express';
import path from 'path';
import fs from 'fs';
import showdown from 'showdown';
import favicon from 'serve-favicon';

const app = express();
const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);

// load favicon
app.use(favicon(path.join(__dirname, '../src/utils', 'favicon.ico')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const dataPath = `../posts/${slug}.md`;
  if (!fs.existsSync(path.join(__dirname, dataPath))) res.redirect('/');
  const postMessageData = fs.readFileSync(
    path.join(__dirname, dataPath),
    'utf-8'
  );
  const postMessageHTML = converter.makeHtml(postMessageData);
  res.send(postMessageHTML);
});

app.listen(8090);
