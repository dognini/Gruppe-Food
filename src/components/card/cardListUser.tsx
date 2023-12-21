import "../../styles/components/card/cardList.css";

import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

import { FONEMask } from "../../layout/mask";
import { MdDelete, MdEdit } from "react-icons/md";
import UsersProps from "../../interfaces/usersProps";

interface CardListUserProps {
    item: UsersProps
    remove: (id: number) => void;
}

const CardListUser = ({ item, remove }: CardListUserProps) => {
    return (
        <div className="container-card">

            <div>
                <span>
                    {item.typeUser === "Usuário" && <FaUserAlt />}  {item.typeUser === "Administrador" && <FaUserCog />}
                </span>
            </div>

            <p> Nome: <span> {item.nome} </span> </p>
            <p> E-mail: <span> {item.email} </span> </p>
            <p> Telefone: <span> {FONEMask(item.telefone)} </span> </p>
            <p> Usuário: <span> {item.typeUser} </span> </p>

            <section>
                <button> <Link to={`/view-user/${item.id}`}> <FaEye /> </Link> </button>

                <button> <Link to={`/edit-user/${item.id}`}> <MdEdit /> </Link> </button>

                <button onClick={() => remove(item.id)} > <MdDelete /> </button>
            </section>

        </div>
    )
}

export default CardListUser;