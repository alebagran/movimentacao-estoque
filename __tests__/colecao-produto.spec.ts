import { ColecaoProdutoEmLocalStorage } from "../src/colecao-produto-em-local-storage";
import { ColecaoProduto } from "../src/colecao-produto";
import { Produto } from "../src/produto";

describe( 'ColecaoProduto', () => {

    function criarColecao(): ColecaoProduto {
        return new ColecaoProdutoEmLocalStorage();
    }

    let colecao: ColecaoProduto;

    beforeEach( () => {
        colecao = criarColecao();
        colecao.esvaziar();
    } );

    it( 'inicia sem itens ao esvaziar', async () => {
        expect( await colecao.todos() ).toHaveLength( 0 );
    } );

    it( 'retorna item adicionado', async () => {
        const produto = new Produto( 0, "000001", "Coca-cola 2L", 50 );
        await colecao.adicionar( produto );
        const todos = await colecao.todos();
        expect( todos ).toHaveLength( 1 );
    } );

    it( 'aumenta estoque de um produto', async () => {
        const produto = new Produto( 0, "000001", "Coca-cola 2L", 50 );
        await colecao.adicionar( produto );
        await colecao.aumentarEstoque( "000001", 5 );
        const alterado: Produto | null =
            await colecao.produtoComCodigo( "000001" );
        expect( alterado ).not.toBeNull();
        expect( alterado?.estoque ).toEqual( 55 );
    } );

    it( 'diminui estoque de um produto', async () => {
        const produto = new Produto( 0, "000001", "Coca-cola 2L", 50 );
        await colecao.adicionar( produto );
        await colecao.diminuirEstoque( "000001", 5 );
        const alterado: Produto | null =
            await colecao.produtoComCodigo( "000001" );
        expect( alterado ).not.toBeNull();
        expect( alterado?.estoque ).toEqual( 45 );
    } );

} );