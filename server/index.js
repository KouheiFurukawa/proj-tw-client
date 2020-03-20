const express = require('express');
const Twitter = require('twitter');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
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

app.get('/favorites/list/:id', (req, res) => {
    client(req)
        .get('favorites/list', { screen_name: req.params.id })
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

app.post('/tweet/', (req, res) => {
    client(req)
        .post('statuses/update', { status: req.body.text })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/like/', (req, res) => {
    client(req)
        .post('favorites/create', { id: req.body.id })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/retweet/', (req, res) => {
    client(req)
        .post(`statuses/retweet/${req.body.id}`, {})
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.post('/search/', (req, res) => {
    client(req)
        .post(`search/${req.body.product}/dev`, { query: req.body.query })
        .then(result => {
            res.json(result);
        })
        .catch(error => console.error(error));
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/api', (req, res) => {
    res.send({api: 'test'});
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
