var View = {
    render(templateName, model) { // имя шаблона, данные
        templateName = templateName + 'Template';

        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    }
};

// задача - отображение данных