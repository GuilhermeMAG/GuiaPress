const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/adminAuth');
const session = require('express-session');

router.get('/admin/users', adminAuth, (req, res) => {
    User.findAll({
        order: [
            [
                'id', 'DESC'
            ]
        ]
    }).then(user => {
        res.render('admin/users/index', {
            user: user
        });
    });
});

router.get('/admin/users/create', adminAuth, (req, res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
    var nickname = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                name: nickname,
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/admin/users');
            }).catch((err) => {
                res.redirect('/');
            });
        } else {
            res.redirect('/admin/users/create');
        }
    });
});

router.get('/login', (req, res) => {
    if (req.session.user != undefined) {
        res.render('admin');
    } else
        res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user != undefined) { //se existe um usuário com esse email
            //Validar senha
            var correct = bcrypt.compareSync(password, user.password);
            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin');
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

router.post('/users/delete', adminAuth, (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/users');
            });
        } else { //NOT NUMBER
            res.redirect('/admin/users');
        }
    } else { //NULL
        res.redirect('/admin/users');
    }
});

router.get('/admin/users/edit/:id', adminAuth, (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect('/admin/users');
    }
    User.findByPk(id).then(user => {
        if (user != undefined) {
            res.render('admin/users/edit', {
                user: user
            });
        } else {
            res.redirect('/admin/users');
        }
    }).catch(erro => {
        res.redirect('/admin/users');
    });
});

router.post('/users/update', adminAuth, (req, res) => {
    var id = req.body.id;
    var nickname = req.body.name;
    var password = req.body.password;


    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.update({
        name: nickname,
        password: hash
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/users');
    }).catch((err) => {
        res.redirect('/');
    });

});


module.exports = router;