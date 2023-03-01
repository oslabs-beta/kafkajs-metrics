const { requestEvents } = require('./request');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const requestTimeoutRate = require('./request_timeout');
const requestQueueSize = require('./requestQueueSize');
const producerDisconnect = require('./disconnect');

function metricize(producer, client) {
  // create empty metrics property on producer
  producer.metrics = {
    isConnected: false,
    latencyOffsetFetch: [],//sends the developer the current history and pattern of offsetfetch latency in requestPendingDuration.js
    currentQueueSizeHistory: [],//stores the presistant data into an array i want the user to get current history of data
    currentQueueSizeHistory: [], //stores the presistant data into an array i want the user to get current history of data
    requestPendingDurationlogOn: function () {
      producer.metrics.options.requestPendingDuration.logOn = true;
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
        logOn: true, //set within requestPendingDuration.js
        breakpoint: null, //set within requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: true, //set within requestQueueSize.js
        breakpoint: null, //set within requestQueueSize.js
      }
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

module.exports = metricize;
