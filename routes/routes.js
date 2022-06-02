const { renderFile } = require('ejs');
const express = require('express')
const router = express.Router();
const User = require('../models/users')


// insert the user in the database

router.post('/add', (req, res) => {
    const newUser = new User({
        name: req.body.user_name,
        email: req.body.user_email,
        phone: req.body.user_phone,
    })

    newUser.save((err) => {
        if (err)
            res.json({ message: err.message, type: 'danger' })
        else {
            req.session.message = {
                type: 'success',
                message: 'user added succesfuly!'
            };
            res.redirect('/')
        }
    })
})

// get all users routes

router.get('/', (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            res.render('index', {
                title: 'Homepage',
                users: users,
            })
        }
    })
})
router.get('/users', (req, res) => {
    res.render('index', { title: 'Homepage' })
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: "Add users" });
})

//edit user route

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.redirect('/')
        } else {
            if (user == null) {
                res.redirect('/');
            } else {
                res.render('edit_users', {
                    title: 'Edit user',
                    user: user,
                })
            }
        }
    })
})

// update user routes

router.post('/update/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, {
        name: req.body.user_name,
        email: req.body.user_email,
        phone: req.body.user_phone,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: 'user updated succesfully',
            };
            res.redirect('/')
        }
    })




})

//delete user routes

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, result) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            req.session.message = {
                type: 'info',
                message: 'User Deleted Succesfully!'
            }
            res.redirect('/')
        }
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', { title: "contact us" });
})

module.exports = router;