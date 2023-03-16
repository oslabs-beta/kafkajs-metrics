const { trackConnects } = require('../../src/eventMetrics/connect');

describe('trackConnects function', () => {
  let kafkaInstance;
  let client;

  beforeEach(() => {
    kafkaInstance = {
      metrics: {
        isConnected: false
      },
    };
    client = {
      metrics: {
        totalConsumers: 0,
        totalProducers: 0,
        totalAdmins: 0,
      },
    };
  });

  describe('isConnected', () => {
    it('should update isConnected if it is false', () => {
      trackConnects(kafkaInstance, client, 'consumer');
      expect(kafkaInstance.metrics.isConnected).toEqual(true);
    });
  });

  describe('client metrics', () => {
    it('should only affect the total of the type passed in', () => {
      trackConnects(kafkaInstance, client, 'producer');
      expect(client.metrics.totalConsumers).toBe(0);
      expect(client.metrics.totalAdmins).toBe(0);
      expect(client.metrics.totalProducers).toBe(1);
    });
  });

  describe('total client counts', () => {
    it('should increment totalConsumers when passed a consumer type', () => {
      trackConnects(kafkaInstance, client, 'consumer');
      expect(client.metrics.totalConsumers).toBe(1);
    });
    it('should increment totalProducers when passed a producer type', () => {
      trackConnects(kafkaInstance, client, 'producer');
      expect(client.metrics.totalProducers).toBe(1);
    });
    it('should increment totalAdmins when passed an admin type', () => {
      trackConnects(kafkaInstance, client, 'admin');
      expect(client.metrics.totalAdmins).toBe(1);
    });
  });

  describe('called when isConnected is true', () => {
    it('should not do anything if isConnected is true', () => {
      kafkaInstance.metrics.isConnected = true;
      trackConnects(kafkaInstance, client, 'producer');
      expect(kafkaInstance.metrics).toEqual({ isConnected: true });
      expect(client.metrics).toEqual({ totalConsumers: 0, totalProducers: 0, totalAdmins: 0 });
    });
  });
});
