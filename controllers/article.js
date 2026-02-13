const articleDbModel = require('../models/article.js');
const articleModel = new articleDbModel();

class articleController{
  constructor() {
    const articles = [];
  }

  async getAllArticles(req, res){
    const articles = await articleModel.findAll();
    res.status(201).json({articles: articles})
  }

  async getArticleBySlug(req,res){
    const article = await articleModel.findOne(req.params.slug);
    res.status(201).json({article: article})
  }

  async createNewArticle(req,res) {
    const newArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace('T', ' '),
      author_id: req.body.author_id
    }
    const articleId = await articleModel.create(newArticle)
    res.status(201).json({
      message: `created article with id ${articleId}`,
      article: {id: articleId, ...newArticle}
    })
  }

  async updateArticle(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id param is required" });
    }

    const updateArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace('T', ' '),
      author_id: req.body.author_id
    };

    const updated = await articleModel.update(id, updateArticle);

    if (!updated) {
      return res.status(404).json({ message: "article not found" });
    }

    res.status(200).json({
      message: `updated article with id ${id}`,
      article: { id }
    });
  }

  async deleteArticle(req, res) {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "id param is required" });
    }

    const deleted = await articleModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "article not found" });
    }

    res.status(200).json({
      message: `deleted article with id ${id}`,
      article: { id }
    });
  }

}

module.exports = articleController
