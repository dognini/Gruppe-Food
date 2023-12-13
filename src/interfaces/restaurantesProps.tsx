export interface PratosProps {
    id: string
    nome: string
    descricao: string
    img: string
    preco: string
    quantidade: number
}

export interface EnderecoRestauranteProps {
    cep: string
    cidade: string
    estado: string
    rua: string
    numero: string
    complemento: string
}

export default interface RestaurantesProps {
    id: number
    cnpj: string
    nome: string
    tipo: string
    frete: string
    imagem: string
    deliveryTime: string
    qualidade: string
    pratos?: PratosProps[]
    endereco: EnderecoRestauranteProps
}