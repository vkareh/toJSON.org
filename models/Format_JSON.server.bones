models.Format_JSON.prototype.getJSON = function(callback) {
    var model = this;
    var fs = require('fs');
    // Read file
    fs.readFile(model.getPath(), 'utf8', function(err, data) {
        if (err) return callback(err, model);
        model.set({_json: JSON.parse(data)});
        callback(null, model);
    });
}

models.Format_JSON.prototype.toRaw = function(json, callback) {
    var model = this;
    model.set({_data: json});
    model.set({_raw: JSON.stringify(json, null, 4)});
    callback(null, model);
}
