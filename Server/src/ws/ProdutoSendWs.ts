import Estoque from "../model/Estoque";

interface ProdutoSend{
    codigo : string
    nome : string
    estoque : Estoque
    horarioAlteracao : Date
}

export default ProdutoSend;