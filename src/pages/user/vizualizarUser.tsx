import "../../styles/pages/user/createuser.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import api from "../../api/api";

import Input from "../../components/form/input";
import HeaderList from "../../layout/header/header";
import Select from "../../components/form/select";
import UsersProps from "../../interfaces/usersProps";
import TypesUsersProps from "../../interfaces/typesUsersProps";
import { FONEMask } from "../../layout/mask";

export default function VizualizarUser() {
    const { id } = useParams();

    const [user, setUser] = useState<UsersProps>({
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        typeUser: "",
        senha: ""
    });
    const [typeUser, setTypeUser] = useState<TypesUsersProps[]>([]);


    useEffect(() => {
        api.get(`/usuarios/${id}`)
            .then((res) => setUser(res.data))
            .catch((error) => console.error("Não foi possível buscar o user", error))
    }, [id]);


    useEffect(() => {
        api.get('/tiposUsuarios')
            .then((res) => setTypeUser(res.data))
            .catch((error) => console.error("Não foi possível trazer os tipos dos usuários", error))
    }, []);


    return (
        <>

            <HeaderList
                to="/usuarios"
                titulo={`Vizualizar ${user.nome}`}
            />

            <section className="form-user">

                <main>
                    <Input key="nome" type="text" name="nome" label="Nome" tamanho="20em" disable={true} value={user.nome} />

                    <Input key="email" type="email" name="email" label="E-mail" tamanho="20em" disable={true} value={user.email} />

                    <Input key="telefone" type="text" name="telefone" label="Telefone" disable={true} value={FONEMask(user.telefone)} />

                    <Select key="typeUser" name="typeUser" label="Tipo" disable={true} value={user.typeUser} options={typeUser} />

                    <Input key="senha" type="password" name="senha" label="Senha" tamanho="15em" disable={true} value={user.senha} />
                </main>

            </section>

        </>
    )
}