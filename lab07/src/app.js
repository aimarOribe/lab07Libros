const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    res.status(404).render('404');
});

module.exports = app;