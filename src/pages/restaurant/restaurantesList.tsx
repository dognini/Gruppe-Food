import "../../styles/components/list.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Header from "../../layout/header";
import RestaurantesProps from "../../interfaces/restaurantesProps";
import CardListRestaurantes from "../../components/cardListRestaurantes";

export default function RestaurantesList() {
    const [restaurante, setRestaurante] = useState<RestaurantesProps[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/restaurantes")
            .then((res) => setRestaurante(res.data))
            .catch((error) => console.log("Não foi possivel buscar os restaurantes", error));
    }, []);

    const remove = (id: number) => {

        axios.delete(`http://localhost:5000/restaurantes/${id}`)
            .then(() => {
                alert("Restaurante deletado com sucesso!")
                setRestaurante(prevState => prevState.filter(res => res.id !== id))
            })
            .catch((error) => {
                console.error("Não foi possivel deletar o restaurante", error)
                alert("Não foi possivel deletar o restaurante, tente novamente mais tarde!")
            })

    }

    return (
        <>
            <Header
                to="/"
                titulo="Restaurantes"
                labelBTN="Cadastrar"
                btnLink="/create-restaurant"
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