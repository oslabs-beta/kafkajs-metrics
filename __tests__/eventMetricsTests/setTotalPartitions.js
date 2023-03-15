const { setTotalPartitions } = require('../../src/eventMetrics/groupJoin');

describe('setTotalPartitions function', () => {
  let consumer;
  let event;

  beforeEach(() => {
    consumer = {
      metrics: {
        totalPartitions: 0,
      },
    };

    event = {
      payload: {
        memberAssignment: {
          topic1: [1, 3, 5],
        },
      },
    };
  });

  describe('totalPartitions', () => {
    it('should update totalPartitions when consumer is subscribed to a single topic', () => {
      setTotalPartitions(consumer, event);
      expect(consumer.metrics.totalPartitions).toBe(3);
    });
    it('should update totalPartitions when consumer is subscribed to multiple topics', () => {
      event.payload.memberAssignment.topic2 = [2, 4, 6];
      event.payload.memberAssignment.topic3 = [7, 8, 9];
      setTotalPartitions(consumer, event);
      expect(consumer.metrics.totalPartitions).toBe(9);
    });
  });
});
