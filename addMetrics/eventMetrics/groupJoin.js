function groupJoin(consumer) {
  consumer.on('consumer.group_join', (e) => {
    setMemberId(consumer, e);
    setTotalPartitions(consumer, e);
  });
}

// set memberId on metrics
function setMemberId(consumer, e) {
  consumer.metrics.memberId = e.payload.memberId;
}

// track total number of partitions a consumer is subscribed to
function setTotalPartitions(consumer, e) {
  const topicArr = Object.keys(e.payload.memberAssignment);
  let sum = 0;
  topicArr.forEach((topic) => {
    sum += e.payload.memberAssignment[topic].length;
  });
  consumer.metrics.totalPartitions = sum;
}

module.exports = { groupJoin, setTotalPartitions };
