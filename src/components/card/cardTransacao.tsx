import "../../styles/components/card/cardListaTransacao.css";

const CardTransacao = () => {
    return (
        <div className="card_lista_transacao">
            <div className="card_lista_transacao_dados">
                <h1> Nome do restaurante: </h1>
                <p> Metodo de pagamento: </p>
                <p> Dia do pedido: </p>
            </div>

            <div className="card_lista_transacao_valor">
                <p> R$ 12,00 </p>
            </div>
        </div>
    )
}

export default CardTransacao;