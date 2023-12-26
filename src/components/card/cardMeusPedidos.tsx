import "../../styles/components/card/cardMeusPedidos.css";

const CardMeusPedidos = () => {
    return (
        <main className="card_meus_pedidos_container">
            <h3> Data </h3>

            <section className="card_meus_pedidos">
                <header> <img src="#" alt="foto do restaurante" /> Restaurante </header>

                <hr />

                <main>
                    <p> [] Pedido Concluído </p>
                    <p> <span> quantidade: </span> Nome do pedido </p>
                </main>
            </section>
        </main>
    )
}

export default CardMeusPedidos;