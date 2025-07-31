import Estoque from "../model/Estoque"

interface ProdutoRequest{
    codigo : string
    nome : string
    estoque : Estoque
}

export default ProdutoRequest;