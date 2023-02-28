function calculateRate(consumer) {
  const startNum = consumer.metrics.totalRequests;
  setTimeout((start) => {
    const end = consumer.metrics.totalRequests;
    consumer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestEvents(consumer) {
  consumer.on('consumer.network.request', () => {
    consumer.metrics.totalRequests += 1;

  });

  calculateRate(consumer);

  setInterval(calculateRate, 60000, consumer);
}

module.exports = { requestEvents };
