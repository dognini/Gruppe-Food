import "../../styles/components/modal/modalPedido.css";

import ReactModal from "react-modal";
import ModalProps from "../../interfaces/modal";

ReactModal.setAppElement('#root');

const ModalPedido = ({ showModal, closeModal }: ModalProps) => {
    return (
        <section className="modalPedido-container">
            <ReactModal isOpen={showModal} onRequestClose={closeModal} contentLabel="Teste" overlayClassName="modalPedido-overlay" className="modalPedido-content">
                <section> <h1> TESTE </h1> </section>
            </ReactModal>
        </section>
    )
}

export default ModalPedido;