import { MovimentacaoEstoque } from "./movimentacao-estoque";
import { ColecaoProduto } from "./colecao-produto";
import { TipoME } from "./tipo-me";
import { ColecaoMovimentacaoEstoque } from "./colecao-movimentacao-estoque";
import { ItemME } from "./item-me";
import { ServicoError } from "./servico-error";

export class ServicoMovimentacaoEstoque {

    private me: MovimentacaoEstoque = new MovimentacaoEstoque();

    constructor(
        private colecaoProduto: ColecaoProduto,
        private colecaoMovEstoque: ColecaoMovimentacaoEstoque
        ) {
    }

    async adicionarItem(
        quantidade: number,
        codigoProduto: string,
        tipo: TipoME = TipoME.ENTRADA
    ): Promise< ItemME > {

        if ( quantidade <= 0 ) {
            throw new ServicoError( 'Quantidade deve ser um número positivo.', 'quantidade' );
        }

        if ( codigoProduto.length <= 0 ) {
            throw new ServicoError( 'Por favor, informe um produto.', 'codigoProduto' );
        }

        const produto = await this.colecaoProduto.produtoComCodigo( codigoProduto );
        if ( ! produto ) {
            throw new ServicoError( 'Produto não encontrado.', 'codigoProduto' );
        }

        const item = new ItemME( produto, quantidade, tipo );
        this.me.adicionarItem( item );
        return item;
}

    numeroItens(): number {
        return this.me.itens.length;
    }

    async processar( me: MovimentacaoEstoque ): Promise< void > {
        await this.colecaoMovEstoque.adicionar( me );
        for ( const item of me.itens ) {
            if ( item.tipo === TipoME.ENTRADA ) {
                this.colecaoProduto.aumentarEstoque( item.produto.codigo, item.quantidade );
            } else {
                this.colecaoProduto.diminuirEstoque( item.produto.codigo, item.quantidade );
            }
        }
    }
}