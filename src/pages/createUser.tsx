import "../styles/pages/createuser.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Input from "../components/form/input";
import Select from "../components/form/select";
import Button from "../components/form/button";
import UsersProps from "../interfaces/usersProps";
import TypesUsersProps from "../interfaces/typesUsersProps";

export default function CreateUser() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UsersProps[]>([]);
    const [typesUser, setTypesUser] = useState<TypesUsersProps[]>([]);


    useEffect(() => {
        axios.get("http://localhost:5000/TiposUsuarios")
            .then((res) => setTypesUser(res.data))
            .catch((error) => console.log("Não foi possivel buscar os tipos de usuários", error))
    }, []);


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setUser((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectTypeRestaurant = event.target.value;

        setUser((prevState) => ({
            ...prevState,
            typeUser: selectTypeRestaurant
        }))
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post("http://localhost:5000/usuarios", user)
            .then(() => {
                navigate("/");
            })
            .catch((error) => console.error("Erro ao cadastrar um usuário: ", error))
    }


    return (
        <section className="create-user-container">

            <section>
                <h1> Cadastro de Usuário: </h1>

                <form onSubmit={submit}>
                    <Input key="nome" type="text" name="nome" label="Nome" placeholder="Digite o seu nome" handleChange={(e) => handleInput(e, "nome")} />

                    <Input key="telefone" type="text" name="telefone" label="Telefone" placeholder="Digite o seu Telefone" handleChange={(e) => handleInput(e, "telefone")} />

                    <Select key="typeUser" name="typeUser" label="Tipo" options={typesUser} handleOnChange={handleSelect} />

                    <Input key="email" type="email" name="email" label="E-mail" placeholder="Digite o seu E-mail" handleChange={(e) => handleInput(e, "email")} />

                    <Input key="senha" type="password" name="senha" label="Senha" placeholder="Digite uma senha" handleChange={(e) => handleInput(e, "senha")} />

                    <Button type="submit"> Cadastrar </Button>
                </form>
            </section>

        </section>
    )
}