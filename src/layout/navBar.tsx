import "../styles/layout/NavBar.css";

import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const NavBar = () => {
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

                <Link to={'/create-user'}>
                    <span>
                        + Usuários
                    </span>
                </Link>

                <Link to={'/create-restaurant'}>
                    <span>
                        + Restaurante
                    </span>
                </Link>

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