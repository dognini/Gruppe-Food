import "../styles/layout/header.css";

import { Link } from "react-router-dom";

import ReturnArrow from "./returnArrow"
import Button from "../components/form/button";

interface HeaderProps {
    to: string
    titulo: string
    labelBTN: string
    btnLink: string
    typeBTN?: "button" | "submit" | "reset"
}

const Header = ({ to, titulo, labelBTN, btnLink}: HeaderProps) => {
    return (
        <header className="header">
            <div>
                <ReturnArrow to={to} />
                <h1> {titulo} </h1>
            </div>

            <Link to={btnLink}>
                <Button> {labelBTN} </Button>
            </Link>
        </header>
    )
}

export default Header;