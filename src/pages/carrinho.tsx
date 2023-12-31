import "../styles/pages/carrinho.css";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import api from "../api/api";
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/form/button";
import UsersProps from "../interfaces/usersProps";
import ModalPedido from "../components/modal/modalPedido";
import CardCarrinho from "../components/card/cardCarrinho";
import { PratosProps } from "../interfaces/restaurantesProps";

export default function Carrinho() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UsersProps>()
    const [pedidos, setPedidos] = useState<PratosProps[]>([])
    const [compraRealizada, setCompraRealizada] = useState<boolean>(false)
    const [showModalPedidos, setShowModalPedidos] = useState<boolean>(false)


    useEffect(() => {
        const localCarrinho = localStorage.getItem('carrinho')
        const parseCarrinho = localCarrinho ? JSON.parse(localCarrinho) : null

        const localUser = localStorage.getItem('usuario')
        const parseUser = localUser ? JSON.parse(localUser) : null

        setUser(parseUser)
        setPedidos(parseCarrinho)
    }, []);


    const carteiraFavorita = user?.carteira.filter((carteira) => carteira.favorito === true)
    const enderecoFavorito = user?.enderecos.filter((endereco) => endereco.favorito === true)


    useEffect(() => {

        if (compraRealizada) {
            navigate('/meus-pedidos')
        }

    }, [compraRealizada, navigate]);


    const toggleModal = () => {
        setShowModalPedidos(prevState => !prevState)
    }


    const fecharModal = () => {
        setShowModalPedidos(false)
    }


    const calcularPrecoTotal = () => {

        if (pedidos && pedidos.length > 0) {

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
            toast.success("Prato deletado com sucesso!")
            localStorage.setItem("carrinho", JSON.stringify(updatePedidos))
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

        localStorage.setItem("carrinho", JSON.stringify(updatePedidos));
    }


    const handleComprar = useCallback(() => {

        if (user && pedidos.length > 0) {
            const dataCompra = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

            const novoPedido = {
                id: uuidv4(),
                valor: calcularPrecoTotal(),
                data: dataCompra,
                restaurante: pedidos[0]?.restaurante,
                status: "Em Espera",
                pratos: pedidos,
                metodoPagamento: carteiraFavorita && carteiraFavorita[0].apelido
            }

            const novosPedidos = [...user.pedidos, novoPedido]

            api.patch(`/usuarios/${user.id}`, { pedidos: novosPedidos })
                .then((res) => {
                    setPedidos([])
                    setCompraRealizada(prevState => !prevState)
                    setShowModalPedidos(prevState => !prevState)
                    localStorage.removeItem("carrinho")
                    localStorage.setItem('usuario', JSON.stringify(res.data))
                })
                .catch((error) => {
                    console.log("Ocorreu um erro ao finalizar a compra", error)
                    toast.error("Ocorreu um erro ao finalizar a compra, tente novamente mais tarde")
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, pedidos]);


    return (
        <section className="container">
            <ToastContainer />

            <div className="carrinho">

                <header>
                    <h1> Pedidos: </h1>
                </header>

                <main>
                    {pedidos && pedidos.length > 0 ? (
                        pedidos?.map((item, index) => (
                            <CardCarrinho
                                key={index}
                                dados={item}
                                onRemove={() => handleRemove(index)}
                                onUpdateQuantity={(quantity) => handleUpdateQuantity(index, quantity)}
                            />

                        ))
                    ) : (
                        <p> Sem pedidos... </p>
                    )}
                </main>

                <footer>
                    <h2> Total do Pedido: <span> R$: {calcularPrecoTotal()},00 </span></h2>
                    <Button onclick={toggleModal}> Finalizar Pedido </Button>
                </footer>

            </div>

            {showModalPedidos && <ModalPedido carteira={carteiraFavorita} endereco={enderecoFavorito} closeModal={fecharModal} onComprar={handleComprar} showModal={true} />}
        </section>
    )
}