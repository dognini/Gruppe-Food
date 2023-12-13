import "../styles/pages/login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Input from "../components/form/input";
import Button from "../components/form/button";
import UsersProps from "../interfaces/usersProps";

export default function Login() {
    const navigate = useNavigate();

    const [users, setUsers] = useState<UsersProps[]>([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/usuarios")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => console.error("Não foi possivel buscar os usuarios", error))
    }, []);


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setUser((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("teste")
    }

    return (
        <section className="container-login">

            <div className="login-imagem">
                <h1> Gruppe Food </h1>
            </div>

            <section className="login-form">
                <form onSubmit={submit}>
                    <h1> Login </h1>

                    <section>
                        <Input tamanho="20em" name="email" type="email" handleChange={(e) => handleInput(e, "email")} label="E-mail" placeholder="Digite o seu email" />

                        <Input tamanho="20em" name="senha" type="password" handleChange={(e) => handleInput(e, 'senha')} label="Senha" placeholder="Digite a sua senha" />
                    </section>

                    <Button type="submit"> Cadastrar </Button>
                </form>
            </section>

        </section>
    )
}