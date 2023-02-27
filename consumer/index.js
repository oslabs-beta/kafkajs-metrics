const endBatchProcess = require('./endBatchProcess');
const heartbeat = require('./heartbeat');


function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {};
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  heartbeat(consumer);
  return consumer;
}

module.exports = metricize;
