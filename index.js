#!/usr/bin/env node

var bones = require('bones');

require('./models/Format');
require('./views/Main');

bones.load(__dirname);

if (!module.parent) {
    bones.start();
}
