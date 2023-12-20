/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../styles/components/list.css";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import api from "../../api/api";
import Header from "../../layout/header";
import Paginate from "../../components/paginate";
import UsersProps from "../../interfaces/usersProps";
import CardListUser from "../../components/cardListUser";

export default function UserList() {

    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState<UsersProps[]>([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(3);


    useEffect(() => {

        api.get(`/usuarios?_page=${page}&_limit=${limitPerPage}`)
            .then((res) => {
                setUsers(res.data);
                setTotalPage(Math.ceil(res.headers['x-total-count'] / limitPerPage))
            })
            .catch((error) => console.error("Não foi possível buscar os usuários", error));

    }, [page, limitPerPage]);


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


    const paginaAnterior = () => {

        if (page === 1) {
            return
        }

        setPage(prevState => prevState - 1)
    }


    const proximaPagina = () => {

        if (page === totalPage) {
            return;
        }

        setPage(prevState => prevState + 1)
    }


    useEffect(() => {

        if (searchValue.length > 3) {

            api.get(`/usuarios?q=${searchValue}`)
                .then((res) => setUsers(res.data))
                .catch((error) => console.error("Error ao pesquisar usuário: ", error))

        }

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

            <footer>
                <Paginate page={page} totalPage={totalPage} paginaAnterior={paginaAnterior} proximaPagina={proximaPagina} />
            </footer>
        </>
    )
}