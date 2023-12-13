import "../styles/layout/navBarRestaurantes.css";

import { useEffect, useState } from "react";

import axios from "axios";
import TypesRestaurantsProps from "../interfaces/typesRestaurantsProps";

const NavBarRestaurantes = () => {
    const [types, setTypes] = useState<TypesRestaurantsProps[]>([]);

    useEffect(() => {

        axios.get('http://localhost:5000/TiposRestaurantes')
            .then((res) => {
                setTypes(res.data)
            })
            .catch((error) => console.log("Não foi possivel buscar os tipos dos restaurantes", error))

    }, [])

    return (
        <section className="nav_bar">
            {
                types?.map((item) => (
                    <span key={item.id}> {item?.nome} </span>
                ))
            }
        </section>
    )
}

export default NavBarRestaurantes;