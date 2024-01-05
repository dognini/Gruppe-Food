import "../../styles/components/modal/modalPedido.css";

import Button from "../form/button";
import ReactModal from "react-modal";
import ModalProps from "../../interfaces/modal";
import CardEndereco from "../card/cardEndereco";
import CardCarteira from "../card/cardCarteira";

ReactModal.setAppElement('#root');

const ModalPedido = ({ showModal, closeModal, endereco, carteira, onComprar }: ModalProps) => {
    return (
        <ReactModal isOpen={showModal} onRequestClose={closeModal} contentLabel="Teste" overlayClassName="modalPedido-overlay" className="modalPedido-content">
            <section className="section_modal_pedido">

                <div>
                    <h3> Endereço: </h3>

                    {
                        endereco?.map((enderecoItem) => (
                            <CardEndereco key={enderecoItem.id} dados={enderecoItem} />
                        ))
                    }

                </div>

                <div>
                    <h3> Forma de Pagamento: </h3>

                    {
                        carteira?.map((carteiraItem) => (
                            <CardCarteira key={carteiraItem.id} item={carteiraItem} />
                        ))
                    }

                </div>

                <Button onclick={onComprar}> Comprar </Button>
            </section>
        </ReactModal>
    )
}

export default ModalPedido;