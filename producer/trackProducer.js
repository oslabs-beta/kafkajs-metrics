function trackProducer(producer, client) {
  producer.on('producer.connect', () => {
    if (producer.metrics.isConnected === false) {
      client.metrics.totalProducers += 1;
      producer.metrics.isConnected = true;
    }
    console.log('I am in trackProducer and I tracked a connect. The number of total producers connected is currently: ', client.metrics.totalProducers);
  });
  producer.on('producer.disconnect', () => {
    if (producer.metrics.isConnected === true) {
      client.metrics.totalProducers -= 1;
      producer.metrics.isConnected = false;
    }
    console.log('I am in trackProducer and I tracked a disconnect. The number of total producers connected is currently: ', client.metrics.totalProducers);
  });
}

module.exports = trackProducer;
