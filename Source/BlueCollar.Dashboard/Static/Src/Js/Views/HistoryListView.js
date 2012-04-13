﻿/**
 * List view for History models.
 */
var HistoryListView = ListView.extend({
    cols: 6,
    template: _.template($('#history-list-template').html()),

    display: function(view) {
        this.trigger('display', this, view.model);
    },

    renderRows: function(options) {
        var tbody = this.$("tbody").html(''),
            model,
            i,
            n;

        options = options || {};

        for (i = 0, n = this.collection.length; i < n; i++) {
            model = this.collection.at(i);
            view = new HistoryRowView({model: model}).render();
            view.bind('display', this.display, this);
            tbody.append(view.el);

            if (i === n - 1) {
                $(view.el).addClass("last");
            }
        }

        if (n === 0) {
            if (options.loading) {
                tbody.html(this.loading());
            } else {
                tbody.html(this.empty('There are no jobs to display.'));
            }
        }

        return this;
    }
});