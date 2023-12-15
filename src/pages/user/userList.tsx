import "../../styles/components/list.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Header from "../../layout/header";
import UsersProps from "../../interfaces/usersProps";
import CardListUser from "../../components/cardListUser";

export default function UserList() {
    const [users, setUsers] = useState<UsersProps[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/usuarios")
            .then((res) => setUsers(res.data))
            .catch((error) => console.error("Não foi possivel buscar os usuários", error))
    }, []);

    const removeUser = (id: number) => {
        axios.delete(`http://localhost:5000/usuarios/${id}`)
            .then((res) => {
                console.log("Usuário deletado com sucesso", res.data)
                setUsers(prevState => prevState.filter(user => user.id !== id))
            })
            .catch((error) => console.error("Não foi possivel deletar o usuário", error))
    }

    return (
        <>
            <Header
                to="/"
                titulo="Usuários"
                labelBTN="Cadastrar"
                btnLink="/create-user"
            />

            <main className="list-container">

                {
                    users?.map((item) => (
                        <CardListUser
                            key={item.id}
                            remove={removeUser}
                            item={item}
                        />
                    ))
                }

            </main>
        </>
    )
}