const express = require('express');
const Twitter = require('twitter');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(
    require('express-session')({
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            maxage: 1000 * 60 * 30
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.CONSUMERKEY,
            consumerSecret: process.env.CONSUMERSECRET,
            callbackURL: '',
        },
        function(token, tokenSecret, profile, done) {
            profile.access_token = token;
            profile.token_secret = tokenSecret;
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
const isLogined = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log('not logined');
        res.json({ url: '/login', status: 401 });
    }
};

app.get('/auth', passport.authenticate('twitter'));

app.get('/callback_server', passport.authenticate('twitter'), (req, res) => {
    console.log(req.user);
    res.json({ user: req.user });
});

app.get('/favorites/list/:id', isLogined, (req, res) => {
    if (!req.isAuthenticated()) {
        console.log('redirect');
        res.redirect('/login');
    }
    client(req)
        .get('favorites/list', { screen_name: req.params.id })
        .then(tweet => {
            res.json(tweet);
        })
        .catch(error => console.error(error));
});

app.get('/timeline', isLogined, (req, res) => {
    if (!req.isAuthenticated()) {
        console.log('redirect');
        res.redirect('/login');
    }
    client(req)
        .get('statuses/home_timeline', { count: 50 })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.get('/mentions', isLogined, (req, res) => {
    client(req)
        .get('statuses/mentions_timeline', { count: 50 })
        .then(result => {
            res.json(result);
        });
});

app.get('/profile', isLogined, (req, res) => {
    client(req)
        .get('account/verify_credentials', {})
        .then(result => {
            res.json(result);
        });
});

app.get('/user_timeline/:id', isLogined, (req, res) => {
    if (!req.isAuthenticated()) {
        console.log('redirect');
        res.redirect('/login');
    }
    client(req)
        .get('statuses/user_timeline', { screen_name: req.params.id, count: 50 })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/tweet/', isLogined, (req, res) => {
    client(req)
        .post('statuses/update', { status: req.body.text })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/like/', isLogined, (req, res) => {
    client(req)
        .post('favorites/create', { id: req.body.id })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/retweet/', isLogined, (req, res) => {
    client(req)
        .post(`statuses/retweet/${req.body.id}`, {})
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/search/', isLogined, (req, res) => {
    client(req)
        .get(`tweets/search/${req.body.product}/dev2.json`, { query: req.body.query })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('http://localhost:8080/login');
});

app.get('/login/', (req, res) => {
    res.send({api: 'test'});
});

app.get('/api', (req, res) => {
    res.send({api: 'test'});
});

app.listen(3000, ()=> {
    console.log('server running');
});


let client = req => {
    return new Twitter({
        consumer_key: process.env.CONSUMERKEY,
        consumer_secret: process.env.CONSUMERSECRET,
        access_token_key: req.session.passport.user.access_token,
        access_token_secret: req.session.passport.user.token_secret
    });
};

module.exports = {
    path: '/',
    handler: app
};
