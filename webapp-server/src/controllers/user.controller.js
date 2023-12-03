module.exports.userController = {
    log_user: async (req, res, next) => {
        try {
            res.status(200).json({
                message: `log user`
            })
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }
}