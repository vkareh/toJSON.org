models.Action_CouchDB.prototype.sync = function(method, model, options) {
    if (method != 'update') return options.error('Method not supported');
    var cradle = require('cradle');
    // Parse protocol, hostname and port
    var host = model.get('host');
    var protocol = host.split('://')[0];
    host = host.split('://')[1];
    if (!host) {
        protocol = 'http';
        host = model.get('host');
    }
    var port = host.split(':')[1];
    host = host.split(':')[0];
    if (!port) {
        if (protocol == 'https') {
            port = 443;
        } else {
            port = 5984;
        }
    }
    var conn = new(cradle.Connection)(protocol + '://' + host, port, {
        cache: false,
        auth: {
            username: model.get('username'),
            password: model.get('password')
        }
    });
    var db = conn.database(model.get('db'));
    db.exists(function(err, exists) {
        if (err || !exists) return options.error(err.reason);
        db.save(model.prepareData(), function(err, res) {
            if (err) return options.error(err.reason);
            options.success(model);
        });
    });
}

models.Action_CouchDB.prototype.prepareData = function() {
    var model = this;
    var data = model.get('data');
    // Make sure data is JSON
    if (!_.isObject(data)) {
        data = JSON.parse(model.get('data'));
    }
    // Make sure data is an array
    if (!_.isArray(data)) {
        data = [data];
    }
    // Add doc.type if specified
    if (model.get('type')) {
        _.each(data, function(doc, index) {
            doc.type = model.get('type');
            data[index] = doc;
        });
    }
    return data;
}

models.Action_CouchDB.prototype.validate = function(attributes) {
    if (!attributes.host || !attributes.username || !attributes.password || !attributes.db) {
        return 'Need to specify all fields for CouchDB';
    }
}
