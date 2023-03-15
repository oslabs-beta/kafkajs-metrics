function connect(obj, client, type) {
  obj.on(`${type}.connect`, (e) => {
    trackConnects(obj, client, type);
    setInitialConnectionTimestamp(obj, e);
    setCurrentConnectionTimestamp(obj, e);
  });
}

// if isConnected is false, set to true and increment totalConsumers (etc.) on client
function trackConnects(obj, client, type) {
  if (obj.metrics.isConnected === false) {
    switch (type) {
      case 'consumer':
        client.metrics.totalConsumers += 1;
        break;
      case 'producer':
        client.metrics.totalProducers += 1;
        break;
      case 'admin':
        client.metrics.totalAdmins += 1;
        break;
      default:
        console.error(
          'ERROR: switch statement reached default case in src/connect.js'
        );
    }
    obj.metrics.isConnected = true;
  }
}

// if initialConnectionTimestamp is null, set equal to connect event's timestamp
function setInitialConnectionTimestamp(obj, e) {
  if (!obj.metrics.initialConnectionTimestamp) {
    obj.metrics.initialConnectionTimestamp = e.timestamp;
  }
}

// set currentConnectionTimestamp equal to connect event's timestamp
function setCurrentConnectionTimestamp(obj, e) {
  obj.metrics.currentConnectionTimestamp = e.timestamp;
}

module.exports = { connect, trackConnects };
