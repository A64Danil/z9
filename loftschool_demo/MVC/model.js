var Model = {
    login(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser() {
        return this.callApi('users.get', {});
    },
    getFriends() {
        return this.callApi('friends.get', {fields: 'photo_100'});
    },
    getNews() {
        return this.callApi('newsfeed.get', {filters: 'post', count: 20});
    }
};

// задача - получение данных