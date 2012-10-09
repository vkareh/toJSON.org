model = Backbone.Model.extend({
    extension: null,
    initialize: function() {
        this.id = encodeURIComponent(this.get('path'));
    },
    url: function() {
        return '/api/' + this.get('format') + '/' + this.id;
    },
    getPath: function() {
        return __dirname + '/../' + this.get('path');
    },
    actions: {
        //'Download': 'Download',
    }
});
