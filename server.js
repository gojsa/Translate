require('dotenv').config()
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5001;
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false
}));

//Connect to DB
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database"))

//Controllers
const { checkAndInser } = require('./controllers/insertLang')
const { checkAndInserUser } = require('./controllers/insertUser')

//Insert user
checkAndInser()
    //Insert language
checkAndInserUser()
app.use(express.json())

//Route
const translateRoute = require('./routes/translate');
const userRoute = require('./routes/users');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', translateRoute)
app.use('/secure', userRoute)
app.use("/public", express.static('./public/'));

server.listen(port, () => console.log("server started at: " + port))