const express = require('express');
const cors = require('cors');
const PORT = 3000;

const db = require('./config/database');
const app = express();

//Middleware JSON e CORS
app.use(express.json());
app.use(cors());


app.get('/produtos/cardapio', function (req, res) {

  let ssql = "select c.descricao as categoria, p.* ";
  ssql += "from produto p ";
  ssql += "join produto_categoria c on (c.id_categoria = p.id_categoria) ";
  ssql += "order by c.ordem"

  db.query(ssql, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/pedidos', function (req, res) {
  
  
  let ssql = "insert into pedido(id_usuario, dt_pedido, vlr_subtotal, vlr_entrega, ";
  ssql+= "vlr_total, status) values(?, current_timestamp(), ?, ?, ?, 'A');";

  db.query(ssql,[req.body.id_usuario, req.body.vlr_subtotal,
                req.body.vlr_entrega, req.body.vlr_total,], function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).json({id_pedido: result.insertID});
    }
  });
  
});
app.get('/pedidos', function (req, res) {

  let ssql = "select p.id_pedido, p.status, ";
  ssql+= "date_format(p.dt_pedido, '%d/%m/%Y %H:%i:%s') as dt_pedido ,";
  ssql+= "p.vlr_total, count(*) as qtd_item ";
  ssql+= "from pedido p ";
  ssql+= "join pedido_item i on (i.id_pedido = p.id_pedido) ";
  ssql+= "group by p.id_pedido, p.status, p.dt_pedido, p.vlr_total;";
  

  db.query(ssql, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/pedidos/itens', function (req, res) {
/*
  let ssql = "select c.descricao as categoria, p.* ";
  ssql += "from produto p ";
  ssql += "join produto_categoria c on (c.id_categoria = p.id_categoria) ";
  ssql += "order by c.ordem"

  db.query(ssql, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
  */
});

app.put('/pedidos/status', function (req, res) {

  let ssql = "select c.descricao as categoria, p.* ";
  ssql += "from produto p ";
  ssql += "join produto_categoria c on (c.id_categoria = p.id_categoria) ";
  ssql += "order by c.ordem"

  db.query(ssql, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/configs', function (req, res) {
  let ssql = "select * from config";  
  db.query(ssql, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.listen(PORT, function () {
  console.log(`Servidor rodando na porta: ${PORT}.`);
});