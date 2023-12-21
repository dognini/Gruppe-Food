import "../../styles/components/card/pratoCard.css";

import { PratosProps } from "../../interfaces/restaurantesProps";
import TruncateText from "../../layout/truncateText";

interface PratoCardProps {
    dados?: PratosProps[]
    handleRemove: (event: string) => void;
}

const PratoCard = ({ dados, handleRemove }: PratoCardProps) => {
    return (
        <>
            {dados?.map((item, index) => (

                <div key={index} className="card-prato">
                    <section className="card-imagem-prato">
                        <img src={`${item.img}`} alt={`Logo do restaurante `} />
                    </section>

                    <section className="info-prato">
                        <h3> {item?.nome} </h3>
                        <TruncateText delay={100} maxChars={26} text={item.descricao} />
                    </section>

                    <section className="card-actions">
                        <button onClick={() => handleRemove(item.id)} > Adicionar ao Carrinho </button>
                    </section>
                </div>

            ))}
        </>
    )
}

export default PratoCard;