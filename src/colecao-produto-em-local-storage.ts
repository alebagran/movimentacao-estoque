import { ColecaoProduto } from "./colecao-produto";
import { Produto } from "./produto";
import { ColecaoEmStorage } from "./colecao-em-storage";

const CHAVE_STORAGE = "produtos";

export class ColecaoProdutoEmLocalStorage
    extends ColecaoEmStorage< Produto >
    implements ColecaoProduto {

    constructor() {
        super( CHAVE_STORAGE );
    }

    async aumentarEstoque( codigo: string, quantidade: number ): Promise< void > {
        let produtos = this.itens();
        const indiceProduto = produtos.findIndex( p => p.codigo === codigo );
        if ( indiceProduto < 0 ) {
            throw new Error( "Produto não encontrado." );
        }
        let p = produtos[ indiceProduto ];
        p.estoque += quantidade;
        produtos.splice( indiceProduto, 1, p );
        this.gravarItens( produtos );
    }

    async diminuirEstoque( codigo: string, quantidade: number ): Promise< void > {
        let produtos = this.itens();
        const indiceProduto = produtos.findIndex( p => p.codigo === codigo );
        if ( indiceProduto < 0 ) {
            throw new Error( "Produto não encontrado." );
        }
        let p = produtos[ indiceProduto ];
        p.estoque -= quantidade;
        produtos.splice( indiceProduto, 1, p );
        this.gravarItens( produtos );
    }

    async produtoComCodigo( codigo: string ): Promise< Produto | null > {
        let produtos = this.itens();
        return this.encontrarProdutoComCodigo( produtos, codigo );
    }

    private encontrarProdutoComCodigo( produtos: Produto[], codigo: string ): Produto | null {
        return produtos.find( p => p.codigo === codigo ) || null;
    }

}
