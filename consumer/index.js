const endBatchProcess = require('./endBatchProcess');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const { totalRequests } = require('./request');
const requestTimeoutRate = require('./request_timeout');
const totalPartitions = require('./group_join');
const consumerDisconnect = require('./disconnect');

function metricize(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    isConnected: false,
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  initialConnectionAge(consumer);
  successfulConnectionAge(consumer, client);
  consumerDisconnect(consumer, client);
  totalRequests(consumer);
  requestTimeoutRate(consumer);
  totalPartitions(consumer);
  return consumer;
}

module.exports = metricize;
