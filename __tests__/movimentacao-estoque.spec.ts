import { MovimentacaoEstoque } from "../src/movimentacao-estoque";
import { ItemME } from "../src/item-me";
import { Produto } from "../src/produto";
import { TipoME } from "../src/tipo-me";

describe( "MovimentacaoEstoque", () => {

    describe( "balanco", () => {

        it( "deve retornar zero quando não há itens", () => {
            const me = new MovimentacaoEstoque();
            expect( me.balanco() ).toEqual( 0 );
        } );

        it( "totaliza com a entrada de um item", () => {
            const me = new MovimentacaoEstoque();
            const produto1 = new Produto( 1, "000001", "Coca-cola 2L", 50 );
            me.adicionarItem(
                new ItemME( produto1, 1,  TipoME.ENTRADA )
            );
            expect( me.balanco() ).toEqual( 1 );
        } );


        it( "totaliza com a saída de um item", () => {
            const me = new MovimentacaoEstoque();
            const produto1 = new Produto( 1, "000001", "Coca-cola 2L", 50 );
            me.adicionarItem(
                new ItemME( produto1, 1,  TipoME.SAIDA )
            );
            expect( me.balanco() ).toEqual( -1 );
        } );

        it( "totaliza dois itens, uma entrada e uma saída", () => {
            const me = new MovimentacaoEstoque();
            const produto1 = new Produto( 1, "000001", "Coca-cola 2L", 50 );
            const produto2 = new Produto( 2, "000002", "Pepsi 2L", 20 );
            me.adicionarItem(
                new ItemME( produto1, 10,  TipoME.SAIDA ),
            );
            me.adicionarItem(
                new ItemME( produto2,  5,  TipoME.ENTRADA )
            );
            expect( me.balanco() ).toEqual( -5 );
        } );

    } );


    describe( "quantidades", () => {

        it( "dois itens, uma entrada e uma saída", () => {
            const me = new MovimentacaoEstoque();
            const produto1 = new Produto( 1, "000001", "Coca-cola 2L", 50 );
            const produto2 = new Produto( 2, "000002", "Pepsi 2L", 20 );
            me.adicionarItem(
                new ItemME( produto1, 10,  TipoME.SAIDA ),
            );
            me.adicionarItem(
                new ItemME( produto2,  5,  TipoME.ENTRADA )
            );
            expect( me.quantidades() ).toEqual( 15 );
        } );

    } );

} );