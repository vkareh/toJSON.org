models.Format_XML.prototype.getJSON = function(callback) {
    var model = this;
    var fs = require('fs');
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    fs.readFile(model.getPath(), 'utf8', function(err, data) {
        if (err) return callback(err, model);
        parser.parseString(data, function (err, result) {
            if (err) return callback(err, model);
            model.set({_json: result});
            callback(null, model);
        });
    });
}

models.Format_XML.prototype.toRaw = function(json, callback) {
    var model = this;
    var jstoxml = require('jstoxml');
    var parent = Bones.file.get('name').split('.')[0];
    if (!_.isArray(json)) {
        json = [json];
        parent = Bones.utils.pluralize(parent);
    }
    var jsonArray = [];
    _.each(json, function(element) {
        var JSON = {};
        JSON[Bones.utils.singularize(parent)] = element;
        jsonArray.push(JSON);
    });
    var xml = jstoxml.toXML({
        _name: parent,
        _content: jsonArray
    }, {header: true, indent: '    '});
    model.set({_data: xml});
    model.set({_raw: xml.replace(/</g,'&lt;').replace(/>/g,'&gt;')});
    callback(null, model);
}
