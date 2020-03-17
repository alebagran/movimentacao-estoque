import { ColecaoEmStorage } from "../src/colecao-em-storage";
import { Produto } from "../src/produto";

describe( 'ColecaoEmStorage', () => {

    function criarColecao(): ColecaoEmStorage< Produto > {
        return new ColecaoEmStorage< Produto >( 'prod' );
    }

    let colecao: ColecaoEmStorage< Produto >;

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

} );