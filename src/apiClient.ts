export default class ApiClient {
    static getMyTimeline() {
        return fetch('/timeline/')
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static getUserTimeline(id: string) {
        return fetch(`/user_timeline/${id}`)
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static postTweet(text: string) {
        return fetch('/tweet/', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static getFavoritesList(id: string) {
        return fetch(`/favorites/list/${id}`)
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static like(id: string) {
        return fetch('/like/', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static retweet(id: string) {
        return fetch('/retweet/', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static search(params: { query: string; product: string }) {
        return fetch('/search/', {
            method: 'POST',
            body: JSON.stringify({ ...params }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }

    static logout() {
        return fetch('/logout/')
            .then(response => response.json())
            .then(data => {
                return { result: data };
            })
            .catch(error => {
                return { error };
            });
    }
}
