import '../../styles/components/card/cardRestaurants.css';

import { Link } from 'react-router-dom';

import RestaurantesProps from "../../interfaces/restaurantesProps";

interface CardRestaurantsProps {
    dados: RestaurantesProps
}

const CardRestaurants = ({ dados }: CardRestaurantsProps) => {
    return (

        <div className="card">
            <Link to={`/restaurant/${dados.id}`}>
                <section className="card-imagem">
                    <img src={dados.imagem} alt={`Logo do restaurante ${dados.nome}`} />
                </section>

                <section className="card-restaurante">
                    <h2> {dados.nome} </h2>
                    <p> {dados.tipo} </p>
                </section>

                <section className="card-delivery-time">
                    <p> {dados.deliveryTime}min </p>
                    <p> R$:{dados.frete},00 </p>
                </section>
            </Link>
        </div >

    )
}

export default CardRestaurants;