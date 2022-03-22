import './style.css';

function listarPedido(props) {
  return <div className='d-flex justify-content-between shadow-sm pedido'>
    <div>
      <span><b>Pedido #{props.id_pedido}</b></span>
      <span className='badge rouded-pill bg-secondary ms-3'>{props.dt_pedido}</span>
      <span className='badge rouded-pill bg-success ms-3'>{props.status}</span>
      <small className='d-block mt-1 text-secondary'>{props.nome} - {props.endereco}</small>

      {
        props.item.map(function (item) {
          return <div className='d-inline-block text-center me-4 mt-2' key={item.id_item}>
            <img src={item.url_foto} className='foto-item' alt="" />
            <small className='d-block text-secondary'>{item.qtd} x</small>
            <small className='d-block text-secondary'>{item.name}</small>
          </div>
        })
      }

    </div>

    <div className='d-flex align-items-center me-4'>
      <div className="dropdown">
        <a className="btn btn-secondary dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          Status
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a className="dropdown-item" href="/">Aguardando</a></li>
          <li><a className="dropdown-item" href="/">Em produção</a></li>
          <li><a className="dropdown-item" href="/">Saiu para entrega</a></li>
          <li><a className="dropdown-item" href="/">Finalizar</a></li>
        </ul>
      </div>
    </div>

  </div>


}

export default listarPedido;