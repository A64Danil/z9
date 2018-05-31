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
                if (item.comments.count > 0) {
                    setTimeout(function () {
                        Controller.commentsRoute(item.id);
                    }, 3000 * ++i)
                }
            });
        });
    },
    commentsRoute(photoId) {
        return Model.getPhotoComments(photoId).then(function (comments) {
            var place = document.querySelector('.photo'+ photoId +' .photo_comments')
            place.innerHTML = View.render('commentsToPhotos', { list: comments.items });

            comments.items.forEach(function (item, i, arr) {
                // This is collection, not a single node
                var placesOfImg = document.querySelectorAll('.photo'+ photoId + ' .fromId'+ item.from_id + ' .fromImg');
                var placesOfName = document.querySelectorAll('.photo'+ photoId + ' .fromId'+ item.from_id + ' .fromName');
                //console.log(placesOfImg);

                comments.profiles.forEach(function (profile, i, arr) {
                    if (profile.id == item.from_id) {
                        placesOfImg.forEach(function(placeOfImg, i, arr) {
                            placeOfImg.innerHTML = View.render('imgAuthorsOfComments', profile);
                        });

                        placesOfName.forEach(function(placeOfName, i, arr) {
                            placeOfName.innerHTML = View.render('nameAuthorsOfComments', profile);
                        });

                        // OLD WAY
                        //placeOfImg.innerHTML  = View.render('imgAuthorsOfComments', profile);
                        //placeOfName.innerHTML  = View.render('nameAuthorsOfComments', profile);
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
                    }, 1200 * ++i)
                });

            })
    },
    photoSorting(btn) {
        let sortBy = btn.dataset.sortby,
            sortDir = btn.dataset.sortdir,
            currentAlbum = btn.parentNode.parentNode.parentNode, // Current album
            placeToInput = currentAlbum.querySelector('.album__photos'), // Div with .photo items
            photoCollection = currentAlbum.querySelectorAll('.photo.item'); // Photo Collection


        console.log('Будем сортировать по ' + sortBy);
        console.log('Направление сортировки - ' + sortDir);



        let sortedPhotoCollection = [];
        photoCollection.forEach(function(item, i, arr) {
            // Наполняем пустой массив Объектами типа { dataAttr: значение атрибута, el: ссылка на элемент }
            sortedPhotoCollection.push({
                elData : item.dataset[sortBy], // value of data-attr
                el: item // link to element
            })
        });



        if (btn.dataset.sortdir == 'direct') {
            sortedPhotoCollection.sort(function (a, b) {
                btn.dataset.sortdir = 'reverse';
                btn.setAttribute('title', 'Упорядочить по убыванию');
                return a.elData > b.elData ? 1 : -1;   // сравниваем не просто a и b, а их свойства dataAttr (a.dataAttr > b.dataAttr
            });
        }
        else {
            sortedPhotoCollection.sort(function (a, b) {
                btn.dataset.sortdir = 'direct';
                btn.setAttribute('title', 'Упорядочить по возрастанию');
                return a.elData > b.elData ? -1 : 1;   // сравниваем не просто a и b, а их свойства dataAttr (a.dataAttr > b.dataAttr
            });
        }


        sortedPhotoCollection.forEach(function (item) {
            placeToInput.appendChild(item.el);  // Наполняем родителя отсортированными объектами их нашего временного массива
        })



    }
};

// задача - прослойка между model и view