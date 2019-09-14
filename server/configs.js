export default {
  serverHost: 'localhost',
  serverPort: process.env.PORT || 3000,
  timezone: 'UTC',
  DB_URI: process.env.MONGOLAB_URI,
}
