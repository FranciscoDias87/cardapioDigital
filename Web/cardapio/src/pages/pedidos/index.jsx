import Header from "../../components/Header";
import Listagem from "../../components/Pedido";

function Pedidos() {

  const pedidos = [
    {
    id_pedido: 524568,
    dt_pedido: "15/02/2020 19:00:01",
    status: "F",
    nome: 'Francisco',
    endereco: 'Rua Castro Alves, 190',
    itens:[
      {
        id_item: 1, 
        url_foto:'https://jornada-dev2.s3.amazonaws.com/xsalada.jpg', 
        name: 'X-tudo', 
        qtd: 1
      },
      {
        id_item: 2, 
        url_foto:'https://jornada-dev2.s3.amazonaws.com/xtudo.png', 
        name: 'X-burger', 
        qtd: 2
      }
    ]
  },
  {
    id_pedido: 524566,
    dt_pedido: "15/02/2020 19:10:01",
    status: "A",
    nome: 'Francisco',
    endereco: 'Rua Castro Alves, 190',
    itens:[
      {
        id_item: 1, 
        url_foto:'https://jornada-dev2.s3.amazonaws.com/xsalada.jpg', 
        name: 'X-tudo', 
        qtd: 1
      },
      {
        id_item: 2, 
        url_foto:'https://jornada-dev2.s3.amazonaws.com/xtudo.png', 
        name: 'X-burger', 
        qtd: 1
      }
    ]
  },
  {
    id_pedido: 524570,
    dt_pedido: "15/02/2020 19:20:01",
    status: "P",
    nome: 'Francisco',
    endereco: 'Rua Castro Alves, 190',
    itens:[
      {
        id_item: 1, 
        url_foto:'https://jornada-dev2.s3.amazonaws.com/xsalada.jpg', 
        name: 'X-salada', 
        qtd: 1
      },
      {
        id_item: 2, 
        url_foto:'https://jornada-dev2.s3.amazonaws.com/xtudo.png', 
        name: 'X-burger', 
        qtd: 1
      }
    ]
  }
];

  return <>
    <Header />
    <div className="container-fluid">
      <div className="m-3 mt-4 d-flex justify-content-between">
        <h2>Pedidos na Fila</h2>
        <button className="btn btn-lg btn-primary">Atualizar</button>
      </div>

      <div className="m-2 mt-4">
          {
            pedidos.map(function(item){
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