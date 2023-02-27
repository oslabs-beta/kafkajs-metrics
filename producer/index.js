const totalRequests = require('../consumer/request');
const { initialConnectionAge, successfulConnectionAge } = require('../consumer/connect');
const requestTimeoutRate = require('../consumer/request_timeout');
const trackProducer = require('./trackProducer');

function metricize(producer, client) {
  // create empty metrics property on producer
  producer.metrics = {};
  // run functions to create metrics for producer instrumentation events
  totalRequests(producer);
  initialConnectionAge(producer);
  successfulConnectionAge(producer);
  requestTimeoutRate(producer);
  // create empty metrics property on producer
  producer.metrics = {
    isConnected: false,
  };
  // run functions to create metrics for producer instrumentation events
  trackProducer(producer, client);


  return producer;
}

module.exports = metricize;
