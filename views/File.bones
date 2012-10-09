view = views.Main.extend({id: 'file'});

view.prototype.render = function() {
    // Load generic file template
    $(this.el).empty().append(templates.File({
        model: this.model,
    }));
    return this;
}

view.prototype.events = {
    'click button.format': 'loadFormat'
}

view.prototype.loadFormat = function(event) {
    $('.data').hide();
    var view = this;
    var target = $(event.currentTarget).attr('name');
    var format = 'Format_' + target;
    var $el = $('div#' + target + '.data');
    // Reset format actions
    $('.action').hide();
    $('.actions').removeClass('active');
    if (view[format]) {
        // Format view has already been rendered
        $el.fadeIn();
        return;
    }
    $('#message').append(templates.Progress());
    this.model.set({format: format});
    var model = new models[format](this.model.attributes);
    // Fetch data
    model.fetch({
        success: function(model) {
            // Generate view
            if (views[format]) {
                view[format] = new views[format]({el: $el, model: model});
            } else {
                view[format] = new views.Format({el: $el, model: model});
            }
            // Render data
            view[format].render();
            $('#message').empty();
            $el.fadeIn();
        },
        error: function(model, error) {
            $('#message').empty();
        }
    });
}
