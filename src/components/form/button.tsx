import "../../styles/components/form/button.css";

interface BTNProps {
    children: React.ReactNode
    type?: "button" | "submit" | "reset"
    onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ type, children, onclick }: BTNProps) => {
    return (
        <button className="button" onClick={onclick} type={type}>
            {children}
        </button>
    )
}

export default Button;