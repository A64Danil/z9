var View = {
    render(templateName, model) {
        templateName = templateName + 'Template';

        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    }
};

// Задача - отображение данных

// Пример
//const html = View.render('friends', [ {name: '', lastName: ''} ])