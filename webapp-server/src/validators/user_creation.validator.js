const { body, validationResult } = require('express-validator');

const createUserValidationRules = () => {
    return [
        body('email').isEmail(),
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('password').isLength({ min: 6 }),
    ];
};

const createUservalidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json({ 
        message: `Error in validation`,
        error: errors.array()
    });
};

module.exports = {
    createUserValidationRules,
    createUservalidate,
};