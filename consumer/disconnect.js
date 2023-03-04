function disconnectConsumer(consumer, client) {
  consumer.on('consumer.disconnect', () => {
    trackConsumerDisconnects(consumer, client);
    resetCurrentConnectionTimestamp(consumer);
    resetMemberId(consumer);
    resetHeartbeatMetrics(consumer);
  });
}

// updates isConnected for consumer and totalConsumers for client on consumer disconnect
function trackConsumerDisconnects(consumer, client) {
  if (consumer.metrics.isConnected === true) {
    client.metrics.totalConsumers -= 1;
    consumer.metrics.isConnected = false;
  }
}

// resets consumer currentConnectionTimestamp to null on disconnect
function resetCurrentConnectionTimestamp(consumer) {
  consumer.metrics.currentConnectionTimestamp = null;
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

module.exports = disconnectConsumer;
