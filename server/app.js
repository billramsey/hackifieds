// node dependencies
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github2').Strategy;
var multer = require('multer');
var request = require('request');

// custom dependencies
var db = require('../db/db');
var listingsCtrl = require('./controllers/listingsController');
var categoriesController = require('./controllers/categoriesController');
var commentsController = require('./controllers/commentsController');
var github = require('./auth/github_oauth');
var upload = multer({dest: 'uploads/'});

// passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// create server instance
var app = express();

// use express middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// serve static files / libraries to the client
app.use (express.static('./client'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/react-bootstrap/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/jquery/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/react/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/react-dom/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/underscore/'));
app.use ('/uploads', express.static(__dirname + '/../uploads/'));


var orgs;
// configure passport github oAuth strategy
passport.use(new GitHubStrategy({
  clientID: github.GITHUB_CLIENT_ID,
  clientSecret: github.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  console.log('profile: ', profile);
  orgs = 'https://api.github.com/users/' + profile.username + '/orgs';
  var options = {
    url: orgs,
    headers: {
      'User-Agent': profile.username,
    },
  };
   
  request(options, function (err, data) {
    var authorized = false;
    if (err) {
      return console.log(err);
    } else {
      console.log(data)
      if (data.body && JSON.parse(data.body).length > 0) {
        JSON.parse(data.body).forEach(function(org) {
          if (org.login === 'hackreactor') {
            authorized = true;
            console.log('found hackreactor as org, authenticating the user');
            db.User.findOrCreate({ 
              where: { 
                username: profile.username,
                firstName: profile.displayName.split(' ')[0],
                lastName: profile.displayName.split(' ')[profile.displayName.split(' ').length - 1],
                email: profile.emails[0].value,
                profilePic: profile._json.avatar_url,
              } 
            })
            .spread(function(user, created) {
              return done(null, user);
            });
          }
        });
        if (!authorized) {
          return done('Sorry, you are not part of the Hack Reactor community. If you are, please make your Hack Reactor organization visibility public on github. Please refer to https://help.github.com/articles/publicizing-or-hiding-organization-membership/');
        } 
      } else {
        return done('You do not have any public organizations.');
      }
    }
  });
}));

app.use(session({
  secret: 'hackyhackifiers',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user', 'read:org' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('Github authentication successful!');
    res.redirect('/');
  });

// routing: handle endpoint requests from client
app.route('/api/listings')
  .get(function(req, res) {
    listingsCtrl.getAll(req.query.category, function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  })
  .post(upload.array('images', 12), function(req, res) {
    listingsCtrl.addOne(req.body, req.files, function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  });
app.route('/api/categories')
  .get(function(req, res) {
    categoriesController.getAll(function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  });
app.route('/api/auth')
  .get(function(req, res) {
    console.log(orgs, 'Req session before', req.session);
    res.send(req.user);
  });

app.get('/api/logout', function(req, res) {
  req.session.destroy(function() {
    console.log( req.session);
    res.redirect('/');
  });

});
console.log('comments', commentsController);
app.post('/api/addComment/:listingId/:commentId?', commentsController.postComment); 
app.post('/api/deleteComment/:listingId/:commentId', commentsController.deleteComment);
app.get('/api/getComments/:listingId', commentsController.getComments);


// Start server, listen for client requests on designated port
console.log( 'hackifieds server listening on 3000....' );
app.listen(3000);

module.exports.app = app;

