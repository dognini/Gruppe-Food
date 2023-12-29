import "../styles/pages/carteira.css";

import api from "../api/api";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { v4 as uuidv4 } from 'uuid';
import Header from "../layout/header/header";
import Button from "../components/form/button";
import UsersProps from "../interfaces/usersProps";
import SelectProps from "../interfaces/selectProps";
import CarteiraProps from "../interfaces/carteiraProps";
import CardCarteira from "../components/card/cardCarteira";
import CardTransacao from "../components/card/cardTransacao";
import FormMetodoPagamento from "../components/form/formMetodoPagamento";


export default function Carteira() {

    const [showFormMetodoPagamento, setShowFormMetodoPagamento] = useState(false);
    const [TypesMetodoPagamento, setTypesMetodoPagamento] = useState<SelectProps[]>([]);

    const [user, setUser] = useState<UsersProps>({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        typeUser: "",
        pedidos: [],
        carteira: [],
        enderecos: []
    });
    const [carteira, setCarteira] = useState<CarteiraProps>({
        id: uuidv4(),
        favorito: false,
        typeCard: "",
        numero: "",
        validade: "",
        cvv: "",
        titular: "",
        cpf: "",
        apelido: "",
    });


    useEffect(() => {
        const userLocal = localStorage.getItem("usuario")
        const parseUser = userLocal ? JSON.parse(userLocal) : null

        setUser(parseUser)
    }, [])


    useEffect(() => {
        api.get("/metodosPagamentos")
            .then((res) => setTypesMetodoPagamento(res.data))
            .catch((error) => console.error("Não foi possível buscar os metodos de pagamento", error))
    }, [])


    const ShowFormMetodoPagamento = () => {
        setShowFormMetodoPagamento(prevState => !prevState)
    }


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setCarteira((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectTypePagamento = event.target.value;

        setCarteira((prevState) => ({
            ...prevState,
            typeCard: selectTypePagamento
        }))
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateCarteira = {
            ...user,
            carteira: [
                ...(user.carteira || []),
                { ...carteira },
            ],
        };

        api.patch(`/usuarios/${user?.id}`, updateCarteira)
            .then((res) => {
                setUser(res.data)
                toast.success("Cartão cadastrado com sucesso!!")
                setShowFormMetodoPagamento(prevState => !prevState)
                localStorage.setItem('usuario', JSON.stringify(res.data))
            })
            .catch((error) => {
                console.error("Não foi possível cadastrar o cartão", error)
                toast.error("Não foi possível cadastrar o cartão, tente novamente mais tarde")
            })
    }


    return (
        <section>
            <ToastContainer />

            <header>
                <Header titulo="Carteira" to="/" />
            </header>

            <section className="section_formas_de_pagamento">
                <header>
                    <h2> Formas de Pagamento: </h2>
                    <Button onclick={ShowFormMetodoPagamento} > Cadastrar </Button>
                </header>

                {showFormMetodoPagamento && <FormMetodoPagamento submit={submit} handleSelect={handleSelect} handleInputChange={handleInput} TypesMetodoPagamento={TypesMetodoPagamento} />}

                <main>

                    {user?.carteira.map((item) => (
                        <CardCarteira
                            key={item.apelido}
                            item={item}
                        />
                    ))}

                </main>
            </section>

            <section className="section_historico_de_transacao">
                <header>
                    <h2> Histórico de Transação: </h2>
                </header>

                <main>
                    <CardTransacao />
                </main>
            </section>

        </section>
    )
}