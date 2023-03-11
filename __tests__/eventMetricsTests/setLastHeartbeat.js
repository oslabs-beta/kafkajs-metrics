const { setLastHeartbeat } = require('../../addMetrics/eventMetrics/heartbeat');

describe('setLastHeartbeat function', () => {
  let consumer;
  let event;
  beforeEach(() => {
    consumer = {
      metrics: {
        lastHeartbeat: 0,
        longestHeartbeatDuration: 0,
        lastHeartbeatDuration: null,
      },
    };
    event = {
      timestamp: 4,
    };
  });

  describe('lastHeartbeat', () => {
    it('should update lastHeartbeat when lastHeartbeat is 0', () => {
      setLastHeartbeat(consumer, event);
      expect(consumer.metrics.lastHeartbeat).toBe(4);
    });

    it('should update lastHeartbeat when lastHeartbeat is greater than 0', () => {
      consumer.metrics.lastHeartbeat = 10;
      setLastHeartbeat(consumer, event);
      expect(consumer.metrics.lastHeartbeat).toBe(4);
    });
  });

  describe('lastHeartbeatDuration', () => {
    it('should update lastHeartbeatDuration when lastHeartbeat is not 0', () => {
      consumer.metrics.lastHeartbeat = 1;
      setLastHeartbeat(consumer, event);
      expect(consumer.metrics.lastHeartbeatDuration).toBe(3);
    });
  });

  describe('longestHeartbeatDuration', () => {
    it('should update longestHeartbeatDuration if appropriate', () => {
      consumer.metrics.lastHeartbeat = 1;
      setLastHeartbeat(consumer, event);
      expect(consumer.metrics.longestHeartbeatDuration).toBe(3);
    });
  });
});
