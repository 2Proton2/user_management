const {addUserService, updateUserService, deleteUserService, findOneUserService, findAllService} = require('../services/admin.service');


module.exports.adminController = {
    log_user: async (req, res, next) => {
        try {
            console.log(req)
            res.status(200).json({
                message: `log admin`
            })
        } catch (error) {
            res.status(500).json({
                message: `${error}`
            })
        }
    },
    add_user: async (req, res, next) => {
        try {
            let data = await addUserService(null, req.body);

            res.status(200).json({
                message: `add user`,
                result: data
            })
        } catch (error) {
            res.status(500).json({
                message: `${error}`
            })
        }
    },
    del_user: async (req, res, next) => {
        try {
            //First check id is present or not
            const userExistence = await findOneUserService('_id', req.params.id)

            if(userExistence) {
                let data = await deleteUserService(null, req);
                res.status(200).json({
                    message: `del user`,
                    result: data
                })
            }
            else{
                throw new Error(`User doesn't exist in the database`);
            }
        } catch (error) {
            res.status(500).json({
                message: `${error}`
            })
        }
    },
    get_all_user: async (req, res, next) => {
        try {
            const data = await findAllService(null, null);
            res.status(200).json({
                message: `get all user`,
                result: data
            })
        } catch (error) {
            res.status(500).json({
                message: `${error}`
            })
        }
    },
    update_user: async (req, res, next) => {
        try {
            //First check id is present or not
            const userExistence = await findOneUserService('_id', req.params.id)

            if(userExistence){
                let data = await updateUserService(null, req)
                res.status(200).json({
                    message: `update user`,
                    result: data
                })
            }
            else{
                throw new Error(`User doesn't exist in the database`);
            }
        } catch (error) {
            res.status(500).json({
                message: `${error}`
            })
        }
    },
}