const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const { logger } = require('./config/logger_service/logger.config');
const cors = require('cors');
const { corsObj } = require('./config/web_config/web.config');

/**
 * middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsObj));

/**
 * database connection
 */
require('./config/database_config/database.config');

/**
 * Routes
 */
app.use('/user', require('./routes/user.route'));
app.use('/admin', require('./routes/admin.route'));

/**
 * Server Listening at
 */
const server = app.listen(PORT, () => {
    logger.info(`Webapp-server listening at PORT : [${PORT}]. Navigate to http://localhost:${PORT}/ `);
})

/**
 * closing the connection manually
 */
process.on('SIGINT', () => {
    server.close(async () => {
        try {
            logger.info(`Webapp-server shutting down.`)
            await mongoose.connection.close();
            logger.info(`Database connection closed`);
            process.exit(0);
        } catch (error) {
            logger.error(`Error occured while closing the database : ${error}`);
            
        }
    })
})

/**
 * server crashed due to some error
 */
process.on('SIGTERM', () => {
    server.close(async () => {
        try {
            logger.info(`Webapp-server forcefully closed due to some error.`);
            await mongoose.connection.close();
            logger.info(`Database connection closed`);
            process.exit(0);
        } catch (error) {
            logger.error(`Error occured while closing the database : ${error}`);
        }
    })
})