import CarteiraProps from "./carteiraProps"
import RestaurantesProps from "./restaurantesProps"

export interface PedidosProps {
    id: string
    img: string
    nome: string
    preco: string
    descricao: string
    quantidade: number
    dataAdicao: string
    restaurante: RestaurantesProps
}

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