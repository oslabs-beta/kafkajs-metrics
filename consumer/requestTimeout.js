function calculateRate(consumer) {
  const startNum = consumer.metrics.totalRequestTimeouts;
  setTimeout((start) => {
    const end = consumer.metrics.totalRequestTimeouts;
    consumer.metrics.timeoutRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestTimeoutRate(consumer) {
  consumer.on('consumer.network.request_timeout', (e) => {
    consumer.metrics.totalRequestTimeouts += 1;

  });

  calculateRate(consumer);

  setInterval(calculateRate, 60000, consumer);
}

module.exports = requestTimeoutRate;
