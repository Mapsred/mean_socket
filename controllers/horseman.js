/**
 * Created by Maps_red on 21/06/2016.
 */
'use strict';

var nodeHorseman = require('node-horseman');

module.exports = function (url, cb) {

    var horseman = new nodeHorseman({timeout: 10000});
    var width = "1280";
    var height = "800";
    horseman
        .viewport(width * 5, height * 5)
        .zoom(5)
        .open(url)
        .screenshotBase64('JPEG')
        .then(function (buffer) {
            horseman.close();
            var image = {
                buffer: buffer,
                width: width,
                height: height
            };

            return cb(false, image);
        });
};