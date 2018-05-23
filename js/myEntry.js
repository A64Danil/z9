document.addEventListener('click', function (e) {
    if (e.target.dataset.action && e.target.parentNode.classList.contains('mainControl') ) {
        Router.handle(e.target.dataset.action);
    }
    else {
        console.log('У этого элемента нет параметра action');
    }


})

Handlebars.registerHelper('formatTime', function(time) {
    var minutes = parseInt(time / 60),
        seconds = time - minutes * 60;

    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
});

Handlebars.registerHelper('formatDate', function(ts) {
    return new Date(ts * 1000).toLocaleString();
});

new Promise(function (resolve) {
    window.onload = resolve;
})
    .then(function () {
        return Model.myLogin(6455962, 2 | 4 | 8192 | 262144)
    })
    .then(function () {
        return Model.getUser().then(function (users) {
            console.log(users);
            currentUser.innerHTML = View.render('header', users[0]);
        })
    })
    .then(function () {
        // ...
    })
    .catch(function (e) {
        console.error(e);
        console.info('Ошибка: ' + e.message);
    })
