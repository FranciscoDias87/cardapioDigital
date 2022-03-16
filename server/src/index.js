const express = require('express');
const cors = require('cors');
const { response } = require('express');
const PORT = 3000;

const app = express();

//Middleware JSON e CORS
app.use(express.json());
app.use(cors());


app.get('/produtos/cardapio', function(req, res){
   
    let ssql = "select c.descricao as categoria, p.* ";
    ssql += "from produto p ";
    ssql += "join produto_categoria c on (c.id_categoria = p.id_categoria) ";
    ssql += "order by c.ordem"
   
    res.status(200).json({id_produto: 100, detalhes: 'coca-cola'});
});


app.listen(PORT, function(){
    console.log(`Servidor rodando na porta: ${PORT}.`);
});