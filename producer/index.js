const { requestEvents } = require('./request');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const requestTimeoutRate = require('./request_timeout');
const requestQueueSize = require('./requestQueueSize');
const producerDisconnect = require('./disconnect');

function metricizeProducer(producer, client) {
  // create empty metrics property on producer
  producer.metrics = {
    name: null,
    isConnected: false,
    latencyOffsetFetch: [], //sends the developer the current history and pattern of offsetfetch latency in requestPendingDuration.js
    //currentQueueSizeHistory: [], stores the presistant data into an array i want the user to get current history of data
    totalRequestTimeouts: 0,
    requestPendingDurationlogOn: function () {
      producer.metrics.options.requestPendingDuration.logOn = true;
    },
    requestPendingDurationlogOff: function () {
      producer.metrics.options.requestPendingDuration.logOn = false;
    },
    requestPendingDurationBreakpoint: function (interval) {
      producer.metrics.options.requestPendingDuration.breakpoint = interval;
    },
    requestPendingDurationBreakpointOff: function () {
      producer.metrics.options.requestPendingDuration.breakpoint = null;
    },
    requestQueueSizelogOn: function () {
      producer.metrics.options.requestQueueSize.logOn = true;
    },
    requestQueueSizelogOff: function () {
      producer.metrics.options.requestQueueSize.logOn = false;
    },
    //creates a breakpoint at the input interval
    requestQueueSizeBreakpoint: function (interval) {
      producer.metrics.options.requestQueueSize.breakpoint = interval;
    },
    // ends a previously-input breakpoint at the inputted interval
    requestQueueSizeBreakpointOff: function () {
      producer.metrics.options.requestQueueSize.breakpoint = null;
    },
    options: {
      requestPendingDuration: {
        logOn: false, //set within requestPendingDuration.js
        breakpoint: null, //set within requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, //set within requestQueueSize.js
        breakpoint: null, //set within requestQueueSize.js
      },
    },
    totalRequests: 0, // updated within request.js
    requestRate: 0, // updated within request.js
    timeoutRate: 0, // updated within request_timeout.js
  };
  // run functions to create metrics for producer instrumentation events
  requestEvents(producer);
  initialConnectionAge(producer);
  successfulConnectionAge(producer, client);
  producerDisconnect(producer, client);
  requestTimeoutRate(producer);
  requestQueueSize(producer);
  return producer;
}

module.exports = metricizeProducer;
