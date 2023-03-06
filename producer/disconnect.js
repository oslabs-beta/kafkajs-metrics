function disconnect(producer, client) {
  producer.on('producer.disconnect', () => {
    trackProducerDisconnects(producer, client);
    resetCurrentConnectionTimestamp(producer);
  });
}

// updates isConnected for producer and totalProducers for client on producer disconnect
function trackProducerDisconnects(producer, client) {
  if (producer.metrics.isConnected === true) {
    client.metrics.totalProducers -= 1;
    producer.metrics.isConnected = false;
  }
}

// resets producer currentConnectionTimestamp to null on disconnect
function resetCurrentConnectionTimestamp(producer) {
  producer.metrics.currentConnectionTimestamp = null;
}

module.exports = disconnect;
