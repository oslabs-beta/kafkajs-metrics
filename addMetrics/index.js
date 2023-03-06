const connect = require('./connect');
const disconnect = require('./disconnect');
const endBatchProcess = require('./endBatchProcess');
const groupJoin = require('./groupJoin');
const heartbeat = require('./heartbeat');
const request = require('./request');
const requestQueueSize = require('./requestQueueSize');
const requestTimeout = require('./requestTimeout');
const calculateRates = require('./calculateRates');

function addMetrics(obj, client, type) {
  // create empty metrics property on obj
  obj.metrics = {
    // VARIABLES
    name: '', // set by user, used in various console logs
    isConnected: false, // set in connect.js, reset in disconnect.js
    initialConnectionTimestamp: null, // updated in connect.js
    currentConnectionTimestamp: null, // updated in connect.js, reset in disconnect.js
    totalRequests: 0, // updated in request.js
    totalRequestTimeouts: 0, // updated in requestTimeout.js
    requestRate: null, // updated in calculateRates.js
    requestRateLifetime: null, // updated in calculateRates.js
    timeoutRate: null, // updated in calculateRates.js
    timeoutRateLifetime: null, // updated in calculateRates.js

    // CONNECTION METHODS
    // returns time since initial connection; returns null if obj never connected
    ageSinceInitialConnection() {
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
    requestPendingDurationSetBreakpoint(bp) {
      obj.metrics.options.requestPendingDuration.breakpoint = bp;
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
    // creates requestQueueSize breakpoint at specified size
    requestQueueSizeSetBreakpoint(bp) {
      obj.metrics.options.requestQueueSize.breakpoint = bp;
    },
    // cancels existing requestQueueSize breakpoint
    requestQueueSizeCancelBreakpoint() {
      obj.metrics.options.requestQueueSize.breakpoint = null;
    },

    // RATE INTERVAL METHODS
    // updates frequency (ms) at which rate metrics should be calculated
    setRateFrequency(t) {
      obj.metrics.options.rate.frequency = t;
    },
    // updates period (ms) that rate metrics should use to calculate averages
    setRatePeriod(t) {
      obj.metrics.options.rate.period = t;
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
      rate: {
        frequency: 1000, // read in calculateRates.js
        period: 5000, // read in calculateRates.js
      },
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
      messageConsumptionRate: null, // updated in calculateRates.js
      messageConsumptionRateLifetime: null, // updated in calculateRates.js

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
      heartbeatSetBreakpoint(bp) {
        obj.metrics.options.heartbeat.breakpoint = bp;
      },
      // cancels existing heartbeat breakpoint
      heartbeatCancelBreakpoint() {
        obj.metrics.options.heartbeat.breakpoint = null;
      },

      // OFFSET LAG METHODS
      // creates offsetLag breakpoint at specified integer
      offsetLagSetBreakpoint(bp) {
        obj.metrics.options.offsetLag.breakpoint = bp;
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
      messageConsumptionRatePeriod: 5000, // read in request.js
    };

    // update consumer object with new metrics and options
    obj.metrics = Object.assign(obj.metrics, consumerMetrics);
    obj.metrics.options = Object.assign(obj.metrics.options, consumerOptions);

    // run consumer-specific instrumentation event generators
    endBatchProcess(obj);
    groupJoin(obj);
    heartbeat(obj);
  }

  // begin calculating rate variables
  calculateRates(obj, type);

  // return updated object
  return obj;
}

module.exports = addMetrics;
