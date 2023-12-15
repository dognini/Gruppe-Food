import "../styles/layout/NavBar.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import UsersProps from "../interfaces/usersProps";

const NavBar = () => {
    const [user, setUser] = useState<UsersProps>();

    useEffect(() => {

        const localUSer = localStorage.getItem('usuario');
        const user = localUSer ? JSON.parse(localUSer) : null;

        setUser(user);
    }, []);

    return (
        <header className="nav_bar_container">

            <section className="nav_bar_logo">
                <img src="/images/logo.png" alt="imagem da logo do gruppe food" />
                <p>Gruppe Food</p>
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

                <Link to={'/login'}>
                    <button>
                        <FaUserCircle />
                    </button>
                </Link>

            </section>

        </header>
    )
}

export default NavBar;