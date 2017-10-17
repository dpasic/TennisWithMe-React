class Net {
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
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
            fetch(url, {
                method: 'POST',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json'
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
}

export default Net;