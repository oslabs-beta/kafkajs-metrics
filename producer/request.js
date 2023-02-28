function calculateRate(producer) {
  const startNum = producer.metrics.totalRequests;
  setTimeout((start) => {
    const end = producer.metrics.totalRequests;
    producer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestEvents(producer) {

  producer.on('producer.network.request', () => {
    producer.metrics.totalRequests += 1;
  });

  calculateRate(producer);

  setInterval(calculateRate, 60000, producer);
}

module.exports = { requestEvents };
