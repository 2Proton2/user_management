const { findOneUserService } = require('../services/admin.service');
const {findOneClientService} = require('../services/user.service');
const { comparePassword } = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const private_key = process.env.PRIVATE_KEY;

module.exports.auth_middleware = async (req, res, next) => {
    try {
        let userExistence;
        if(req.body.role == 'admin'){
            userExistence = await findOneUserService('email', req.body.email);
        }
        else if(req.body.role == 'user'){
            userExistence = await findOneClientService('email', req.body.email);
        }
        if(userExistence){
            let flag = await comparePassword(req.body.password, userExistence.password);
            if(flag){
                //generate the token
                const genToken = await userExistence.generateAuthToken();

                //set the cookie
                res.cookie("token", genToken, {
                    expires: new Date(Date.now() + 2592000000),
                    httponly: true
                });

                //pass userDetails to next middleware
                req.user = userExistence;
                next();
            }
            else {
                throw new Error(`Failed Authentication`)
            }
        }
        else{
            throw new Error(`Invalid Credential`);
        }
    } catch (error) {
        res.status(422).json({
            message: `${error}`
        })
    }
}

module.exports.session_middleware = async (req, res, next) => {
    try {
        const headerRawData = req.headers;
        let rawToken = headerRawData.cookie;

        if(rawToken){
            const token = rawToken.split('=')[1].trim();

            //is token authenticated with our application
            const tokenVerification = jwt.verify(token, process.env.PRIVATE_KEY);
            if(Date.now() > tokenVerification.exp){
                throw new Error("Session middleware : Authentication Failed");
            }

            if(tokenVerification){
                const result = await findOneUserService('_id', tokenVerification.id);

                if(result){
                    let userTokens = result.tokens;

                    //check token is present or not
                    let isTokenPresent = userTokens.some((index) => index.token === token);

                    if(!isTokenPresent){
                        throw new Error(`Session middleware : Authentication Failed`);
                    }
                    next();
                }
                else{
                    throw new Error(`Session middleware : Can't find the user`);
                }
            }
            else{
                throw new Error(`Session middleware : Invalid Credentials`)
            }
        }
        else{
            throw new Error(``)
        }
    } catch (error) {
        res.status(403).json({
            message: `${error}`
        })
    }    
}