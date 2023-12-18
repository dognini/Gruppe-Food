import "../../styles/components/list.css";

import { useEffect, useState } from "react";

import api from "../../api/api";
import Header from "../../layout/header";
import RestaurantesProps from "../../interfaces/restaurantesProps";
import CardListRestaurantes from "../../components/cardListRestaurantes";

export default function RestaurantList() {

    const [searchValue, setSearchValue] = useState("");
    const [restaurante, setRestaurante] = useState<RestaurantesProps[]>([]);

    useEffect(() => {
        api.get("/restaurantes")
            .then((res) => setRestaurante(res.data))
            .catch((error) => console.log("Não foi possivel buscar os restaurantes", error));
    }, []);


    const remove = (id: number) => {

        api.delete(`/restaurantes/${id}`)
            .then(() => {
                alert("Restaurante deletado com sucesso!")
                setRestaurante(prevState => prevState.filter(res => res.id !== id))
            })
            .catch((error) => {
                console.error("Não foi possivel deletar o restaurante", error)
                alert("Não foi possivel deletar o restaurante, tente novamente mais tarde!")
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
        </>
    )
}