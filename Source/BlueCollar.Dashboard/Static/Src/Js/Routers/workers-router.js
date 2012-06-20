﻿/**
 * Workers area router implementation.
 *
 * @constructor
 * @extends {CollarRouter}
 */
var WorkersRouter = CollarRouter.extend({
    routes: {
        'workers': 'index'
    },

    /**
     * Initialization.
     *
     * @param {App} app The root application object.
     * @param {Object} options Additional initialization options.
     */
    initialize: function(app, options) {
        CollarRouter.prototype.initialize.call(this, app, options);
        this.options = _.extend({}, options);
    },

    /**
     * Handles the root #workers route.
     */
    index: function() {
        
    }
});