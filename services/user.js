const Users = require('../models/user');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

module.exports = class UserService {
    async findAll() {
        const users = await Users.query();
        console.log(users, "txn users")
        return users;
    }

    async createUsers(details) {
        const pass = await bcrypt.hash(details.password, 10)
        details['password'] = `${pass}`
        await Users.query().insert(details);
        return 'Successfully signed up.'
    }

    async accChecking(userInfo) {
        const userDetails = await Users.query().findOne({
            email: userInfo.email
        })
        if(userDetails) {
            // always remeber that compare takes real pass and incrypted pass.
            return await bcrypt.compare( userInfo.password, userDetails.password)
        }
        return false;
    }

    async findById(userId) {
        const id = await Users.query().findById(userId);
        console.log(id, "ser id");
        return id;
    }

}