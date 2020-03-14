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
        console.log(JSON.stringify({ text }));
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
}
