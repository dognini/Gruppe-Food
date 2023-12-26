import Button from "../components/form/button";
import Header from "../layout/header/header";

export default function Carteira() {
    return (
        <section>
            <header>
                <Header titulo="Carteira" to="/" />
            </header>

            <section className="section_formas_de_pagamento">
                <header>
                    <h2> Formas de Pagamento: </h2>
                    <Button> + Cadastrar </Button>
                </header>

                <main>

                </main>
            </section>

            <section className="section_historico_de_transacao">
                <header>
                    <h3> Histórico de Transação: </h3>
                </header>

                <main>

                </main>
            </section>
        </section>
    )
}