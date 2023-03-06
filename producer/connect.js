function connect(producer, client) {
  producer.on('producer.connect', (e) => {
    trackProducerConnects(producer, client);
    setInitialConnectionTimestamp(producer, e);
    setCurrentConnectionTimestamp(producer, e);
  });
}

// if isConnected is false, set to true and increment totalPonsumers on client
function trackProducerConnects(producer, client) {
  if (producer.metrics.isConnected === false) {
    client.metrics.totalProducers += 1;
    producer.metrics.isConnected = true;
  }
}

// if initialConnectionTimestamp is null, set equal to connect event's timestamp
function setInitialConnectionTimestamp(producer, e) {
  if (!producer.metrics.initialConnectionTimestamp) {
    producer.metrics.initialConnectionTimestamp = e.timestamp;
  }
}

// set currentConnectionTimestamp equal to connect event's timestamp
function setCurrentConnectionTimestamp(producer, e) {
  producer.metrics.currentConnectionTimestamp = e.timestamp;
}

module.exports = connect;
