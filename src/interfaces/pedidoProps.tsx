import { PratosProps } from "./restaurantesProps"

export default interface PedidosProps {
    id: string
    data: string
    restaurante: string
    status: string
    pratos: PratosProps[]
    metodoPagamento: string
    valor: number
}