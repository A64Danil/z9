document.addEventListener('click', function (e) {
    if (e.target.dataset.action && e.target.parentNode.classList.contains('mainControl') ) {
        Router.handle(e.target.dataset.action);
    }
    else {
        console.log('У этого элемента нет параметра action');
    }


})


new Promise(function (resolve) {
    window.onload = resolve;
})
    .then(function () {
        return Model.myLogin(6455962, 4 | 8)
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
