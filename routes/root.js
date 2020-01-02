const route = require('express').Router()
const Cat = require('../database').Cat
const QProd = require('../database').QProd
const Prod = require('../database').Prod
const path=require('path')
var cate=undefined;
route.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/root.html'))
  cate=req.query.cate;
})
route.get('/css', (req, res) => {

  res.sendFile(path.join(__dirname,'../views/modal.css'))

})
route.get('/css2', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/root.css'))
})
route.get('/names',(req,res)=>{
  QProd.findAll({attributes: ['name','P_ID']})
  .then((qp) => {
      res.status(200).send(qp)
  })
  .catch((err) => {
      console.log(err)
      res.status(500).send({
          error: "Could not retrive products"
      })
  })  
})
route.get('/qprod',(req,res)=>{
  if(cate==undefined){
  QProd.findAll()
  .then((qp) => {
      res.status(200).send(qp)
  })
  .catch((err) => {
      console.log(err)
      res.status(500).send({
          error: "Could not retrive products"
      })
  })}else{
    QProd.findAll({where:{category:cate}})
  .then((qp) => {
      res.status(200).send(qp)
  })
  .catch((err) => {
      console.log(err)
      res.status(500).send({
          error: "Could not retrive products"
      })
  })
  }  
})
module.exports = route