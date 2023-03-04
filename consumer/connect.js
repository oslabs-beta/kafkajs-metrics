function connectConsumer(consumer, client) {
  consumer.on('consumer.connect', (e) => {
    trackConsumerConnects(consumer, client);
    setInitialConnectionTimestamp(consumer, e);
    setCurrentConnectionTimestamp(consumer, e);
  });
}

// if isConnected is false, set to true and increment totalConsumers on client
function trackConsumerConnects(consumer, client) {
  if (consumer.metrics.isConnected === false) {
    client.metrics.totalConsumers += 1;
    consumer.metrics.isConnected = true;
  }
}

// if initialConnectionTimestamp is null, set equal to connect event's timestamp
function setInitialConnectionTimestamp(consumer, e) {
  if (!consumer.metrics.initialConnectionTimestamp) {
    consumer.metrics.initialConnectionTimestamp = e.timestamp;
  }
}

// set currentConnectionTimestamp equal to connect event's timestamp
function setCurrentConnectionTimestamp(consumer, e) {
  consumer.metrics.currentConnectionTimestamp = e.timestamp;
}

module.exports = connectConsumer;
