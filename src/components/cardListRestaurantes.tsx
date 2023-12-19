import "../styles/components/cardList.css";

import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CNPJMask } from "../layout/mask";
import { MdDelete, MdEdit } from "react-icons/md";
import RestaurantesProps from "../interfaces/restaurantesProps";

interface CardListRestaurantesProps {
    item: RestaurantesProps
    remove: (id: number) => void;
}

const CardListRestaurantes = ({ item, remove }: CardListRestaurantesProps) => {
    return (
        <div className="container-card">

            <img src={item.imagem} alt={`Imagem do restaurante ${item.nome}`} />

            <p> Nome: <span> {item.nome} </span> </p>
            <p> CNPJ: <span> {CNPJMask(item.cnpj)} </span> </p>
            <p> Tempo de Entrega: <span> {item.deliveryTime}min </span> </p>
            <p> Frete: <span> R$: {item.frete},00 </span> </p>

            <section>
                <button> <Link to={`/view-restaurant/${item.id}`}> <FaEye /> </Link> </button>
                <button> <Link to={`/edit-restaurant/${item.id}`}> <MdEdit /> </Link> </button>
                <button onClick={() => remove(item.id)} > <MdDelete /> </button>
            </section>

        </div>
    )
}

export default CardListRestaurantes;