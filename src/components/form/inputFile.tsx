import "../../styles/components/form/inputFile.css";

interface InputFileProps {
    name: string;
    label: string;
    placeholder: string;
    value?: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}

const InputFile = ({ name, label, placeholder, value, handleChange }: InputFileProps) => {
    return (
        <div className="input_file">
            <label htmlFor={name}> {label} </label>
            <input
                type="file"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(e, name)}
            />
        </div>
    )
}

export default InputFile;