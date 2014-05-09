var path = require('path');
var glob = require('glob');

function getThemes(options) {
    return glob.sync('*/theme.json', options).map(function(v) {
        return path.basename(path.dirname(v));
    });
}

module.exports = {
    getThemes: getThemes
};