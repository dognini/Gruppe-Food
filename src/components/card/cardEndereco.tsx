import "../../styles/components/card/cardEndereco.css";

import { IoHome } from "react-icons/io5";
import { RiCupFill } from "react-icons/ri";
import { EnderecosUsersProps } from "../../interfaces/usersProps";

interface CardEnderecoProps {
    dados: EnderecosUsersProps
}

const CardEndereco = ({ dados }: CardEnderecoProps) => {
    return (
        <div className="card_endereco">
            <span>
                {dados.TypeEndereco === 'Casa' ? <IoHome/> : <RiCupFill/>}
            </span>

            <ul className="card_endereco_list">
                <li> <b> {dados.TypeEndereco} </b> </li>
                <li> <p> {dados.rua} </p> </li>
                <li> <p> {dados.bairro} </p> </li>
                <li> <p> {dados.cidade}/{dados.estado} </p> </li>
                <li> <p> {dados.complemento} </p> </li>
            </ul>
        </div>
    )
}

export default CardEndereco;