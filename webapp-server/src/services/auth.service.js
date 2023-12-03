const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const private_key = process.env.PRIVATE_KEY;

module.exports.comparePassword = async (userEnteredPass, passInDB) => {
    try {
        let flag = await bcrypt.compare(userEnteredPass, passInDB);
        return flag;
    } catch (error) {
        throw new Error(`${error}`);
    }
}