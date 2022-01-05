const jwt = require('jsonwebtoken');
// require('dotenv').config();

// console.log(process.env.SECRET_TOKEN);

//// Security for the jwt..
// const security = require('crypto').randomBytes(64).toString('hex');
// console.log(security);

authenticationToken = (data) => {
    const name = `${data.name}`;
    return jwt.sign(name, process.env.SECRET_TOKEN)
}

authorizationToken = (req, res, next) => {
    if(req.headers.cookie) {
        console.log(req.headers);
        const token = req.headers.cookie.split('=')[1];
        const decode = jwt.verify(token, process.env.SECRET_TOKEN);
        req.saved_token = decode;
        console.log('Token created.');
        next()
    }else{
        next(res.status(401).json({
            message: "Not yet Logged In!!"
        }))
        console.log('Token not found!!');
    }
}

logoutToken = (req, res, next) => {
    if (req.headers.cookie) {
        next(res.status(406).json({
            message: "Log Out first!!"
        }))
        console.log('Not logged out yet!!');
    } else {
        next()
    }
}

module.exports = { authenticationToken, authorizationToken, logoutToken}