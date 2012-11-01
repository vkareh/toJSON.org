var upload = {};

upload.initialize = function(parent, app) {
    this.use(middleware.sanitizeHost(app));
    this.use(middleware.bodyParser({
        uploadDir: './files',
        keepExtensions: true
    }));
    this.use(middleware.cookieParser());
    this.use(middleware.session({
        secret: require('crypto').createHash('sha1').digest('hex')
    }));
    // Handle file upload and store in session
    this.post('/upload', function(req, res) {
        var fileData = _.first(_.values(req.files));
        var file = new models.File(fileData);
        var mime = require('mime');
        mime.define({'application/x-yaml': ['yaml', 'yml']});
        var mimeType = mime.lookup(file.get('path'));
        file.set({mime: mimeType});
        // Only allow certain file formats
        if (file.formats[mimeType] !== undefined) {
            req.session.file = file;
            res.redirect('/');
            return;
        }
        res.redirect('/upload');
    });
    // Clear file
    this.get('/upload', function(req, res) {
        if (Bones.file) {
            require('fs').unlink(Bones.file.get('path'));
            delete Bones.file;
        }
        delete req.session.file;
        res.redirect('/');
    });
    // Allow current session to access file
    this.use(function(req, res, next) {
        if (req.session.file) {
            Bones.file = new models.File(req.session.file);
        } else {
            delete Bones.file;
        }
        next();
    });
    this.use(middleware.validateCSRFToken());
    this.use(middleware.fragmentRedirect());
}

servers.Middleware.augment(upload);
