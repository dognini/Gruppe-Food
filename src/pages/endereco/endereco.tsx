import "../../styles/pages/endereco/endereco.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../../api/api";
import Header from "../../layout/header/header";
import Button from "../../components/form/button";
import SelectProps from "../../interfaces/selectProps";
import FormEndereco from "../../components/form/formEndereco";
import UsersProps, { EnderecosUsersProps } from "../../interfaces/usersProps";

export default function Endereco() {
    const { id } = useParams();

    const [user, setUser] = useState<UsersProps>()
    const [showForm, setShowForm] = useState<boolean>(false)
    const [typesEnderecos, setTypsEnderecos] = useState<SelectProps[]>([])
    const [dados, setDados] = useState<EnderecosUsersProps>({
        id: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        complemento: "",
        TypeEndereco: "",
        favorito: false
    });


    useEffect(() => {
        const localUser = localStorage.getItem('usuario')
        const userParse = localUser ? JSON.parse(localUser) : null

        setUser(userParse);

        if (userParse) {
            const endereco = userParse?.enderecos.find((item: EnderecosUsersProps) => item.id === id)

            if (endereco) {
                setDados(endereco);
            }
        }

    }, [id]);


    useEffect(() => {
        api.get("/tiposEnderecos")
            .then((res) => setTypsEnderecos(res.data))
            .catch((error) => console.error("não foi possível buscar os tipos de endereços", error))
    }, []);


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setDados((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectTypeEndereco = event.target.value;

        setDados((prevState) => ({
            ...prevState,
            TypeEndereco: selectTypeEndereco
        }))
    }


    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        if (checked) {
            const updateEnderecos = user?.enderecos.map((endereco) => {

                if (endereco.id !== dados.id) {
                    return { ...endereco, favorito: false }
                }

                return endereco;
            }) || [];


            setUser((prevState) => {
                if (prevState) {
                    return { ...prevState, enderecos: updateEnderecos }
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
            const updateEnderecos = user.enderecos.map((endereco) => {

                if (endereco.id === id) {
                    return { ...endereco, ...dados };
                }

                return endereco;
            });

            const updatedUser = { ...user, enderecos: updateEnderecos }

            api.patch(`/usuarios/${user.id}`, updatedUser)
                .then((res) => {
                    setShowForm(prevState => !prevState)
                    toast.success("Usuário cadastrado com sucesso!!")
                    localStorage.setItem('usuario', JSON.stringify(updatedUser))

                    const endereco = res.data.enderecos.find((item: EnderecosUsersProps) => item.id === id)
                    setDados(endereco)
                })
                .catch((error) => {
                    console.error("Ocorreu um erro ao atualizar o endereço", error)
                    toast.error("Ocorreu um erro ao atualizar o endereço, tente novamente mais tarde")
                })
        }
    }


    const toggleForm = () => {
        setShowForm(prevState => !prevState)
    }


    return (
        <div>
            <ToastContainer />

            <header>
                <Header titulo={`${dados?.rua} - ${dados?.numero}`} to="/enderecos" />
            </header>

            <main className="main_endereco">
                <header>
                    <h2> Endereço: </h2>

                    <Button onclick={toggleForm}> {!showForm ? "Editar Endereço" : "Fechar Endereço"} </Button>
                </header>

                {!showForm ? (
                    <main>
                        <p> <span> CEP: </span> {dados.cep} </p>
                        <p> <span> Bairro: </span> {dados.bairro} </p>
                        <p> <span> Cidade: </span> {dados.cidade} </p>
                        <p> <span> Bairro: </span> {dados.bairro} </p>
                        <p> <span> Rua: </span> {dados.rua} </p>
                        <p> <span> Número: </span> {dados.numero} </p>
                        <p> <span> Complemento: </span> {dados.complemento} </p>
                        <p> <span> Tipo de Endereço: </span> {dados.TypeEndereco} </p>
                    </main>
                ) : (
                    <main>
                        <FormEndereco checked={dados.favorito} endereco={dados} handleChange={handleInput} handleCheckbox={handleCheckbox} handleOnChange={handleSelect} submit={submit} typesEnderecos={typesEnderecos} />
                    </main>
                )}

            </main>
        </div>
    )
}