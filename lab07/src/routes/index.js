const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

const router = express.Router();

const json_books = fs.readFileSync('src/books.json','utf-8');
let books = JSON.parse(json_books);

router.get('/', (req,res)=>{
    res.render('index', {books});
});

router.get('/new-entry', (req,res)=>{
    res.render('new-entry');
});

router.post('/new-entry', (req,res)=>{
    const {title, author, image, description} = req.body;
    if(!title || !author || !image || !description){
        res.status(404).send("La entrada debe tener un titulo y un cuerpo");
        return;
    }

    var newBook = {
        id: uuid.v4(),
        title,
        author,
        image,
        description
    };

    books.push(newBook);

    const json_books = JSON.stringify(books);

    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/');

});

router.get('/delete/:id', (req,res)=>{
    console.log({books})
    books = books.filter(book => book.id != req.params.id);

    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json', json_books);
    res.redirect('/');
})

module.exports = router




