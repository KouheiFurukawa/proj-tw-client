import twitter from 'twitter';
import * as fs from 'fs';

const client = new twitter(JSON.parse(fs.readFileSync('secret.json', 'utf-8')));

function tweet(content: string): void {
    client.post('statuses/update', { status: content }, (error, tweet, response) => {
        if (!error) {
            return tweet;
        }
        console.log(error);

    });
}

export function getTweets(id: string, count: number): any[] | void {
    const params = { count, screen_name: id };
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
            const out: any = [];
            for (let i = 0; i < tweets.length; i = i + 1) {
                out.push({ text: tweets[i], user: tweets[i].user.screen_name });
            }
            return tweets;
        }
        console.log(error);

    });
}

function getFriends(id: string, cursor: number): void {
    const params = { cursor, screen_name: id };
    client.get('friends/list', params, (error, friends, response) => {
        if (!error) {
            return friends;
        }
        console.log(error);

    });
}

function getFollowers(screenName: string, cursor: number): void {
    const params = { cursor, screen_name: screenName };
    client.get('followers/list', params, (error, followers, response) => {
        if (!error) {
            return followers;
        }
        console.log(error);

    });
}

function sendDM(screenName: string, text: string): void {
    const params = { text, screen_name: screenName };
    client.get('direct_messages/new', params, (error, text, response) => {
        if (!error) {
            return text;
        }
        console.log(error);

    });
}

function getDM(count: number): void {
    const params = { count };
    client.get('direct_messages', params, (error, messages, response) => {
        if (!error) {
            return messages;
        }
        console.log(error);

    });
}

function getTL(count: number): void {
    const params = { count };
    client.get('statuses/home_timeline', params, (error, messages, response) => {
        if (!error) {
            return messages;
        }
        console.log(error);

    });
}
