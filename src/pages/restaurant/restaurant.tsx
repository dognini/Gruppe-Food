import "../../styles/pages/restaurant/restaurant.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../../api/api";
import { v4 as uuidv4 } from 'uuid';
import Button from "../../components/form/button";
import UsersProps from "../../interfaces/usersProps";
import PratoCard from "../../components/card/cardPratos";
import FormPratos from "../../components/form/formPratos";
import HeaderRestaurant from "../../layout/header/headerRestaurant";
import RestaurantesProps, { PratosProps } from "../../interfaces/restaurantesProps";

interface CarrinhoItemProps extends PratosProps {
    restaurante: string
    dataAdicao: string
}

export default function Restaurant() {
    const { id } = useParams();

    const [user, setUser] = useState<UsersProps>();
    const [showFormPrato, setShowFormPrato] = useState<boolean>(false);
    const [restaurante, setRestaurante] = useState<RestaurantesProps>();
    const [pratosNoCarrinho, setPratosNoCarrinho] = useState<PratosProps[]>([]);
    const [pratos, setPratos] = useState<PratosProps>({
        id: uuidv4(),
        nome: "",
        descricao: "",
        img: "",
        preco: "",
        quantidade: 1
    });


    useEffect(() => {
        const localCarrinho = localStorage.getItem('carrinho');
        const parseCarrinho = localCarrinho ? JSON.parse(localCarrinho) : null;

        setPratosNoCarrinho(parseCarrinho)

        const localUser = localStorage.getItem('usuario');
        const parseUser = localUser ? JSON.parse(localUser) : null;

        setUser(parseUser)
    }, []);


    useEffect(() => {

        api.get(`/restaurantes/${id}`)
            .then((res) => {
                setRestaurante(res.data)
            })
            .catch((error) => console.log("Algo deu errado", error))

    }, [id]);


    const addPedidoCarrinho = (idPrato: string) => {
        const filteredDish = restaurante?.pratos?.find((prato) => prato.id === idPrato);

        if (filteredDish) {

            const novoItem: CarrinhoItemProps = {
                ...filteredDish,
                restaurante: restaurante?.nome || '',
                dataAdicao: new Date().toLocaleDateString("pt-BR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            };

            const novoCarrinho = pratosNoCarrinho !== null ? [...pratosNoCarrinho, novoItem] : [novoItem];

            setPratosNoCarrinho(novoCarrinho);

            localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

            toast.success("Prato adicionado ao carrinho com sucesso!")
        } else {
            toast.error("Não foi possível adicionar o prato ao carrinho, tente novamente mais tarde")
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
                toast.success("Prato cadastrado com sucesso!")
            })
            .catch((error) => {
                toast.error("Não foi possível cadastrar o prato")
                console.error("Não foi possível cadastrar o prato", error)
            })
    }

    return (
        <section>
            <ToastContainer />

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

                {showFormPrato && <FormPratos dados={pratos} handleImageChange={handleImageChange} handleInputChange={handleInput} submit={submit} />}

                <main>
                    <PratoCard
                        handleRemove={addPedidoCarrinho}
                        dados={restaurante?.pratos}
                    />
                </main>
            </main>

        </section>
    )
}