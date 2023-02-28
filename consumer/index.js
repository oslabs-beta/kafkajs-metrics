const endBatchProcess = require('./endBatchProcess');

function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {
    messagesConsumed: 0, // modified in endBatchProcess.js
    offsetLag: null, // modified in endBatchProcess.js
    setOffsetLagBreakpoint: function (interval) {
      consumer.metrics.options.offsetLagBreakpoint = interval;
    },
    offsetLagBreakpointOff: function () {
      consumer.metrics.options.offsetLagBreakpoint = null;
    },
    options: {
      offsetLagBreakpoint: null, // used in endBatchProcess.js
    },
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  return consumer;
}

module.exports = metricize;
