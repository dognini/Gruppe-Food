import "../styles/pages/mausPedidos.css";

import { useEffect, useState } from "react";

import Header from "../layout/header/header";
import PedidosProps from "../interfaces/pedidoProps";
import CardMeusPedidos from "../components/card/cardMeusPedidos";

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState<PedidosProps[]>([])

    useEffect(() => {
        const localUser = localStorage.getItem('usuario')
        const userParse = localUser ? JSON.parse(localUser) : null

        setPedidos(userParse.pedidos)
    }, [])

    return (
        <main>
            <header>
                <Header titulo="Meus Pedidos" to="/" />
            </header>

            <main className="meus_pedidos_main">
                <h2> Histórico: </h2>

                {
                    pedidos.map((pedido) => (
                        <CardMeusPedidos key={pedido.id} dados={pedido} />
                    ))
                }

            </main>
        </main>
    )
}