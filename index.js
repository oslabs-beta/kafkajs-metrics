//require in producer/consumer/admin folders
const consumerMetricize = require('./consumer');

// global metrics object here? TBD
const metrics = {};

// metricize kafka client
function metricize(client) {
  // create client.metrics property for global metrics
  client.metrics = {};

  // metricize consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function () {
    return consumerMetricize(vanillaConsumer.apply(this, arguments));
  };

  // need to do same for producer & admin
}

module.exports = { metrics, metricize };
