const route = require('express').Router()
const Cat = require('../database').Cat
const QProd = require('../database').QProd
const Prod = require('../database').Prod
const path=require('path')

var id=0;
var ct='';
route.get('/', (req, res) => {
  id=req.query.id;
  res.sendFile(path.join(__dirname,'../views/preview.html'))
  
})
route.get('/id',(req,res)=>{
  Prod.findOne({where:{P_ID:id}})
  .then((pr) => {
    QProd.findOne({where:{P_ID:id}})
    .then((qp) => {
        ct=qp.category
        res.status(200).send([qp,pr])
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send({
            error: "Could not retrive product"
        })
    })
  })
  .catch((err) => {
      console.log(err)
      res.status(500).send({
          error: "Could not retrive product"
      })
  }) 
  
})
route.get('/css',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/preview.css'))
})
route.get('/cod',(req,res)=>{
  res.sendFile(path.join(__dirname,'../cod.png'))
})
route.get('/retrn',(req,res)=>{
  res.sendFile(path.join(__dirname,'../return.jpg'))
})

route.get('/magicjs',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/magiczoomplus.js'))
})
route.get('/magic',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/magiczoomplus.css'))
})
route.get('/noretrn',(req,res)=>{
  res.sendFile(path.join(__dirname,'../noreturn.jpg'))
})
route.get('/delivery',(req,res)=>{
  res.sendFile(path.join(__dirname,'../delivery.png'))
})
route.get('/cat',(req,res)=>{
  ct=req.query.ct;
  Cat.findOne({where:{name:ct}})
    .then((ct) => {
        res.status(200).send(ct)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrive product"
        })
    })
})
route.get('/recommended',(req,res)=>{
  ct=req.query.ct;
  id=req.query.id;
  QProd.findAll({where:{category:ct}},{limit:5},)
    .then((ct) => {
        res.status(200).send(ct)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrive product"
        })
    })
})
exports=module.exports =route