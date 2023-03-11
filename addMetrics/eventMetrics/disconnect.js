function disconnect(obj, client, type) {
  obj.on(`${type}.disconnect`, () => {
    trackDisconnects(obj, client, type);
    resetCurrentConnectionTimestamp(obj);
    if (type === 'consumer') {
      resetMemberId(obj);
      resetHeartbeatMetrics(obj);
    }
  });
}

// updates isConnected for obj and totalConsumers (etc.) for client on obj disconnect
function trackDisconnects(obj, client, type) {
  if (obj.metrics.isConnected === true) {
    switch (type) {
      case 'consumer':
        client.metrics.totalConsumers -= 1;
        break;
      case 'producer':
        client.metrics.totalProducers -= 1;
        break;
      case 'admin':
        client.metrics.totalAdmins -= 1;
        break;
      default:
        console.error(
          'ERRPR: switch statement reached defualt case in addMetrics/disconnect.js'
        );
    }
    obj.metrics.isConnected = false;
  }
}

// resets currentConnectionTimestamp to null on disconnect
function resetCurrentConnectionTimestamp(obj) {
  obj.metrics.currentConnectionTimestamp = null;
}

// resets consumer memberId to null on disconnect
function resetMemberId(consumer) {
  consumer.metrics.memberId = null;
}

// resets heartbeat-related metrics on disconnect
function resetHeartbeatMetrics(consumer) {
  consumer.metrics.lastHeartbeat = 0;
  consumer.metrics.lastHeartbeatDuration = 0;
  consumer.metrics.longestHeartbeatDuration = 0;
}

module.exports = { disconnect, trackDisconnects };
