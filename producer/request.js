function calculateRate(producer) {
  const startNum = producer.metrics.totalRequests;
  setTimeout((start) => {
    const end = producer.metrics.totalRequests;
    producer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function totalRequests(producer) {
  producer.metrics.totalRequests = 0;
  producer.metrics.requestRate = 0;

  producer.on('producer.network.request', () => {
    producer.metrics.totalRequests += 1;
  });

  calculateRate(producer);

  setInterval(calculateRate, 60000, producer);
}

module.exports = { totalRequests };
