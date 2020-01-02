const route = require('express').Router()
const Cat = require('../database').Cat
const QProd = require('../database').QProd
const Prod = require('../database').Prod
const path=require('path')
var x=''
route.get('/', (req, res) => {

  res.sendFile(path.join(__dirname,'../views/add_prod.html'))

})
route.get('/css',(req,res)=>{

  res.sendFile(path.join(__dirname,'../views/add_prod.css'))
  
})
route.get('/catlist',(req,res)=>{
  Cat.findAll({attributes:['name']})
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
route.get('/info',(req,res)=>{
  if(req.query.ct!=undefined){
    x=req.query.ct;
  }
  Cat.findOne({where:{name:x}})
  .then((cat) => {
      res.status(200).send(cat)
  })
  .catch((err) => {
      console.log(err)
      res.status(500).send({
          error: "Could not retrive category"
      })
  })  
})
route.post('/qadd', async (req, res) => {
  QProd.create({
    name:req.body.name,
    category:req.body.category,company:req.body.company,
    mrp:req.body.mrp,
    price:req.body.price,
    img1:req.body.img1,
  }).then((qp)=>{
    return res.send('1');
  }).catch((err)=>{
    return err;
  })
})
route.post('/add', async (req, res) => {
  Prod.create({
    pnum:req.body.pnum,
    des:req.body.des,ades:req.body.ades,
    img2:req.body.img2,img3:req.body.img3,img4:req.body.img4,
    cod:req.body.cod,retrn:req.body.retrn,delivery:req.body.delivery,
    quantity:req.body.quantity,
  }).then((p)=>{
    return res.send('1');
  }).catch((err)=>{
    return err;
  })
})
route.post('/',(req,res)=>{
  x=req.body.category    
})

exports=module.exports =route