model = Backbone.Model.extend({
    url: function() {
        return '/api/Action_CouchDB/' + encodeURIComponent(this.id);
    }
});
