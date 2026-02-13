const BaseSqlModel = require('./base');

class UserModel extends BaseSqlModel {
    constructor() {
        super('users');
    }

    async findByUsername(username) {
        return await super.findOne('username', username);
    }

    async findByEmail(email) {
        return await super.findOne('email', email);
    }

}
module.exports = UserModel;