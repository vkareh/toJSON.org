router = Backbone.Router.extend({});

router.prototype.routes = {
    '/': 'home',
    '/about': 'about',
    '/contact': 'contact',
    '/robots.txt': 'robots',
}

// Homepage
// --------
router.prototype.home = function(params, query) {
    if (this.req && this.req.query.reset !== undefined) {
        delete Bones.file;
    }
    if (_.isUndefined(Bones.file)) {
        this.send(views.Home);
    } else {
        this.send(views.File, {model: Bones.file});
    }
}

// About
// -----
router.prototype.about = function() {
    this.send(views.Page, {template: 'About'});
}

// Contact
// -------
router.prototype.contact = function() {
    this.send(views.Page, {template: 'Contact'});
}

// Disallow indexing
// -----------------
router.prototype.robots = function() {
    this.res.send('User-agent: *\nDisallow: /', {'Content-Type': 'text/plain'});
}

// Helper to assemble the page title
// ---------------------------------
router.prototype.pageTitle = function(view) {
    var title = 'convert.to';
    return (view.pageTitle ? view.pageTitle + ' | ' + title : title);
}

// Client-side router send
// -----------------------
router.prototype.send = function(view) {
    var options = (arguments.length > 1 ? arguments[1] : {});
    var v = new view(options);

    // Populate the #page div with the main view.
    $('#main').empty().append(v.el);

    // @todo explain this!
    v.render().attach().activeLinks().scrollTop();

    // Set the page title.
    document.title = this.pageTitle(v);
}

// Generic error handling for our Router
// -------------------------------------
router.prototype.error = function(error) {
    this.send(views.Error, _.isArray(error) ? error.shift() : error);
    console.error(error);
}
