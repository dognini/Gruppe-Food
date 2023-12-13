import "../../styles/components/form/select.css";

import { ChangeEvent } from "react";
import TypesRestaurantsProps from "../../interfaces/typesRestaurantsProps";

interface SelectProps {
    name: string
    label: string
    tamanho?: string
    options: TypesRestaurantsProps[]
    handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ label, options, name, tamanho, handleOnChange }: SelectProps) => {
    return (
        <div className="select">
            <label> {label} </label>

            <select onChange={handleOnChange} name={name} style={{ width: tamanho }}>
                <option key="default" value=""> Selecione um tipo </option>

                {options.map((item, index) => (
                    <option value={item.nome} key={index}> {item.nome} </option>
                ))}

            </select>
        </div>
    )
}

export default Select;