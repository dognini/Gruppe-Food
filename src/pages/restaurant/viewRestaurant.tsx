import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../../api/api";
import Input from "../../components/form/input";
import HeaderList from "../../layout/header/headerList";
import Select from "../../components/form/select";
import InputFile from "../../components/form/inputFile";
import RestaurantesProps from "../../interfaces/restaurantesProps";
import TypesRestaurantsProps from "../../interfaces/typesRestaurantsProps";


export default function ViewRestaurant() {
    const { id } = useParams();

    const [tipos, setTipos] = useState<TypesRestaurantsProps[]>([])
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
            bairro: "",
            rua: "",
            numero: "",
            complemento: "",
        },
    });

    useEffect(() => {
        api.get(`/restaurantes/${id}`)
            .then((res) => setRestaurante(res.data))
            .catch((error) => console.error("Não foi possível buscar os dados do restaurante", error))
    }, [id]);

    useEffect(() => {
        api.get(`/TiposRestaurantes`)
            .then((res) => setTipos(res.data))
            .catch((error) => console.error("Não foi possível buscar os tipos de restaurantes", error))
    }, []);

    return (
        <>

            <HeaderList to="/restaurantes" titulo={`Vizualizar ${restaurante.nome}`} />

            <section className="form-rest">

                <main>
                    <Input type="text" name="nome" label="Nome" tamanho="20em" disable value={restaurante.nome} />

                    <Input type="text" name="cnpj" label="CNPJ" tamanho="15em" disable value={restaurante.cnpj} />

                    <Select name="tipo" label="Tipo" disable options={tipos} value={restaurante.tipo} />

                    <Input type="number" name="frete" label="Frete" tamanho="10em" disable value={restaurante.frete} />

                    <Input type="number" name="deliveryTime" label="Tempo de Entrega" tamanho="12em" disable value={restaurante.deliveryTime} />

                    <Input type="text" name="cep" label="CEP" tamanho="10em" disable value={restaurante.endereco.cep} />

                    <Input type="text" name="estado" label="Estado" tamanho="15em" disable value={restaurante.endereco.estado} />

                    <Input type="text" name="cidade" label="Cidade" tamanho="15em" disable value={restaurante.endereco.cidade} />

                    <Input type="text" name="bairro" label="Bairro" tamanho="15em" disable value={restaurante.endereco.bairro} />

                    <Input type="text" name="rua" label="Rua" tamanho="25em" disable value={restaurante.endereco.rua} />

                    <Input type="number" name="numero" label="Número" tamanho="10em" disable value={restaurante.endereco.numero} />

                    <Input type="text" name="complemento" label="Complemento" tamanho="20em" disable value={restaurante.endereco.complemento} />

                    <InputFile name="imagem" label="Arquivo Selecionado" disable />

                    <img src={restaurante.imagem} alt="imagem do restaurante" />
                </main>

            </section>

        </>
    )
}