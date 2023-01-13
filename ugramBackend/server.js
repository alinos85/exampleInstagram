const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");

async function test_connection(){
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        setTimeout(() => { test_connection(); }, 10000);
    }
}

test_connection();
db.sequelize.sync();

app.use(cors());

//parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

require("./app/routes/routes.js")(app);

//simple route
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`);
});