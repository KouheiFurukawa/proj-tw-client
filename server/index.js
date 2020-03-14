const express = require('express');
const Twitter = require('twitter');
const fs = require('fs');

const app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
    require('express-session')({
        secret: 'super-secret-key',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: 'auto',
            maxage: 1000 * 60 * 30
        }
    })
);

const isLogined = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({ url: '/login', status: 401 });
    }
};

app.get('/favorites/list', isLogined, (req, res) => {
    client(req)
        .get('favorites/list', {})
        .then(tweet => {
            res.json(tweet);
        });
});

app.get('/timeline', (req, res) => {
    // if (!req.isAuthenticated()) res.redirect('/login');
    client(req)
        .get('statuses/home_timeline', { count: 50 })
        .then(result => {
            res.json(result);
        });
});

app.get('/mentions', isLogined, (req, res) => {
    client(req)
        .get('statuses/mentions_timeline', { count: 50 })
        .then(result => {
            res.json(result);
        });
});

app.get('/profile', (req, res) => {
    client(req)
        .get('account/verify_credentials', {})
        .then(result => {
            res.json(result);
        });
});

app.get('/user_timeline/:id', (req, res) => {
    client(req)
        .get('statuses/user_timeline', { screen_name: req.params.id, count: 50 })
        .then(result => {
            res.json(result);
        });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/api', (req, res) => {
    res.send({api: 'test'});
});

app.get('/api_user/:id', (req, res) => {
    res.send({api: req.params.id});
});

app.listen(3000, ()=> {
    console.log('server running');
});

let client = req => {
    return new Twitter(JSON.parse(fs.readFileSync('secret.json', 'utf-8')));
};

module.exports = {
    path: '/server',
    handler: app
};
