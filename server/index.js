const express = require('express');
const app = express();
// const test= require('./routes/test');
const menu = require('./routes/menu');
const area= require('./routes/area');
const upload = require('./routes/upload');
const user = require('./routes/user');
const login = require('./routes/login');
const main = require('./routes/main');
const getInfo = require('./routes/getInfo');
const product = require('./routes/product');
const overview = require('./routes/overview');

const validIsLogin= require('./middleware')
const bodyParser = require('body-parser');

app.use(express.static('data'))
app.use(bodyParser.json())
app.use('/api/login',login) //登录不需要验证token

app.use(validIsLogin)
// app.use('/api',test);
app.use('/api/main',main)
app.use('/api/menu',menu)
app.use('/api/area',area)
app.use('/api/upload',upload)
app.use('/api/user',user)
app.use('/api/getInfo',getInfo)
app.use('/api/product',product)
app.use('/api/overview',overview)

app.use((err,req,res,next)=>{
    console.info(err.stack);
    res.status('500').send('服务端出错了');
})

app.listen(3030, () => { console.log('服务器运行在3030端口') });