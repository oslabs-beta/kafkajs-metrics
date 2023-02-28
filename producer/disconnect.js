function trackProducerDisconnects(producer, client) {
  if (producer.metrics.isConnected === true) {
    client.metrics.totalProducers -= 1;
    producer.metrics.isConnected = false;
  }
}
function producerDisconnect(producer, client) {
  producer.on('producer.disconnect', () => {
    trackProducerDisconnects(producer, client);
  });
}
module.exports = producerDisconnect;
