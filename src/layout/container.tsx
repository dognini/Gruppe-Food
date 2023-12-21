import NavBar from "./nav-bar/navBar";

import { Outlet } from "react-router-dom";

const Container = () => {
    return (
        <section>
            <header>
                <NavBar />
            </header>

            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default Container;