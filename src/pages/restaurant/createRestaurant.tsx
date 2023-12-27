/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/pages/restaurant/createRestaurant.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import api from "../../api/api";
import apiCEP from "../../api/apiCEP";
import HeaderList from "../../layout/header/header";
import Button from "../../components/form/button";
import Select from "../../components/form/select";
import InputLabel from "../../components/form/input";
import { CEPMask, CNPJMask } from "../../layout/mask";
import InputFile from "../../components/form/inputFile";
import RestaurantesProps from "../../interfaces/restaurantesProps";
import TypesRestaurantsProps from "../../interfaces/typesRestaurantsProps";

export default function CreateRestaurant() {
    const navigate = useNavigate();

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
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            complemento: "",
        },
    });


    useEffect(() => {
        api.get('/tiposRestaurantes')
            .then((res) => setTipos(res.data))
            .catch((error) => console.error("Não foi possível buscar os tipos dos restaurantes", error));
    }, []);


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
    };


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectTypeRestaurant = event.target.value;

        setRestaurante((prevState) => ({
            ...prevState,
            tipo: selectTypeRestaurant
        }))
    };


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
    };


    const buscaCEP = async () => {
        const CEP = restaurante.endereco.cep.replace(/\D/g, "");

        if (CEP.length === 8) {

            await apiCEP.get(`/${CEP}/json/`)
                .then((res) => {
                    setRestaurante((prevState) => ({
                        ...prevState,
                        endereco: {
                            ...prevState?.endereco,
                            cep: res?.data?.cep,
                            estado: res?.data?.uf,
                            cidade: res?.data?.localidade,
                            bairro: res?.data?.bairro,
                            rua: res?.data?.logradouro,
                            numero: res?.data?.numero,
                            complemento: res?.data?.complemento,
                        },
                    }));
                })
                .catch((error) => console.error("Não foi possível buscar os dados do cep", error))
        }
    };


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        api.post("/restaurantes", restaurante)
            .then(() => {
                toast.success("Restaurante cadastrado com sucesso!!")

                setTimeout(() => {
                    navigate('/restaurantes')
                }, 3000)

            })
            .catch((error) => {
                toast.error("Não foi possível cadastrar o restaurante, tente novamente mais tarde")
                console.error("Não foi possível cadastrar o restaurante", error)
            })
    };


    useEffect(() => {
        buscaCEP();
    }, [restaurante.endereco.cep]);

    return (
        <form onSubmit={submit}>
            <ToastContainer />

            <header className="header-create-rest">
                <HeaderList to="/restaurantes" titulo="Cadastro de Restaurante:" />

                <Button type="submit" children="Cadastrar" />
            </header>

            <section className="form-rest">

                <main>
                    <InputLabel type="text" name="nome" label="Nome" placeholder="Nome" tamanho="20em" handleChange={(e) => handleInput(e, "nome")} />

                    <InputLabel type="text" name="cnpj" label="CNPJ" placeholder="CNPJ" tamanho="15em" value={CNPJMask(restaurante.cnpj)} handleChange={(e) => handleInput(e, "cnpj")} />

                    <Select name="tipo" label="Tipo" options={tipos} handleOnChange={handleSelect} />

                    <InputLabel type="number" name="frete" label="Frete" placeholder="Frete" tamanho="10em" handleChange={(e) => handleInput(e, "frete")} />

                    <InputLabel type="number" name="deliveryTime" label="Tempo de Entrega" placeholder="Tempo de entrega" tamanho="15em" handleChange={(e) => handleInput(e, "deliveryTime")} />

                    <InputLabel type="text" name="cep" label="CEP" placeholder="CEP" tamanho="12em" value={CEPMask(restaurante.endereco.cep)} handleChange={(e) => handleInput(e, "endereco.cep")} />

                    <InputLabel type="text" name="estado" label="Estado" placeholder="Estado" tamanho="15em" value={restaurante.endereco.estado} handleChange={(e) => handleInput(e, "endereco.estado")} />

                    <InputLabel type="text" name="cidade" label="Cidade" placeholder="Cidade" tamanho="15em" value={restaurante.endereco.cidade} handleChange={(e) => handleInput(e, "endereco.cidade")} />

                    <InputLabel type="text" name="bairro" label="Bairro" placeholder="Bairro" tamanho="15em" value={restaurante.endereco.bairro} handleChange={(e) => handleInput(e, "endereco.bairro")} />

                    <InputLabel type="text" name="rua" label="Rua" placeholder="Rua" tamanho="25em" value={restaurante.endereco.rua} handleChange={(e) => handleInput(e, "endereco.rua")} />

                    <InputLabel type="number" name="numero" label="Número" placeholder="Número" tamanho="10em" value={restaurante.endereco.numero} handleChange={(e) => handleInput(e, "endereco.numero")} />

                    <InputLabel type="text" name="complemento" label="Complemento" placeholder="Complemento" tamanho="20em" value={restaurante.endereco.complemento} handleChange={(e) => handleInput(e, "endereco.complemento")} />

                    <InputFile name="imagem" label="Selecione uma Imagem" placeholder="Selecione um arquivo" handleChange={handleImageChange} />

                    {restaurante.imagem && <img src={restaurante.imagem} alt="imagem do restaurante" />}
                </main>

            </section>

        </form>
    )
}