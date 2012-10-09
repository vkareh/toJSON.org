models.Format.prototype.sync = function(method, model, options) {
    // Load file model from the server
    var file = new models[Bones.file.getFormat()](Bones.file.attributes);
    // Get JSON data from uploaded file
    file.getJSON(function(err, file) {
        if (err) return options.error(err);
        // Get Raw data in new format
        model.toRaw(file.get('_json'), function(err, model) {
            if (err) return options.error(err);
            options.success(model);
        });
    });
}

models.Format.prototype.getJSON = function(callback) {
    throw new Error('getJSON() not implemented for this model');
}

models.Format.prototype.toRaw = function(json, callback) {
    throw new Error('toRaw() not implemented for this model');
}
