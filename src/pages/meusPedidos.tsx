import "../styles/pages/mausPedidos.css";

import Header from "../layout/header/header";
import CardMeusPedidos from "../components/card/cardMeusPedidos";

export default function MeusPedidos() {
    return (
        <main>
            <header>
                <Header titulo="Meus Pedidos" to="/" />
            </header>

            <main className="meus_pedidos_main">
                <h2> Histórico: </h2>

                <CardMeusPedidos />
            </main>
        </main>
    )
}