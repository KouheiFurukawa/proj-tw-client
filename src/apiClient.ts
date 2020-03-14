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
}
