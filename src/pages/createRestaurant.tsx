import "../styles/pages/createRestaurant.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Button from "../components/form/button";
import Select from "../components/form/select";
import ReturnArrow from "../layout/returnArrow";
import InputLabel from "../components/form/input";
import InputFile from "../components/form/inputFile";
import RestaurantesProps from "../interfaces/restaurantesProps";
import TypesRestaurantsProps from "../interfaces/typesRestaurantsProps";

export default function CreateRestaurant() {

    const [tipos, setTipos] = useState<TypesRestaurantsProps[]>([]);
    const [restaurante, setRestaurante] = useState<RestaurantesProps>({
        id: 0,
        cnpj: "",
        nome: "",
        tipo: "",
        frete: "",
        imagem: "",
        deliveryTime: "",
        qualidade: "",
        pratos: [],
        endereco: {
            cep: "",
            cidade: "",
            estado: "",
            rua: "",
            numero: "",
            complemento: "",
        },
    });

    useEffect(() => {
        axios.get('http://localhost:5000/TiposRestaurantes')
            .then((res) => setTipos(res.data))
            .catch((error) => console.error("Não foi possivel buscar os tipos dos restaurantes", error));
    }, [])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = event.target;

        if (fieldName.startsWith("endereco")) {

            setRestaurante((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    [fieldName.replace("endereco.", "")]: value,
                },
            }));

        } else {
            setRestaurante((prevState) => ({ ...prevState, [fieldName]: value }));
        }
    }

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectTypeRestaurant = event.target.value;

        setRestaurante((prevState) => ({
            ...prevState,
            tipo: selectTypeRestaurant
        }))
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result

                if (typeof base64 === 'string') {
                    setRestaurante((prevState) => ({
                        ...prevState,
                        imagem: base64
                    }));
                }
            }

            reader.readAsDataURL(files[0]);
        }
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post("http://localhost:5000/restaurantes", restaurante)
            .then((res) => {
                console.log("Retaurante Cadastrado: ", res.data)
            })
            .catch((error) => console.error("Não foi possivel cadastrar o restaurante", error))
    }

    return (
        <form onSubmit={submit}>

            <header className="header-create-rest">
                <div>
                    <ReturnArrow to="/" />
                    <h1> Cadastro de Restaurante: </h1>
                </div>

                <Button type="submit" children="Cadastrar" />
            </header>

            <section className="form-rest">

                <main>
                    <InputLabel type="text" name="nome" label="Nome" placeholder="Nome" tamanho="20em" handleChange={(e) => handleInput(e, "nome")} />

                    <InputLabel type="text" name="cnpj" label="CNPJ" placeholder="CNPJ" tamanho="15em" handleChange={(e) => handleInput(e, "cnpj")} />

                    <Select name="tipo" label="Tipo" options={tipos} handleOnChange={handleSelect} />

                    <InputLabel type="number" name="frete" label="Frete" placeholder="Frete" tamanho="10em" handleChange={(e) => handleInput(e, "frete")} />

                    <InputLabel type="number" name="deliveryTime" label="Tempo de Entrega" placeholder="Tempo de entrega" tamanho="10em" handleChange={(e) => handleInput(e, "deliveryTime")} />

                    <InputLabel type="text" name="cep" label="CEP" placeholder="CEP" tamanho="10em" handleChange={(e) => handleInput(e, "endereco.cep")} />

                    <InputLabel type="text" name="cidade" label="Cidade" placeholder="Cidade" tamanho="15em" handleChange={(e) => handleInput(e, "endereco.cidade")} />

                    <InputLabel type="text" name="estado" label="Estado" placeholder="Estado" tamanho="15em" handleChange={(e) => handleInput(e, "endereco.estado")} />

                    <InputLabel type="text" name="rua" label="Rua" placeholder="Rua" tamanho="20em" handleChange={(e) => handleInput(e, "endereco.rua")} />

                    <InputLabel type="number" name="numero" label="Número" placeholder="Número" tamanho="10em" handleChange={(e) => handleInput(e, "endereco.numero")} />

                    <InputLabel type="text" name="complemento" label="Complemento" placeholder="Complemento" tamanho="15em" handleChange={(e) => handleInput(e, "endereco.complemento")} />

                    <InputFile name="imagem" label="Selecione uma Imagem" placeholder="Selecione um arquivo" handleChange={handleImageChange} />
                </main>

            </section>

        </form>
    )
}