import { useEffect, useState } from "react";

import '../styles/pages/home.css';

import axios from "axios";
import Banner from "../layout/banner";
import CardRestaurants from "../components/cardRestaurants";
import NavBarRestaurantes from "../layout/navBarRestaurants";
import RestaurantesProps from "../interfaces/restaurantesProps";

export default function Home() {
    const [restautantes, setRestaurantes] = useState<RestaurantesProps[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/restaurantes')
            .then((res) => {
                setRestaurantes(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <section>

            <header>
                <Banner />
            </header>

            <main>
                <NavBarRestaurantes />
                <section className="cards-container">
                    {
                        restautantes?.map((dados) => (
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