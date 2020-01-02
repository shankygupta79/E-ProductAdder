const route = require('express').Router()
const Cat = require('../database').Cat
const QProd = require('../database').QProd
const Prod = require('../database').Prod
const path=require('path')
var cart=[]
route.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname,'../views/cart.html'))
})
route.post('/', (req, res) => {
  id=req.body.id;
  var bool=0;
  for(i=0;i<cart.length;i++){
      if(cart[i]==id){
        bool=1;
        break;
      }
  }
  if(!bool){cart.push(id);}
  return res.status(200).send('1');
})
route.post('/remove', (req, res) => {
  cart.splice( cart.indexOf(req.body.id), 1 );
  return res.status(200).send('1');
})



route.get('/css', (req, res) => {

  res.sendFile(path.join(__dirname,'../views/modal.css'))

})
route.get('/css2', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/cart.css'))
})
route.get('/incart', (req, res) => {
  
  res.status(200).send(cart);
})


module.exports = route