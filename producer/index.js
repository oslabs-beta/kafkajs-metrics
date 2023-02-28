const totalRequests = require('./request');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const requestTimeoutRate = require('./request_timeout');
const producerDisconnect = require('./disconnect');

function metricize(producer, client) {
  // create empty metrics property on producer
  producer.metrics = {
    isConnected: false,
  };
  // run functions to create metrics for producer instrumentation events
  totalRequests(producer);
  initialConnectionAge(producer);
  successfulConnectionAge(producer, client);
  producerDisconnect(producer, client);
  requestTimeoutRate(producer);
  return producer;
}

module.exports = metricize;
