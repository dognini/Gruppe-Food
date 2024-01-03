import "../../styles/pages/user/createuser.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../../api/api";
import { FONEMask } from "../../layout/mask";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import Select from "../../components/form/select";
import HeaderList from "../../layout/header/header";
import UsersProps from "../../interfaces/usersProps";
import SelectProps from "../../interfaces/selectProps";

export default function EditUSer() {
    const { id } = useParams();

    const [typesUser, setTypesUser] = useState<SelectProps[]>([]);
    const [user, setUser] = useState<UsersProps>({
        id: 0,
        nome: "",
        telefone: "",
        typeUser: "",
        email: "",
        senha: "",
        pedidos: [],
        carteira: [],
        enderecos: []
    });


    useEffect(() => {
        api.get("/tiposUsuarios")
            .then((res) => setTypesUser(res.data))
            .catch((error) => console.error("Não foi possível buscar os tipos de usuários", error))
    }, []);


    useEffect(() => {
        api.get(`/usuarios/${id}`)
            .then((res) => setUser(res.data))
            .catch((error) => console.error("Não foi possível buscar os dados do usuário", error))
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

        api.patch(`/usuarios/${id}`, user)
            .then(() => {
                toast.success("Usuário atualizado com sucesso!")
            })
            .catch((error) => console.error("Erro ao cadastrar um usuário: ", error))
    }


    return (
        <form onSubmit={submit}>
            <ToastContainer />

            <header className="header-create-user">
                <HeaderList to="/usuarios" titulo={`Editar ${user.nome}`} />

                <Button type="submit"> Salvar </Button>
            </header>

            <section className="form-user">

                <main>
                    <Input obrigatorio key="nome" type="text" name="nome" label="Nome" tamanho="20em" placeholder="Digite o seu nome" value={user.nome} handleChange={(e) => handleInput(e, "nome")} />

                    <Input obrigatorio key="email" type="email" name="email" label="E-mail" tamanho="20em" placeholder="Digite o seu E-mail" value={user.email} handleChange={(e) => handleInput(e, "email")} />

                    <Input obrigatorio key="telefone" type="text" name="telefone" label="Telefone" placeholder="Digite o seu Telefone" value={FONEMask(user.telefone)} handleChange={(e) => handleInput(e, "telefone")} />

                    <Select obrigatorio key="typeUser" name="typeUser" label="Tipo" value={user.typeUser} options={typesUser} handleOnChange={handleSelect} />

                    <Input obrigatorio key="senha" type="password" name="senha" label="Senha" tamanho="15em" placeholder="Digite uma senha" handleChange={(e) => handleInput(e, "senha")} />
                </main>

            </section>

        </form>
    )
}