module.exports = {
  mongoConfig: {
    HOSTNAME: 'cluster0.hf6t2ov.mongodb.net',
    SCHEMA: 'mongodb+srv',
    USER: 'jorge',
    PASSWORD: process.env.MONGO_PASSWORD,
    DATABASE: 'ecommerce',
    OPTIONS: 'retryWrites=true&w=majority',
  },
};
