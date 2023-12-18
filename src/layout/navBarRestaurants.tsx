import "../styles/layout/navBarRestaurantes.css";

import { useEffect, useState } from "react";

import api from "../api/api";
import TypesRestaurantsProps from "../interfaces/typesRestaurantsProps";

interface NavBarRestaurantesProps {
    handle: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NavBarRestaurantes = ({ handle }: NavBarRestaurantesProps) => {

    const [types, setTypes] = useState<TypesRestaurantsProps[]>([]);

    useEffect(() => {

        api.get('/TiposRestaurantes')
            .then((res) => {
                setTypes(res.data)
            })
            .catch((error) => console.log("Não foi possivel buscar os tipos dos restaurantes", error))

    }, [])

    return (
        <section className="nav_bar">
            <button value="Todos" type="button" onClick={(e) => handle(e)}> Todos </button>
            {
                types?.map((item) => (
                    <button value={item?.nome} type="button" onClick={(e) => handle(e)} key={item.id}> {item?.nome} </button>
                ))
            }
        </section>
    )
}

export default NavBarRestaurantes;