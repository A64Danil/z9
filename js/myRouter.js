var Router = {
    handle(route) {
        var routeName = route + 'Route';
        console.log('Вы внутри Роутера, пытаемся запустить ' + routeName);
        Controller[routeName]();
    }
};

// Задача - вызов методов контроллера