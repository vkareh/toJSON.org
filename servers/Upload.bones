var upload = {};

upload.initialize = function(app) {
    this.use(middleware.bodyParser({
        uploadDir: './files',
        keepExtensions: true
    }));
    this.post('/upload', function(req, res, next) {
        delete req.body['bones.token'];
        var fileData = _.first(_.values(req.files));
        var file = new models.File(fileData);
        // Only allow certain file formats
        if (file.formats[file.get('mime')] !== undefined) {
            Bones.file = file;
        } else {
            // Delete file
            require('fs').unlink(file.get('path'));
        }
        res.redirect('/');
    });
    this.use(middleware.cookieParser());
    this.use(middleware.validateCSRFToken());
    this.use(middleware.fragmentRedirect());
}

servers.Middleware.augment(upload);
