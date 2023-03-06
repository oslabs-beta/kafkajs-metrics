const connect = require('./connect');
const disconnect = require('./disconnect');
const endBatchProcess = require('./endBatchProcess');
const groupJoin = require('./groupJoin');
const heartbeat = require('./heartbeat');
const request = require('./request');
const requestQueueSize = require('./requestQueueSize');
const requestTimeout = require('./requestTimeout');

function addMetrics(obj, client, type) {
  // create empty metrics property on obj
  obj.metrics = {
    // VARIABLES
    name: '', // set by user, used in various console logs
    isConnected: false, // set in connect.js, reset in disconnect.js
    initialConnectionTimestamp: null, // updated in connect.js
    currentConnectionTimestamp: null, // updated in connect.js, reset in disconnect.js
    totalRequests: 0, // updated in request.js
    requestRate: 0, // updated in request.js
    totalRequestTimeouts: 0, // updated in requestTimeout.js
    timeoutRate: 0, // updated in requestTimeout.js

    // CONNECTION METHODS
    // returns time since initial connection; returns null if obj never connected
    initialConnectionAge() {
      return obj.metrics.initialConnectionTimestamp
        ? new Date().getTime() - obj.metrics.initialConnectionTimestamp
        : null;
    },
    // returns time since current connection; returns null if obj not currently connected
    ageSinceLastConnection() {
      return obj.metrics.currentConnectionTimestamp
        ? new Date().getTime() - obj.metrics.currentConnectionTimestamp
        : null;
    },

    // REQUEST PENDING DURATION METHODS
    // turns on logging pendingDuration for every request (off by default)
    requestPendingDurationLogOn() {
      obj.metrics.options.requestPendingDuration.logOn = true;
    },
    // turns off logging pendingDuration for every request
    requestPendingDurationLogOff() {
      obj.metrics.options.requestPendingDuration.logOn = false;
    },
    // creates request pendingDuration breakpoint at specified interval (ms)
    requestPendingDurationSetBreakpoint(interval) {
      obj.metrics.options.requestPendingDuration.breakpoint = interval;
    },
    // cancels existing request pendingDuration breakpoint
    requestPendingDurationCancelBreakpoint() {
      obj.metrics.options.requestPendingDuration.breakpoint = null;
    },

    // REQUEST QUEUE SIZE METHODS
    // turns on logging requestQueueSize for every request (off by default)
    requestQueueSizeLogOn() {
      obj.metrics.options.requestQueueSize.logOn = true;
    },
    // turns off logging requestQueueSize for every request
    requestQueueSizeLogOff() {
      obj.metrics.options.requestQueueSize.logOn = false;
    },
    // creates requestQueueSize breakpoint at specified interval (ms)
    requestQueueSizeSetBreakpoint(interval) {
      obj.metrics.options.requestQueueSize.breakpoint = interval;
    },
    // cancels existing requestQueueSize breakpoint
    requestQueueSizeCancelBreakpoint() {
      obj.metrics.options.requestQueueSize.breakpoint = null;
    },

    // RATE PERIOD METHODS
    // updates request rate period (ms)
    requestRateSetPeriod(interval) {
      obj.metrics.options.requestRatePeriod = interval;
    },
    // updates timeout rate period (ms)
    timeoutRateSetPeriod(interval) {
      obj.metrics.options.timeoutRatePeriod = interval;
    },

    // OPTIONS
    // contains settings for console logs and breakpoint alerts
    options: {
      requestPendingDuration: {
        logOn: false, // read in requestPendingDuration.js
        breakpoint: null, // read in requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, // read in requestQueueSize.js
        breakpoint: null, // read in requestQueueSize.js
      },
      requestRatePeriod: 5000, // read in request.js
      timeoutRatePeriod: 5000, // read in requestTimeout.js
    },
  };

  // run functions to create metrics for instrumentation events
  connect(obj, client, type);
  disconnect(obj, client, type);
  request(obj, type);
  requestQueueSize(obj, type);
  requestTimeout(obj, type);

  if (type === 'consumer') {
    // define consumer-specific variables & methods
    const consumerMetrics = {
      memberId: null, // set in groupJoin.js, reset in disconnect.js
      totalPartitions: 0, // updated in groupJoin.js
      lastHeartbeat: 0, // updated in heartbeat.js, reset in disconnect.js
      lastHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
      longestHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
      messagesConsumed: 0, // updated in endBatchProcess.js
      offsetLag: null, // updated in endBatchProcess.js

      // HEARTBEAT METHODS
      // turns on logging every heartbeat (off by default)
      heartbeatLogOn() {
        obj.metrics.options.heartbeat.logOn = true;
      },
      // turns off logging every heartbeat
      heartbeatLogOff() {
        obj.metrics.options.heartbeat.logOn = false;
      },
      // creates heartbeat breakpoint at specified interval (ms)
      heartbeatSetBreakpoint(interval) {
        obj.metrics.options.heartbeat.breakpoint = interval;
      },
      // cancels existing heartbeat breakpoint
      heartbeatCancelBreakpoint() {
        obj.metrics.options.heartbeat.breakpoint = null;
      },

      // OFFSET LAG METHODS
      // creates offsetLag breakpoint at specified interval (ms)
      offsetLagSetBreakpoint(interval) {
        obj.metrics.options.offsetLag.breakpoint = interval;
      },
      // cancels existing offsetLag breakpoint
      offsetLagCancelBreakpoint() {
        obj.metrics.options.offsetLag.breakpoint = null;
      },
    };

    // define consumer-specific options
    const consumerOptions = {
      heartbeat: {
        logOn: false, // read in heartbeat.js
        breakpoint: null, // read in heartbeat.js
      },
      offsetLag: {
        logOn: false, // read in endBatchProcess.js
        breakpoint: null, // read in endBatchProcess.js
      },
    };

    // update consumer object with new metrics and options
    obj.metrics = Object.assign(obj.metrics, consumerMetrics);
    obj.metrics.options = Object.assign(obj.metrics.options, consumerOptions);

    // run consumer-specific instrumentation event generators
    endBatchProcess(obj);
    groupJoin(obj);
    heartbeat(obj);
  }

  // return updated object
  return obj;
}

module.exports = addMetrics;
