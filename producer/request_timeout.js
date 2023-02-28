function calculateTimeoutRate(producer) {
  let count = 0;
  const removeListener = producer.on('producer.request_timeout', () => {
    count += 1;
  });
  setTimeout(() => {
    removeListener();
    producer.metrics.timeoutRate = count / 30;
  }, 30000);
}

function requestTimeoutRate(producer) {
  producer.metrics.timeoutRate = 0;
  setInterval(calculateTimeoutRate, 60000, producer);
}

module.exports = requestTimeoutRate;
