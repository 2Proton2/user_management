const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ];
};

const loginValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json({ errors: errors.array() });
};

module.exports = {
    loginValidationRules,
    loginValidate,
};