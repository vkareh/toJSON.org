model = Backbone.Model.extend({});

model.prototype.initialize = function() {
    this.set({format: this.getFormat()});
}

model.prototype.formats = {
    'text/csv': 'CSV',
    'application/json': 'JSON',
    //'text/html': 'HTML',
    //'text/x-sql': 'SQL',
    'text/xml': 'XML',
    'application/x-yaml': 'YAML'
}

model.prototype.getFormat = function() {
    return 'Format_' + this.formats[this.get('mime')];
}
