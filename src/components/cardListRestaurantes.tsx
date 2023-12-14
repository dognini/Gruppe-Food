import "../styles/components/cardListRestaurantes.css";

import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import RestaurantesProps from "../interfaces/restaurantesProps";
import { Link } from "react-router-dom";

interface CardListRestaurantesProps {
    item: RestaurantesProps
}

const CardListRestaurantes = ({ item }: CardListRestaurantesProps) => {
    return (
        <div className="div-card">

            <img src={item.imagem} alt={`Imagem do restaurante ${item.nome}`} />

            <p> Nome: <span> {item.nome} </span> </p>
            <p> CNPJ: <span> {item.cnpj} </span> </p>
            <p> Tempo de Entrega: <span> {item.deliveryTime}min </span> </p>
            <p> Frete: <span> R$: {item.frete},00 </span> </p>

            <section>
                <button> <FaEye /> </button>
                <button> <Link to={`/edit-restaurant/${item.id}`}> <MdEdit /> </Link> </button>
                <button> <MdDelete /> </button>
            </section>

        </div>
    )
}

export default CardListRestaurantes;