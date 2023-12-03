const userSchema = require('../models/user.model');

module.exports.findOneClientService = async (path, ctxt) => {
    try {
        const result = await userSchema.findOne({ [path]: ctxt , role: 'user'});
        return result;
    } catch (error) {
        throw new Error(`Admin Service Error : not able to find user`);
    }
}