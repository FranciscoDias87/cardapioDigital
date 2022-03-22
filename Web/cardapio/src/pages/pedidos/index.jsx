import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Listagem from "../../components/Pedido";
import api from "../../services/api";

function Pedidos() {

  //const pedidos = [];
  const [pedidos, setPedidos] = useState([]);

  function ListarPedidos() {

    api.get("pedidos/itens")
      .then(function (resp) {
        //console.log(resp.data);
        setPedidos(resp.data);

      }).catch(function (err) {
        console.log(err);

      })
  }

  useEffect(function () {
    ListarPedidos();
  }, []);

  //useEffect(() => ListarPedidos(), []);

  return <>
    <Header />
    <div className="container-fluid">
      <div className="m-3 mt-4 d-flex justify-content-between">
        <h2>Pedidos na Fila</h2>
        <button className="btn btn-lg btn-primary">Atualizar</button>
      </div>

      <div className="m-2 mt-4">
        {
          pedidos.map(function (item) {
            return <Listagem
              key={item.id_pedido}
              id_pedido={item.id_pedido}
              dt_pedido={item.dt_pedido}
              status={item.status}
              nome={item.nome}
              endereco={item.endereco}
              item={item.itens}
            />

          })
        }

      </div>
    </div>
  </>
}

export default Pedidos;