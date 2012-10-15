view = views.Main.extend({id: 'error'});

view.prototype.render = function() {
    $(this.el).empty().append(templates.Home());
    return this;
}
