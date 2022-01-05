const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

class Users extends Model {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}
module.exports = Users;