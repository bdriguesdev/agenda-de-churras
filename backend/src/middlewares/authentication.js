const jwt = require('jsonwebtoken');

const isAuthorized = (request, response, next) => {
    const token = request.get('Authorization');
    if(!token) {
        request.isAuthorized = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
        if(!decodedToken.id || !decodedToken.email) {
            throw new Error("Token inválido.");
        }
    } catch (error) {
        request.isAuthorized = false;
        return next();
    }

    request.isAuthorized = decodedToken;
    return next();
};

module.exports = isAuthorized;