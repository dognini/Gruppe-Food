/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/pages/restaurant/createRestaurant.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import api from "../../api/api";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import Select from "../../components/form/select";
import HeaderList from "../../layout/header/header";
import { CEPMask, CNPJMask } from "../../layout/mask";
import SelectProps from "../../interfaces/selectProps";
import InputFile from "../../components/form/inputFile";
import RestaurantesProps from "../../interfaces/restaurantesProps";

export default function EditRestaurant() {
    const { id } = useParams();

    const [tipos, setTipos] = useState<SelectProps[]>([]);
    const [restaurante, setRestaurante] = useState<RestaurantesProps>({
        id: 0,
        cnpj: "",
        nome: "",
        tipo: "",
        frete: "",
        imagem: "",
        deliveryTime: "",
        qualidade: "",
        pratos: [{
            id: "",
            nome: "",
            descricao: "",
            img: "",
            preco: "",
            quantidade: 1,
        }],
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
    }, [])


    useEffect(() => {
        api.get(`/restaurantes/${id}`)
            .then((res) => setRestaurante(res.data))
            .catch((error) => console.error("Não foi possível buscar os dados do restaurante: ", error))
    }, [id]);


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

        api.patch(`/restaurantes/${id}`, restaurante)
            .then(() => {
                toast.success("Restaurante atualizado com sucesso!!")
            })
            .catch((error) => {
                toast.error("Não foi possível atualizar o restaurante, tente novamente mais tarde")
                console.error("Não foi possível atualizar o restaurante", error)
            })
    }


    return (
        <form onSubmit={submit}>
            <ToastContainer />

            <header className="header-create-rest">
                <HeaderList to="/restaurantes" titulo={`Editar ${restaurante.nome}`} />

                <Button type="submit" > Salvar </Button>
            </header>

            <section className="form-rest">
                <main>
                    <Input obrigatorio type="text" name="nome" label="Nome" placeholder="Nome" tamanho="20em" value={restaurante.nome} handleChange={(e) => handleInput(e, "nome")} />

                    <Input obrigatorio type="text" name="cnpj" label="CNPJ" placeholder="CNPJ" tamanho="15em" value={CNPJMask(restaurante.cnpj)} handleChange={(e) => handleInput(e, "cnpj")} />

                    <Select obrigatorio name="tipo" label="Tipo" options={tipos} value={restaurante.tipo} handleOnChange={handleSelect} />

                    <Input obrigatorio type="number" name="frete" label="Frete" placeholder="Frete" tamanho="10em" value={restaurante.frete} handleChange={(e) => handleInput(e, "frete")} />

                    <Input obrigatorio type="number" name="deliveryTime" label="Tempo de Entrega" placeholder="Tempo de entrega" tamanho="15em" value={restaurante.deliveryTime} handleChange={(e) => handleInput(e, "deliveryTime")} />

                    <Input obrigatorio type="text" name="cep" label="CEP" placeholder="CEP" tamanho="10em" value={CEPMask(restaurante.endereco.cep)} handleChange={(e) => handleInput(e, "endereco.cep")} />

                    <Input obrigatorio type="text" name="estado" label="Estado" placeholder="Estado" tamanho="15em" value={restaurante.endereco.estado} handleChange={(e) => handleInput(e, "endereco.estado")} />

                    <Input obrigatorio type="text" name="cidade" label="Cidade" placeholder="Cidade" tamanho="15em" value={restaurante.endereco.cidade} handleChange={(e) => handleInput(e, "endereco.cidade")} />

                    <Input obrigatorio type="text" name="bairro" label="Bairro" placeholder="Bairro" tamanho="15em" value={restaurante.endereco.bairro} handleChange={(e) => handleInput(e, "endereco.bairro")} />

                    <Input obrigatorio type="text" name="rua" label="Rua" placeholder="Rua" tamanho="25em" value={restaurante.endereco.rua} handleChange={(e) => handleInput(e, "endereco.rua")} />

                    <Input obrigatorio type="text" name="numero" label="Número" placeholder="Número" tamanho="10em" value={restaurante.endereco.numero} handleChange={(e) => handleInput(e, "endereco.numero")} />

                    <Input obrigatorio type="text" name="complemento" label="Complemento" placeholder="Complemento" value={restaurante.endereco.complemento} tamanho="20em" handleChange={(e) => handleInput(e, "endereco.complemento")} />

                    <InputFile name="imagem" label="Selecione uma Imagem" placeholder="Selecione um arquivo" handleChange={handleImageChange} />

                    {restaurante.imagem && <img src={restaurante.imagem} alt="imagem do restaurante" />}
                </main>
            </section>

        </form>
    )
}