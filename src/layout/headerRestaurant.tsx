import RestaurantesProps from "../interfaces/restaurantesProps";
import ReturnArrow from "./returnArrow";

interface HeaderRestaurantProps {
    restaurante: RestaurantesProps
}

const HeaderRestaurant = ({ restaurante }: HeaderRestaurantProps) => {
    return (
        <div>
            <ReturnArrow to="/" />

            <main>
                <header className="info_restaurant">
                    <div>
                        <h1> {restaurante?.nome} </h1>
                        <p> {restaurante?.tipo} </p>
                    </div>

                    <img src={`${restaurante?.imagem}`} />
                </header>
            </main>
        </div>
    )
}

export default HeaderRestaurant;