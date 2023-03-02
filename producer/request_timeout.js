function calculateRate(producer) {
  const startNum = producer.metrics.totalRequestTimeouts;
  setTimeout((start) => {
    const end = producer.metrics.totalRequestTimeouts;
    producer.metrics.timeoutRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestTimeoutRate(producer) {
  producer.on('producer.network.request_timeout', (e) => {
    producer.metrics.totalRequestTimeouts += 1;

  });

  calculateRate(producer);

  setInterval(calculateRate, 60000, producer);
}

module.exports = requestTimeoutRate;