model = models.Format.extend({
    extension: 'json',
    actions: {
        'Download': 'Download',
        'CouchDB': 'Send to CouchDB'
    }
});
