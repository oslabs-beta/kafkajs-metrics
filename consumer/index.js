const endBatchProcess = require('./endBatchProcess');

function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {
    messagesConsumed: 0, // modified in endBatchProcess.js
    offsetLag: null, // modified in endBatchProcess.js
    options: {
      offsetLagBreakpoint: -1, // used in endBatchProcess.js
    },
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  return consumer;
}

module.exports = metricize;
