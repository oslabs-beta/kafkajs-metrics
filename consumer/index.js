const endBatchProcess = require('./endBatchProcess.js');

function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {};
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  return consumer;
}

module.exports = metricize;
