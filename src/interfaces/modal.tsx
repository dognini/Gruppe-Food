import CarteiraProps from "./carteiraProps"
import { EnderecosUsersProps } from "./usersProps"

export default interface ModalProps {
    showModal: boolean
    closeModal: () => void
    carteira?: CarteiraProps[]
    endereco?: EnderecosUsersProps[]
}