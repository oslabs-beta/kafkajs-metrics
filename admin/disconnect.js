function disconnect(admin, client) {
  // each time admin.connect fires:
  admin.on('admin.disconnect', () => {
    // if not currently disconnected, decrement totalAdmins on client
    if (admin.metrics.isConnected) client.metrics.totalAdmins -= 1;
    // set isConnected to true
    admin.metrics.isConnected = false;
  });
}

module.exports = disconnect;
