const jwt = require('jsonwebtoken');

module.exports = function (req, res, next)
{
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token found');

    try{
        const decoded = jwt.verify(token, process.env.jwtKey);
        req.user = decoded;
        if(decoded.role != 'Admin') return res.status(403).send("You're not an admin");

        next();
 

    }
    catch(ex)
    {
        return res.status(400).send('Invalid Token Found');
    }
}