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

export default interface UsersProps {
    id: number
    nome: string
    telefone: string
    email: string
    senha: string
    typeUser: string
    pedidos: PedidosProps[]
    carteira: []
}