const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importando routes
const employeeRouter = require('./routes/employee');

//setting
app.set('port', process.env.PORT || 3200);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

//middlewares
app.use(morgan('dev'))
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'lab07mysql'
}, 'single'));
app.use(express.urlencoded({extended: false})); 

//routes
app.use('/', employeeRouter);

//error 404
app.use((req,res,next)=>{
    res.status(404).render('404');
});

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;