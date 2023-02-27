const  endBatchProcess  = require('./endBatchProcess.js');
const  trackTotalConsumers  = require('./trackTotalConsumers.js');

function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {};
  endBatchProcess(consumer);
  trackTotalConsumers(consumer)
}

module.exports = metricize;
