// require in producer/consumer/admin folders
const addMetrics = require('./addMetrics');

/**
 * Metricize Kafka Client:
 *
 * Metrics added to any consumer/producer/admin instance from this client
 * @param {object} client - instance of KafkaJS Client
 * @returns {object} - metricized instance of KafkaJS Client
 * @example
 * metricize(client);
 */

function metricize(client) {
  /**
   * Client Metrics Object:
   *
   * Includes most recently calculated client metrics on KafkaJS client
   * @type {object} Client Metrics
   * @example
   * const clientMetricsObject = client.metrics;
   */

  client.metrics = {
    /**
     * Number of total consumers
     * @type {string} - number of total connected consumers
     * @example
     * console.log(client.metrics.totalConsumers);
     * // => prints to the console: 25
     */
    totalConsumers: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    /**
     * Number of total producers
     * @type {string} - number of total connected producers
     * @example
     * console.log(client.metrics.totalProducers);
     * // => prints to the console: 30
     */
    totalProducers: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    /**
     * Number of total admin
     * @type {string} - number of total connected admins
     * @example
     * console.log(client.metrics.totalAdmins);
     * // => prints to the console: 5
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
