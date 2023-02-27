const totalRequests = require('../consumer/request');
const { initialConnectionAge, successfulConnectionAge } = require('../consumer/connect');
const requestTimeoutRate = require('../consumer/request_timeout');

function metricize(producer) {
  // create empty metrics property on producer
  producer.metrics = {};
  // run functions to create metrics for producer instrumentation events
  totalRequests(producer);
  initialConnectionAge(producer);
  successfulConnectionAge(producer);
  requestTimeoutRate(producer);

  return producer;
}

module.exports = metricize;
