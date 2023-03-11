import { trackDisconnects } from '../../addMetrics/eventMetrics/disconnect';

describe('trackDisconnects function', () => {
  let kafkaInstance;
  let client;

  beforeEach(() => {
    kafkaInstance = {
      metrics: {
        isConnected: true
      },
    };
    client = {
      metrics: {
        totalConsumers: 1,
        totalProducers: 1,
        totalAdmins: 1,
      },
    };
  });

  describe('isConnected', () => {
    it('should update isConnected if it is true', () => {
      trackDisconnects(kafkaInstance, client, 'consumer');
      expect(kafkaInstance.metrics.isConnected).toEqual(false);
    });
  });

  describe('client metrics', () => {
    it('should only affect the total of the type passed in', () => {
      trackDisconnects(kafkaInstance, client, 'producer');
      expect(client.metrics.totalConsumers).toBe(1);
      expect(client.metrics.totalAdmins).toBe(1);
      expect(client.metrics.totalProducers).toBe(0);
    });
  });

  describe('total client counts', () => {
    it('should decrement totalConsumers when passed a consumer type', () => {
      trackDisconnects(kafkaInstance, client, 'consumer');
      expect(client.metrics.totalConsumers).toBe(0);
    });

    it('should decrement totalProducers when passed a producer type', () => {
      trackDisconnects(kafkaInstance, client, 'producer');
      expect(client.metrics.totalProducers).toBe(0);
    });

    it('should decrement totalAdmins when passed an admin type', () => {
      trackDisconnects(kafkaInstance, client, 'admin');
      expect(client.metrics.totalAdmins).toBe(0);
    });
  });
});
