const { endBatchProcess } = require('./endBatchProcess.js');

function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {};
  endBatchProcess(consumer);
}

module.exports = metricize;
