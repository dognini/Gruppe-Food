import "../styles/pages/carrinho.css";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Button from "../components/form/button";
import CardCarrinho from "../components/card/cardCarrinho";
import { PratosProps } from "../interfaces/restaurantesProps";


export default function Carrinho() {
    const [pedidos, setPedidos] = useState<PratosProps[]>([]);

    useEffect(() => {
        const localCarrinho = localStorage.getItem('carrinho');
        const parseCarrinho = localCarrinho ? JSON.parse(localCarrinho) : null;

        setPedidos(parseCarrinho)
    }, []);


    const calcularPrecoTotal = () => {

        if (pedidos.length > 0) {

            const precoTotal = pedidos.reduce((total, prato) => {
                const precoNumero = parseFloat(prato.preco);

                return total + precoNumero * (prato.quantidade);
            }, 0)

            return precoTotal;
        }

        return "0";
    }


    const handleRemove = (index: number) => {
        const updatePedidos = [...pedidos]
        updatePedidos.splice(index, 1);

        setPedidos(updatePedidos)

        try {
            localStorage.setItem("pratos", JSON.stringify(updatePedidos))
            toast.success("Prato deletado com sucesso!")
        } catch (error) {
            console.error("Não foi possível deletar o prato", error)
            toast.error("Não foi possível deletar o prato, tente novamente mais tarde")
        }

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
            <ToastContainer />

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
                    <h2> Total do Pedido: <span> R$: {calcularPrecoTotal()},00 </span></h2>
                    <Button> Finalizar Pedido </Button>
                </footer>

            </div>

        </section>
    )
}