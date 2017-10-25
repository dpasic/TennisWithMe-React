import Token from './Token';

class Net {

    static getUrl(urlPostfix) {
        return 'http://localhost:8080/' + urlPostfix;
    }

    static getAuthHeader() {
        var token = Token.get();
        return token.token_type + ' ' + token.access_token;
    }

    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(this.getUrl(url), {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader()
                })
            })
                .then((response) => {
                    response.json()
                        .then((body) => {
                            resolve(body);
                        });
                });
        });
    }

    static post(url, body) {
        return new Promise((resolve, reject) => {
            fetch(this.getUrl(url), {
                method: 'POST',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader()
                })
            })
                .then((response) => {
                    response.json()
                        .then((body) => {
                            resolve(body);
                        });
                });
        });
    }

    static fetchToken(model) {
        model.grant_type = 'password';
        var body = `username=${model.username}&password=${model.password}&grant_type=${model.grant_type}`;

        return new Promise((resolve, reject) => {
            fetch(this.getUrl('token'), {
                method: 'POST',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
                .then((response) => {
                    response.json()
                        .then((body) => {
                            resolve(body);
                        });
                });
        });
    }

    static revokeToken() {
        return new Promise((resolve, reject) => {
            fetch(this.getUrl('api/account/logout'), {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader()
                })
            })
                .then((response) => {
                    resolve();
                });
        });
    }
}

export default Net;