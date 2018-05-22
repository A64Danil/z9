var Model = {
    myLogin(appId, perms) {
        return new Promise( (resolve, reject) => {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(data => {
                if (data.session) {
                    console.log('VK auth ok');
                    resolve(data);
                } else {
                    reject(new Error('Не удалось авторизоваться в ВК'));
                }
            }, perms);
        });
    },

    myCallApi(method, options) {
        if (!options.v) {options.v = '5.8'}

        return new Promise((resolve, reject) => {
            VK.api(method, options, data => {
                if (data.error) {
                    reject(new Error(data.error.error_msg));
                } else {
                    resolve(data.response);
                    console.log(data.response);
                }
            });
        });
    },

    getUser() {
        return this.myCallApi('users.get', {});
    },

    getFriends() {
        console.log('Вы внутри Модели, пытаетесь выполнить getFriends');
        return this.myCallApi('friends.get', {fields: 'photo_100'});
    }
};



// Задача - получение данных