//require in producer/consumer/admin folders
const consumerMetricize = require('./consumer');``

// global metrics object here? TBD
const metrics = {
  totalConsumers: 0
};

// need to create switch case function to call correct metricize function for consumer/producer/admin – for now, just consumer will work
function metricize(consumer) {
  consumerMetricize(consumer);
}

module.exports = { metrics, metricize };
