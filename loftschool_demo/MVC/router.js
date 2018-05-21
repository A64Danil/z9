var Router = {
    handle(route) {
        var routeName = route + 'Route';

        Controller[routeName]();
    }
};

// задача - вызов методов контроллера (вызов action)