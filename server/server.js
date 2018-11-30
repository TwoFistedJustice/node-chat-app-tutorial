const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


console.log('__dirname', __dirname);
console.log('old way: ', __dirname + '/../public');
console.log('node path module way:', publicPath);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});