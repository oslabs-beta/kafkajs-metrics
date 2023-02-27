const endBatchProcess = require('./endBatchProcess');
const trackConsumer = require('./trackConsumer');

function metricize(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    isConnected: false
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  trackConsumer(consumer, client)
  return consumer;
}

module.exports = metricize;
