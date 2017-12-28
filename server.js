const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieparser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');

const container = require('./container');


container.resolve(function(users){

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/doodlekitchat',{useMongoclient:true});
  const app = SetupExpress();

  function SetupExpress()
  {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000,function(){
      console.log('listening on port 3000...');
    });

    ConfigureExpress(app);
    //setup router
    const router = require('express-promise-router')();
    users.SetRouting(router);
    app.use(router);
  }



  function ConfigureExpress(app)
  {
    require('./passport/passport-local');
    app.use(express.static('public'));
    app.use(cookieparser());
    app.set('view engine','ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(validator());
    app.use(session(
      {secret: 'thisisasecretkey',
      resave:true,
      saveInitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})}
  ));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
  }
});
