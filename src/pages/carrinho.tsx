import "../styles/pages/carrinho.css";

import { useEffect, useState } from "react";

import api from "../api/api";
import Button from "../components/form/button";
import UsersProps from "../interfaces/usersProps";
import CardCarrinho from "../components/card/cardCarrinho";
import { PratosProps } from "../interfaces/restaurantesProps";
import { ToastContainer, toast } from "react-toastify";


export default function Carrinho() {
    const [user, setUser] = useState<UsersProps>();
    const [pedidos, setPedidos] = useState<PratosProps[]>([]);


    useEffect(() => {
        const localUser = localStorage.getItem('usuario');
        const parseUser = localUser ? JSON.parse(localUser) : null;

        setUser(parseUser)

        if (parseUser) {

            api.get(`/usuarios/${parseUser.id}`)
                .then((res) => {
                    const userData = res.data
                    setPedidos(userData.pedidos)
                })
                .catch((error) => console.error("Não foi possivel buscar os pedido", error))

        }

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

        if (user) {
            api.patch(`usuarios/${user?.id}`, { pedidos: updatePedidos })
                .then(() => toast.success("Prato deletado com sucesso!"))
                .catch((error) => {
                    toast.error("Não foi possível deletar o prato, tente novamente mais tarde")
                    console.log("Não foi possível deletar o prato", error)
                })
        }
    }


    const handleUpdateQuantity = (index: number, quantity: number) => {
        const updatePedidos = [...pedidos];

        updatePedidos[index] = {
            ...updatePedidos[index],
            quantidade: quantity
        };

        setPedidos(updatePedidos);

        if (user) {
            api.patch(`usuarios/${user?.id}`, { pedidos: updatePedidos })
                .then(() => toast.success("Prato deletado com sucesso!"))
                .catch((error) => {
                    toast.error("Não foi possível deletar o prato, tente novamente mais tarde")
                    console.log("Não foi possível deletar o prato", error)
                })
        }
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