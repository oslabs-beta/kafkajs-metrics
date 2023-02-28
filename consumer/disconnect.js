function trackConsumerDisconnects(consumer, client) {
  if (consumer.metrics.isConnected === true) {
    client.metrics.totalConsumers -= 1;
    consumer.metrics.isConnected = false;
  }
}
function consumerDisconnect(consumer, client) {
  consumer.on('consumer.disconnect', () => {
    trackConsumerDisconnects(consumer, client);
  });
}

module.exports = consumerDisconnect;
