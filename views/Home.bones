view = views.Main.extend({id: 'home'});

view.prototype.render = function() {
    formats = (new models.File()).formats;
    $(this.el).empty().append(templates.Home({formats: formats}));
    return this;
}

view.prototype.events = {
    'change [name="file"]': 'upload'
}

view.prototype.upload = function(event) {
    $(event.currentTarget).parent('form').trigger('submit');
    $(this.el).append(templates.Progress());
}
