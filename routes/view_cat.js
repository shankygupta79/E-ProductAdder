const route = require('express').Router()
const Cat = require('../database').Cat
const QProd = require('../database').QProd
const Prod = require('../database').Prod
const path=require('path')
route.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/view_cat.html'))
})
route.get('/css', (req, res) => {

  res.sendFile(path.join(__dirname,'../views/modal.css'))

})
route.get('/css2', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/view_cat.css'))
})
route.get('/catlist',(req,res)=>{
    Cat.findAll()
    .then((cat) => {
        res.status(200).send(cat)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send({
            error: "Could not retrive Category"
        })
    })  
})

module.exports = route