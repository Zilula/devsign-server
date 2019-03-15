const jwt = require('express-jwt');
const jwkRsa = require('jwks-rsa');

module.exports = () => {
    return jwt({
        credentialsRequired: process.env.NODE_ENV !== 'test',
        secret: jwkRsa({
            cache: true,
            rateLimit: true,
            jwkRequestsPerMinute: 10,
            jwk: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
        }),
        audience: process.env.AUTH0_CLIENT_ID,
        issuer: `http://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    });
};