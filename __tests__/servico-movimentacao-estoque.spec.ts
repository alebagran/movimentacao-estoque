import { MovimentacaoEstoque } from "../src/movimentacao-estoque";
import { TipoME } from "../src/tipo-me";
import { ItemME } from "../src/item-me";
import { Produto } from "../src/produto";
import { ServicoMovimentacaoEstoque } from "../src/servico-movimentacao-estoque";
import { ColecaoProduto } from "../src/colecao-produto";
import { ColecaoProdutoEmLocalStorage } from "../src/colecao-produto-em-local-storage";
import { ColecaoMovimentacaoEstoque } from "../src/colecao-movimentacao-estoque";
import { ColecaoMovimentacaoEstoqueEmLocalStorage } from "../src/colecao-movimentacao-estoque-em-local-storage";

describe( 'ServicoMovimentacaoEstoque', () => {

    let servico: ServicoMovimentacaoEstoque; // sob teste

    const colecaoProduto: ColecaoProduto = new ColecaoProdutoEmLocalStorage();
    const colecaoMovEstoque: ColecaoMovimentacaoEstoque = new ColecaoMovimentacaoEstoqueEmLocalStorage();

    const codProduto1 = "000001";
    const codProduto2 = "000002";
    const produto1 = new Produto( 1, codProduto1, "Coca-cola 2L", 50 );
    const produto2 = new Produto( 2, codProduto2, "Pepsi 2L", 20 );

    beforeEach( async () => {
        servico = new ServicoMovimentacaoEstoque( colecaoProduto, colecaoMovEstoque );

        await colecaoProduto.esvaziar();
        await colecaoProduto.adicionar( produto1 );
        await colecaoProduto.adicionar( produto2 );

        await colecaoMovEstoque.esvaziar();
    } );

    it( 'não adiciona item com quantidade zero', async () => {
        await expect(
            servico.adicionarItem( 0, codProduto1, TipoME.ENTRADA )
        ).rejects.toThrowError( /número positivo/ );
    } );

    it( 'não adiciona item com quantidade inferior a zero', async () => {
        await expect(
            servico.adicionarItem( -1, codProduto1, TipoME.ENTRADA )
        ).rejects.toThrowError( /número positivo/ );
    } );

    it( 'não adiciona item com código de comprimento zero', async () => {
        await expect(
            servico.adicionarItem( 1, "", TipoME.ENTRADA )
        ).rejects.toThrowError( /informe um produto/ );
    } );

    it( 'não adiciona item com código inexistente', async () => {
        await expect(
            servico.adicionarItem( 1, "000000", TipoME.ENTRADA )
        ).rejects.toThrowError( /não encontrado/ );
    } );

    it( 'atualiza estoque de itens processados', async () => {
        const me = new MovimentacaoEstoque();
        me.adicionarItem( new ItemME( produto1, 10, TipoME.SAIDA ) );
        me.adicionarItem( new ItemME( produto2,  5, TipoME.ENTRADA ) );

        await servico.processar( me );
        const p1 = await colecaoProduto.produtoComCodigo( codProduto1 );
        const p2 = await colecaoProduto.produtoComCodigo( codProduto2 );
        expect( p1?.estoque ).toEqual( 40 );
        expect( p2?.estoque ).toEqual( 25 );
    } );

    it( 'persiste movimentação ao processar', async () => {
        const me = new MovimentacaoEstoque();
        me.adicionarItem( new ItemME( produto1, 10, TipoME.SAIDA ) );
        me.adicionarItem( new ItemME( produto2,  5, TipoME.ENTRADA ) );

        await servico.processar( me );
        expect( await colecaoMovEstoque.todos() ).toHaveLength( 1 );
    } );

} );