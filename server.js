const express = require('express');
const session = require('express-session')
const SERVER_PORT=process.env.PORT || 3989
const path=require('path')
const app = express();

app.set('views', path.join(__dirname, 'views/'));
app.use((req, res, next) => {
    next()
})
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'something very very secret'
  }))
  
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', require('./routes/start'));
app.use('/home', require('./routes/root'));
app.use('/add_cat', require('./routes/add_cat'));
app.use('/add_prod', require('./routes/add_prod'));
app.use('/preview', require('./routes/preview'));
app.use('/view_cat', require('./routes/view_cat'));
app.use('/manage_prod', require('./routes/manageprod'));
app.use('/cart', require('./routes/cart'));

app.listen(SERVER_PORT, function () {
    console.log("Server started on http://localhost:3989/");
});
//taskkill/f /im node.exe