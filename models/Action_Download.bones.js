model = Backbone.Model.extend({
    url: function() {
        return '/api/Download/' + this.id;
    }
});
