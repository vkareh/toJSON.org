view = views.Main.extend({id: 'action'});

view.prototype.render = function() {
    var action = this.options.action;
    if (templates[action]) {
        $(this.el).empty().append(templates[action]());
    }
    return this;
}
