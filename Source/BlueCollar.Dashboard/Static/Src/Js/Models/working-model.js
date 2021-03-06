﻿/**
 * Models a working job.
 *
 * @constructor
 */
var WorkingModel = CollarModel.extend({
    defaults: {
        'Id': 0,
        'ScheduleName': null,
        'QueueName': null,
        'JobName': null,
        'JobType': null,
        'Data': null,
        'QueuedOn': null,
        'TryNumber': 0,
        'StartedOn': null,
        'Signal': 'None',
        'WorkerMachineAddress': null,
        'WorkerMachineName': null,
        'WorkerName': null
    },
    fragment: 'working'
});

/**
 * Models a signal to a working job.
 *
 * @constructor
 */
var WorkingSignalModel = CollarModel.extend({
    defaults: {
        'Id': 0,
        'JobName': null,
        'Signal': 'None',
        'WorkerName': null
    },
    fragment: 'working',

    /**
     * Gets the URL to use when interacting with the model on the server.
     *
     * @return {String} The model's server URL.
     */
    url: function() {
        return CollarModel.prototype.url.call(this).appendUrlPath('signal');
    }
});

/**
 * Represents a collection of {WorkingModel}s.
 *
 * @constructor
 */
var WorkingCollection = CollarCollection.extend({
    fragment: 'working',
    model: WorkingModel
});