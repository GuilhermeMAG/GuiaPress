const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const session = require('express-session');

const CategoriesController = require('./categories/CategoriesController');
const ArticlesController = require('./articles/ArticlesController');
const UsersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//View engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: "$2a$10$10vxuCdWhQQ6ND",
    cookie: {
        maxAge: 3000000000
    }
}));

//Redis


//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Database Conected!");
    }).catch((error) => {
        console.log(error);
    });

app.use('/', CategoriesController);
app.use('/', ArticlesController);
app.use('/', UsersController);

app.get('/session', (req, res) => {
    req.session.treinamento = "Formação Node.JS"
    req.session.ano = 2022
    req.session.email = "exemplo@exemplo.com"
    req.session.user = {
        username: "Gui",
        email: "exemplo@exemplo.com",
        id: 10
    }
    res.send("Seção gerada!")
});

app.get('/read', (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
});

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            [
                'id', 'DESC'
            ]
        ],
        limit: 5
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {
                articles: articles,
                categories: categories
            });
        });
    });
});

app.get('/admin', (req, res) => {
    Article.findAll({
        order: [
            [
                'id', 'DESC'
            ]
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('admin', {
                articles: articles,
                categories: categories
            });
        });
    });
});

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories })
            });
        } else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', { articles: category.articles, categories: categories })
            })
        } else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    })
});

app.listen(8080, () => {
    console.log(`Server started on http://localhost:${8080}`)
});