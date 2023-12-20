import "../styles/components/cardCarrinho.css";

import { LuPlus } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";
import { PratosProps } from "../interfaces/restaurantesProps";
import { useState } from "react";

interface CardCarrinhoProps {
    dados: PratosProps
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
}

const CardCarrinho = ({ dados, onRemove, onUpdateQuantity }: CardCarrinhoProps) => {
    const [quantityOrders, setQuantityOrders] = useState(dados.quantidade);

    const addQuantity = () => {
        setQuantityOrders((prevState) => prevState + 1);
        onUpdateQuantity(quantityOrders + 1);
    }

    return (
        <div className="card-carrinho">
            <img src={`${dados.img}`} />
            <span> Nome: <p> {dados.nome} </p> </span>
            <span> Valor: <p> R$:{dados.preco},00 </p> </span>

            <section>
                <button onClick={onRemove}> <AiFillDelete /> </button>
                <p> {quantityOrders} </p>
                <button onClick={addQuantity}> <LuPlus /> </button>
            </section>
        </div>
    )
}

export default CardCarrinho;