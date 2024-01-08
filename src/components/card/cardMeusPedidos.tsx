import "../../styles/components/card/cardMeusPedidos.css";

import { SlOptions } from "react-icons/sl";
import { GiFurnace } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { PiPersonSimpleBikeBold } from "react-icons/pi";

import PedidosProps from "../../interfaces/pedidoProps";
interface CardMeusPedidosProps {
    dados: PedidosProps
}

const CardMeusPedidos = ({ dados }: CardMeusPedidosProps) => {
    return (
        <main className="card_meus_pedidos_container">
            <h3> {dados.data} </h3>

            <section className="card_meus_pedidos">
                <header> {dados.restaurante} </header>

                <hr />

                <main>
                    {dados.status === 'Em Espera' && <p> <span> <SlOptions /> </span> {dados.status} </p>}
                    {dados.status === 'Em Produção' && <p> <span> <GiFurnace /> </span> {dados.status} </p>}
                    {dados.status === 'Pedido Enviado' && <p> <span> <PiPersonSimpleBikeBold /> </span> {dados.status} </p>}
                    {dados.status === 'Pedido Entregue' && <p> <span> <FaCheckCircle /> </span> {dados.status} </p>}

                    {dados?.pratos.map((prato) => (
                        <p key={prato.id}> <b> {prato.quantidade} </b> {prato.nome} </p>
                    ))}
                </main>
            </section>
        </main>
    )
}

export default CardMeusPedidos;