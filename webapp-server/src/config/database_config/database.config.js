const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;
const database = mongoose.connection;
const { logger } = require('../logger_service/logger.config')

mongoose.connect(url)
.then(() => {
    logger.info(`Handshake with database done successfully`);
})
.catch((err) => {
    logger.error(`Database is upset. Here is the error message : ${err}`)
});

database.on('error', (err) => {
    logger.error(`${err}`)
})

database.once('open', () => {
    logger.info(`Initial Handshake with database done successfully`);
});