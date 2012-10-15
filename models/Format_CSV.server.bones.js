models.Format_CSV.prototype.getJSON = function(callback) {
    var model = this;
    var csv = require('csv');
    var columns = [];
    var rows = [];
    // Convert raw data to JSON.
    var toJSON = function(row, columns) {
        var json = {};
        columns.forEach(function(column, i) {
            json[column] = row[i];
        });
        return json;
    }
    csv({columns: true})
    .fromPath(model.getPath())
    .on('data', function(data, index) {
        if (index == 0) {
            columns = data;
        } else {
            rows.push(toJSON(data, columns));
        }
    })
    .on('end', function(count) {
        model.set({_json: rows});
        return callback(null, model);
    })
    .on('error', function(err) {
        return callback(err.message, model);
    });
}

models.Format_CSV.prototype.toRaw = function(json, callback) {
    var model = this;
    var json2csv = require('json2csv');
    if (!_.isArray(json)) {
        json = [json];
    }
    // Detect all columns
    var columns = [];
    _.each(json, function(row) {
        _.each(row, function(value, property) {
            if (!_.contains(columns, property)) {
                columns.push(property);
            }
        });
    });
    // Parse JSON into CSV
    var csv = json2csv.parse({
        data: json,
        fields: columns
    });
    model.set({_data: csv});
    model.set({_raw: csv});
    callback(null, model);
}
