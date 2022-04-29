const controller = {};

controller.listar = (req, res)=> {
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM libro', (err, libros)=>{
            if(err){
                res.json(err);
            }
            res.render('index', {
                data: libros
            });
        });
    });
};

controller.agregar = (req, res)=> {
    res.render('new-entry');
}

controller.guardar = (req,res)=>{
    const data = req.body;
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO libro set ?', [data], (err, libro)=>{
            if(err){
                res.status(404).send("La entrada debe tener un titulo y un cuerpo");
                return;
            }
            res.redirect('/');
        })
    });
}

controller.eliminar = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('DELETE FROM libro WHERE id = ?', [id], (err, libro)=>{
            res.redirect('/');
        })
    });
}

module.exports = controller;