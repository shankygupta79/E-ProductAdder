const route = require('express').Router()

route.get('/', (req, res) => {

    res.redirect('https://e-prod-adder.herokuapp.com/home')


})

module.exports = route