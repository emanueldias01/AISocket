import Produto from "../model/Produto";
import fs from 'fs'

class ProdutoRepository{

    private static readonly pathJson = "./Server/src/repository/estoque.json";

    static async getAllProdutos() : Promise<Produto[]> {
        const data = fs.readFileSync(this.pathJson, "utf-8");
        const list : Produto[] = JSON.parse(data);

        return list;
    }

    static async saveProduto(produto : Produto) : Promise<Produto | null>{
        const data = fs.readFileSync(this.pathJson, "utf-8");
        const list : Produto[] = JSON.parse(data);

        const search = list.find(p => p.nome === produto.nome);
        if(search) return null;

        list.push(produto);

        fs.writeFileSync(this.pathJson, JSON.stringify(list, null, 2), "utf-8");
        return produto;
    }

    static async updateProduto(produto : Produto) : Promise<Produto | null>{
        const data = fs.readFileSync(this.pathJson, "utf-8");
        const list : Produto[] = JSON.parse(data);

        const search = list.find(p => p.nome === produto.nome);
        if(!search) return null;

        search.nome = produto.nome != null ? produto.nome : search.nome;
        search.estoque.ativo = produto.estoque.ativo != null ? produto.estoque.ativo : search.estoque.ativo ;
        search.estoque.quantidade = produto.estoque.quantidade != null ? produto.estoque.quantidade : search.estoque.quantidade ;
        search.estoque.localizacao = produto.estoque.localizacao != null ? produto.estoque.localizacao : search.estoque.localizacao ;

        fs.writeFileSync(this.pathJson, JSON.stringify(list, null, 2), "utf-8");
        return produto;
    }

    static async deleteProduto(nome : string) : Promise<Produto | null> {
        const data = fs.readFileSync(this.pathJson, "utf-8");
        const list : Produto[] = JSON.parse(data);

        const index = list.findIndex(p => p.nome === nome);

        if(index === -1) return null;

        const produto = list[index];
        list.splice(index, 1);

        fs.writeFileSync(this.pathJson, JSON.stringify(list, null, 2), "utf-8");
        return produto;
    }

}

export default ProdutoRepository;