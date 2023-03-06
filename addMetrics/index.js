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
    memberId: null, // set in groupJoin.js, reset in disconnect.js
    totalPartitions: 0, // updated in groupJoin.js
    lastHeartbeat: 0, // updated in heartbeat.js, reset in disconnect.js
    lastHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
    longestHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
    messagesConsumed: 0, // updated in endBatchProcess.js
    offsetLag: null, // updated in endBatchProcess.js
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
    offsetLagBreakpoint(interval) {
      obj.metrics.options.offsetLag.breakpoint = interval;
    },
    // cancels existing offsetLag breakpoint
    offsetLagBreakpointOff() {
      obj.metrics.options.offsetLag.breakpoint = null;
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
    requestPendingDurationBreakpoint(interval) {
      obj.metrics.options.requestPendingDuration.breakpoint = interval;
    },
    // cancels existing request pendingDuration breakpoint
    requestPendingDurationBreakpointOff() {
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
    requestQueueSizeBreakpoint(interval) {
      obj.metrics.options.requestQueueSize.breakpoint = interval;
    },
    // cancels existing requestQueueSize breakpoint
    requestQueueSizeBreakpointOff() {
      obj.metrics.options.requestQueueSize.breakpoint = null;
    },

    // OPTIONS
    // contains settings for console logs and breakpoint alerts
    options: {
      heartbeat: {
        logOn: false, // set in heartbeat.js
        breakpoint: null, // set in heartbeat.js
      },
      requestPendingDuration: {
        logOn: false, // set in requestPendingDuration.js
        breakpoint: null, // set in requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, // set in requestQueueSize.js
        breakpoint: null, // set in requestQueueSize.js
      },
      offsetLag: {
        logOn: false, // set in endBatchProcess.js
        breakpoint: null, // set in endBatchProcess.js
      },
    },
  };

  // run functions to create metrics for instrumentation events
  connect(obj, client, type);
  disconnect(obj, client);
  endBatchProcess(obj);
  groupJoin(obj);
  heartbeat(obj);
  request(obj);
  requestQueueSize(obj);
  requestTimeout(obj);

  // return updated object
  return obj;
}

module.exports = addMetrics;
