const BaseSqlModel = require('./base');

class AuthorModel extends BaseSqlModel {
    constructor() {
        super('article');
    }

    async findAll() {
        const articles = await super.findAll();
        return articles
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }
}
module.exports = ArticleModel;