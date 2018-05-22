var Controller = {
    friendsRoute() {
        return Model.getFriends().then(function(friends) {
            results.innerHTML = View.render('friends', { list: friends });
        });
    },
    newsRoute() {
        return Model.getNews().then(function(news) {
            results.innerHTML = View.render('news', { list: news.items });
        });
    }
};

// задача - прослойка между model и view