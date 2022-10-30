const sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

//Uma categoria tem muitos artigos
Category.hasMany(Article);
//Um artigo pertence a uma categoria
Article.belongsTo(Category);

module.exports = Article;