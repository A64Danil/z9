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
    }
};

// задача - прослойка между model и view