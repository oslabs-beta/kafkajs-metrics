const trackProducer = require('./trackProducer');

function metricize(producer, client) {
  // create empty metrics property on producer
  producer.metrics = {
    isConnected: false,
  };
  // run functions to create metrics for producer instrumentation events
  trackProducer(producer, client);
  return producer;
}

module.exports = metricize;
