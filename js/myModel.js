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
        return this.myCallApi('friends.get', {fields: 'photo_100'});
    },
    getNews() {
        return this.myCallApi('newsfeed.get', {filters: 'post', count: 20});
    },
    getGroups() {
        return this.myCallApi('groups.get', {extended: 1});
    },
    getPhotos(albumId =  'profile') {
        console.log('Внутри getPhotos, albumId=' + albumId)
        return this.myCallApi('photos.get', {extended: 1, album_id: albumId});
    },
    getAlbums() {
        return this.myCallApi('photos.getAlbums', {extended: 1});
    }
    //TODO: в этом месте создать новый метод .getAlbumPhotos с выводом названия альбома и фото
};



// Задача - получение данных
