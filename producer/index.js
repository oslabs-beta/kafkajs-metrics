function metricize(producer) {
  // create empty metrics property on producer
  producer.metrics = {};
  // run functions to create metrics for producer instrumentation events

  return producer;
}

module.exports = metricize;
