const userSchema = require('../models/user.model');

module.exports.addUserService = async (path, ctxt) => {
    try {
        let userInstance = new userSchema(ctxt);
        await userInstance.generateAuthToken();
        const result = await userInstance.save();
        return result;
    } catch (error) {
        console.log(`Admin Service Error : not able to create user : ${error}`)
    }
}

module.exports.findOneUserService = async (path, ctxt) => {
    try {
        const result = await userSchema.findOne({ [path]: ctxt });
        return result;
    } catch (error) {
        throw new Error(`Admin Service Error : not able to find user`);
    }
}

module.exports.updateUserService = async (path, ctxt) => {
    try {
        let { id } = ctxt.params;
        let userObj = ctxt.body;
        console.log('id => ', userObj);
        const result = await userSchema.findByIdAndUpdate(id, userObj, {new: true});
        console.log('id => ', result);
        return result;
    } catch (error) {
        throw new Error(`Admin Service Error : not able to update the user`);
    }
}

module.exports.deleteUserService = async (path, ctxt) => {
    try {
        const {id} = ctxt.params;
        const result = await userSchema.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new Error(`Admin Service Error : not able to deleting the user`);
    }
}

module.exports.findAllService = async (path, ctxt) => {
    try {
        const result = await userSchema.find({});
        return result;
    } catch (error) {
        throw new Error(`Admin Service Error : not able to retrieve users`);
    }
}