import "../styles/components/returnArrow.css";

import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ArrowProps {
    to: string
}

const ReturnArrow = ({ to }: ArrowProps) => {
    return (
        <header className="arrow">
            <Link to={`${to}`}>
                <FaArrowLeftLong />
            </Link>
        </header>
    )
}

export default ReturnArrow;