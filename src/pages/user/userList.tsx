import "../../styles/components/list.css";

import { useEffect, useState } from "react";

import api from "../../api/api";

import Header from "../../layout/header";
import UsersProps from "../../interfaces/usersProps";
import { toast, ToastContainer } from "react-toastify";
import CardListUser from "../../components/cardListUser";

export default function UserList() {
    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState<UsersProps[]>([]);

    useEffect(() => {

        api.get("/usuarios")
            .then((res) => setUsers(res.data))
            .catch((error) => console.error("Não foi possível buscar os usuários", error))

    }, []);


    const removeUser = (id: number) => {

        api.delete(`/usuarios/${id}`)
            .then(() => {
                toast.success("Usuário deletado com sucesso!!")
                setUsers(prevState => prevState.filter(user => user.id !== id))
            })
            .catch((error) => {
                toast.error("Não foi possível deletar o usuário, tente novamente mais tarde")
                console.error("Não foi possível deletar o usuário", error)
            })

    }


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchValue(value);
    }


    useEffect(() => {
        api.get(`/usuarios?q=${searchValue}`)
            .then((res) => setUsers(res.data))
            .catch((error) => console.error("Error ao pesquisar usuário: ", error))

    }, [searchValue])

    return (
        <>
            <ToastContainer />

            <Header
                to="/"
                titulo="Usuários"
                labelBTN="Cadastrar"
                btnLink="/create-user"
                placeHolderBTN="Pesquisar Usuário"
                handleChange={(e) => handleInput(e)}
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