// require in producer/consumer/admin folders
const consumerMetricize = require('./consumer');
const producerMetricize = require('./producer');
const adminMetricize = require('./admin');


// metricize kafka client
function metricize(client, visualize = false, token = false) {
  // create client.metrics property for global metrics

  if (visualize && token) {
    //post request to token
    fetch('http://localhost:3000/token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: token}),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('data', data);
    })
    .catch((err) =>{
      console.log('error in initial redis token: ', err)
    })
  }

  client.metrics = {
    totalConsumers: 0,
    totalProducers: 0,
    totalAdmins: 0, // modified in admin/connect.js and admin/disconnect.js
    options: {
      visualize: visualize,
      token: token,
      consumerNum: 0,
      producerNum: 0,
    }
  };


  // metricize consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return consumerMetricize(vanillaConsumer.apply(this, arguments), client);
  };


  // metricize producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return producerMetricize(vanillaProducer.apply(this, arguments), client);
  };

  // metricize admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return adminMetricize(vanillaAdmin.apply(this, arguments), client);
  };

}

module.exports = { metricize };
