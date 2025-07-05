const jwt = require('jsonwebtoken');
const redisclient = require('../utils/redisclient');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({
            message: 'Not authorized'
        });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const stored = await redisclient.get(token);
        if(!stored || stored!== decoded.id){
            return res.status(401).json({message: "Session expired or invalid"});
        }
        req.user = {id: decoded.id};
        next();
    }
    catch(err){
        res.status(401).json({
            message:'Token is invalid or expired'
        });
    }
};

module.exports = auth;