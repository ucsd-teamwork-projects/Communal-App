const Pusher = require('pusher');

const pusher = new Pusher({
    appId: 'APP_ID',
    key: 'APP_KEY',
    secret: 'APP_SECRET',
    cluster: 'APP_CLUSTER',
    useTLS: true
  });

module.exports = pusher;