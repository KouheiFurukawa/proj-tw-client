const Twitter = require("twitter");
const fs = require("fs");

const client = new Twitter(JSON.parse(fs.readFileSync("secret.json", "utf-8")));

function tweet(content: string): void {
    client.post('statuses/update', {status: content}, function (error, tweet, response) {
        if (!error) {
            return tweet;
        } else {
            console.log(error);
        }
    });
}

export function getTweets(id: string, count: number): any[] | void {
    const params = {screen_name: id, count};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            const out = [];
            for (let i = 0; i < tweets.length; i++) {
                out.push({text: tweets[i], user: tweets[i].user.screen_name})
            }
            return tweets;
        } else {
            console.log(error);
        }
    });
}

function getFriends(id: string, cursor: number): void {
    const params = {screen_name: id, cursor};
    client.get('friends/list', params, function (error, friends, response) {
        if (!error) {
            return friends;
        } else {
            console.log(error);
        }
    });
}

function getFollowers(screen_name: string, cursor: number): void {
    const params = {screen_name, cursor};
    client.get('followers/list', params, function (error, followers, response) {
        if (!error) {
            return followers;
        } else {
            console.log(error);
        }
    });
}

function sendDM(screen_name: string, text: string): void {
    const params = {screen_name, text};
    client.get('direct_messages/new', params, function (error, text, response) {
        if (!error) {
            return text;
        } else {
            console.log(error);
        }
    });
}

function getDM(count: number): void {
    const params = {count};
    client.get('direct_messages', params, function (error, messages, response) {
        if (!error) {
            return messages;
        } else {
            console.log(error);
        }
    });
}

function getTL(count: number): void {
    const params = {count};
    client.get('statuses/home_timeline', params, function (error, messages, response) {
        if (!error) {
            return messages;
        } else {
            console.log(error);
        }
    });
}
