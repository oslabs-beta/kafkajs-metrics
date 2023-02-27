function connect(admin, client) {
  // each time admin.connect fires:
  admin.on('admin.connect', () => {
    // if not currently connected, increment totalAdmins on client
    if (!admin.metrics.isConnected) client.metrics.totalAdmins += 1;
    // set isConnected to true
    admin.metrics.isConnected = true;
  });
}

module.exports = connect;
