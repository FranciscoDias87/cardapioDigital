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
      return res.status(500).send(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

app.post('/pedidos', function (req, res) {

  db.beginTransaction(function (err) {

    let ssql = "insert into pedido(id_usuario, dt_pedido, vlr_subtotal, vlr_entrega, ";
    ssql += "vlr_total, status) values(?, current_timestamp(), ?, ?, ?, 'A')";

    db.query(ssql, [req.body.id_usuario, req.body.vlr_subtotal,
    req.body.vlr_entrega, req.body.vlr_total,], function (err, result) {

      if (err) {
        db.rollback();
        res.send(500).json(err);
      } else {
        var id_pedido = result.insertId;

        if (id_pedido > 0) {
          const itens = req.body.itens;
          var values = [];

          for (var i = 0; i < itens.length; i++) {
            values.push([id_pedido, itens[i].id_produto, itens[i].qtd, itens[i].vlr_unitario, itens[i].vlr_total]);
          }

          ssql = "insert into pedido_item(id_pedido, id_produto, qtd, vlr_unitario, "
          ssql += "vlr_total) values ?";

          db.query(ssql, [values], function (err, result) {
            if (err) {
              db.rollback();
              res.status(500).json(err);
            } else {
              db.commit();
              res.status(201).json({ id_pedido: id_pedido });
            }

          });
        }
      }
    });
  });

});

app.get('/pedidos', function (req, res) {

  let ssql = "select p.id_pedido, p.status, ";
  ssql += "date_format(p.dt_pedido, '%d/%m/%Y %H:%i:%s') as dt_pedido, ";
  ssql += "p.vlr_total, count(*) as qtd_item ";
  ssql += "from pedido p ";
  ssql += "join pedido_item i on (i.id_pedido = p.id_pedido) ";
  ssql += "group by p.id_pedido, p.status, p.dt_pedido, p.vlr_total;";


  db.query(ssql, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

app.get('/pedidos/itens', function (req, res) {
  let ssql = "select p.id_pedido, date_format(p.dt_pedido, '%d/%m/%Y %H:%i:%s') as ";
  ssql += "dt_pedido, p.status, u.nome as nome_usuario, u.endereco, i.id_item, o.nome, ";
  ssql += "o.url_foto, i.qtd ";
  ssql += "from pedido p ";
  ssql += "join usuario u on (u.id_usuario = p.id_usuario) ";
  ssql += "join pedido_item i on (i.id_pedido = p.id_pedido) ";
  ssql += "join produto o on(o.id_produto = i.id_produto) ";
  ssql += "where p.status <> 'F' ";
  ssql += "order by p.dt_pedido ";


  db.query(ssql, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else {

      let id_pedidos = []; //[1000, 1001, 1002]
      let pedidos = []; // {[id_pedido: 1000, itens...], [id_pedido: 1001, itens...]}
      let itens = [];

      //Montar array unico com todos os pedidos
      result.map((ped) => {
        if (id_pedidos.lastIndexOf(ped.id_pedido) < 0) {
          id_pedidos.push(ped.id_pedido);

          pedidos.push({
            id_pedido: ped.id_pedido,
            dt_pedido: ped.dt_pedido,
            status: ped.status,
            nome: ped.nome_usuario,
            endereco: ped.endereco,
            itens: []
          });
        }
      });

      //Percorrer array ITENS inserinto os itens
      pedidos.map((ped) => {
        itens = [];

        result.map((pedResult) => {
          if (pedResult.id_pedido == ped.id_pedido) {
            itens.push({
              id_item: pedResult.id_item,
              url_foto: pedResult.url_foto,
              name: pedResult.nome,
              qtd: pedResult.qtd
            });
          }
        });

        ped.itens = itens;

      });

      return res.status(200).json(pedidos);
    }
  });
});

app.put('/pedidos/status/:id_pedido', function (req, res) {

  let ssql = "update pedido set status = ? where id_pedido = ?";

  db.query(ssql, [req.body.status, req.params.id_pedido], function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).json({ id_pedido: req.params.id_pedido });
    }
  });
});

app.get('/configs', function (req, res) {
  let ssql = "select * from config";
  db.query(ssql, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).json(result[0]);
    }
  });
});

app.listen(PORT, function () {
  console.log(`Servidor rodando na porta: ${PORT}.`);
});