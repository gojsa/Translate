require('dotenv').config()
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const bodyParser = require('body-parser');
const session = require('express-session');
const { dbConnection } = require('./DBStart/connectDB')
    //insert language and user
const { checkAndInser } = require('./DBStart/insertLang')
const { checkAndInserUser } = require('./DBStart/insertUser')
    //Route
const translateRoute = require('./routes/translate');
const userRoute = require('./routes/users');
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false
}));


//DB connection
dbConnection()


//Insert user
checkAndInser()
    //Insert language
checkAndInserUser()
app.use(express.json())



app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', translateRoute)
app.use('/secure', userRoute)
app.use("/public", express.static('./public/'));

server.listen(port, () => console.log("server started at: " + port))