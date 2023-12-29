import "../../styles/pages/user/createuser.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../../api/api";

import { FONEMask } from "../../layout/mask";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import Button from "../../components/form/button";
import HeaderList from "../../layout/header/header";
import UsersProps from "../../interfaces/usersProps";
import SelectProps from "../../interfaces/selectProps";

export default function CreateUser() {
    const navigate = useNavigate();

    const [typesUser, setTypesUser] = useState<SelectProps[]>([]);
    const [user, setUser] = useState<UsersProps>({
        id: 0,
        nome: '',
        telefone: '',
        typeUser: '',
        email: '',
        senha: '',
        pedidos: [],
        carteira: [],
        enderecos: []
    });


    useEffect(() => {
        api.get("/tiposUsuarios")
            .then((res) => setTypesUser(res.data))
            .catch((error) => console.log("Não foi possível buscar os tipos de usuários", error))
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

        api.post("/usuarios", user)
            .then(() => {
                toast.success("Usuário cadastrado com sucesso!!")

                setTimeout(() => {
                    navigate("/usuarios");
                }, 3000)
            })
            .catch((error) => console.error("Erro ao cadastrar um usuário: ", error))
    }


    return (
        <form onSubmit={submit}>
            <ToastContainer />

            <header className="header-create-user">
                <HeaderList to="/usuarios" titulo="Cadastro de Usuário" />

                <Button type="submit" > Cadastrar </Button>
            </header>

            <section className="form-user">

                <main>
                    <Input obrigatorio key="nome" type="text" name="nome" label="Nome" tamanho="20em" placeholder="Digite o seu nome" handleChange={(e) => handleInput(e, "nome")} />

                    <Input obrigatorio key="email" type="email" name="email" label="E-mail" tamanho="20em" placeholder="Digite o seu E-mail" handleChange={(e) => handleInput(e, "email")} />

                    <Input obrigatorio key="telefone" type="text" name="telefone" label="Telefone" placeholder="Digite o seu Telefone" value={FONEMask(user.telefone)} handleChange={(e) => handleInput(e, "telefone")} />

                    <Select obrigatorio key="typeUser" name="typeUser" label="Tipo" options={typesUser} handleOnChange={handleSelect} />

                    <Input obrigatorio key="senha" type="password" name="senha" label="Senha" tamanho="15em" placeholder="Digite uma senha" handleChange={(e) => handleInput(e, "senha")} />
                </main>

            </section>

        </form>
    )
}