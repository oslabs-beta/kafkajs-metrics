/*
QUESTIONS: 
1.  For total consumers are we tracking total amount of consumers 
    that connect to a broker? or vs total amount of consumers in a group?
    Is that the same?
 */

//const { metrics } = require('../index.js');
function trackConsumer(consumer, client) {
  
    consumer.on('consumer.connect', () => {
      if(consumer.metrics.isConnected === false){ 
        client.metrics.totalConsumers++;
        consumer.metrics.isConnected = true;
      }  
      console.log('I am in trackConsumer and I tracked a connect. The number of total consumers connected is currently: ', client.metrics.totalConsumers)
    });
    consumer.on('consumer.disconnect', () => {
      if(consumer.metrics.isConnected === true){
        client.metrics.totalConsumers--;
        consumer.metrics.isConnected = false;
      }  
      console.log('I am in trackConsumer and I tracked a disconnect. The number of total consumers connected is currently: ', client.metrics.totalConsumers)  
    });
    consumer.on('consumer.crash', () => {
      //client.metrics.totalConsumers--;
      console.log('I am in trackConsumer and I tracked a crash The number of total consumers is currently: ', client.metrics.totalConsumers)
    //   consumer.on('consumer.group_join', () => {
    //     client.metrics.totalConsumers++;
    //     console.log('The consumer has joined a group after crashing. The number of total consumers is currently: ', client.metrics.totalConsumers)
    //   })
    //   consumer.on('consumer.connect', () => {
    //     client.metrics.totalConsumers++;
    //     console.log('The consumer has connected after crashing. The number of total consumers is currently: ', client.metrics.totalConsumers)
    //   })
    });
  }
  
  module.exports = trackConsumer;
  