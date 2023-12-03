const {addUserService, updateUserService, deleteUserService, findOneUserService, findAllService} = require('../services/admin.service');


module.exports.adminController = {
    log_user: async (req, res, next) => {
        try {
            res.status(200).json({
                message: `User successfully logged in`,
                result: req.user
            })
        } catch (error) {
            res.status(401).json({
                message: `${error}`
            })
        }
    },
    add_user: async (req, res, next) => {
        try {
            let data = await addUserService(null, req.body);

            res.status(201).json({
                message: `User added successfully`,
                result: data
            })
        } catch (error) {
            res.status(422).json({
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
                res.status(204).json({
                    message: `Deleted user successfully`,
                    result: data
                })
            }
            else{
                throw new Error(`User doesn't exist in the database`);
            }
        } catch (error) {
            res.status(404).json({
                message: `${error}`
            })
        }
    },
    get_all_user: async (req, res, next) => {
        try {
            const data = await findAllService(null, null);
            res.status(200).json({
                message: `Successfully retrieved all users data`,
                result: data
            })
        } catch (error) {
            res.status(404).json({
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
                    message: `Updated the user details successfully`,
                    result: data
                })
            }
            else{
                throw new Error(`User doesn't exist in the database`);
            }
        } catch (error) {
            res.status(404).json({
                message: `${error}`
            })
        }
    },
    logout_user: async (req, res, next) => {
        try {
            //delete the cookie from the browser
            res.cookie('token', "", {expires: new Date(0)})
            
            res.status(200).json({
                message: `User successfully logged out`
            });
        } catch (error) {
            res.status().json({
                message: `${error}`
            });
        }
    }
}