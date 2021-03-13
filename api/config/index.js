var config = require('./config');

module.exports = {
    getDbConnectionStr: () => {
        return `mongodb://${config.HOST}:${config.PORT}/${config.APPNAME}`;
    },
    getJWTSecretKey: () => {
        return config.JWTSECRETKEY;
    },
    getJWTRefreshKey: () => {
        return config.JWTREFRESHKEY;
    }
};