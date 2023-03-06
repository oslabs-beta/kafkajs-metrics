const connect = require('./connect');
const disconnect = require('./disconnect');
const request = require('./request');
const requestQueueSize = require('./requestQueueSize');
const requestTimeout = require('./requestTimeout');

function metricizeAdmin(admin, client) {
  // create empty metrics property on admin
  admin.metrics = {
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
    // returns time since initial connection; returns null if admin never connected
    initialConnectionAge() {
      return admin.metrics.initialConnectionTimestamp
        ? new Date().getTime() - admin.metrics.initialConnectionTimestamp
        : null;
    },
    // returns time since current connection; returns null if admin not currently connected
    ageSinceLastConnection() {
      return admin.metrics.currentConnectionTimestamp
        ? new Date().getTime() - admin.metrics.currentConnectionTimestamp
        : null;
    },

    // REQUEST PENDING DURATION METHODS
    // turns on logging pendingDuration for every request (off by default)
    requestPendingDurationLogOn() {
      admin.metrics.options.requestPendingDuration.logOn = true;
    },
    // turns off logging pendingDuration for every request
    requestPendingDurationLogOff() {
      admin.metrics.options.requestPendingDuration.logOn = false;
    },
    // creates request pendingDuration breakpoint at specified interval (ms)
    requestPendingDurationBreakpoint(interval) {
      admin.metrics.options.requestPendingDuration.breakpoint = interval;
    },
    // cancels existing request pendingDuration breakpoint
    requestPendingDurationBreakpointOff() {
      admin.metrics.options.requestPendingDuration.breakpoint = null;
    },

    // REQUEST QUEUE SIZE METHODS
    // turns on logging requestQueueSize for every request (off by default)
    requestQueueSizeLogOn() {
      admin.metrics.options.requestQueueSize.logOn = true;
    },
    // turns off logging requestQueueSize for every request
    requestQueueSizeLogOff() {
      admin.metrics.options.requestQueueSize.logOn = false;
    },
    // creates requestQueueSize breakpoint at specified interval (ms)
    requestQueueSizeBreakpoint(interval) {
      admin.metrics.options.requestQueueSize.breakpoint = interval;
    },
    // cancels existing requestQueueSize breakpoint
    requestQueueSizeBreakpointOff() {
      admin.metrics.options.requestQueueSize.breakpoint = null;
    },

    // OPTIONS
    // contains settings for console logs and breakpoint alerts
    options: {
      requestPendingDuration: {
        logOn: false, // set in requestPendingDuration.js
        breakpoint: null, // set in requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, // set in requestQueueSize.js
        breakpoint: null, // set in requestQueueSize.js
      },
    },
  };

  // run functions to create metrics for admin instrumentation events
  connect(admin, client);
  disconnect(admin, client);
  request(admin);
  requestQueueSize(admin);
  requestTimeout(admin);

  // return updated admin object
  return admin;
}

module.exports = metricizeAdmin;
