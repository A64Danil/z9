document.addEventListener('click', function (e) {
    if (e.target.dataset.action && e.target.parentNode.classList.contains('mainControl') ) {
        Router.handle(e.target.dataset.action);
    }

    if (e.target.dataset.sortby && e.target.parentNode.classList.contains('albumSortBtns') ) {
        console.log('отловили событие на кнопках сортировка');
        Controller.photoSorting(e.target);
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

Handlebars.registerHelper('iff', function(a, operator, b, opts) {
    var bool = false;
    switch(operator) {
        case '==':
            bool = a == b;
            break;
        case '>':
            bool = a > b;
            break;
        case '<':
            bool = a < b;
            break;
        default:
            throw "Unknown operator " + operator;
    }

    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
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


$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});