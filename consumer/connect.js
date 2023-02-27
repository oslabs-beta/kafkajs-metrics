function initialConnectionAge(consumer) {
  let initialConnection = 0;

  const removeListener = consumer.on('consumer.connect', (e) => {
    initialConnection = e.timestamp;
    removeListener();
  });

  consumer.initialConnectionAge = () => new Date().getTime() - initialConnection;
}

function successfulConnectionAge(consumer) {
  let mostRecentConnection = 0;

  consumer.on('consumer.connect', (e) => {
    mostRecentConnection = e.timestamp;
  });

  consumer.ageSinceLastConnection = () => new Date().getTime() - mostRecentConnection;
}

module.exports = { initialConnectionAge, successfulConnectionAge };
