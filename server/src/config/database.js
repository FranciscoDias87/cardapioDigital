const mysql =  require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'cardapioDigital'
})

db.connect(function(err){
    const errorMensage = "Erro de conexão com o servidor, código: ";
    if(err){
        console.log(errorMensage, err.message);
    }
});

module.exports = db;