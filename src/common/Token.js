const KEY = 'token';

class Token {

    static getKey() {
        return;
    }

    static save(token) {
        sessionStorage.setItem(KEY, JSON.stringify(token));
    }

    static get() {
        return JSON.parse(sessionStorage.getItem(KEY));
    }

    static exists() {
        return (sessionStorage.getItem(KEY) !== null);
    }

    static remove() {
        sessionStorage.removeItem(KEY);
    }
}

export default Token;