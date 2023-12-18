import "../../styles/pages/restaurant/restaurant.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/api";

import { v4 as uuidv4 } from 'uuid';
import Button from "../../components/form/button";
import PratoCard from "../../components/cardPratos";
import FormPratos from "../../components/formPratos";
import UsersProps from "../../interfaces/usersProps";
import HeaderRestaurant from "../../layout/headerRestaurant";
import RestaurantesProps, { PratosProps } from "../../interfaces/restaurantesProps";

export default function Restaurant() {
    const { id } = useParams();

    const [user, setUser] = useState<UsersProps>();
    const [pratos, setPratos] = useState<PratosProps>({
        id: uuidv4(),
        nome: "",
        descricao: "",
        img: "",
        preco: "",
        quantidade: 1
    });
    const [showFormPrato, setShowFormPrato] = useState<boolean>(false);
    const [restaurante, setRestaurante] = useState<RestaurantesProps>();
    const [pratosNoCarrinho, setPratosNoCarrinho] = useState<PratosProps[]>([])

    useEffect(() => {
        const carrinho = localStorage.getItem("pratos") || "[]";

        setPratosNoCarrinho(JSON.parse(carrinho))
    }, []);


    useEffect(() => {

        const localUSer = localStorage.getItem('usuario');
        const user = localUSer ? JSON.parse(localUSer) : null;

        setUser(user);
    }, []);


    useEffect(() => {
        api.get(`/restaurantes/${id}`)
            .then((res) => {
                setRestaurante(res.data)
            })
            .catch((error) => console.log("Algo deu errado", error))
    }, [id]);


    const addLocation = (id: string) => {
        const filteredDish = restaurante?.pratos?.find((prato) => prato.id === id);

        if (filteredDish) {
            pratosNoCarrinho.push(filteredDish);

            setPratosNoCarrinho(pratosNoCarrinho);

            localStorage.setItem("pratos", JSON.stringify(pratosNoCarrinho));
        }
    }


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        setPratos((prevState) => ({ ...prevState, [fieldName]: value }));
    }


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result

                if (typeof base64 === 'string') {
                    setPratos((prevState) => ({
                        ...prevState,
                        img: base64
                    }));
                }
            }

            reader.readAsDataURL(files[0]);
        }
    }


    const onClickShowPrato = () => {
        setShowFormPrato(prevState => !prevState);
    }


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateRestaurante = {
            ...restaurante,
            pratos: [
                ...(restaurante?.pratos || []),
                { ...pratos },
            ],
        };

        api.patch(`/restaurantes/${id}`, updateRestaurante)
            .then((res) => {
                setRestaurante(res.data)
                setShowFormPrato(prevState => !prevState)
                console.log("Prato cadastrado com sucesso!", res.data)
            })
            .catch((error) => console.log("Não foi possivel cadastrar o prato", error))
    }

    return (
        <section>

            {restaurante && <HeaderRestaurant
                restaurante={restaurante}
            />}

            <main className="prato_restaurant">
                <header>
                    <h1>Pratos:</h1>

                    {user?.typeUser === "Administrador" &&
                        <Button onclick={onClickShowPrato}>
                            + Prato
                        </Button>
                    }
                </header>

                {showFormPrato && <FormPratos handleImageChange={handleImageChange} handleInputChange={handleInput} submit={submit} />}

                <main>
                    <PratoCard
                        handleRemove={addLocation}
                        dados={restaurante?.pratos}
                    />
                </main>
            </main>

        </section>
    )
}