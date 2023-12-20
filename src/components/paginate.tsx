import "../styles/components/paginate.css";

import Button from "./form/button"

interface PaginateProps {
    page: number
    totalPage: number
    paginaAnterior: (e: React.MouseEvent<HTMLButtonElement>) => void
    proximaPagina: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Paginate = ({ page, totalPage, paginaAnterior, proximaPagina }: PaginateProps) => {
    return (
        <footer className="paginate">
            <Button onclick={paginaAnterior}> Página Anterior </Button>

            <span> Página {page} de {totalPage} </span>

            <Button onclick={proximaPagina}> Próxima Página </Button>
        </footer>
    )
}

export default Paginate;