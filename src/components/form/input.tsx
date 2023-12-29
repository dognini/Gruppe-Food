import "../../styles/components/form/inputLabel.css";

interface InputLabelProps {
    type?: string
    name: string
    label?: string
    disable?: boolean
    placeholder?: string
    tamanho?: string
    value?: string
    obrigatorio?: boolean
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void
}

const Input = ({ type, name, label, placeholder, tamanho, value, disable, obrigatorio, handleChange }: InputLabelProps) => {
    return (
        <div className="input_label">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                disabled={disable}
                required={obrigatorio}
                value={value}
                placeholder={placeholder}
                style={{ width: tamanho }}
                autoComplete={"current-password"}
                onChange={(e) => handleChange && handleChange(e, name)}
            />
        </div>
    );
};

export default Input;