function trackConsumerDisconnects(consumer, client) {
  if (consumer.metrics.isConnected === true) {
    client.metrics.totalConsumers -= 1;
    consumer.metrics.isConnected = false;
  }
}

function resetHeartbeatMetrics(consumer){
  consumer.metrics.lastHeartbeat = 0;
  consumer.metrics.lastHeartbeatDuration = 0;
  // by resetting longestHeartbeatDuration, this becomes a metric just for a single connected session - I think this is most useful? 
  consumer.metrics.longestHeartbeatDuration = 0;
}

function consumerDisconnect(consumer, client) {
  consumer.on('consumer.disconnect', () => {
    trackConsumerDisconnects(consumer, client);
    resetHeartbeatMetrics(consumer);
  });
}

module.exports = consumerDisconnect;
