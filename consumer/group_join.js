function totalPartitions(consumer) {
  consumer.metrics.totalPartitions = 0;
  consumer.on('consumer.group_join', (e) => {
    const topicArr = Object.keys(e.payload.memberAssignment);
    let sum = 0;
    for (const topic of topicArr) {
        sum += e.payload.memberAssignment[topic].length;
    }
    consumer.metrics.totalPartitions = sum;
  });
}

module.exports = totalPartitions;
