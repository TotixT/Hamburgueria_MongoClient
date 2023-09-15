const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const routerBase = require('./routes/routes.js');
app.use("/Hamburguesas",routerBase);

require('dotenv').config();
const port = process.env.PORT;
app.use(express.json());
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})


