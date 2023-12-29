import "../styles/pages/enderecos.css";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import api from "../api/api";
import { v4 as uuidv4 } from 'uuid';
import Header from "../layout/header/header";
import Button from "../components/form/button";
import CardEndereco from "../components/card/cardEndereco";
import FormEndereco from "../components/form/formEndereco";
import UsersProps, { EnderecosUsersProps } from "../interfaces/usersProps";
import apiCEP from "../api/apiCEP";

export default function Enderecos() {
    const [typesEnderecos, setTypesEnderecos] = useState([]);
    const [showFormEndereco, setShowFormEndereco] = useState<boolean>(false);
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
    const [dados, setDados] = useState<EnderecosUsersProps>({
        id: uuidv4(),
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
        api.get("/tiposEnderecos")
            .then((res) => setTypesEnderecos(res.data))
            .catch((error) => console.error("Não foi possível buscar os tipos de endereços", error))
    }, []);


    useEffect(() => {
        const localUser = localStorage.getItem('usuario')
        const userParse = localUser ? JSON.parse(localUser) : null

        setUser(userParse);
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


    const buscaCEP = async () => {
        const CEP = dados?.cep?.replace(/\D/g, "");

        if (CEP.length === 8) {

            await apiCEP.get(`/${CEP}/json/`)
                .then((res) => {
                    setDados((prevState) => ({
                        ...prevState,
                        cep: res.data.cep,
                        estado: res.data.uf,
                        cidade: res.data.localidade,
                        bairro: res.data.bairro,
                        rua: res.data.logradouro,
                        numero: res.data.complemento
                    }))
                })
                .catch((error) => console.error("Ocorreu um erro ao buscar cep", error))

        }
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateEndereco = {
            ...user,
            enderecos: [
                ...(user.enderecos || []),
                { ...dados },
            ],
        };

        api.patch(`/usuarios/${user.id}`, updateEndereco)
            .then((res) => {
                setUser(res.data)
                setShowFormEndereco(prevState => !prevState)
                toast.success("Endereço cadastrado com sucesso!!")
                localStorage.setItem('usuario', JSON.stringify(res.data))
            })
            .catch((error) => {
                console.error("Não foi possível cadastrar o endereço", error)
                toast.error("Não foi possível cadastrar o endereço, tente novamente mais tarde")
            })
    }


    const togleForm = () => {
        setShowFormEndereco(prevState => !prevState);
    };


    useEffect(() => {
        buscaCEP();
    }, [dados.cep])


    return (
        <section className="enderecos">
            <ToastContainer />

            <header className="enderecos_header">
                <Header titulo="Endereços:" to="/" />

                <Button onclick={togleForm} > Cadastrar </Button>
            </header>

            {showFormEndereco && <main> <FormEndereco endereco={dados} submit={submit} handleOnChange={handleSelect} handleChange={handleInput} typesEnderecos={typesEnderecos} /> </main>}

            <main className="enderecos_main">

                {user.enderecos.length === 0 && <h2> Sem endereços cadastrados... </h2>}

                {user?.enderecos?.map((item) => (
                    <CardEndereco dados={item} key={item.id} />
                ))}

            </main>
        </section>
    )
}