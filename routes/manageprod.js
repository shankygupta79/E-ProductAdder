const route = require('express').Router()
const Cat = require('../database').Cat
const QProd = require('../database').QProd
const Prod = require('../database').Prod
const path=require('path')
var id=0;
route.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/manageprod.html'))
  id=req.query.id;
})

route.get('/css2', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/add_prod.css'))
})
route.get('/id',(req,res)=>{
  if(id==undefined){
    res.status(200).send('0');
  }else{
  Prod.findOne({where:{P_ID:id}})
  .then((pr) => {
    if(pr==null){
      var z=-1;
      res.status(200).send('null');  
    }else{
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
    })}
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({
        error: "Could not retrive product"
    })
  })
}
})
route.post('/qupdate',(req,res)=>{
  QProd.update(
      { 
        name:req.body.name,
        category:req.body.category,company:req.body.company,
        mrp:req.body.mrp,
        price:req.body.price,
        img1:req.body.img1,
      },
      {where: {P_ID: req.body.id} }
    ).then(function() {
      return res.send('1');
    }).catch( function(err){
      res.status(499).send({
         error: "Could not retrieve updations"
     })
  })
})
route.post('/update',(req,res)=>{
  Prod.update(
      { 
        pnum:req.body.pnum,
        des:req.body.des,ades:req.body.ades,
        img2:req.body.img2,img3:req.body.img3,img4:req.body.img4,
        cod:req.body.cod,retrn:req.body.retrn,delivery:req.body.delivery,
        quantity:req.body.quantity,
      },
      {where: {P_ID: req.body.id} }
    ).then(function() {
      return res.send('1');
    }).catch( function(err){
      res.status(499).send({
         error: "Could not retrieve updations"
     })
  })
})
route.post('/del',(req,res)=>{
  QProd.destroy({
      where: {P_ID:req.body.id}
   }).then(function(rowDeleted){ //returns Number of row deleted
       if(rowDeleted==1){
        Prod.destroy({
          where: {P_ID:req.body.id}
          }).then(function(rowDeleted){ //returns Number of row deleted
           if(rowDeleted==1){
              return
           }
          }).catch( function(err){
            res.status(499).send({
               error: "Could not retrieve deletions"
           })
          })
       }
      
   }).catch( function(err){
    res.status(499).send({
       error: "Could not retrieve deletion"
   })
  })
})
module.exports = route