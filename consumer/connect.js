function initialConnectionAge(consumer) {
  let initialConnection = 0;

  const removeListener = consumer.on('consumer.connect', (e) => {
    initialConnection = e.timestamp;
    removeListener();
  });

  consumer.initialConnectionAge = () => new Date().getTime() - initialConnection;
}

function trackConsumerConnects(consumer, client) {
  if (consumer.metrics.isConnected === false) {
    client.metrics.totalConsumers += 1;
    consumer.metrics.isConnected = true;
  }
}

function successfulConnectionAge(consumer, client) {
  let mostRecentConnection = 0;
  consumer.on('consumer.connect', (e) => {
    mostRecentConnection = e.timestamp;
    trackConsumerConnects(consumer, client);
  });

  consumer.ageSinceLastConnection = () => new Date().getTime() - mostRecentConnection;
}

module.exports = { initialConnectionAge, successfulConnectionAge };
