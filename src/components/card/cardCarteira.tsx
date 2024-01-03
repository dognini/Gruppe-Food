import "../../styles/components/card/cardCarteira.css";

import { Link } from "react-router-dom";

import CarteiraProps from "../../interfaces/carteiraProps";
interface CardCarteiraProps {
    item: CarteiraProps
}

const CardCarteira = ({ item }: CardCarteiraProps) => {
    const cardClass = `card_forma_de_pagamento ${item.favorito ? 'favorito' : ''}`

    return (
        <Link to={`/carteira/${item.id}`} className={cardClass}>
            <h1> {item.typeCard} </h1>

            <div>
                <h1> Pagamento: </h1>
                <p> {item.apelido} </p>
            </div>
        </Link>
    )
}

export default CardCarteira;