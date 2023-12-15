import "../../styles/pages/user/createuser.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Input from "../../components/form/input";
import HeaderList from "../../layout/headerList";
import Button from "../../components/form/button";
import Select from "../../components/form/select";
import UsersProps from "../../interfaces/usersProps";
import TypesUsersProps from "../../interfaces/typesUsersProps";

export default function EditUSer() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState<UsersProps>({
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        typeUser: "",
        senha: ""
    });
    const [typesUser, setTypesUser] = useState<TypesUsersProps[]>([]);


    useEffect(() => {
        axios.get("http://localhost:5000/TiposUsuarios")
            .then((res) => setTypesUser(res.data))
            .catch((error) => console.error("Não foi possivel buscar os tipos de usuários", error))
    }, []);


    useEffect(() => {
        axios.get(`http://localhost:5000/usuarios/${id}`)
            .then((res) => setUser(res.data))
            .catch((error) => console.error("Não foi possivel buscar os dados do usuário", error))
    }, [id]);


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

        axios.patch(`http://localhost:5000/usuarios/${id}`, user)
            .then(() => {
                alert("Usuário cadastrado com sucesso!")
                navigate("/usuarios");
            })
            .catch((error) => console.error("Erro ao cadastrar um usuário: ", error))
    }


    return (
        <form onSubmit={submit}>

            <header className="header-create-user">
                <HeaderList
                    to="/usuarios"
                    titulo="Editar Usuário"
                />

                <Button type="submit"> Salvar </Button>
            </header>

            <section className="form-user">

                <main>
                    <Input key="nome" type="text" name="nome" label="Nome" tamanho="20em" placeholder="Digite o seu nome" value={user.nome} handleChange={(e) => handleInput(e, "nome")} />

                    <Input key="email" type="email" name="email" label="E-mail" tamanho="20em" placeholder="Digite o seu E-mail" value={user.email} handleChange={(e) => handleInput(e, "email")} />

                    <Input key="telefone" type="text" name="telefone" label="Telefone" placeholder="Digite o seu Telefone" value={user.telefone} handleChange={(e) => handleInput(e, "telefone")} />

                    <Select key="typeUser" name="typeUser" label="Tipo" value={user.typeUser} options={typesUser} handleOnChange={handleSelect} />

                    <Input key="senha" type="password" name="senha" label="Senha" tamanho="15em" placeholder="Digite uma senha" handleChange={(e) => handleInput(e, "senha")} />
                </main>

            </section>

        </form>
    )
}