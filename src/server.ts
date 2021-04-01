import express from 'express';
import path from 'path';
import fs from 'fs';
import showdown from 'showdown';

const app = express();
const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);

// const testMessage = fs.readFileSync(
//   path.join(__dirname, '../posts/test.md'),
//   'utf-8'
// );
// const convertedMsg = converter.makeHtml(testMessage);
// console.log(convertedMsg);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

app.get('/:postId', (req, res) => {
  const { postId } = req.params;
  const postMessageData = fs.readFileSync(
    path.join(__dirname, `../posts/${postId}.md`),
    'utf-8'
  );
  const postMessageHTML = converter.makeHtml(postMessageData);
  res.send(postMessageHTML);
});

app.listen(8090);
