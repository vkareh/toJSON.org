view = views.Main.extend({id: 'page'});

view.prototype.render = function() {
    $(this.el).empty().append(templates[this.options.template]());
    return this;
}
