function initialConnectionAge(producer) {
  let initialConnection = 0;

  const removeListener = producer.on('producer.connect', (e) => {
    initialConnection = e.timestamp;
    removeListener();
  });

  producer.initialConnectionAge = () => new Date().getTime() - initialConnection;
}

function trackProducerConnects(producer, client) {
  if (producer.metrics.isConnected === false) {
    client.metrics.totalProducers += 1;
    producer.metrics.isConnected = true;
  }
}

function successfulConnectionAge(producer, client) {
  let mostRecentConnection = 0;
  producer.on('producer.connect', (e) => {
    mostRecentConnection = e.timestamp;
    trackProducerConnects(producer, client);
  });

  producer.ageSinceLastConnection = () => new Date().getTime() - mostRecentConnection;
}

module.exports = { initialConnectionAge, successfulConnectionAge };
