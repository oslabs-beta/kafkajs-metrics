function calculateRate(consumer) {
  const startNum = consumer.metrics.totalRequests;
  setTimeout((start) => {
    const end = consumer.metrics.totalRequests;
    consumer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function totalRequests(consumer) {
  consumer.metrics.totalRequests = 0;
  consumer.metrics.requestRate = 0;

  consumer.on('consumer.network.request', () => {
    consumer.metrics.totalRequests += 1;
  });

  calculateRate(consumer);

  setInterval(calculateRate, 60000, consumer);
}

module.exports = { totalRequests };
