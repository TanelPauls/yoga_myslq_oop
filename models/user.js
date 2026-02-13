const BaseSqlModel = require('./base');

class UserModel extends BaseSqlModel {
    constructor() {
        super('users');
    }

}
module.exports = UserModel;