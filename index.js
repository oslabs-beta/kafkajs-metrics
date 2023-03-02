// require in producer/consumer/admin folders
const consumerMetricize = require('./consumer');
const producerMetricize = require('./producer');
const adminMetricize = require('./admin');

function getConsumerData(consumer) {
  consumer.metrics.totalRequests
}

// metricize kafka client
function metricize(client) {
  // create client.metrics property for global metrics
  client.metrics = {
    totalConsumers: 0,
    totalProducers: 0,
    totalAdmins: 0, // modified in admin/connect.js and admin/disconnect.js
  };

  // metricize consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return consumerMetricize(vanillaConsumer.apply(this, arguments), client);
  };

  // start sending metrics to database


  // metricize producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return producerMetricize(vanillaProducer.apply(this, arguments), client);
  };

  // metricize admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return adminMetricize(vanillaAdmin.apply(this, arguments), client);
  };
}

module.exports = { metricize };
