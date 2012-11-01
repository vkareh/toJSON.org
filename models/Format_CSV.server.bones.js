models.Format_CSV.prototype.getJSON = function(callback) {
    var model = this;
    var csv = require('csv');
    var columns = [];
    var rows = [];
    // Convert raw data to JSON.
    var toJSON = function(row, columns) {
        var json = {};
        columns.forEach(function(column, i) {
            var test = null;
            // Test for boolean true
            test = row[i].toLowerCase() === 'true' || row[i].toLowerCase() === 'yes' || row[i].toLowerCase() === 'on';
            if (test === true) {
                json[column] = true;
                return;
            }
            // Test for boolean false
            test = row[i].toLowerCase() === 'false' || row[i].toLowerCase() === 'no' || row[i].toLowerCase() === 'off';
            if (test === true) {
                json[column] = false;
                return;
            }
            // Test for numeric type
            test = row[i].indexOf('.') === -1 ? parseInt(row[i]) : parseFloat(row[i]);
            if (!_.isNaN(test)) {
                json[column] = test;
                return;
            }
            // Test for string type
            if (typeof row[i] === 'string' && row[i].length !== 0) {
                json[column] = row[i];
                return;
            }
            json[column] = null;
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
    // Flatten each row of the JSON object
    for (var index in json) {
        json[index] = model._flatten(json, json[index], index);
    }
    // Detect all columns
    var columns = [];
    _.each(json, function(row, index) {
        columns = _.union(columns, _.keys(json[index]));
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

// Transform JSON into flat CSV
// ----------------------------
models.Format_CSV.prototype._flatten = function(json, row, index, arrays) {
    arrays = arrays !== false;
    var model = this;
    var toReturn = {};
    for (var key in row) {
        if (!_.has(row, key)) continue;
        if (row[key] === null || row[key] === undefined) {
            // Transform null to empty string
            toReturn[key] = '';
        } else if (arrays && _.isArray(row[key])) {
            // Each array element should add a new row
            var first = true;
            _.each(row[key], function(r) {
                var flatObject = {};
                if (_.isString(r)) {
                    flatObject[key] = r;
                } else {
                    var flatArray = model._flatten(json[index], r, key);
                    _.each(flatArray, function(v, k) {
                        flatObject[key + '.' + k] = v;
                    });
                }
                if (first) {
                    // Add first row to current element
                    _.extend(toReturn, flatObject);
                    first = false;
                } else {
                    // For every other row, clone entire object into a new row
                    var obj = _.clone(json[index]);
                    if (_.has(obj, key)) {
                        delete obj[key];
                        json.push(model._flatten(obj, _.extend(obj, flatObject), index, false));
                    }
                }
            });
        } else if (_.isObject(row[key])) {
            // Flatten nested objects
            var flatObject = model._flatten(json, row[key], index);
            for (var k in flatObject) {
                if (!_.has(flatObject, k)) continue;
                toReturn[key + '.' + k] = flatObject[k];
            }
        } else {
            // Stringify everything else
            toReturn[key] = String(row[key]);
        }
    }
    return toReturn;
}
