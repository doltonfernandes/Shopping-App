const express = require('express');
// Initialize app
const router = express.Router();
// Load models
const Userr = require('../models/Userr');
const Product = require('../models/Product');
const Order = require('../models/Order');

// GET ALL users
router.get('/users', function(req, res){
    let users = User.find({}, function(err, users){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else {
            res.json(users);
        }
    })
})

// GET SINGLE user
router.get('/users/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        res.json(user);
    });
});

// ADD user
router.post('/users/add', function (req, res) {

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.job = req.body.job;
    user.company = req.body.company;
    user.age = req.body.age;
    user.city = req.body.city;

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else{
            res.json(user)
        }
    });
});

// UPDATE user
router.post('/users/update/:id', function (req, res) {

    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.job = req.body.job;
            user.company = req.body.company;
            user.age = req.body.age;
            user.city = req.body.city;
    
            user.save().then(user => {
                res.json({msg: "success"})
            })
            .catch(err => {
                res.json({msg: "falied"});
            });
        }
    });
});

// DELETE user
router.post('/users/delete/:id', function (req, res) {
    let query = { _id: req.params.id }

    User.findByIdAndDelete(query, function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
            return;
        }
        else{
            res.json({msg: "success"})
        }
    });
});

// GET ALL users
router.get('/userr', function(req, res){
    let users = Userr.find({}, function(err, users){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else {
            res.json(users);
        }
    })
})

// GET SINGLE user
router.get('/userr/:id', function(req, res){
    Userr.findById(req.params.id, function(err, user){
        res.json(user);
    });
});

// ADD user
router.post('/userr/add', function (req, res) {

    let user = new Userr();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.type = req.body.type;
    user.phone = req.body.phone;
    user.rating = req.body.rating;

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else{
            res.json(user)
        }
    });
});

// UPDATE user
router.post('/userr/update/:id', function (req, res) {

    Userr.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.type = req.body.type;
            user.phone = req.body.phone;
            user.rating = req.body.rating;
    
            user.save().then(user => {
                res.json({msg: "success"})
            })
            .catch(err => {
                res.json({msg: "falied"});
            });
        }
    });
});

// DELETE user
router.post('/userr/delete/:id', function (req, res) {
    let query = { _id: req.params.id }

    Userr.findByIdAndDelete(query, function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
            return;
        }
        else{
            res.json({msg: "success"})
        }
    });
});

// GET ALL users
router.get('/product', function(req, res){
    let users = Product.find({}, function(err, users){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else {
            res.json(users);
        }
    })
})

// GET SINGLE user
router.get('/product/:id', function(req, res){
    Product.findById(req.params.id, function(err, user){
        res.json(user);
    });
});

// ADD user
router.post('/product/add', function (req, res) {

    let user = new Product();
    user.name = req.body.name;
    user.qty = req.body.qty;
    user.ordered = req.body.ordered;
    user.price = req.body.price;
    user.owner = req.body.owner;
    user.status = req.body.status;
    user.image = req.body.image;

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else{
            res.json(user)
        }
    });
});

// UPDATE user
router.post('/product/update/:id', function (req, res) {

    Product.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            user.name = req.body.name;
            user.qty = req.body.qty;
            user.ordered = req.body.ordered;
            user.price = req.body.price;
            user.owner = req.body.owner;
            user.status = req.body.status;
            user.image = req.body.image;
    
            user.save().then(user => {
                res.json({msg: "success"})
            })
            .catch(err => {
                res.json({msg: "falied"});
            });
        }
    });
});

// DELETE user
router.post('/product/delete/:id', function (req, res) {
    let query = { _id: req.params.id }

    Product.findByIdAndDelete(query, function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
            return;
        }
        else{
            res.json({msg: "success"})
        }
    });
});

// GET ALL users
router.get('/order', function(req, res){
    let users = Order.find({}, function(err, users){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else {
            res.json(users);
        }
    })
})

// GET SINGLE user
router.get('/order/:id', function(req, res){
    Order.findById(req.params.id, function(err, user){
        res.json(user);
    });
});

// ADD user
router.post('/order/add', function (req, res) {

    let user = new Order();
    user.name = req.body.name;
    user.qty = req.body.qty;
    user.status = req.body.status;
    user.id_of_prod = req.body.id_of_prod;
    user.name_of_customer = req.body.name_of_customer;
    user.rated = req.body.rated;

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else{
            res.json(user)
        }
    });
});

// UPDATE user
router.post('/order/update/:id', function (req, res) {

    Order.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            user.name = req.body.name;
            user.qty = req.body.qty;
            user.status = req.body.status;
            user.id_of_prod = req.body.id_of_prod;
            user.name_of_customer = req.body.name_of_customer;
            user.rated = req.body.rated;

            user.save().then(user => {
                res.json({msg: "success"})
            })
            .catch(err => {
                res.json({msg: "falied"});
            });
        }
    });
});

// DELETE user
router.post('/order/delete/:id', function (req, res) {
    let query = { _id: req.params.id }

    Order.findByIdAndDelete(query, function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
            return;
        }
        else{
            res.json({msg: "success"})
        }
    });
});

module.exports = router;