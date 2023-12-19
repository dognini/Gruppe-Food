import "../styles/components/formPratos.css";

import Input from "./form/input";
import Button from "./form/button";
import InputFile from "./form/inputFile";
import { PratosProps } from "../interfaces/restaurantesProps";

interface FormPratosProps {
    dados?: PratosProps
    submit: (event: React.FormEvent<HTMLFormElement>) => void
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void
}

const FormPratos = ({ dados, handleInputChange, handleImageChange, submit }: FormPratosProps) => {
    return (
        <form onSubmit={submit} className="form">
            <section>
                <Input type="text" name="nome" label="Nome" placeholder="Nome" tamanho="15em" handleChange={(e) => handleInputChange(e, "nome")} />

                <Input type="number" name="preco" label="Preço" placeholder="Preço" tamanho="10em" handleChange={(e) => handleInputChange(e, "preco")} />

                <Input type="text" name="descricao" label="Descrição" placeholder="Descrição do prato" tamanho="30em" handleChange={(e) => handleInputChange(e, "descricao")} />

                <InputFile name="img" label="Selecione um arquivo" placeholder="Selecione um arquivo" handleChange={handleImageChange} />

                {dados?.img && <img src={dados?.img} alt="Imagem do prato" />}
            </section>

            <Button type="submit"> Cadastrar </Button>
        </form>
    )
}

export default FormPratos;