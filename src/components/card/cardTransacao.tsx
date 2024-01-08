import "../../styles/components/card/cardListaTransacao.css";

import PedidosProps from "../../interfaces/pedidoProps";

interface CardTransacaoProps {
    item: PedidosProps
}

const CardTransacao = ({ item }: CardTransacaoProps) => {
    return (
        <div className="card_lista_transacao">
            <div className="card_lista_transacao_dados">
                <h1> {item.restaurante} </h1>
                <p> {item.metodoPagamento} </p>
                <p> {item.data} </p>
            </div>

            <div className="card_lista_transacao_valor">
                <p> R$: {item.valor},00 </p>
            </div>
        </div>
    )
}

export default CardTransacao;