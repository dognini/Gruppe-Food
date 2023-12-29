import "../../styles/components/modal/modalNav.css"

import ReactModal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

import ModalProps from "../../interfaces/modal";

ReactModal.setAppElement('#root');

const ModalNav = ({ showModal, closeModal }: ModalProps) => {
    const navigate = useNavigate();

    const exit = () => {
        localStorage.removeItem("usuario")

        navigate("/login")
    }

    return (
        <ReactModal isOpen={showModal} onRequestClose={closeModal} contentLabel="Teste" overlayClassName="modalNav-overlay" className="modalNav-content">
            <ul>
                <li>
                    <Link to="/meus-pedidos"> Meus Pedidos </Link>
                </li>

                <li>
                    <Link to="/carteira"> Carteira </Link>
                </li>

                <li>
                    <Link to="/enderecos"> Endereços </Link>
                </li>

                <li onClick={exit}>
                    Sair
                </li>
            </ul>
        </ReactModal>
    )
}

export default ModalNav;