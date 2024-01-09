import "../../styles/pages/login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../../api/api";
import { FONEMask } from "../../layout/mask";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import UsersProps from "../../interfaces/usersProps";

export default function Cadastro() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UsersProps>({
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        typeUser: "Usuário",
        carteira: [],
        enderecos: [],
        pedidos: []
    });


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setUser((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        api.post('/usuarios', user)
            .then((res) => {
                toast.success('Usuário cadastrado com sucesso!!')
                localStorage.setItem('usuario', JSON.stringify(res.data))

                setTimeout(() => {
                    navigate('/')
                }, 2000)
            })
            .catch((error) => {
                console.log('Ocorreu um erro ao fazer o cadastro', error)
                toast.error('Ocorreu um erro ao fazer o cadastro, tente novamente mais tarde')
            })
    }


    return (
        <section className="container-login">

            <div className="login-imagem">
                <h1> Gruppe Food </h1>
            </div>

            <ToastContainer />

            <section className="login-form">
                <form onSubmit={submit}>
                    <h1> cadastro </h1>

                    <section>
                        <Input obrigatorio tamanho="20em" name="nome" type="text" handleChange={(e) => handleInput(e, "nome")} label="Nome" placeholder="Digite o seu nome" />

                        <Input obrigatorio tamanho="20em" name="telefone" type="text" value={FONEMask(user.telefone)} handleChange={(e) => handleInput(e, 'telefone')} label="Telefone" placeholder="Digite o seu telefone" />

                        <Input obrigatorio tamanho="20em" name="email" type="email" handleChange={(e) => handleInput(e, "email")} label="E-mail" placeholder="Digite o seu e-mail" />

                        <Input obrigatorio tamanho="20em" name="senha" type="password" handleChange={(e) => handleInput(e, 'senha')} label="Senha" placeholder="Digite a sua senha" />
                    </section>

                    <Button type="submit"> Cadastrar </Button>
                </form>
            </section>

        </section>
    )
}