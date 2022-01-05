require('dotenv').config()

const { CLIENT, DATABASE, DB_USER, PASSWORD, HOST, PG_PORT } = process.env

console.log(CLIENT, DB_USER, "HELLO ENV")

module.exports = {
    development: {
        client: CLIENT,
        connection: {
            database: DATABASE,
            user: DB_USER,
            password: PASSWORD,
            host: HOST,
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        },
    },
}
