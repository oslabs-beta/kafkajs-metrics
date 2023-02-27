function metricize(admin) {
  // create empty metrics property on admin
  admin.metrics = {};
  // run functions to create metrics for admin instrumentation events

  return admin;
}

module.exports = metricize;
