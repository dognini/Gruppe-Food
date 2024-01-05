import "../../styles/components/card/cardCarteira.css";

import { Link } from "react-router-dom";

import CarteiraProps from "../../interfaces/carteiraProps";
interface CardCarteiraProps {
    item?: CarteiraProps
}

const CardCarteira = ({ item }: CardCarteiraProps) => {
    const cardClass = `card_forma_de_pagamento ${item?.favorito ? 'favorito' : ''}`

    return (
        <Link to={`/carteira/${item?.id}`} className={cardClass}>
            <span> {item?.typeCard} </span>

            <div>
                <span> Pagamento: </span>
                <p> {item?.apelido} </p>
            </div>
        </Link>
    )
}

export default CardCarteira;