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
    photosExtRoute(albumId, placeToInput) {
        return Model.getPhotos(albumId).then(function(photos) {
            placeToInput.innerHTML += View.render('photosExt', { list: photos.items });
            photos.items.forEach(function (item, i, arr) {
                setTimeout(function () {
                    Controller.commentsRoute(item.id);
                }, 5000 * ++i)

            });
        });
    },
    commentsRoute(photoId) {
        return Model.getPhotoComments(photoId).then(function (comments) {
            var place = document.querySelector('.photo'+ photoId +' .photo_comments')
            place.innerHTML = View.render('commentsToPhotos', { list: comments.items });

            comments.items.forEach(function (item, i, arr) {
                var placeOfImg = document.querySelector('.fromId'+ item.from_id + ' .fromImg');
                var placeOfName = document.querySelector('.fromId'+ item.from_id + ' .fromName');

                comments.profiles.forEach(function (profile, i, arr) {
                    if (profile.id == item.from_id) {
                        placeOfImg.innerHTML  = View.render('imgAuthorsOfComments', profile);
                        placeOfName.innerHTML  = View.render('nameAuthorsOfComments', profile);
                    }
                });
            });

            if (comments.count > 0) {
                //console.log(place);
                //console.log(comments);
            }
        });
    },
    albumsRoute() {
        return Model.getAlbums()
            .then(function(albums) {
                console.log(albums.items);
                results.innerHTML = View.render('albums', { list: albums.items });
                albums.items.forEach(function(item, i, arr) {
                    setTimeout(function () {
                        //console.log(item.id); // <== ID of currentAlbum
                        var currentAlbum = document.querySelector('.album' + item.id);
                        Controller.photosExtRoute(item.id, currentAlbum);
                    }, 500 * ++i)
                });

            })
    }
};

// задача - прослойка между model и view