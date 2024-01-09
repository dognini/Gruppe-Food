import "../styles/pages/login.css";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../api/api";
import Input from "../components/form/input";
import Button from "../components/form/button";
import UsersProps from "../interfaces/usersProps";

export default function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState<Partial<UsersProps>>({});
    const [users, setUsers] = useState<UsersProps[]>([]);


    useEffect(() => {
        api.get("/usuarios")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => console.error("Não foi possível buscar os usuarios", error))
    }, []);


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setUser((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const filterUser = users.find((u) => u.email === user.email && u.senha === user.senha);

        if (filterUser) {
            localStorage.setItem("usuario", JSON.stringify(filterUser))

            toast.success("Login feito com sucesso!!");

            setTimeout(() => {
                navigate('/');
            }, 3000)

        } else {
            toast.error("E-mail ou senha incorretos");
        }

    }

    return (
        <section className="container-login">

            <div className="login-imagem">
                <h1> Gruppe Food </h1>
            </div>

            <ToastContainer />

            <section className="login-form">
                <form onSubmit={submit}>
                    <h1> Login </h1>

                    <section>
                        <Input obrigatorio tamanho="20em" name="email" type="email" handleChange={(e) => handleInput(e, "email")} label="E-mail" placeholder="Digite o seu email" />

                        <Input obrigatorio tamanho="20em" name="senha" type="password" handleChange={(e) => handleInput(e, 'senha')} label="Senha" placeholder="Digite a sua senha" />
                    </section>

                    <div className="section_link" >
                        <p> <Link to='/cadastro'> Cadastrar </Link> </p>
                        <p> <Link to='/create-restaurant'> Cadastrar Restaurante </Link> </p>
                    </div>

                    <Button type="submit"> Cadastrar </Button>
                </form>
            </section>

        </section>
    )
}