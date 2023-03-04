const connectConsumer = require('./connect');
const disconnectConsumer = require('./disconnect');
const endBatchProcess = require('./endBatchProcess');
const groupJoin = require('./groupJoin');
const heartbeat = require('./heartbeat');
const { requestEvents } = require('./request');
const requestQueueSize = require('./requestQueueSize');
const requestTimeoutRate = require('./requestTimeout');

function metricizeConsumer(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    // VARIABLES
    name: null, // set by user, used in console logs
    memberId: null, // set within group_join.js, reset on disconnect in disconnect.js
    isConnected: false, // set within connect.js, reset on disconnect in disconnect.js
    initialConnectionTimestamp: null, // updated within connect.js
    currentConnectionTimestamp: null, // updated within connect.js, reset on disconnect in disconnect.js
    lastHeartbeat: 0, // updated within heartbeat.js, reset on disconnect in disconnect.js
    lastHeartbeatDuration: 0, // updated within heartbeat.js, reset on disconnect in disconnect.js
    longestHeartbeatDuration: 0, // updated within heartbeat.js, reset on disconnect in disconnect.js
    messagesConsumed: 0, // updated within endBatchProcess.js
    offsetLag: null, // updated within endBatchProcess.js
    totalRequests: 0, // updated within request.js
    requestRate: 0, // updated within request.js
    timeoutRate: 0, // updated within request_timeout.js
    totalRequestTimeouts: 0, //updated within request_timeout.js
    totalPartitions: 0, // updated within group_join.js

    // CONNECTION METHODS
    // returns time since initial connection; returns null if consumer never connected
    initialConnectionAge: function () {
      return consumer.metrics.initialConnectionTimestamp
        ? new Date().getTime() - consumer.metrics.initialConnectionTimestamp
        : null;
    },
    // returns time since current connection; returns null if consumer not currently connected
    ageSinceLastConnection: function () {
      return consumer.metrics.currentConnectionTimestamp
        ? new Date().getTime() - consumer.metrics.currentConnectionTimestamp
        : null;
    },

    // HEARTBEAT METHODS
    // turns on logging every heartbeat (off by default)
    heartbeatLogOn: function () {
      consumer.metrics.options.heartbeat.logOn = true;
    },
    // turns off logging every heartbeat
    heartbeatLogOff: function () {
      consumer.metrics.options.heartbeat.logOn = false;
    },
    // creates heartbeat breakpoint at specified interval (ms)
    heartbeatBreakpoint: function (interval) {
      consumer.metrics.options.heartbeat.breakpoint = interval;
    },
    // cancels existing heartbeat breakpoint
    heartbeatBreakpointOff: function () {
      consumer.metrics.options.heartbeat.breakpoint = null;
    },

    // OFFSET LAG METHODS
    // creates offsetLag breakpoint at specified interval (ms)
    offsetLagBreakpoint: function (interval) {
      consumer.metrics.options.offsetLag.breakpoint = interval;
    },
    // cancels existing offsetLag breakpoint
    offsetLagBreakpointOff: function () {
      consumer.metrics.options.offsetLag.breakpoint = null;
    },

    // REQUEST PENDING DURATION METHODS
    // turns on logging pendingDuration for every request (off by default)
    requestPendingDurationLogOn: function () {
      consumer.metrics.options.requestPendingDuration.logOn = true;
    },
    // turns off logging pendingDuration for every request
    requestPendingDurationLogOff: function () {
      consumer.metrics.options.requestPendingDuration.logOn = false;
    },
    // creates request pendingDuration breakpoint at specified interval (ms)
    requestPendingDurationBreakpoint: function (interval) {
      consumer.metrics.options.requestPendingDuration.breakpoint = interval;
    },
    // cancels existing request pendingDuration breakpoint
    requestPendingDurationBreakpointOff: function () {
      consumer.metrics.options.requestPendingDuration.breakpoint = null;
    },

    // REQUEST QUEUE SIZE METHODS
    // turns on logging requestQueueSize for every request (off by default)
    requestQueueSizeLogOn: function () {
      consumer.metrics.options.requestQueueSize.logOn = true;
    },
    // turns off logging requestQueueSize for every request
    requestQueueSizeLogOff: function () {
      consumer.metrics.options.requestQueueSize.logOn = false;
    },
    // creates requestQueueSize breakpoint at specified interval (ms)
    requestQueueSizeBreakpoint: function (interval) {
      consumer.metrics.options.requestQueueSize.breakpoint = interval;
    },
    // cancels existing requestQueueSize breakpoint
    requestQueueSizeBreakpointOff: function () {
      consumer.metrics.options.requestQueueSize.breakpoint = null;
    },

    latencyOffsetFetch: [], // sends the developer the current history and pattern of offsetfetch latency in requestPendingDuration.js
    // currentQueueSizeHistory: [], // sends the developer the current history and pattern of queuesizehistroy in requestQueueSize.js

    // OPTIONS
    // the options object inside consumer.metrics contains properties for event emitters that aren't useful for the developer to view (i.e. flag on-and-off properties for conditionals)
    options: {
      heartbeat: {
        logOn: false, // set within heartbeat.js
        breakpoint: null, // set within heartbeat.js
      },
      requestPendingDuration: {
        logOn: false, //set within requestPendingDuration.js
        breakpoint: null, //set within requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, //set within requestQueueSize.js
        breakpoint: null, //set within requestQueueSize.js
      },
      offsetLag: {
        logOn: false, //set within endBatchProcess.js
        breakpoint: null, // set within endBatchProcess.js
      },
    },
  };

  // run functions to create metrics for consumer instrumentation events
  connectConsumer(consumer, client);
  disconnectConsumer(consumer, client);
  endBatchProcess(consumer);
  groupJoin(consumer);
  heartbeat(consumer);
  requestEvents(consumer);
  requestQueueSize(consumer);
  requestTimeoutRate(consumer);
  return consumer;
}

module.exports = metricizeConsumer;
