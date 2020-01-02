const route = require('express').Router()
const Cat = require('../database').Cat
const path=require('path')

route.get('/', (req, res) => {

  res.sendFile(path.join(__dirname,'../views/add_cat.html'))

})
route.get('/css',(req,res)=>{

  res.sendFile(path.join(__dirname,'../views/add_cat.css'))
  
})
route.post('/add', async (req, res) => {
  Cat.create({
    name:req.body.name,field:req.body.field,
    tag:req.body.tag,
  }).then((cat)=>{
    return res.send('1');
  }).catch((err)=>{
    return err;
  })
})
exports=module.exports =route