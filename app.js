const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
var multer  = require('multer');
const path = require("path");
const User = require('./models/User');
const compression = require('compression');
const UserSession = require('./models/UserSession');
const signIn = require('./routes/Signin');
const signUp = require('./routes/Signup');
const logOut = require('./routes/Logout');
const verify = require('./routes/Verify');
const adPost = require('./routes/Post');
const findAds = require('./routes/FindAds');
const findAd = require('./routes/FindAd');
const env_dev=require('./env_dev.json');
const env_prod =require('./env_prod.json');
const env_local =require('./env.json');
const isCI = require('is-ci');
var fs = require('fs');
require('dotenv').config();
var errorHandler = require("./utils/errorHandler.js");
var config = require("./config");
var logger = require("./utils/logger.js");

let url = "";


//Check env variable
if(process.env.ENV === "dev"){
    console.log("Development :",process.env.ENV);
    url = `mongodb+srv://${config.DB.username}:${config.DB.pswd}@${config.DB.mongoDBHost}/shop-supplier`;

    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true}).then(async (db) => {
        console.log('Connected to MongoDB server',url);
    })
    .catch((error) => {
        console.log('could not connect to MongoDB server',url);
    });
    
}else if(process.env.ENV === "prod"){
    console.log("Production :",process.env.ENV);
    url = `mongodb://${config.DB.username}:${config.DB.pswd}@${config.DB.mongoDBHost}/shop-supplier?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred`;

    var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

    mongoose.connect(url,{sslValidate: true,sslCA:ca,useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true}).then(async (db) => {
            console.log('Connected to MongoDB server');
        })
        .catch((error) => {
            console.log('could not connect to MongoDB server');
        });
}else{
    console.log("localhost");
    url = `mongodb://localhost:27017/shop-supplier`;    
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true}).then(async (db) => {
        console.log('Connected to MongoDB server',url);
    })
    .catch((error) => {
        console.log('could not connect to MongoDB server',url);
    });

}

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
//methode override middleware
app.use(methodOverride('_method'));




app.use('/api/v1/signin', signIn);
app.use('/api/v1/signup', signUp);
app.use('/api/v1/logout', logOut);
app.use('/api/v1/verify', verify);
app.use('/api/v1/adpost',adPost);
app.use('/api/v1/ads', findAds);
app.use('/api/v1//ad/:id',findAd);





app.listen(config.APP.PORT, () => {
    console.log(`listening on port ${config.APP.PORT}`);
});

// // Initialize Global Error Handlers
app.use(errorHandler);
process.on('unhandledRejection', (reason, promise) => {
  throw reason;
});

process.on('uncaughtException', error => {
  logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
  // process.exit(1);
});

process.on('SIGINT', () => {
  logger.info(' Alright! Bye bye! ShutDownHooks');
  process.exit();
});
