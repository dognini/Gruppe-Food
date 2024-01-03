import "../../styles/components/form/formMetodoPagamento.css";

import Input from "./input";
import Button from "./button";
import Select from "./select";
import CheckBox from "./checkbox";
import { CPFMask } from "../../layout/mask";
import SelectProps from "../../interfaces/selectProps";
import CarteiraProps from "../../interfaces/carteiraProps";

interface FormMetodoPagamentoProps {
    value: CarteiraProps
    TypesMetodoPagamento: SelectProps[]
    submit: (event: React.FormEvent<HTMLFormElement>) => void
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void
}

const FormMetodoPagamento = ({ value, TypesMetodoPagamento, handleCheckbox, submit, handleInputChange, handleSelect }: FormMetodoPagamentoProps) => {
    return (
        <form onSubmit={submit} className="formMetodoPagamento">
            <section>
                <Select obrigatorio name="typeCard" label="Tipo de cartão" options={TypesMetodoPagamento} value={value.typeCard} handleOnChange={handleSelect} />

                <Input obrigatorio name="numero" label="Número do cartão" placeholder="Número do cartão" tamanho="10em" type="number" value={value.numero} handleChange={(e) => handleInputChange(e, 'numero')} />

                <Input obrigatorio name="validade" label="Data de Validade" placeholder="Data de Validade" tamanho="10em" type="month" value={value.validade} handleChange={(e) => handleInputChange(e, 'validade')} />

                <Input obrigatorio name="cvv" label="CVV" placeholder="CVV" tamanho="10em" type="number" value={value.cvv} handleChange={(e) => handleInputChange(e, 'cvv')} />

                <Input obrigatorio name="titular" label="Titular" placeholder="Nome do Titular" tamanho="20em" type="text" value={value.titular} handleChange={(e) => handleInputChange(e, 'titular')} />

                <Input obrigatorio name="cpf" label="CPF" placeholder="CPF" tamanho="12em" type="text" value={CPFMask(value.cpf)} handleChange={(e) => handleInputChange(e, 'cpf')} />

                <Input name="apelido" label="Apelido do cartão" placeholder="Apelido do cartão" type="text" tamanho="20em" value={value.apelido} handleChange={(e) => handleInputChange(e, 'apelido')} />

                <CheckBox checked={value.favorito} onChange={handleCheckbox} />
            </section>

            <Button type="submit"> Salvar </Button>
        </form>
    )
}

export default FormMetodoPagamento;