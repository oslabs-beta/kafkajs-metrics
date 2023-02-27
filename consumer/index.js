const endBatchProcess = require('./endBatchProcess');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const { totalRequests } = require('./request');
const requestTimeoutRate = require('./request_timeout');
const totalPartitions = require('./group_join');
const trackConsumer = require('./trackConsumer');

function metricize(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    isConnected: false,
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  initialConnectionAge(consumer);
  successfulConnectionAge(consumer);
  totalRequests(consumer);
  requestTimeoutRate(consumer);
  totalPartitions(consumer);
  trackConsumer(consumer, client);
  return consumer;
}

module.exports = metricize;
