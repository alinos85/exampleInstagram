module.exports = {
    HOST: 'mysql',
    PORT: 3306,
    USER: 'root',
    PASSWORD: 'equipe5',
    DB: 'ugram',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};