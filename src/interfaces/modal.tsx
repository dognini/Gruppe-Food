/* eslint-disable @typescript-eslint/no-explicit-any */
import CarteiraProps from "./carteiraProps"
import { EnderecosUsersProps } from "./usersProps"

export default interface ModalProps {
    onComprar?: () => void
    showModal: boolean
    closeModal: () => void
    carteira?: CarteiraProps[]
    endereco?: EnderecosUsersProps[]
}