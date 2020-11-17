export default () => ({
    jswtSecret: process.env.JWT_SECRET,
    bcryptSalt: process.env.BCRYPT_SALT,
    jwtExpTimeAC: process.env.JWT_EXPIRES_IN,
    jwtTypeEC: process.env.JWT_TYPE_EC,
})