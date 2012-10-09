view = views.Action.extend({id: 'CouchDB', className: 'action'});

view.prototype.events = {
    'click #send': 'sendToCouchDB'
}

view.prototype.sendToCouchDB = function(event) {
    var view = this;
    var model = this.model;
    var config = {
        host: $('#host').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        db: $('#db').val(),
        type: $('#type').val(),
        data: model.get('data')
    };
    model.save(config, {
        success: function(model) {
            view.message('success', 'Your data was sent to your CouchDB database', 'action');
        },
        error: function(model, error) {
            view.message('error', JSON.parse(error.responseText).message, 'action');
        }
    });
}
