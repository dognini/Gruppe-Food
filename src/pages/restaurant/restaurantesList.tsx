import "../../styles/pages/restaurant/restaurantesList.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Header from "../../layout/header";
import RestaurantesProps from "../../interfaces/restaurantesProps";
import CardListRestaurantes from "../../components/cardListRestaurantes";

export default function Restaurantes() {
    const [restaurante, setRestaurante] = useState<RestaurantesProps[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/restaurantes")
            .then((res) => setRestaurante(res.data))
            .catch((error) => console.log("Não foi possivel buscar os restaurantes", error));
    }, []);

    return (
        <>
            <Header
                to="/"
                titulo="Restaurantes"
                labelBTN="Cadastrar"
                btnLink="/create-restaurant"
            />

            <main className="restaurant-container">

                {
                    restaurante.map((item) => (
                        <CardListRestaurantes
                            key={item.id}
                            item={item}
                        />
                    ))
                }

            </main>
        </>
    )
}