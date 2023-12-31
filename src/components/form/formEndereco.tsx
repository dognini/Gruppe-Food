import "../../styles/components/form/formEndereco.css";

import Input from "./input";
import Select from "./select";
import Button from "./button";
import CheckBox from "./checkbox";
import SelectProps from "../../interfaces/selectProps";
import { EnderecosUsersProps } from "../../interfaces/usersProps";

interface FormEnderecoProps {
    checked: boolean
    typesEnderecos: SelectProps[]
    endereco: EnderecosUsersProps
    submit: (event: React.FormEvent<HTMLFormElement>) => void
    handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void
}

const FormEndereco = ({ typesEnderecos, endereco, checked, handleChange, handleOnChange, submit, handleCheckbox }: FormEnderecoProps) => {
    return (
        <form onSubmit={submit} className="form">

            <section>
                <Input obrigatorio name="cep" label="CEP" placeholder="CEP" tamanho="10em" value={endereco?.cep} handleChange={(e) => handleChange(e, "cep")} />

                <Input obrigatorio name="estado" label="Estado" placeholder="Estado" tamanho="10em" value={endereco?.estado} handleChange={(e) => handleChange(e, "estado")} />

                <Input obrigatorio name="cidade" label="Cidade" placeholder="Cidade" tamanho="16em" value={endereco?.cidade} handleChange={(e) => handleChange(e, "cidade")} />

                <Input obrigatorio name="bairro" label="Bairro" placeholder="Bairro" tamanho="16em" value={endereco?.bairro} handleChange={(e) => handleChange(e, "bairro")} />

                <Input obrigatorio name="rua" label="Rua" placeholder="Rua" tamanho="20em" value={endereco?.rua} handleChange={(e) => handleChange(e, "rua")} />

                <Input obrigatorio name="numero" label="Número" placeholder="Número" tamanho="8em" value={endereco?.numero} handleChange={(e) => handleChange(e, "numero")} />

                <Input obrigatorio name="complemento" label="Complemento" placeholder="Complemento" tamanho="20em" value={endereco?.complemento} handleChange={(e) => handleChange(e, "complemento")} />

                <Select obrigatorio name="TypeEndereco" label="Tipo de Endereço" options={typesEnderecos} value={endereco?.TypeEndereco} handleOnChange={handleOnChange} />

                <CheckBox checked={checked} onChange={handleCheckbox} />
            </section>

            <Button type="submit"> Salvar </Button>
        </form>
    )
}

export default FormEndereco;