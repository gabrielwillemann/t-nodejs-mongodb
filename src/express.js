let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3000;

app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = { express, app };
