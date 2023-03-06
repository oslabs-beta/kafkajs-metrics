// require in producer/consumer/admin folders
const metricizeConsumer = require('./consumer');
const metricizeProducer = require('./producer');
const metricizeAdmin = require('./admin');

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
    return metricizeConsumer(vanillaConsumer.apply(this, arguments), client);
  };

  // metricize producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return metricizeProducer(vanillaProducer.apply(this, arguments), client);
  };

  // metricize admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return metricizeAdmin(vanillaAdmin.apply(this, arguments), client);
  };
}

module.exports = { metricize };
