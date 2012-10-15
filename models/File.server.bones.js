models.File.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Method not supported');
    var file = new models[model.getFormat()](model.attributes);
    file.fetch({
        success: options.success,
        error: options.error
    });
}
