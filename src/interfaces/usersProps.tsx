import PedidosProps from "./pedidoProps"
import CarteiraProps from "./carteiraProps"
export interface EnderecosUsersProps {
    id: string
    cep: string
    estado: string
    cidade: string
    bairro: string
    rua: string
    numero: string
    complemento: string
    favorito: boolean
    TypeEndereco: string
}

export default interface UsersProps {
    id: number
    nome: string
    telefone: string
    email: string
    senha: string
    typeUser: string
    pedidos: PedidosProps[]
    carteira: CarteiraProps[]
    enderecos: EnderecosUsersProps[]
}