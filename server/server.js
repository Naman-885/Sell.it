const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes/user'));



app.listen(PORT, () => {
    console.log("Connected to Port: ", PORT);
})