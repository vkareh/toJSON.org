view = views.Main.extend({tagName: 'div', className: 'data'});

view.prototype.render = function() {
    $(this.el).empty().append(templates.Format({
        data: this.model.get('_raw'),
        model: this.model
    }));
    return this;
}

view.prototype.events = {
    'click button.actions': 'loadAction'
}

view.prototype.loadAction = function(event) {
    $('.action').hide();
    var view = this;
    var target = $(event.currentTarget).attr('name');
    var action = 'Action_' + target;
    var $el = $('div#' + target + '.action');
    if (view[action]) {
        // Action view has already been rendered
        $el.fadeIn();
        view.scrollBottom();
        return;
    }
    var model = new models[action](this.model.attributes);
    model.set({data: this.model.get('_data')});
    view[action] = new views[action]({el: $el, action: action, model: model});
    view[action].render();
    $el.fadeIn();
    view.scrollBottom();
}
