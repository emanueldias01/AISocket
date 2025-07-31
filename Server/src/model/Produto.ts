import Estoque from "./Estoque";

interface Produto{
    codigo : string
    nome : string
    estoque : Estoque
    horarioAlteracao : string
}

export default Produto;