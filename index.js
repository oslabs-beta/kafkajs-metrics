// require in producer/consumer/admin folders
const addMetrics = require('./addMetrics');

/**
 * Metricize Kafka Client
 *
 * Metrics will be added to any consumer/producer/admin instance from this client
 * @param {object} client - instance of KafkaJS Client
 * @returns {object} - metricized instance of KafkaJS Client
 * @example
 * metricize(client);
 */

// metricize kafka client
function metricize(client) {
  /**
   * Global Metrics Object:
   *
   * Includes most recently calculated global metrics on kafkaJS client
   * @type {object} Global Metrics
   * @example
   * const globalMetricsObject = client.metrics;
   */
  // create client.metrics property for global metrics
  client.metrics = {
    /**
     * Number of total consumers
     * @type {string} - number of total connected consumers
     * @example
     * client.metrics.totalConsumers = 25;
     */
    totalConsumers: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    /**
     * Number of total producers
     * @type {string} - number of total connected producers
     * @example
     * client.metrics.totalProducers = 30;
     */
    totalProducers: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    /**
     * Number of total admin
     * @type {string} - number of total connected admins
     * @example
     * client.metrics.totalAdmins = 5;
     */
    totalAdmins: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
  };

  // add metrics to consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return addMetrics(
      vanillaConsumer.apply(this, arguments),
      client,
      'consumer'
    );
  };

  // add metrics to producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return addMetrics(
      vanillaProducer.apply(this, arguments),
      client,
      'producer'
    );
  };

  // add metrics to admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return addMetrics(vanillaAdmin.apply(this, arguments), client, 'admin');
  };
}

module.exports = { metricize };
