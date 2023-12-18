import { useEffect, useState } from "react";

import '../styles/pages/home.css';

import api from "../api/api";
import Banner from "../layout/banner";
import CardRestaurants from "../components/cardRestaurants";
import NavBarRestaurantes from "../layout/navBarRestaurants";
import RestaurantesProps from "../interfaces/restaurantesProps";

export default function Home() {
    const [restaurantes, setRestaurantes] = useState<RestaurantesProps[]>([]);
    const [restaurantesFiltrados, setRestaurantesFiltrados] = useState<RestaurantesProps[]>([]);

    useEffect(() => {

        api.get('/restaurantes')
            .then((res) => {
                setRestaurantes(res.data);
                setRestaurantesFiltrados(res.data)
            })
            .catch((error) => console.log(error))

    }, []);

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = e.currentTarget;

        if (value === "Todos") {
            setRestaurantesFiltrados(restaurantes);
        }

        setRestaurantesFiltrados(restaurantes.filter((restaurante) => restaurante.tipo === value));
    }

    return (
        <section>

            <header>
                <Banner />
            </header>

            <main>
                <NavBarRestaurantes
                    handle={(e) => handleChange(e)}
                />

                <section className="cards-container">

                    {
                        restaurantesFiltrados?.map((dados) => (
                            <CardRestaurants
                                key={dados.id}
                                dados={dados}
                            />
                        ))
                    }

                </section>
            </main>

        </section>
    )
}