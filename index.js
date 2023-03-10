// const consumerMetricize = require('./consumer');
// const producerMetricize = require('./producer');
// const adminMetricize = require('./admin');

// require in producer/consumer/admin folders
const addMetrics = require('./addMetrics');

// metricize kafka client
function metricize(client, visualize = false, token = false) {
  // create client.metrics property for global metrics

  if (visualize && token) {
    // post request to token
    fetch('http://localhost:3000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
      })
      .catch((err) => {
        console.log('error in initial redis token: ', err);
      });
  }

  client.metrics = {
    totalConsumers: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    totalProducers: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    totalAdmins: 0, // modified in addMetrics/connect.js and addMetrics/disconnect.js
    options: {
      visualize,
      token,
      consumerNum: 0,
      producerNum: 0,
    }
  };

  // add metrics to consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return addMetrics(
      vanillaConsumer.apply(this, arguments),
      client,
      'consumer'
    );
  };

  // metricize producer constructor

  // add metrics to producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return addMetrics(
      vanillaProducer.apply(this, arguments),
      client,
      'producer'
    );
  };

  // add metrics to admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return addMetrics(vanillaAdmin.apply(this, arguments), client, 'admin');
  };
}

module.exports = { metricize };
