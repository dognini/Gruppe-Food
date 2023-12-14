import "../styles/layout/header.css";

import ReturnArrow from "./returnArrow"

interface HeaderProps {
    to: string
    titulo: string
}

const HeaderList = ({ to, titulo }: HeaderProps) => {
    return (
        <header className="header">
            <div>
                <ReturnArrow to={to} />
                <h1> {titulo} </h1>
            </div>
        </header>
    )
}

export default HeaderList;