import "../../styles/components/form/inputFile.css";

interface InputFileProps {
    name: string
    label: string
    placeholder?: string
    value?: string
    disable?: boolean
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void
}

const InputFile = ({ name, label, placeholder, value, disable, handleChange }: InputFileProps) => {
    return (
        <div className="input_file">
            <label htmlFor={name}> {label} </label>
            <input
                type="file"
                id={name}
                name={name}
                disabled={disable}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange && handleChange(e, name)}
            />
        </div>
    )
}

export default InputFile;