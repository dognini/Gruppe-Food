import "../styles/pages/carrinho.css";

import { useEffect, useState } from "react";

import CardCarrinho from "../components/cardCarrinho";
import { PratosProps } from "../interfaces/restaurantesProps";

export default function Carrinho() {
    const [pedidos, setPedidos] = useState<PratosProps[]>([]);

    useEffect(() => {
        const getPedido = localStorage.getItem("pratos")

        if (getPedido) {
            setPedidos(JSON.parse(getPedido));
        }

    }, []);

    const calcularPrecoTotal = () => {
        if (pedidos.length > 0) {

            const precoTotal = pedidos.reduce((total, prato) => {
                const precoNumero = parseFloat(prato.preco.replace(",", "."));

                return total + precoNumero * (prato.quantidade);
            }, 0)

            return precoTotal.toFixed(2);
        }

        return "0.00";
    }

    const handleRemove = (index: number) => {
        const updatePedidos = [...pedidos]
        updatePedidos.splice(index, 1);

        setPedidos(updatePedidos)

        localStorage.setItem("pratos", JSON.stringify(updatePedidos));
    }

    const handleUpdateQuantity = (index: number, quantity: number) => {
        const updatePedidos = [...pedidos];

        updatePedidos[index] = {
            ...updatePedidos[index],
            quantidade: quantity
        };

        setPedidos(updatePedidos);

        localStorage.setItem("pratos", JSON.stringify(updatePedidos));
    }

    return (
        <section className="container">

            <div className="carrinho">

                <header>
                    <h1> Pedidos: </h1>
                </header>

                <main>
                    {pedidos.length > 0 ?
                        pedidos?.map((item, index) => (
                            <CardCarrinho
                                key={index}
                                dados={item}
                                onRemove={() => handleRemove(index)}
                                onUpdateQuantity={(quantity) => handleUpdateQuantity(index, quantity)}
                            />

                        ))
                        : <p>Sem pedidos...</p>}
                </main>

                <footer>
                    <h2> Total do Pedido: <span> {calcularPrecoTotal()} </span></h2>
                    <button> Finalizar Pedido </button>
                </footer>

            </div>

        </section>
    )
}