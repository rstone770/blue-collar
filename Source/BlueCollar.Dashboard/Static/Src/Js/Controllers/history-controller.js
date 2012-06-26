﻿/**
 * History area controller implementation.
 *
 * @constructor
 * @extends {CollarController}
 */
var HistoryController = CollarController.extend({
    collection: HistoryCollection,
    fragment: 'history',

    /**
     * Initialization.
     *
     * @param {Object} options Initialization options.
     */
    initialize: function(options) {
        this.view = new HistoryView({el: this.page, model: this.model});
        this.view.bind('fetch', this.fetch, this);
    }
});