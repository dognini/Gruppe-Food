import "../../styles/layout/nav-bar/NavBar.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import UsersProps from "../../interfaces/usersProps";
import ModalNav from "../../components/modal/modalNav";

const NavBar = () => {
    const [user, setUser] = useState<UsersProps>();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const localUSer = localStorage.getItem('usuario');
        const user = localUSer ? JSON.parse(localUSer) : null;

        setUser(user);
    }, []);

    const toggleModal = () => {
        setShowModal(prevState => !prevState)
    }

    const FecharModal = () => {
        setShowModal(false)
    }

    return (
        <>

            <header className="nav_bar_container">

                <section className="nav_bar_logo">
                    <img src="/images/logo.png" alt="imagem da logo do gruppe food" />
                    <p> Gruppe Food </p>
                </section>

                <section className="nav_bar_cart">

                    <Link to={'/'}>
                        <span>
                            Home
                        </span>
                    </Link>

                    {user?.typeUser === 'Administrador' &&
                        <>
                            <Link to={'/usuarios'}>
                                <span>
                                    + Usuários
                                </span>
                            </Link>

                            <Link to={'/restaurantes'}>
                                <span>
                                    + Restaurante
                                </span>
                            </Link>
                        </>
                    }

                    <Link to={'/carrinho'}>
                        <button>
                            <IoCartOutline />
                        </button>
                    </Link>

                    <button onClick={toggleModal}>
                        <FaUserCircle />
                    </button>

                </section>

            </header>

            {showModal && <ModalNav closeModal={FecharModal} showModal={true} />}
        </>
    )
}

export default NavBar;