﻿/**
 * Manages the root queue view.
 *
 * @constructor
 * @extends {AreaView}
 */
var QueueView = AreaView.extend({
    template: _.template($('#queue-template').html()),

    /**
     * Initialization.
     *
     * @param {Object} options Initialization options.
     */
    initialize: function(options) {
        AreaView.prototype.initialize.call(this, options);
        this.listView = new QueueListView({model: this.model});
        this.listView.bind('display', this.display, this);
        this.listView.bind('signal', this.signal, this);
    },

    /**
     * Handle's the add button's click event.
     */
    add: function() {
        var model = new QueueModel({}, {jsonUrlRoot: this.model.jsonUrlRoot}),
            view = new QueueEditView({model: model});
        
        view.bind('cancel', this.editCancel, this);
        view.bind('submit', this.editSubmit, this);

        this.model.clearId();

        this.$('.details').html(view.render().el);
        view.focus();
    },

    /**
     * Renders the ID view for the given model in the given details element.
     *
     * @param {jQuery} el The jQuery object containing the details element to render into.
     * @param {CollarModel} model The model to render the ID view for.
     */
    renderIdView: function(el, model) {
        var view = new QueueDisplayView({model: model});
        view.bind('cancel', this.displayCancel, this);
        view.bind('delete', this.editDelete, this);

        el.html(view.render().el);
        view.focus();
        
        if (!model.get('DetailsLoaded')) {
            this.trigger('details', this, {Model: model});
        }
    }
});