import CarteiraProps from "../../interfaces/carteiraProps";
import "../../styles/components/card/cardFormaPagamento.css";

interface CardCarteiraProps {
    item: CarteiraProps
}

const CardCarteira = ({ item }: CardCarteiraProps) => {
    return (
        <div className="card_forma_de_pagamento">
            <h1> {item.typeCard} </h1>

            <div>
                <h1> Pagamento: </h1>
                <p> {item.apelido} </p>
            </div>
        </div>
    )
}

export default CardCarteira;