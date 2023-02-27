/*
QUESTIONS: 
1.  For total consumers are we tracking total amount of consumers 
    that connect to a broker? or vs total amount of consumers in a group?
    Is that the same?
 */

const { metrics } = require('../index.js');
function trackTotalConsumers(consumer) {
    consumer.on('consumer.connect', () => {
      metrics.totalConsumers++;
    });
    consumer.on('consumer.disconnect', () => {
      metrics.totalConsumers--;  
    });
    consumer.on('consumer.crash', () => {
      metrics.totalConsumers--;
      consumer.on('consumer.group_join', () => {
        metrics.totalConsumers++;
      })
    });
  }
  
  module.exports = trackTotalConsumers;
  