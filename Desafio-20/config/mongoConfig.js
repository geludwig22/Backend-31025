const HOSTNAME = process.env.HOSTNAME;
const SCHEMA = process.env.SCHEMA;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const OPTIONS = process.env.OPTIONS;

const URI_CLOUD_CONNECTION = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`;
const URI_LOCAL_CONNECTION = `mongodb://localhost:27017/${DATABASE}`;

module.exports = {
  URI_CLOUD_CONNECTION,
  URI_LOCAL_CONNECTION,
};
