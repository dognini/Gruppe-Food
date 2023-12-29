import "../../styles/components/form/select.css";

import { ChangeEvent } from "react";
import InterfaceSelectProps from "../../interfaces/selectProps";

interface SelectProps {
    name: string
    label: string
    tamanho?: string
    value?: string
    disable?: boolean
    obrigatorio?: boolean
    options: InterfaceSelectProps[]
    handleOnChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ label, options, name, tamanho, value, disable, obrigatorio, handleOnChange }: SelectProps) => {
    return (
        <div className="select">
            <label> {label} </label>

            <select required={obrigatorio} value={value} onChange={handleOnChange} name={name} disabled={disable} style={{ width: tamanho }}>
                <option key="default" value=""> Selecione um tipo </option>

                {options.map((item, index) => (
                    <option value={item.nome} key={index}> {item.nome} </option>
                ))}

            </select>
        </div>
    )
}

export default Select;