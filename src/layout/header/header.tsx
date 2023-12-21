import "../../styles/layout/header.css";

import { Link } from "react-router-dom";

import ReturnArrow from "../returnArrow";
import Button from "../../components/form/button";

interface HeaderProps {
    to: string
    titulo: string
    labelBTN: string
    btnLink: string
    placeHolderBTN: string
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = ({ to, titulo, labelBTN, btnLink, handleChange, placeHolderBTN }: HeaderProps) => {
    return (
        <header className="header">

            <div>
                <ReturnArrow to={to} />
                <h1> {titulo} </h1>
            </div>

            <div>
                <input type='search' placeholder={placeHolderBTN} onChange={(e) => handleChange && handleChange(e)} />

                <Link to={btnLink}>
                    <Button> {labelBTN} </Button>
                </Link>
            </div>

        </header>
    )
}

export default Header;