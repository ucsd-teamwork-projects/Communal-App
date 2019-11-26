require("dotenv").config();

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '901079',
    key: 'cd62b719442b1118e770',
    secret: process.env.PUSHER_SECRET,
    cluster: 'us3',
    useTLS: true
  });

module.exports = pusher;