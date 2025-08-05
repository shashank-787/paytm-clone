const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')

function authMiddleware(req, res, next){
    try{    
        const payload = req.headers.authorization
        const [type, token] = payload.split(" ");
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
    }
    catch(err){
        return res.status(403).send(err)
    }
    next();
}

module.exports = {
    authMiddleware
}