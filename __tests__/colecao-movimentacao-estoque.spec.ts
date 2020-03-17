import { ColecaoMovimentacaoEstoque } from "../src/colecao-movimentacao-estoque";
import { ColecaoMovimentacaoEstoqueEmLocalStorage } from "../src/colecao-movimentacao-estoque-em-local-storage";
import { MovimentacaoEstoque } from "../src/movimentacao-estoque";

describe( 'ColecaoMovimentacaoEstoque', () => {

    function criarColecao(): ColecaoMovimentacaoEstoque {
        return new ColecaoMovimentacaoEstoqueEmLocalStorage();
    }

    let colecao: ColecaoMovimentacaoEstoque;

    beforeEach( () => {
        colecao = criarColecao();
        colecao.esvaziar();
    } );

    it( 'inicia sem itens ao esvaziar', async () => {
        expect( await colecao.todos() ).toHaveLength( 0 );
    } );

    it( 'retorna item adicionado', async () => {
        const mov = new MovimentacaoEstoque( 0, new Date, 'validade vencida', [] );
        await colecao.adicionar( mov );
        const todos = await colecao.todos();
        expect( todos ).toHaveLength( 1 );
    } );

} );