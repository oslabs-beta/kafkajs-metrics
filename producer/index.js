const totalRequests = require('./request');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const requestTimeoutRate = require('./request_timeout');
const requestPendingDuration =require('./requestPendingDuration');
const requestQueueSize = require('./requestQueueSize');
const producerDisconnect = require('./disconnect');

function metricize(producer, client) {
  // create empty metrics property on producer
  producer.metrics = {
    isConnected: false,
    latencyOffsetFetch: [],//sends the developer the current history and pattern of offsetfetch latency in requestPendingDuration.js
    currentQueueSizeHistory: [], //sends the developer the current history and pattern of queuesizehistroy in requestQueueSize.js
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
  };
  // run functions to create metrics for producer instrumentation events
  totalRequests(producer);
  initialConnectionAge(producer);
  successfulConnectionAge(producer, client);
  producerDisconnect(producer, client);
  requestTimeoutRate(producer);
  requestPendingDuration(producer);
  requestQueueSize(producer);
  return producer;
}

module.exports = metricize;
