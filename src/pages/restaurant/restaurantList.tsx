/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../styles/components/list.css";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import api from "../../api/api";
import Header from "../../layout/header/header";
import RestaurantesProps from "../../interfaces/restaurantesProps";
import CardListRestaurantes from "../../components/card/cardListRestaurantes";
import Paginate from "../../components/paginate";

export default function RestaurantList() {

    const [searchValue, setSearchValue] = useState("");
    const [restaurante, setRestaurante] = useState<RestaurantesProps[]>([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(3);

    useEffect(() => {
        api.get(`/restaurantes?_page=${page}&_limit=${limitPerPage}`)
            .then((res) => {
                setRestaurante(res.data)
                setTotalPage(Math.ceil(res.headers['x-total-count'] / limitPerPage))
            })
            .catch((error) => console.log("Não foi possível buscar os restaurantes", error));
    }, []);


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


    const remove = (id: number) => {

        api.delete(`/restaurantes/${id}`)
            .then(() => {
                toast.success("Restaurante deletado com sucesso!")
                setRestaurante(prevState => prevState.filter(res => res.id !== id))
            })
            .catch((error) => {
                console.error("Não foi possível deletar o restaurante", error)
                toast.error("Não foi possível deletar o restaurante, tente novamente mais tarde!")
            })

    }


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchValue(value);
    }


    useEffect(() => {
        api.get(`/restaurantes?q=${searchValue}`)
            .then((res) => setRestaurante(res.data))
            .catch((error) => console.error("Error ao pesquisar restaurante: ", error))

    }, [searchValue])


    return (
        <>
            <ToastContainer />

            <Header
                to="/"
                titulo="Restaurantes"
                labelBTN="Cadastrar"
                btnLink="/create-restaurant"
                placeHolderBTN="Pesquisar Restaurante"
                handleChange={(e) => handleInput(e)}
            />

            <main className="list-container">

                {
                    restaurante.map((item) => (
                        <CardListRestaurantes
                            key={item.id}
                            item={item}
                            remove={remove}
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