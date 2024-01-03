import "../../styles/pages/carteira/editCarteira.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/api";
import Header from "../../layout/header/header";
import Button from "../../components/form/button";
import UsersProps from "../../interfaces/usersProps";
import SelectProps from "../../interfaces/selectProps";
import CarteiraProps from "../../interfaces/carteiraProps";
import FormMetodoPagamento from "../../components/form/formMetodoPagamento";
import { ToastContainer, toast } from "react-toastify";

export default function EditCarteira() {
    const { id } = useParams();

    const [user, setUser] = useState<UsersProps>()
    const [showForm, setShowForm] = useState<boolean>(false)
    const [TypeMetodoPagamento, setTypeMetodoPagamento] = useState<SelectProps[]>([])
    const [dados, setDados] = useState<CarteiraProps>({
        id: "",
        favorito: false,
        typeCard: "",
        numero: "",
        validade: "",
        cvv: "",
        titular: "",
        cpf: "",
        apelido: ""
    });


    useEffect(() => {
        const localUser = localStorage.getItem('usuario')
        const userParse = localUser ? JSON.parse(localUser) : null

        setUser(userParse)

        if (userParse) {
            const carteira = userParse.carteira.find((item: CarteiraProps) => item.id === id);

            if (carteira) {
                setDados(carteira);
            }
        }
    }, [id])


    useEffect(() => {
        api.get("/metodosPagamentos")
            .then((res) => setTypeMetodoPagamento(res.data))
            .catch((error) => console.error("Ocorreu um erro ao buscar os meios de pagamentos", error))
    }, [])


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setDados((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCard = event.target.value;

        setDados((prevState) => ({
            ...prevState,
            typeCard: selectCard
        }))
    }


    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        if (checked) {
            const updateEnderecos = user?.carteira.map((endereco) => {

                if (endereco.id !== dados.id) {
                    return { ...endereco, favorito: false }
                }

                return endereco;
            }) || [];


            setUser((prevState) => {
                if (prevState) {
                    return { ...prevState, carteira: updateEnderecos }
                }

                return prevState;
            });
        }

        setDados((prevState) => ({
            ...prevState,
            favorito: checked
        }));
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user) {
            const updateCarteira = user.carteira.map((carteira) => {

                if (carteira.id === id) {
                    return { ...carteira, ...dados }
                }

                return carteira;
            })

            const updateUser = { ...user, carteira: updateCarteira }

            api.patch(`/usuarios/${user.id}`, updateUser)
                .then((res) => {
                    setShowForm(prevState => !prevState)
                    toast.success("Carteira atualizado com sucesso!!")
                    localStorage.setItem('usuario', JSON.stringify(res.data))

                    const carteira = res.data.carteira.find((item: CarteiraProps) => item.id === id)
                    setDados(carteira)
                })
                .catch((error) => {
                    console.error("Ocorreu um erro ao atualizar carteira", error);
                    toast.error("Ocorreu um erro ao atualizar carteira, tente novamente mais tarde");
                })
        }
    }


    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    }

    return (
        <section>
            <ToastContainer />

            <header>
                <Header titulo={dados.apelido} to="/carteira" />
            </header>

            <main className="main_edit_carteira">
                <header>
                    <h2> CARTEIRA </h2>

                    <Button onclick={toggleForm}> {!showForm ? "Editar Cartão" : "Fechar Cartão"} </Button>
                </header>

                {!showForm ? (
                    <main>
                        <p> <span> Tipo de Cartão: </span> {dados.typeCard} </p>
                        <p> <span> Número: </span> {dados.numero} </p>
                        <p> <span> Validade: </span> {dados.validade} </p>
                        <p> <span> CVV: </span> {dados.cvv} </p>
                        <p> <span> Titular: </span> {dados.titular} </p>
                        <p> <span> CPF: </span> {dados.cpf} </p>
                        <p> <span> Apelido: </span> {dados.apelido} </p>
                    </main>
                ) : (
                    <main>
                        <FormMetodoPagamento TypesMetodoPagamento={TypeMetodoPagamento} value={dados} handleCheckbox={handleCheckbox} handleInputChange={handleInput} handleSelect={handleSelect} submit={submit} />
                    </main>
                )}

            </main>
        </section>
    )
}