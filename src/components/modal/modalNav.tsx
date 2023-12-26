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
        <section className="modalNav-container">
            <ReactModal isOpen={showModal} onRequestClose={closeModal} contentLabel="Teste" overlayClassName="modalNav-overlay" className="modalNav-content">
                <ul>
                    <li>
                        <Link to="/perfil"> Perfil </Link>
                    </li>

                    <li>
                        <Link to="/meus-pedidos"> Meus Pedidos </Link>
                    </li>

                    <li>
                        <Link to="/carteira"> Carteira </Link>
                    </li>

                    <li>
                        <Link to="/endereco"> Endereço </Link>
                    </li>

                    <li onClick={exit}> Sair </li>
                </ul>
            </ReactModal>
        </section>
    )
}

export default ModalNav;