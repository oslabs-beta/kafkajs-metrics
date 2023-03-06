// require in producer/consumer/admin folders
const addMetrics = require('./consumer');

// metricize kafka client
function metricize(client) {
  // create client.metrics property for global metrics
  client.metrics = {
    totalConsumers: 0, // modified in consumer/connect.js and consumer/disconnect.js
    totalProducers: 0, // modified in producer/connect.js and producer/disconnect.js
    totalAdmins: 0, // modified in admin/connect.js and admin/disconnect.js
  };

  // metricize consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return addMetrics(
      vanillaConsumer.apply(this, arguments),
      client,
      'consumer'
    );
  };

  // metricize producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return addMetrics(
      vanillaProducer.apply(this, arguments),
      client,
      'producer'
    );
  };

  // metricize admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return addMetrics(vanillaAdmin.apply(this, arguments), client, 'admin');
  };
}

module.exports = { metricize };
