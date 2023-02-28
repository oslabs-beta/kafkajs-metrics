// this function assigns value to the consumer.metrics.memberId property

function totalPartitions(consumer) {
  consumer.metrics.totalPartitions = 0;
  consumer.on('consumer.group_join', (e) => {
    const topicArr = Object.keys(e.payload.memberAssignment);
    let sum = 0;
    for (const topic of topicArr) {
        sum += e.payload.memberAssignment[topic].length;
    }
    consumer.metrics.totalPartitions = sum;
    // setting consumer memberId on consumer.metrics
    if (consumer.metrics.memberId === null) {
      consumer.metrics.memberId = e.payload.memberId;
    }
  });
}

module.exports = totalPartitions;
