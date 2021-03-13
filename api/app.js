const express = require('express');
const bodyParser = require("body-parser");
const { connectToDb } = require('./db/mongoose'); 
const { StatusCodes } = require('http-status-codes')

const app = express();

connectToDb();
app.use(bodyParser.json());
const router = require('./routes/index');


app.use(router)

app.get("/", (req, res) => {
    res.sendStatus(StatusCodes.OK);
})
       
app.listen(3000, () => {
    console.log("[+] Server is running!");
});   