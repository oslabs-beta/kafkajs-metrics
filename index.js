// require in producer/consumer/admin folders
const consumerMetricize = require('./consumer');
const producerMetricize = require('./producer');
const adminMetricize = require('./admin');

// metricize kafka client
function metricize(client) {
  // create client.metrics property for global metrics
  client.metrics = {
    totalConsumers: 0,
    totalProducers: 0,
  };

  // metricize consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return consumerMetricize(vanillaConsumer.apply(this, arguments), client);
  };

  // metricize producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return producerMetricize(vanillaProducer.apply(this, arguments), client);
  };

  // metricize admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return adminMetricize(vanillaAdmin.apply(this, arguments));
  };
}

module.exports = { metricize };
