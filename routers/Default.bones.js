router = Backbone.Router.extend({});

router.prototype.routes = {
    '/': 'home',
    '/about': 'about',
    '/contact': 'contact',
    '/robots.txt': 'robots',
    '/humans.txt': 'humans'
}

// Homepage
// --------
router.prototype.home = function() {
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

// robots.txt
// ----------
router.prototype.robots = function() {
    this.res.send('User-agent: *\nDisallow: /files/\nDisallow: /assets/', {'Content-Type': 'text/plain'});
}

// humans.txt
// ----------
router.prototype.humans = function() {
    this.res.send('toJSON().org allows you to upload a file and convert it to a different serialized data format.\nIt was made by Victor Kareh in his spare time.\nHe also takes contracts for using shiny technology in really complex websites.\nCheck him out at www.vkareh.net', {'Content-Type': 'text/plain'});
}

// Helper to assemble the page title
// ---------------------------------
router.prototype.pageTitle = function(view) {
    var title = '.toJSON().org';
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
