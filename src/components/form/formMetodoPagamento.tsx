import "../../styles/components/form/formMetodoPagamento.css";

import Input from "./input";
import Button from "./button";
import Select from "./select";
import metodoPagamentoProps from "../../interfaces/typesMetodoPagamento";

interface FormMetodoPagamentoProps {
    TypesMetodoPagamento: metodoPagamentoProps[]
    submit: (event: React.FormEvent<HTMLFormElement>) => void
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void
}

const FormMetodoPagamento = ({ TypesMetodoPagamento, submit, handleInputChange, handleSelect }: FormMetodoPagamentoProps) => {
    return (
        <form onSubmit={submit} className="formMetodoPagamento">
            <section>
                <Select name="typeCard" label="Tipo de cartão" options={TypesMetodoPagamento} handleOnChange={handleSelect} />

                <Input name="numero" label="Número do cartão" placeholder="Número do cartão" tamanho="10em" type="number" handleChange={(e) => handleInputChange(e, 'numero')} />

                <Input name="validade" label="Data de Validade" placeholder="Data de Validade" tamanho="10em" type="number" handleChange={(e) => handleInputChange(e, 'validade')} />

                <Input name="cvv" label="CVV" placeholder="CVV" tamanho="10em" type="number" handleChange={(e) => handleInputChange(e, 'cvv')} />

                <Input name="titular" label="Titular" placeholder="Nome do Titular" tamanho="20em" type="text" handleChange={(e) => handleInputChange(e, 'titular')} />

                <Input name="cpf" label="CPF" placeholder="CPF" tamanho="12em" type="number" handleChange={(e) => handleInputChange(e, 'cpf')} />

                <Input name="apelido" label="Apelido do cartão" placeholder="Apelido do cartão" type="text" tamanho="20em" handleChange={(e) => handleInputChange(e, 'apelido')} />
            </section>

            <Button type="submit"> Salvar </Button>
        </form>
    )
}

export default FormMetodoPagamento;