var Controller = {
    friendsRoute() {
        return Model.getFriends().then(function(friends) {
            results.innerHTML = View.render('friends', { list: friends.items });
        });
    },
    newsRoute() {
        return Model.getNews().then(function(news) {
            results.innerHTML = View.render('news', { list: news.items });
        });
    },
    groupsRoute() {
        return Model.getGroups().then(function(groups) {
            results.innerHTML = View.render('groups', { list: groups.items });
        });
    },
    photosRoute() {
        return Model.getPhotos().then(function(photos) {
            results.innerHTML = View.render('photos', { list: photos.items });
        });
    },
    albumsRoute() {
        return Model.getAlbums()
            .then(function (albums) {
                //TODO: это говнище надо переписать
                results.innerHTML = null;
                var allPhotosDiv = document.createElement('div');
                allPhotosDiv.setAttribute('class', 'photos allphotos grid')
                results.appendChild(allPhotosDiv);

                albums.items.forEach(function(item, i, arr) {
                    setTimeout(function () {
                        console.log(item.id);

                        //TODO: в этом месте запрашивать новый метод .getAlbumPhotos с выводом названия альбома и фото
                        Model.getPhotos(item.id).then(function(photos) {
                            allPhotosDiv.innerHTML += View.render('albumPhotos', { list: photos.items });
                        });
                    }, 150 * ++i)

                });

                //return albums;
            })
            .then(function(albums) {
            //TODO: ИЛИ в эом месте вызывать названия и ID всех альбомов, а затем и фото внутри них
            //TODO: к тому же - "Добавить возможность выбирать сортировку фото в альбомах" - в альбомах, а не во всей куче
            results.innerHTML = View.render('albums', { list: albums.items });
            })
            ;
    }
};

// задача - прослойка между model и view