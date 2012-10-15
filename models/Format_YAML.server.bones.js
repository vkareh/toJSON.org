models.Format_YAML.prototype.getJSON = function(callback) {
    var model = this;
    var fs = require('fs');
    var YAML = require('yamljs');
    fs.readFile(model.getPath(), 'utf8', function(err, data) {
        if (err) return callback(err, model);
        model.set({_json: YAML.parse(data)});
        callback(null, model);
    });
}

models.Format_YAML.prototype.toRaw = function(json, callback) {
    var model = this;
    var YAML = require('yamljs');
    model.set({_data: YAML.stringify(json)});
    model.set({_raw: YAML.stringify(json, 4)});
    callback(null, model);
}
