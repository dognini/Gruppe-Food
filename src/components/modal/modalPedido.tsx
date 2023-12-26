import ReactModal from "react-modal";
import ModalProps from "../../interfaces/modal";

ReactModal.setAppElement('#root');

const ModalPedido = ({ showModal, closeModal }: ModalProps) => {
    return (
        <ReactModal isOpen={showModal} onRequestClose={closeModal} contentLabel="Teste" overlayClassName="modalPedido-overlay" className="modalPedido-content">
            
        </ReactModal>
    )
}

export default ModalPedido;