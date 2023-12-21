import { useNavigate } from "react-router-dom"

const DropDown = () => {
    const navigate = useNavigate();

    const exit = () => {
        localStorage.removeItem("usuario")

        navigate("/login")
    }

    return (
        <ul>
            <li> Perfil </li>
            <li onClick={exit}> Sair </li>
        </ul>
    )
}

export default DropDown;