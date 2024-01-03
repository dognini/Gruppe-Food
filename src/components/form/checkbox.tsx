interface CheckBoxProps {
    checked?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <label> Favoritar Endereço </label>
        </div>
    )
}

export default CheckBox;