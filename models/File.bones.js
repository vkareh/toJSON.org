model = Backbone.Model.extend({});

model.prototype.initialize = function() {
    this.set({format: this.getFormat()});
}

model.prototype.formats = {
    'text/csv': 'CSV',
    'application/json': 'JSON',
    //'text/html': 'HTML',
    //'text/x-sql': 'SQL',
    //'application/xml': 'XML',
    //'text/xml': 'XML',
    'application/x-yaml': 'YAML'
}

model.prototype.getFormat = function() {
    return 'Format_' + this.formats[this.get('mime')];
}

model.prototype.getFormats = function() {
    return _.uniq(_.values(this.formats));
}
